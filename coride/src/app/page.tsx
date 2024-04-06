"use client"
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { GoogleMap, LoadScript, Autocomplete } from '@react-google-maps/api';
import { DirectionsRenderer } from '@react-google-maps/api'; // Import DirectionsRenderer from the correct package


import { useRef } from 'react';

// Inside your Home component


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

const Home = () => {
  const sourceAutocomplete = useRef<any>(null); // Define the useRef hook inside the functional component
  const destinationAutocomplete = useRef<any>(null);
  const [showWithCoRide, setShowWithCoRide] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [source, setSource] = useState<google.maps.LatLngLiteral | undefined>(undefined);
  const [destination, setDestination] = useState<google.maps.LatLngLiteral | undefined>(undefined);
  const [directions, setDirections] = useState<any>(null); // Store directions response

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
    const timeout = setTimeout(() => {
      setShowWithCoRide(true);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

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

          <LoadScript
            googleMapsApiKey="AIzaSyDq9wpSkS0FWn4KKqHQ8DHzXy6XuqkuyHw"
            libraries={['places']}
            onLoad={handleScriptLoad}
          >
            {scriptLoaded && (
              <>
                <Autocomplete
                  onLoad={(autocomplete) => sourceAutocomplete.current = autocomplete} // Assign the Autocomplete instance to the ref
                  onPlaceChanged={() => handlePlaceChanged('source', sourceAutocomplete.current?.getPlace())} // Get the place from the ref
                >
                  <input
                    type="text"
                    placeholder="Enter Pick Up Point"
                    className="border-2 border-black rounded-md mt-10 ml-52 px-4 h-14 w-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </Autocomplete>
                <Autocomplete
                  onLoad={(autocomplete) => destinationAutocomplete.current = autocomplete} // Assign the Autocomplete instance to the ref
                  onPlaceChanged={() => handlePlaceChanged('destination', destinationAutocomplete.current?.getPlace())} // Get the place from the ref
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
