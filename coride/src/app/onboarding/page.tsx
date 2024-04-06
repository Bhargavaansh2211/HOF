"use client"
import React, { useState, FormEvent, ChangeEvent } from 'react'
import { currentUser } from '@clerk/nextjs'

const Page = () => {
  const [role, setRole] = useState('');
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [mobile, setMobile] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [gender, setGender] = useState('Male');

  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role,
          first_name,
          last_name,
          mobile,
          gender,
          vehicleType,
          vehicleNumber,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to create user');
      }
      // Handle success
      console.log('User created successfully');
    } catch (error) {
      console.log(error)
    }
  };


  const handleRoleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value);
  };

  const handleFirst_nameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFirst_name(e.target.value);
  };

  const handleLast_nameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLast_name(e.target.value);
  };

  const handleMobileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMobile(e.target.value);
  };

  const handleGenderChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value);
  };

  const handleVehicleTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVehicleType(e.target.value);
  };

  const handleVehicleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVehicleNumber(e.target.value);
  };

  return (
    <div className="max-w-md mx-auto mt-10 mb-10 bg-white p-6 rounded-lg shadow-[5px_5px_15px_-5px_rgba(0,0,0,.7)]">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="role" className="block  text-xl">Role</label>
          <select
            id="role"
            value={role}
            onChange={handleRoleChange}
            className="block w-full h-12  border-2 border-black rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Driver">Driver</option>
            <option value="Customer">Customer</option>
          </select>
        </div>
        <div>
          <label htmlFor="first_name" className="block  text-xl">First Name</label>
          <input
            type="text"
            id="first_name"
            value={first_name}
            onChange={handleFirst_nameChange}
            className="block w-full h-12 border-2 border-black rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="last_name" className="block  text-xl">Last Name</label>
          <input
            type="text"
            id="last_name"
            value={last_name}
            onChange={handleLast_nameChange}
            className="block w-full h-12 border-2 border-black rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="mobile" className="block  text-xl">Mobile Number</label>
          <input
            type="text"
            id="mobile"
            value={mobile}
            onChange={handleMobileChange}
            className="block w-full h-12 border-2 border-black rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="role" className="block  text-xl">Gender</label>
          <select
            id="gender"
            value={gender}
            onChange={handleGenderChange}
            aria-placeholder='Select Gender'
            className="block w-full h-12  border-2 border-black rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Male">Male</option>
            <option value="Driver">Female</option>
          </select>
        </div>
        {role === 'Driver' && (
          <>
            <div>
              <label htmlFor="vehicleType" className="block  text-xl">Vehicle Type</label>
              <input
                type="text"
                id="vehicleType"
                value={vehicleType}
                onChange={handleVehicleTypeChange}
                className="block w-full h-12 border-2 border-black rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="vehicleNumber" className="block  text-xl">Vehicle Number</label>
              <input
                type="text"
                id="vehicleNumber"
                value={vehicleNumber}
                onChange={handleVehicleNumberChange}
                className="block w-full h-12 border-2 border-black rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </>
        )}
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Submit</button>
      </form>
    </div>
  );
}

export default Page;
