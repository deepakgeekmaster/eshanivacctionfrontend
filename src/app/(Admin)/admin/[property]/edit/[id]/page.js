"use client";

import React, { useState, useEffect } from "react";
import Select from "react-select";
import { DatePickerWithRange } from "@/app/Component/Daterange";
import JoditEditorComponent from "@/app/Component/admin/editor";
import { useRouter } from 'next/navigation';
import GuestSelector from "@/app/Component/guest";
const Property = ({ params }) => {
    const id = React.use(params).id;
    const [isClient, setIsClient] = useState(false)

    const [isEditorLoaded, setEditorLoaded] = useState(false);
    const [formData, setFormData] = useState({
        category: "", // Ensure this is a string (not an array)
        propertyName: "",
        propertyDescription: "",
        perNightPrice: "",
        location: "",
        mainImageFile: null,
        sliderImages: [],
        startDate: "",
        endDate: "",
        amenities: [], // This should be an array, handled properly for multiple selects
        standoutAmenities: [],
        safetyItems: [],
        placeFeatures: [],
        placeType: "",
        guests: 1,
        bedrooms: 1,
        beds: 1,
        bathrooms: 1,
    });

    useEffect(() => {
        setIsClient(true)
    }, [])

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    const res = await fetch(`http://localhost:6969/api/property/get/${id}`);
                    const data = await res.json();
                    setFormData({
                        ...data,
                        startDate: data.startDate || "",
                        endDate: data.endDate || "",
                        propertyDescription: data.propertyDescription || "",
                        sliderImages: data.sliderImages || [],
                        amenities: Array.isArray(data.amenities) ? data.amenities : data.amenities?.split(",") || [], // Split string to array
                        standoutAmenities: Array.isArray(data.standoutAmenities) ? data.standoutAmenities : data.standoutAmenities?.split(",") || [], // Split string to array
                        safetyItems: Array.isArray(data.safetyItems) ? data.safetyItems : data.safetyItems?.split(",") || [], // Split string to array
                        placeFeatures: Array.isArray(data.placeFeatures) ? data.placeFeatures : data.placeFeatures?.split(",") || [], // Split string to array
                        placeType: data.placeType || "",
                        category: data.category || "",
                        propertyName: data.propertyName || "",
                        perNightPrice: data.perNightPrice || "",
                        location: data.location || "",
                        guests: data.guests || 1,
                        bedrooms: data.bedrooms || 1,
                        beds: data.beds || 1,
                        bathrooms: data.bathrooms || 1,
                    });
                    setEditorLoaded(true);
                } catch (error) {
                    console.error("Error fetching property:", error);
                }
            };

            fetchData();
        }
    }, [id]);



    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === "file") {
            setFormData({
                ...formData,
                [name]: files.length === 1 ? files[0] : Array.from(files),
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSelectChange = (selected, name) => {
        console.log("Selected value:", selected);
    
        if (Array.isArray(selected)) {
            setFormData({
                ...formData,
                [name]: selected.map(option => option.value), 
            });
        } else {
            setFormData({
                ...formData,
                [name]: selected ? selected.value : "",
            });
        }
    };
    

    const amenitiesOptions = [
        { value: "Wifi", label: "Wifi" },
        { value: "Tv", label: "Tv" },
        { value: "Kitchen", label: "Kitchen" },
        { value: "Washing machine", label: "Washing machine" },
        { value: "Free Parking", label: "Free Parking" },
        { value: "Ac", label: "Ac" },
        { value: "Dedicated Workspace", label: "Dedicated Workspace" },
    ];

    const standoutAmenitiesOptions = [
        { value: "Pool", label: "Pool" },
        { value: "Hot tub", label: "Hot tub" },
        { value: "Patio", label: "Patio" },
        { value: "BBQ Grill", label: "BBQ Grill" },
        { value: "OutDoor Dining Area", label: "OutDoor Dining Area" },
        { value: "Firepit", label: "Firepit" },
        { value: "Piano", label: "Piano" },
    ];

    const safetyItemsOptions = [
        { value: "Smoke Alarm", label: "Smoke Alarm" },
        { value: "First Aid Kit", label: "First Aid Kit" },
        { value: "Fire Extinguisher", label: "Fire Extinguisher" },
        { value: "Carbon Monoxide Alarm", label: "Carbon Monoxide Alarm" },
    ];

    const placeFeaturesOptions = [
        { value: "Exterior security camera present", label: "Exterior security camera present" },
        { value: "Noise decibel monitor present", label: "Noise decibel monitor present" },
        { value: "Weapon(s) on the property", label: "Weapon(s) on the property" },
    ];

    const handleDateChange = (dateRange) => {
        if (dateRange?.from && dateRange?.to) {
            setFormData({
                ...formData,
                startDate: dateRange.from,
                endDate: dateRange.to,
            });
        }
    };

    const handleDescriptionChange = (content) => {
        setFormData({
            ...formData,
            propertyDescription: content,
        });
    };

    const handleSliderImagesChange = (files, index) => {
        const updatedImages = [...formData.sliderImages];
        updatedImages[index] = { newFile: files[0] }; // Wrap in an object for clarity
        setFormData({
            ...formData,
            sliderImages: updatedImages,
        });
    }

    const addImageInput = () => {
        setFormData({
            ...formData,
            sliderImages: [...formData.sliderImages, { newFile: null }], // Placeholder object
        });
    };


    const removeImageInput = (index) => {
        const updatedImages = formData.sliderImages.filter((_, idx) => idx !== index);
        setFormData({
            ...formData,
            sliderImages: updatedImages,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = new FormData();
        const yourAuthToken = "test";

        Object.entries(formData).forEach(([key, value]) => {
            if (key === "sliderImages" && Array.isArray(value)) {
                value.forEach((image) => {
                    if (image.newFile) {
                        // Append new images
                        payload.append("slider_images", image.newFile);
                    } else if (typeof image === "string") {
                        // Append existing image URLs
                        payload.append("existing_slider_images", image);
                    }
                });
            } else {
                payload.append(key, value);
            }
        });


        try {
            const response = await fetch(`http://localhost:6969/api/property/update/${id}`, {
                method: "PUT",
                body: payload,
                headers: {
                    Authorization: `Bearer ${yourAuthToken}`,
                },
            });

            if (response.ok) {
                alert("Property updated successfully!");
            } else {
                const errorData = await response.json();
                console.error("Error updating property:", errorData);
            }
        } catch (error) {
            console.error("Request failed:", error);
        }
    };
    const handleGuestChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value,
        });
    };
    return (
        <>
            <div className="bg-black text-white px-2 py-4">
                <h1 className="text-center font-semibold text-lg">Add Property</h1>
            </div>
            {isClient && (
                <div className="px-2 py-4">
                    <form className="form-container" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="category">Which of these best describes your place?</label>
                            <Select
                                id="category"
                                name="category"
                                value={formData.category ? { value: formData.category, label: formData.category } : null} // Conditional check to handle empty string
                                onChange={(selected) => handleSelectChange(selected, "category")}
                                options={[
                                    { value: "House", label: "House" },
                                    { value: "Flat/Apartment", label: "Flat/Apartment" },
                                    { value: "Barn", label: "Barn" },
                                    { value: "Castle", label: "Castle" },
                                    { value: "Dome", label: "Dome" },
                                    { value: "Guest House", label: "Guest House" },
                                    { value: "Hotel", label: "Hotel" },
                                ]}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">What type of place will guests have?</label>

                            <Select
                                id="placeType"
                                name="category"
                                value={formData.placeType ? { value: formData.placeType, label: formData.placeType } : null} 
                                onChange={(selected) => handleSelectChange(selected, "placeType")}
                                options={[
                                    { value: "An Entire Place", label: "An Entire Place" },
                                    { value: "A Room", label: "A Room" },
                                    { value: "A Shared Room In hostel", label: "A Shared Room In hostel" },
                                  
                                ]}
                            />
                         
                        </div>

                        <div className="form-group">
                            <label htmlFor="guests">No. of Guests</label>
                            <GuestSelector
                               
                                value={formData.guests}
                                onChange={(value) => handleGuestChange("guests", value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="bedrooms">No. of Bedrooms</label>
                            <GuestSelector
                                
                                value={formData.bedrooms}
                                onChange={(value) => handleGuestChange("bedrooms", value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="beds">No. of Beds</label>
                            <GuestSelector
                               
                                value={formData.beds}
                                onChange={(value) => handleGuestChange("beds", value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="bathrooms">No. of Bathrooms</label>
                            <GuestSelector
                               
                                value={formData.bathrooms}
                                onChange={(value) => handleGuestChange("bathrooms", value)}
                            />
                        </div>


                        <div className="form-group">
                            <label htmlFor="category">What about these guest favourites?</label>
                            {formData.amenities && formData.amenities.length > 0 && (

                            <Select
                                isMulti
                                options={amenitiesOptions}
                                value={formData.amenities.map(value => ({ value, label: value }))}
                                onChange={(selected) => handleSelectChange(selected, "amenities")}
                            />
                        )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="category">Do you have any standout amenities?</label>
                            <Select
                                isMulti
                                options={standoutAmenitiesOptions}
                                value={formData.standoutAmenities.map(value => ({ value, label: value }))}
                                onChange={(selected) => handleSelectChange(selected, "standoutAmenities")}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="category">Do you have any of these safety items?</label>
                            <Select
                                isMulti
                                options={safetyItemsOptions}
                                value={formData.safetyItems.map(value => ({ value, label: value }))}
                                onChange={(selected) => handleSelectChange(selected, "safetyItems")}
                            />
                        </div>


                        <div className="form-group">
                            <label htmlFor="category">Does your place have any of these?</label>
                            <Select
                                isMulti
                                options={placeFeaturesOptions}
                                value={formData.placeFeatures.map(value => ({ value, label: value }))}
                                onChange={(selected) => handleSelectChange(selected, "placeFeatures")}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="propertyName">Property Name</label>
                            <input
                                type="text"
                                id="propertyName"
                                name="propertyName"
                                placeholder="Enter property name"
                                value={formData.propertyName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="propertyDescription">Property Description</label>
                            {isEditorLoaded && (
                                <JoditEditorComponent
                                    value={formData.propertyDescription}
                                    onChange={handleDescriptionChange}
                                />
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="perNightPrice">Per Night Price</label>
                            <input
                                type="number"
                                id="perNightPrice"
                                name="perNightPrice"
                                placeholder="Enter price per night"
                                value={formData.perNightPrice}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="location">Location</label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                placeholder="Enter location"
                                value={formData.location}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mainImageFile">Main Image</label>
                            {formData.mainImageFile && (
                                <span className="text-gray-500 text-sm">
                                    {typeof formData.mainImageFile === "string"
                                        ? formData.mainImageFile.split("/").pop() // Extract filename if it's a string (URL)
                                        : formData.mainImageFile.name} {/* Show the file name if it's a File object */}
                                </span>
                            )}
                            <input
                                type="file"
                                id="mainImageFile"
                                name="mainImageFile"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="sliderImages">Slider Images</label>
                            {formData.sliderImages.map((image, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <div className="flex flex-col">
                                        {typeof image === "string" ? (
                                            // Display filename if the image is a URL or string
                                            <span className="text-gray-500 text-sm">
                                                {image.split("/").pop()} {/* Extract the filename */}
                                            </span>
                                        ) : (
                                            image && (
                                                // Display file name if it's a File object
                                                <span className="text-gray-500 text-sm">{image.name}</span>
                                            )
                                        )}
                                        <input
                                            type="file"
                                            name="sliderImages"
                                            onChange={(e) => handleSliderImagesChange(e.target.files, index)}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeImageInput(index)}
                                        className="btn btn-danger"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button type="button" onClick={addImageInput} className="btn btn-primary mt-2">
                                Add More Images
                            </button>
                        </div>

                        <div className="form-group">
                            <label htmlFor="availableDate">Available Date</label>
                            <DatePickerWithRange onChange={handleDateChange} />
                        </div>
                        <button type="submit" className="submit-btn">
                            Submit
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default Property;
