'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../../components/Map/Map'), {
  ssr: false,
});

interface Ride {
  id: number;
  pickup: string;
  destination: string;
  status: string;
}

export default function DriverHome() {
  const [rideHistory, setRideHistory] = useState<Ride[]>([]);

  useEffect(() => {
    const fetchRideHistory = async () => {
      try {
        const response = await axios.get('/api/ride-history'); 
        setRideHistory(response.data);
      } catch (error) {
        console.error('Error fetching ride history:', error);
      }
    };

    fetchRideHistory();

  }, []);

  return (
    <>
      <div className='flex w-full '>
        <div className="relative w-[50%] ">
          <h2 className="text-lg font-semibold mt-8">Ride History:</h2>
          <ul>
            {rideHistory.map(ride => (
              <li key={ride.id}>
                <p>Pickup: {ride.pickup}</p>
                <p>Destination: {ride.destination}</p>
                <p>Status: {ride.status}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className='w-[50%] mr-16 mt-12 h-max'>
          <Map/>
        </div>
      </div>
    </>
  );
}
