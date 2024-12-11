"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Card } from "@/components/ui/card";
import { FaEdit, FaRegEye, FaTrashAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

const Property = () => {
    const [property, setProperty] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedProperty, setselectedProperty] = useState('');
    const [totalProperty, settotalProperty] = useState(0);
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const res = await fetch('http://localhost:6969/api/property/get');
                const data = await res.json();
                settotalProperty(data.length)
                setProperty(data);
            } catch (error) {
                console.error("Error fetching properties:", error);
            }
        };

        fetchProperties();
    }, []);

    const handleView = (propertyId) => {
        const selectedProperty = property.find((prop) => prop._id === propertyId);

        if (selectedProperty) {
            const fetchProperty = async () => {
                try {
                    const res = await fetch(`http://localhost:6969/api/property/get/${selectedProperty._id}`);
                    const data = await res.json();
                    setShowModal(true);
                    setselectedProperty(data);
                } catch (error) {
                    console.error("Error fetching property:", error);
                }
            };

            fetchProperty();
        } else {
            console.error("Property not found!");
        }
    };
    const handleDelete = (propertyId) => {
        const selectedProperty = property.find((prop) => prop._id === propertyId);

        if (selectedProperty) {
            const DeleteProperty = async () => {
                try {
                    const res = await fetch(`http://localhost:6969/api/property/delete/${selectedProperty._id}`);
                    if (!res.ok) {
                        throw new Error("Failed to delete property");
                    }

                    setProperty((prevProperties) => prevProperties.filter((prop) => prop._id !== propertyId));
                } catch (error) {
                    console.error("Error deleting property:", error);
                }
            };

            DeleteProperty();
        } else {
            console.error("Property not found!");
        }
    }


    const handleCloseModal = () => {
        setShowModal(false);
    }
    const stripHtmlTags = (input) => {
        return input.replace(/<[^>]*>/g, ''); // Regular expression to remove HTML tags
    };


    return (
        <>
            <div className="bg-black text-white px-2 py-4">
                <h1 className="text-center font-semibold text-lg">Property Listing</h1>
            </div>
            <div className="flex justify-between gap-2.5 px-2 py-2">
                <Card className="bg-gradient-to-r from-red-700 to-red-500 text-white w-full py-12 px-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <strong>Total Property Listed</strong>
                        </div>
                        <div>
                            <h4 className="font-bold">{totalProperty}</h4>
                        </div>
                    </div>
                </Card>

                <Card className="bg-gradient-to-r from-blue-500 to-blue-700 text-white w-full py-12 px-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <strong>Total Property Listed</strong>
                        </div>
                        <div>
                            <h4 className="font-bold"></h4>
                        </div>
                    </div>
                </Card>

                <Card className="bg-gradient-to-r from-green-700 to-green-500 text-white w-full py-12 px-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <strong>Total Property Listed</strong>
                        </div>
                        <div>
                            <h4 className="font-bold">100</h4>
                        </div>
                    </div>
                </Card>
            </div>
            <div className="px-2 py-2">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Property Unique No.</TableHead>
                            <TableHead>Property Name</TableHead>
                            <TableHead>Property Image</TableHead>
                            <TableHead>Property Location</TableHead>
                            <TableHead>Property Price(per Night)</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {property.map((properties) => (
                            <TableRow key={properties._id}>
                                <TableCell className="font-medium">{properties._id}</TableCell>
                                <TableCell>{properties.propertyName}</TableCell>
                                <TableCell>
                                    <Image src={`http://localhost:6969/${properties.mainImageFile}`} alt={properties.propertyName} width={50} height={50} />
                                </TableCell>
                                <TableCell>{properties.location}</TableCell>
                                <TableCell>{properties.perNightPrice}</TableCell>
                                <TableCell className="flex">
                                    <Link href={`/admin/property/edit/${properties._id}`}>
                                        <FaEdit
                                            style={{ cursor: "pointer" }}
                                        />
                                    </Link>

                                    <FaRegEye
                                        data-id={properties._id}
                                        onClick={() => handleView(properties._id)}
                                        style={{ cursor: "pointer", margin: "0 5px" }}
                                    />
                                    <FaTrashAlt
                                        data-id={properties._id}
                                        onClick={() => handleDelete(properties._id)}
                                        style={{ cursor: "pointer", margin: "0 5px" }}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </div>

            {showModal && selectedProperty && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center z-50">
                    <div className="bg-white rounded-lg w-1/3 max-h-[90vh] relative overflow-y-scroll overflow-x-hidden">
                        <h2 className="text-lg font-semibold text-center bg-[#e5e5e5] p-2 flex justify-between items-center">
                            Property Details
                            <span className="cursor-pointer" onClick={handleCloseModal}>
                                <IoClose className="text-red-700 text-xl font-bold" />
                            </span>
                        </h2>
                        <div className="mt-4 px-2">
                            <div className="htmlForm-group">
                                <label htmlFor="description" className="control-label"> Property Name</label>
                                <input type="text" id="description" name="description" className="form-control" value={selectedProperty.propertyName} readOnly />
                            </div>



                        </div>
                        <div className="mt-4 px-2">
                            <div className="htmlForm-group">
                                <label htmlFor="description" className="control-label"> Property Type</label>
                                <input type="text" id="description" name="description" className="form-control" value={selectedProperty.category} readOnly />
                            </div>
                        </div>
                        <div className="mt-4 px-2">
                            <div className="htmlForm-group">
                                <label htmlFor="description" className="control-label"> Property Description</label>
                                <input type="text" id="description" name="description" className="form-control" value={stripHtmlTags(selectedProperty.propertyDescription)} readOnly />
                            </div>
                        </div>
                        <div className="mt-4 px-2">
                            <div className="htmlForm-group">
                                <label htmlFor="description" className="control-label"> Property Rate</label>
                                <input type="text" id="description" name="description" className="form-control" value={selectedProperty.perNightPrice} readOnly />
                            </div>
                        </div>
                        <div className="mt-4 px-2">
                            <div className="htmlForm-group">
                                <label htmlFor="description" className="control-label"> Property Location</label>
                                <input type="text" id="description" name="description" className="form-control" value={selectedProperty.location} readOnly />
                            </div>
                        </div>

                        <div className="mt-4 px-2">
                            <div className="htmlForm-group">
                                <label htmlFor="description" className="control-label"> Property Availabel Date</label>
                                <input type="text" id="description" name="description" className="form-control" value={`${new Date(selectedProperty.startDate).toLocaleDateString()} - ${new Date(selectedProperty.endDate).toLocaleDateString()}`} readOnly />
                            </div>
                        </div>

                        <div className="mt-4 px-2">
                            <div className="htmlForm-group">
                                <label htmlFor="description" className="control-label"> Property Main Iamge</label>
                                <Image src={`http://localhost:6969/${selectedProperty.mainImageFile}`} alt={selectedProperty.propertyName} width={250} height={50} />
                            </div>
                        </div>

                        <div className="mt-4 px-2">
                            <div className="htmlForm-group">
                                <label htmlFor="description" className="control-label"> Property Slider Iamge</label>
                                <Carousel>
                                    <CarouselContent>
                                        {selectedProperty.sliderImages && selectedProperty.sliderImages.length > 0 ? (
                                            selectedProperty.sliderImages.map((image, index) => (
                                                <CarouselItem key={index} className="md:basis-full lg:basis-full">  <div className="max-w-xs mx-auto">
                                                    <div
                                                        className="relative shadow-lg rounded-lg p-5 overflow-hidden h-[200px]"
                                                    >
                                                        <Image
                                                            src={`http://localhost:6969/${image}`}
                                                            alt={`Slider Image ${index + 1}`}
                                                            width={200}
                                                            height={80}
                                                            className="object-cover w-full h-full rounded-lg"
                                                        />
                                                        <div className="absolute bottom-4">
                                                            <div className="text-xs  uppercase text-white tracking-widest mb-2 font-extrabold">Featured app</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                </CarouselItem>
                                            ))
                                        ) : (
                                            <div className="text-center text-gray-500">No images available</div>
                                        )}
                                    </CarouselContent>
                                    <CarouselPrevious />
                                    <CarouselNext />
                                </Carousel>
                            </div>
                        </div>

                    </div>
                </div>
            )}

            <Link href="/admin/property/add" className="fixed w-50 h-50 p-4 bottom-10 right-10 bg-blue-500 text-white rounded-full text-center text-2xl shadow-md z-100" target="_blank">
                <FaPlus />
            </Link>


        </>


    );
};

export default Property;
