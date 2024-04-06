"use client"
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { GoogleMap, LoadScript, Autocomplete } from '@react-google-maps/api';
import { DirectionsRenderer } from '@react-google-maps/api';
import { useRef } from 'react';
import { currentUser } from '@clerk/nextjs';

interface AnimatedTextProps {
  text: string;
}

let t = 0;

const AnimatedText: React.FC<AnimatedTextProps> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= text.length) {
        setDisplayedText(text.substring(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [text]);
  t++;
  if (t === 1) {
    return <span className="text-5xl font-bold block mt-36 ml-32">{displayedText}</span>;
  } else {
    return <span className="text-5xl font-bold block mt-8 ml-52">{displayedText}</span>;
  }
};

const logCurrentUser = async () => {
  try {
    const user = await currentUser();
    console.log(user);
  } catch (error) {
    console.error('Error fetching current user:', error);
  }
};


logCurrentUser();
const Home =  () => {
  
  const updateUserLocation = async (userId: string) => {
    try {
      // Obtain the user's current location using geolocation
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        console.log(latitude,longitude)
  
        // Send a PUT request to update the user's location
        const response = await fetch(`/api/updateLocation?userId=${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ latitude, longitude }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to update user location');
        }
  
        const data = await response.json();
        console.log('User location updated:', data);
      }, (error) => {
        console.error('Error getting user location:', error);
      });
    } catch (error) {
      console.error('Error updating user location:', error);
    }
  };
  
  
  
  const googleMapsApiKey = process.env.NEXT_PUBLIC_API_KEY;
  console.log("api key",googleMapsApiKey)
  const sourceAutocomplete = useRef<any>(null);
  const destinationAutocomplete = useRef<any>(null);
  const [showWithCoRide, setShowWithCoRide] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [source, setSource] = useState<google.maps.LatLngLiteral | undefined>(undefined);
  const [destination, setDestination] = useState<google.maps.LatLngLiteral | undefined>(undefined);
  const [directions, setDirections] = useState<any>(null);
  const [duration, setDuration] = useState<string>('');
  const [distance, setDistance] = useState<string>('');
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | undefined>(undefined);

  const handleScriptLoad = () => {
    setScriptLoaded(true);
  };

  const handlePlaceChanged = (type: string, place: google.maps.places.PlaceResult) => {
    if (type === 'source') {
      setSource(place.geometry?.location?.toJSON());
    } else {
      setDestination(place.geometry?.location?.toJSON());
    }
  };

  useEffect(() => {
    if (scriptLoaded && destination) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            setSource({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
  
            
            updateUserLocation(); 
          },
          (error) => {
            console.error('Error getting user location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    }
  }, [scriptLoaded, destination]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowWithCoRide(true);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (scriptLoaded && destination) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            setSource({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            console.error('Error getting user location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    }
  }, [scriptLoaded, destination]);

  useEffect(() => {
    if (scriptLoaded && source && destination) {
      const DirectionsService = new google.maps.DirectionsService();
      DirectionsService.route(
        {
          origin: source,
          destination: destination,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirections(result);

            const route = result?.routes[0].legs[0];
            if(route?.duration) setDuration(route.duration.text);
            if(route?.distance) setDistance(route.distance.text);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  }, [scriptLoaded, source, destination]);

  return (
    <>
      <div className='flex w-full mt-10 mb-20 '>
        <div className='w-[50%]'>
          <AnimatedText text="AnyTime, AnyWhere" />
          {showWithCoRide && (
            <AnimatedText text="with CoRide" />
          )}
          {duration && <p>Duration: {duration}</p>}
          {distance && <p>Distance: {distance}</p>}
          <LoadScript
            googleMapsApiKey= {googleMapsApiKey!}
            libraries={['places']}
            onLoad={handleScriptLoad}
          >
            {scriptLoaded && (
              <>
                <Autocomplete
                  onLoad={(autocomplete) => sourceAutocomplete.current = autocomplete}
                  onPlaceChanged={() => handlePlaceChanged('source', sourceAutocomplete.current?.getPlace())}
                >
                  <input
                    type="text"
                    placeholder="Enter Pick Up Point"
                    className="border-2 border-black rounded-md mt-10 ml-52 px-4 h-14 w-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </Autocomplete>
                <Autocomplete
                  onLoad={(autocomplete) => destinationAutocomplete.current = autocomplete}
                  onPlaceChanged={() => handlePlaceChanged('destination', destinationAutocomplete.current?.getPlace())}
                >
                  <input
                    type="text"
                    placeholder="Enter Destination Point"
                    className="border-2 border-black rounded-md m-10 ml-52 px-4 h-14 w-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </Autocomplete>
              </>
            )}
          </LoadScript>
          <br />
          <Link href="/" className="text-black h-12 bg-yellow-400 ml-52 hover:bg-slate-400 hover:text-black rounded-lg p-2">See Prices</Link>
        </div>
        <div className='w-[50%] mr-16 ml-12'>
          <div style={{ height: '300px', width: '100%' }}>
            {scriptLoaded && (
              <GoogleMap
                mapContainerStyle={{ height: '500px', width: '100%' }}
                center={source || { lat: 26.800804, lng: 81.024269 }}
                zoom={15}
              >
                {directions && (
                  <DirectionsRenderer directions={directions} />
                )}
              </GoogleMap>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
