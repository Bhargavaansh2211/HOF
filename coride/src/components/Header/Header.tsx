'use client'
import React from 'react';
import Link from "next/link";
import Image from "next/image"
import logo from "../../../public/taxi.png"
import { UserButton } from '@clerk/nextjs';

const Header = () => {
    return (
        <nav className="bg-yellow-400 h-28">
            <div className="max-w-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-24">
                    <div className="flex items-center">
                        <Image src={logo} alt='logo' className='w-20 h-20'></Image>
                        <h1 className='font-bold text-2xl mt-2 ml-2'><Link href='/'>CoRide</Link></h1>
                    </div>
                    <div className="hidden md:flex space-x-4 justify-end text-lg font-semibold">
                        <Link href="/" className="text-black bg-yellow hover:bg-white hover:text-black rounded-lg p-2">
                            Home
                        </Link>
                        <Link href="/Trips" className="text-black bg-yellow hover:bg-white hover:text-black rounded-lg p-2">
                            Trips
                        </Link>
                        <Link href="/About" className="text-black bg-yellow hover:bg-white hover:text-black rounded-lg p-2">About Us</Link>
                        <UserButton/>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;
