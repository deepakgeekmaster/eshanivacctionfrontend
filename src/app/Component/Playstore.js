"use client";
import React from "react";
import Image from "next/image";
import { FaMobileAlt } from "react-icons/fa";
import PhoneInput from "./PhoneInput";
const Playstore = () => {
    return (
        <>
            <div className="shadow-md p-6 bg-red-600 text-white flex-col md:flex-row">
                <div className="flex justify-around">
                    <div className="flex flex-col items-center md:flex-row">
                        <div className="text-4xl">
                            <FaMobileAlt />
                        </div>
                        <div className="ml-4">
                            <p className="text-4xl font-bold text-white">Download The App Now!</p>
                        </div>
                    </div>

                    <div className="app-icons flex justify-center space-x-4 mt-4 md:mt-0">
                        <a href="https://www.kobinet.com.tr/" target="_blank" className="market-btn apple-btn" role="button">
                            <span className="market-button-subtitle">Download on the</span>
                            <span className="market-button-title">App Store</span>
                        </a>
                        <a href="https://www.kobinet.com.tr/" target="_blank" className="market-btn google-btn" role="button">
                            <span className="market-button-subtitle">Download on the</span>
                            <span className="market-button-title">Google Play</span>
                        </a>
                    </div>
                </div>
                <div className="mt-6 px-44">
                    <PhoneInput />
                </div>
            </div>



        </>


    );
};

export default Playstore;
