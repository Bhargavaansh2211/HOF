'use client'
import { currentUser } from '@clerk/nextjs'
import React, { useState, FormEvent, ChangeEvent } from 'react'

const page = () => {
  const [role, setRole] = useState('');
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [mobile, setmobile] = useState('');
  const [gender, setGender] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({
      role,
      first_name,
      last_name,
      mobile,
      gender,
      ...(role === 'Driver' && { vehicleType, vehicleNumber }),
    });
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

  const handlemobileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setmobile(e.target.value);
  };

  const handleGenderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGender(e.target.value);
  };

  const handleVehicleTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVehicleType(e.target.value);
  };

  const handleVehicleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVehicleNumber(e.target.value);
  };

  const page = async () => {
    const user = await currentUser();
    console.log(user)
    return (
      <>
        <div className="max-w-md mx-auto mt-10">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="role" className="block">Role</label>
              <select
                id="role"
                value={role}
                onChange={handleRoleChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Role</option>
                <option value="Driver">Driver</option>
                <option value="Customer">Customer</option>
              </select>
            </div>
            <div>
              <label htmlFor="first_name" className="block">First Name</label>
              <input
                type="text"
                id="first_name"
                value={first_name}
                onChange={handleFirst_nameChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="last_name" className="block">Last Name</label>
              <input
                type="text"
                id="last_name"
                value={last_name}
                onChange={handleLast_nameChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="mobile" className="block">Mobile Number</label>
              <input
                type="text"
                id="mobile"
                value={mobile}
                onChange={handlemobileChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="gender" className="block">Gender</label>
              <input
                type="text"
                id="gender"
                value={gender}
                onChange={handleGenderChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {role === 'Driver' && (
              <>
                <div>
                  <label htmlFor="vehicleType" className="block">Vehicle Type</label>
                  <input
                    type="text"
                    id="vehicleType"
                    value={vehicleType}
                    onChange={handleVehicleTypeChange}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="vehicleNumber" className="block">Vehicle Number</label>
                  <input
                    type="text"
                    id="vehicleNumber"
                    value={vehicleNumber}
                    onChange={handleVehicleNumberChange}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </>
            )}
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Submit</button>
          </form>
        </div>
      </>
    )
  }
}
export default page;
