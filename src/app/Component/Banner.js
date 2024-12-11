"use client";
import React from "react";
import Image from "next/image";
import { IoIosInformationCircle } from "react-icons/io";
import { FaMoon } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";

const Banner = () => {
  return (
    <div className="container mx-auto flex flex-wrap sm:flex-nowrap justify-between items-center bg-red-500 text-white p-10 rounded-xl gap-6">
      <div className="flex items-center">
        <h1 className="text-4xl mr-2 font-bold">
          Find and book your perfect stay
          <span className="inline-flex items-center px-4">
            <IoIosInformationCircle className="h-5 w-5" />
          </span>
        </h1>
      </div>

      <div className="flex justify-between items-center bg-red-900 text-white p-8 rounded-xl">
        <div className="px-2 text-4xl">
          <FaMoon />
        </div>
        <div>
          <p className="text-sm font-bold">Earn rewards on every night you stay</p>
        </div>
      </div>
      <div className="flex justify-between items-center bg-red-900 text-white p-8 rounded-xl">
        <div className="px-2 text-4xl">
          <FaBookmark />
        </div>
        <div>
          <p className="text-sm font-bold">Save more with Member Prices
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center bg-red-900 text-white p-8 rounded-xl">
        <div className="px-2 text-4xl">
          <FaCalendarAlt />
        </div>
        <div>
          <p className="text-sm font-bold">Free cancellation options if plans change
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
