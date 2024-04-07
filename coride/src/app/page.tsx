"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Link from "next/link";
import { GoogleMap, LoadScript, Autocomplete } from "@react-google-maps/api";
import { DirectionsRenderer } from "@react-google-maps/api"; // Import DirectionsRenderer from the correct package

import { useRef } from "react";
import { platform } from "os";
import { useRouter } from "next/navigation";

// Inside your Home component

interface AnimatedTextProps {
  text: string;
}

let t = 0;

const AnimatedText: React.FC<AnimatedTextProps> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");

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
    return (
      <span className="text-5xl font-bold block mt-36 ml-32">
        {displayedText}
      </span>
    );
  } else {
    return (
      <span className="text-5xl font-bold block mt-8 ml-52">
        {displayedText}
      </span>
    );
  }
};

const logCurrentUser = async () => {
  try {
    // const user = await currentUser();
    // console.log(user);
  } catch (error) {
    console.error('Error fetching current user:', error);
  }
};


logCurrentUser();
const Home = () => {
  const isDriving = false;
  // const updateUserLocation = async (userId: string) => {
  //   try {
  //     // Obtain the user's current location using geolocation
  //     navigator.geolocation.getCurrentPosition(async (position) => {
  //       const { latitude, longitude } = position.coords;
  //       console.log(latitude, longitude)

  //       // Send a PUT request to update the user's location
  //       const response = await fetch(/api/updateLocation ? userId = ${ userId }, {
  //         method: 'PUT',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ latitude, longitude }),
  //       });

  //       if (!response.ok) {
  //         throw new Error('Failed to update user location');
  //       }

  //       const data = await response.json();
  //       console.log('User location updated:', data);
  //     }, (error) => {
  //       console.error('Error getting user location:', error);
  //     });
  //   } catch (error) {
  //     console.error('Error updating user location:', error);
  //   }
  // };



  const googleMapsApiKey = process.env.NEXT_PUBLIC_API_KEY;
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

  const handlePlaceChanged = (
    type: string,
    place: google.maps.places.PlaceResult
  ) => {
    if (type === "source") {
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


            // updateUserLocation(); 
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
            if (route?.duration) setDuration(route.duration.text);
            if (route?.distance) setDistance(route.distance.text);
          } else {
            console.error('error fetching directions ${ result }');
          }
        }
      );
    }
  }, [scriptLoaded, source, destination]);
  /Implementation logic/
  const [fare, setfare] = useState(0)
  const secondFareCalculation = () => {
    let surPlusFare = 0
    const costPerKm = 10;
    const platformFee = 5;
    const initialDistanceFarRider = 10// get by fetching from db of user whose distance is longer
    const updatedDistanceFarRider = 12// get by fetching from db of user whose distance is longer
    surPlusFare = costPerKm * updatedDistanceFarRider - costPerKm * initialDistanceFarRider
    const derouteDistance = 1.5 //  get by fetching from db distance of second user to driver at the time of accepting second ride
    const commonDistance = 7.5 //  get by fetching from db distance of location of second user to nearest destination
    const derouteFare = derouteDistance * costPerKm;
    const remainingDistance = 4.5 // get by fetching from db distance nearest destination to farthest destination
    const shorterFare = (surPlusFare + derouteFare) / 2 + commonDistance * costPerKm + platformFee
    const longerFare = (surPlusFare + derouteFare) / 2 + commonDistance * costPerKm + remainingDistance * costPerKm + platformFee
    const fare = {
      fareFurther: longerFare,
      fareNearer: shorterFare
    }
    return fare
  };
  const firstFareCalculation = () => {
    let fare = 0
    const costPerKm = 10;
    const platformFee = 5;
    const distance = 10// get by fetching from db
    fare = costPerKm * distance + platformFee
    return fare
  };
  const handleSearch = async () => {
    const driverInfo = {
      driverName: "Nayaab Zameer",
      pNum: 0,
      isDriving: false,
      isAccepting: true,
    }; // fetched the info of nearest driver
    if (driverInfo.pNum == 0) {
      const reqToDriver = async () => {
        // put request to change pNum  to 1 in Backend
        // put request to save initial cordinates and direct distance to destination
        return true; // will Use socket to ask driver for acceptance
      };
      if (await reqToDriver()) {
        const firstIntervalId = setInterval(() => {
          () => {
            // function to get driver location
            // function to update drivers location in backend
          };
        }, 30000);
        let secondIntervalId = setInterval(() => {
          // Function to fetch passenger number from backend and update pNum in driverInfo
        }, 120000);
        const nearer = true; //fetch from db if destination is nearer thn set true else false
        const thirdIntervalId = setInterval(() => {
          if (driverInfo.pNum == 2) {
            let myFare = nearer ? secondFareCalculation().fareNearer : secondFareCalculation().fareFurther
            if (secondIntervalId) {
              clearInterval(secondIntervalId);
            }
          } else {
            setfare(firstFareCalculation());
          }
        }, 120000);

        const fourthIntervalId = setInterval(() => {
          if (!isDriving) {
            if (firstIntervalId) clearInterval(firstIntervalId);
            if (thirdIntervalId) clearInterval(thirdIntervalId);
            if (fourthIntervalId) clearInterval(fourthIntervalId);
            //function to set pNum = 0 at backend
          }
        });
      }

    } else {

      const reqToDriver = async () => {
        // put request to increase pNum to 2
        // function to 
        return true;
      };
      if (await reqToDriver()) {
        let firstIntervalId = setInterval(() => {
          () => {
            // function to get driver location
            //  function to update drivers location in backend
          };
        }, 30000);
        secondFareCalculation();
        const fourthIntervalId = setInterval(() => {
          if (!isDriving) {
            if (firstIntervalId) clearInterval(firstIntervalId);
            if (fourthIntervalId) clearInterval(fourthIntervalId);
            //function to set pNum = 0 at backend
          }
        });
      }
    }
  };

  return (
    <>
      <div className="flex w-full mt-10 mb-20 ">
        <div className="w-[50%]">
          <AnimatedText text="AnyTime, AnyWhere" />
          {showWithCoRide && (
            <AnimatedText text="with CoRide" />
          )}
          {duration && <p>Duration: {duration}</p>}
          {distance && <p>Distance: {distance}</p>}
          <LoadScript
            googleMapsApiKey={googleMapsApiKey!}
            libraries={['places']}
            onLoad={handleScriptLoad}
          >
            {scriptLoaded && (
              <>
                <Autocomplete
                  onLoad={(autocomplete) =>
                    (sourceAutocomplete.current = autocomplete)
                  } // Assign the Autocomplete instance to the ref
                  onPlaceChanged={() =>
                    handlePlaceChanged(
                      "source",
                      sourceAutocomplete.current?.getPlace()
                    )
                  } // Get the place from the ref
                >
                  <input
                    type="text"
                    placeholder="Enter Pick Up Point"
                    className="border-2 border-black rounded-md mt-10 ml-52 px-4 h-14 w-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </Autocomplete>
                <Autocomplete
                  onLoad={(autocomplete) =>
                    (destinationAutocomplete.current = autocomplete)
                  } // Assign the Autocomplete instance to the ref
                  onPlaceChanged={() =>
                    handlePlaceChanged(
                      "destination",
                      destinationAutocomplete.current?.getPlace()
                    )
                  } // Get the place from the ref
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
          <button
            onClick={
              isDriving
                ? async () => { }
                : async () => {
                  await handleSearch();
                }
            }
            className="text-black h-12 bg-yellow-400 ml-52 hover:bg-slate-400 hover:text-black rounded-lg p-2"
          >
            See Prices
          </button>
        </div>
        <div className="w-[50%] mr-16 ml-12">
          <div style={{ height: "300px", width: "100%" }}>
            {scriptLoaded && (
              <GoogleMap
                mapContainerStyle={{ height: "500px", width: "100%" }}
                center={source || { lat: 26.800804, lng: 81.024269 }}
                zoom={15}
              >
                {directions && <DirectionsRenderer directions={directions} />}
              </GoogleMap>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;