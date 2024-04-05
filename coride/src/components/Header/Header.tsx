'use client'
import React from 'react';
import Link from "next/link";

const Header = () => {
    return (
        <nav className="bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Link href="/" className="text-white">
                                Logo
                            </Link>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center space-x-4">
                            <Link href="/" className="text-white hover:bg-white hover:text-black rounded-lg p-2">
                                Home
                            </Link>
                            <Link href="/" className="text-white hover:bg-white hover:text-black rounded-lg p-2">
                                Trips
                            </Link>
                            <Link href="/About" className="text-white hover:bg-white hover:text-black rounded-lg p-2">About Us</Link>
                            <Link href="/" className="text-white hover:bg-white hover:text-black rounded-lg p-2">
                                Log In
                            </Link>
                            <Link href="/" className="text-black bg-white hover:bg-white hover:text-black rounded-lg p-2">
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;
