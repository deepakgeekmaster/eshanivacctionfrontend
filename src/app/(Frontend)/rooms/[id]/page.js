"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import PropertyGallery from "@/app/Component/galler";
import { TbToolsKitchen3 } from "react-icons/tb";
import { LuWashingMachine } from "react-icons/lu";
import { FaRegSnowflake } from "react-icons/fa";
import { FaWifi } from "react-icons/fa";
import { IoTvSharp } from "react-icons/io5";
import { FaParking } from "react-icons/fa";
import { MdWorkspacesFilled } from "react-icons/md";
import { LiaSwimmingPoolSolid } from "react-icons/lia";
import { FaHotTub } from "react-icons/fa";
import { GiStoneBlock } from "react-icons/gi";
import { MdOutdoorGrill } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";
import { MdDining } from "react-icons/md";
import { FaFire } from "react-icons/fa";
import { CgPiano } from "react-icons/cg";
import { DatePickerWithRange } from "@/app/Component/Daterange";
import GuestInput from "@/app/Component/GuestInput";
import { loadStripe } from "@stripe/stripe-js";

export default function Detail({ params }) {
  const [selectedDates, setSelectedDates] = useState(null);

  const [property, setProperty] = useState({});
  const [isReadMore, setIsReadMore] = useState(false);
  const [nights, setNights] = useState(1);
  const id = React.use(params).id;
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(`https://eshanivaccationbackend.vercel.app/api/property/get/${id}`);
        const data = await res.json();
        setProperty(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  const handleDateChange = (newDate, numberOfNights) => {
    setSelectedDates(newDate); // Store the date range
    setNights(numberOfNights);  // Store the number of nights
  };

  const shortDescription = property.propertyDescription
    ? property.propertyDescription.slice(0, 500)
    : "";
  const fullDescription = property.propertyDescription || ""; // Fallback if undefined
  const totalPrice = property.perNightPrice * nights + 500;
  const taxAmount = totalPrice * 0.18;
  const totalammount = taxAmount+totalPrice;


  const handleReserveClick = async () => {
    try {
      const response = await fetch("https://eshanivaccationbackend.vercel.app/book/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          totalAmount: totalammount,
          propertyName: property.propertyName,
          nights: nights, 
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }
  
      const data = await response.json();
      const sessionId = data.id;
  
      const stripe = await loadStripe("pk_test_51QUj7IA5fflxDypajozKLTh6bX3BphUCI4v1YQi2tdcoQGWizfj40HE5CvfLcEHs5r2CkfX0A39MgoI2qPdVKsDm00iFzKIT0B"); 
      stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error("Error during checkout session creation:", error);
      alert("Something went wrong while initiating the checkout process.");
    }
  };
  

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-slate-700 mb-2">{property.propertyName}</h1>
        <div>
          <PropertyGallery property={property} />
        </div>
        <div className="flex mt-4">
          <div className="w-[70%]">
            <div>
              <h2 className="text-xl font-semibold">{property.placeType} in {property.location} </h2>
              <p>{property.bedrooms} Bedroom . {property.beds} Bed .{property.bathrooms} Bathroom </p>
            </div>
            <div className="mt-4 py-6 flex items-center border-t	border-b">
              <div className="hidden md:block">
                <Image
                  src={"/assets/header/profile.webp"}
                  width={40}
                  alt="Profile"
                  height={40}
                  className="rounded-full"
                />
              </div>
              <div className="px-4">Hosted By Eshani Vaccation</div>
            </div>

            <div className="mt-4">
              <ul className="flex flex-wrap">
                {property.amenities && property.amenities.length > 0 ? (
                  property.amenities.map((amenity, index) => {
                    // If amenities is a single string, split it by commas
                    if (typeof amenity === 'string') {
                      return amenity.split(",").map((item, idx) => {
                        // Trim spaces and convert to lowercase for matching
                        const trimmedItem = item.trim().toLowerCase();

                        // Render icons based on the amenity
                        let icon;
                        switch (trimmedItem) {
                          case 'wifi':
                            icon = <FaWifi className="mr-2" />;
                            break;
                          case 'tv':
                            icon = <IoTvSharp className="mr-2" />;
                            break;
                          case 'kitchen':
                            icon = <TbToolsKitchen3 className="mr-2" />;
                            break;
                          case 'washing machine':
                            icon = <LuWashingMachine className="mr-2" />;
                            break;
                          case 'free parking':
                            icon = <FaParking className="mr-2" />;
                            break;
                          case 'ac':
                            icon = <FaRegSnowflake className="mr-2" />;
                            break;
                          case 'dedicated workspace':
                            icon = <MdWorkspacesFilled className="mr-2" />;
                            break;
                          default:
                            icon = null; // No icon for unrecognized amenities
                        }

                        return (
                          <li key={`${index}-${idx}`} className="flex items-center text-xl mb-3 w-1/3">
                            {icon} {/* Display icon */}
                            {item.trim()} {/* Display the amenity name */}
                          </li>
                        );
                      });
                    } else {
                      return (
                        <li key={index} className="flex items-center w-1/3">
                          {/* Handle cases where amenity is not a string (e.g., an object or number) */}
                          {amenity.icon && <amenity.icon className="mr-2" />} {/* If amenity has an icon */}
                          {amenity.name || amenity} {/* Display amenity name */}
                        </li>
                      );
                    }
                  })
                ) : (
                  <li>No amenities available</li>
                )}
              </ul>

            </div>
            <div className="mt-4">
              <p className="text-lg font-medium">About This place</p>
              <p>
                {isReadMore ? (
                  <span dangerouslySetInnerHTML={{ __html: fullDescription }} />
                ) : (
                  <span dangerouslySetInnerHTML={{ __html: shortDescription }} />
                )}
              </p>

              <button
                onClick={toggleReadMore}
                className="text-blue-500 hover:underline mt-2"
              >
                {isReadMore ? "Read Less" : "Read More"}{" "}

              </button>
            </div>

            <div className="mt-4">
              <ul className="flex flex-wrap">
                {property.standoutAmenities && property.standoutAmenities.length > 0 ? (
                  property.standoutAmenities.map((standoutAmenities, index) => {
                    // If amenities is a single string, split it by commas
                    if (typeof standoutAmenities === 'string') {
                      return standoutAmenities.split(",").map((item, idx) => {
                        const trimmedItem2 = item.trim().toLowerCase();

                        let icon;
                        switch (trimmedItem2) {
                          case 'pool':
                            icon = <LiaSwimmingPoolSolid className="mr-2" />;
                            break;
                          case 'hot tub':
                            icon = <FaHotTub className="mr-2" />;
                            break;
                          case 'patio':
                            icon = <GiStoneBlock className="mr-2" />;
                            break;
                          case 'bbq grill':
                            icon = <MdOutdoorGrill className="mr-2" />;
                            break;
                          case 'outdoor':
                            icon = <PiSignOutBold className="mr-2" />;
                            break;
                          case 'dining area':
                            icon = <MdDining className="mr-2" />;
                            break;
                          case 'firepit':
                            icon = <FaFire className="mr-2" />;
                            break;
                          case 'piano':
                            icon = <CgPiano className="mr-2" />;
                            break;
                          default:
                            icon = null; // If no icon matches, make sure it doesn't end up being null or undefined
                        }


                        return (
                          <li key={`${index}-${idx}`} className="flex items-center text-xl mb-3 w-1/3">
                            {icon} {/* Display icon */}
                            {item.trim()} {/* Display the amenity name */}
                          </li>
                        );
                      });
                    } else {
                      return (
                        <li key={index} className="flex items-center w-1/3">
                          {standoutAmenities.icon && <standoutAmenities.icon className="mr-2" />}
                          {standoutAmenities.name || standoutAmenities}
                        </li>
                      );
                    }
                  })
                ) : (
                  <li>No amenities available</li>
                )}
              </ul>




            </div>

          </div>
          <div className="w-[30%] relative">
            {/* This parent div is relative */}
            <div className="sticky top-16 p-10">
            <div className="form-control">
               <h2 className="text-lg font-bold text-center">Book Your Room Now at {property.perNightPrice} AED <span className="text-sm font-normal"> /night</span></h2>
              </div>
              <div className="form-control">
              <DatePickerWithRange onChange={handleDateChange} />
              </div>
              <div className="form-control">
                <GuestInput maxGuests={property.guests}  />
              </div>
              <div className="form-control !flex items-center justify-between">
                <p>{property.perNightPrice}X {nights} Night </p> <span className="text-lg font-bold">  {property.perNightPrice * nights} AED</span>
              </div>
              <div className="form-control !flex items-center justify-between">
                <p>Cleaning fess </p> <span className="text-lg font-bold">150 AED</span>
              </div>
            
              <div className="form-control !flex items-center justify-between">
              <p>Total </p> <span className="text-lg font-bold">{totalammount} AED</span>
              </div>
            
              <div className="form-control">
                <button className="btn btn-danger"  onClick={handleReserveClick}> Reserve</button>
              </div>
            </div>
          </div>

        </div>

      </div>


    </>

  );
}
