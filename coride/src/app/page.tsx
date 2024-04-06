"use client"
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { GoogleMap, LoadScript, Autocomplete } from '@react-google-maps/api';

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
  if (t == 1) {
    return <span className="text-5xl font-bold block mt-36 ml-32">{displayedText}</span>;
  } else {
    return <span className="text-5xl font-bold block mt-8 ml-52">{displayedText}</span>;
  }
};

const Home = () => {
  const [showWithCoRide, setShowWithCoRide] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowWithCoRide(true);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    
      <div className='flex w-full mt-10 '>
        <div className="relative w-[50%] ">
          <AnimatedText text="AnyTime, AnyWhere" />
          {showWithCoRide && (
            <AnimatedText text="with CoRide" />
          )}
          <LoadScript
            googleMapsApiKey="AIzaSyDq9wpSkS0FWn4KKqHQ8DHzXy6XuqkuyHw"
            libraries={['places']}
          >
            <Autocomplete
              onLoad={(autocomplete) => console.log('autocomplete: ', autocomplete)}
              onPlaceChanged={() => console.log('onPlaceChanged')}
            >
              <input
                type="text"
                placeholder="Enter Pick Up Point"
                className="border-2 border-black rounded-md mt-10 ml-52 px-4 h-14 w-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </Autocomplete>
            <Autocomplete
              onLoad={(autocomplete) => console.log('autocomplete: ', autocomplete)}
              onPlaceChanged={() => console.log('onPlaceChanged')}
            >
              <input
                type="text"
                placeholder="Enter Destination Point"
                className="border-2 border-black rounded-md m-10 ml-52 px-4 h-14 w-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </Autocomplete>
            <GoogleMap
              mapContainerStyle={{ height: '400px', width: '100%' }}
              center={{ lat: -34.397, lng: 150.644 }}
              zoom={8}
            >
              {/* Child components, such as markers, info windows, etc. */}
              {/* Go here */}
            </GoogleMap>
            
          </LoadScript>
          <br />
          <Link href="/" className="text-black h-12 bg-yellow-400 ml-52 hover:bg-slate-400 hover:text-black rounded-lg p-2">See Prices</Link>
        </div>
      </div>
    
  );
}

export default Home;