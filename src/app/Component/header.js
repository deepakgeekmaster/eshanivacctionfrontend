"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import LoginModal from "./loginModal";
import UseAuth from "@/hooks/useAuth";
const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user, loading } = UseAuth();
    const handleButtonClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    return (
        <header className="bg-white sticky top-0 z-50">
            <nav className="py-3 border-b-[1px]">
                <div className="flex main-container flex-row justify-between items-center gap-3 md:gap-0 px-16">
                    <Link className="h-[85px] w-[100px] relative hidden md:block " href="/">
                        {" "}
                        <Image src="/assets/header/logo.jpg" alt="Logo" fill={true} />
                    </Link>
                    <div className="bar flex justify-center items-center bg-white shadow-md border-[1px] rounded-full h-14 w-full max-w-[850px] space-x-4">
                        <div className="location flex flex-col items-start justify-center w-1/3 px-6 py-2 hover:bg-gray-100">
                            <p className="text-xs">Location</p>
                            <input type="text" placeholder="Where are you going?" className="bg-transparent border-none outline-none text-sm placeholder:text-sm w-full p-0" />
                        </div>
                        <div className="check-in flex flex-col items-start justify-center w-1/4 px-6 py-2 hover:bg-gray-100">
                            <p className="text-xs">Check in</p>
                            <input type="text" placeholder="Add dates" className="bg-transparent border-none outline-none text-sm placeholder:text-sm w-full p-0" />
                        </div>
                        <div className="check-out flex flex-col items-start justify-center w-1/4 px-6 py-2 hover:bg-gray-100">
                            <p className="text-xs">Check out</p>
                            <input type="text" placeholder="Add dates" className="bg-transparent border-none outline-none text-sm placeholder:text-sm w-full p-0" />
                        </div>
                        <div className="guests flex flex-col items-start justify-center w-1/4 px-12 py-2 hover:bg-gray-100 relative">
                            <p className="text-xs">Guests</p>
                            <input type="text" placeholder="Add guests" className="bg-transparent border-none outline-none text-sm placeholder:text-sm w-full p-0" />
                            <span className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-[#FF385C] text-white text-xs p-3 rounded-full">
                                <FaSearch />

                            </span>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="flex flex-row items-center gap-3">
                            <div className="flex items-center justify-end relative rounded-md">
                                {user ? (
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-bold">{user.firstName}</span>
                                        <Image
                                            src={user.profilePic || "/assets/header/profile.webp"}
                                            alt="Profile"
                                            width={40}
                                            height={40}
                                            className="rounded-full"
                                        />
                                    </div>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={handleButtonClick}
                                        className=" p-4 md:py-1 md:px-2 border-[1px]   border-neutral-200  flex  flex-row  items-center   gap-3   rounded-full   cursor-pointer   hover:shadow-md   transition duration-300"
                                    >
                                        <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            strokeWidth="0"
                                            viewBox="0 0 1024 1024"
                                            height="1em"
                                            width="1em"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"></path>
                                        </svg>
                                        <div className="flex items-center">
                                            <span className="text-sm font-bold">Login</span>
                                            <Image
                                                src={"/assets/header/download.jpg"}
                                                width={40}
                                                alt="Profile"
                                                height={40}
                                                className="rounded-full"
                                            />
                                        </div>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            {isModalOpen && <LoginModal isOpen={isModalOpen} onClose={handleCloseModal} />}
        </header>

    );

};

export default Header;
