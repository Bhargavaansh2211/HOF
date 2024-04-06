"use client"
import React from 'react';
import { GoogleMap, LoadScript, Autocomplete } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const Page = () => {
  return (
    <>
      <h1 className='font-bold text-5xl'>Current Trip</h1><br/>
      <div className="flex center">
        <div className=" px-4 ml-[20px] w-1/2 mb-[20px] rounded-md shadow-[0_2px_5px_2px_rgba(0,0,0,.4)]"></div>
        <div className="ml-[40px] w-[800px] mb-[20px]">
          <LoadScript googleMapsApiKey="AIzaSyDq9wpSkS0FWn4KKqHQ8DHzXy6XuqkuyHw">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
            />
          </LoadScript>
          
        </div>
      </div>
    </>
  );
}

export default Page;
