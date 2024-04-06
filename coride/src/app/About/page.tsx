import React from 'react'
import Image from 'next/image'
import img from './about.jpeg'
const About = () => {
  return (
    <div className="dark:bg-dark bg-slate-100 sm:min-h-[600px] sm:grid sm:place-items-center duration-300">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
          <div data-aos="slide-right" data-aos-duration="1500">
            <Image src={img} alt='img' className="h-80 w-auto mt-100 ml-48"></Image>
          </div>
          <div>
            <div className="space-y-5 sm:p-16 pb-6">
              <h1
                data-aos="fade-up"
                className="text-3xl sm:text-4xl font-bold font-serif"
              >
                About us
              </h1>
              <p data-aos="fade-up" className="leading-12 tracking-wide font-bold text-xl">
                Welcome to CoRide - Your Ultimate Ride Sharing Platform!
              </p>
              <p data-aos="fade-up" className="font-bold">
                At CoRide, we believe in transforming the way people commute by providing a convenient, cost-effective, and sustainable solution for urban transportation. With our innovative ride-sharing platform, we empower users to book and share their cab rides effortlessly, all while splitting the fare with fellow passengers.
              </p>
              <p className="leading-8 tracking-wide font-bold text-xl">How it Works:
              </p>
              <p data-aos="fade-up" className="font-bold">
                Booking a ride with CoRide is simple and intuitive. Users can easily input their destination and preferred time for travel through our user-friendly mobile app or website. Our advanced algorithm then matches users with nearby riders heading in the same direction, allowing them to share the ride and split the fare.
              </p>
              <br></br>
              <a href='/'>
                <button className="bg-yellow-400 hover:bg-blue-700 text-black font-bold py-2 px-4 border border-blue-700 rounded" >
                  Get Started
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About