'use client'
import dynamic from 'next/dynamic';
import Link from "next/link"
const Map = dynamic(() => import('../components/Map/Map'), {
  ssr: false,
});
import { useEffect, useState } from 'react';

interface AnimatedTextProps {
  text: string;
}
let t=0;

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
  if (t==1){
    return <span className="text-5xl font-bold block mt-36 ml-32">{displayedText}</span>;
  }
  else{
    return <span className="text-5xl font-bold block mt-8 ml-52">{displayedText}</span>;
  }
};

export default function Home() {
  const [showWithCoRide, setShowWithCoRide] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowWithCoRide(true);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
       
      <div className='flex w-full '>
        <div className="relative w-[50%] ">
        <AnimatedText text="AnyTime, AnyWhere" />
        {showWithCoRide && (
          <AnimatedText text="with CoRide" />
        )}
          <input 
            type="text" 
            placeholder="Enter Pick Up Point" 
            className="border-2 border-black rounded-md mt-10 ml-52 px-4 h-14 w-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
          />
          <input 
            type="text" 
            placeholder="Enter Destination Point" 
            className="border-2 border-black rounded-md m-10 ml-52 px-4 h-14 w-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
          /><br/>
          <Link href="/" className="text-black h-12 bg-yellow-400 ml-52 hover:bg-slate-400 hover:text-black rounded-lg p-2">See Prices</Link>
        </div>
        <div className='w-[50%] mr-16 mt-12 h-max'>
        <Map/>
        </div>
      </div>
    </>
  );
}
