"use client";
import React, { useState, useEffect } from "react";
import { DatePickerWithRange } from "@/app/Component/Daterange";
import JoditEditorComponent from "@/app/Component/admin/editor";
import ImageUpload from "@/app/Component/admin/multipleimage";
import GuestSelector from "@/app/Component/guest";
import Select from "react-select";

const Property = () => {
    const [isEditorLoaded, setEditorLoaded] = useState(false);
    const [isClient, setIsClient] = useState(false)

    const [formData, setFormData] = useState({
        category: "",
        placeType: "",
        propertyName: "",
        propertyDescription: "",
        perNightPrice: "",
        location: "",
        mainImageFile: null,
        sliderImages: [],
        startDate: "",
        endDate: "",
        guests: 1,
        bedrooms: 1,
        beds: 1,
        bathrooms: 1,
        amenities: [],
        safetyItems: [],
        standoutAmenities: [],
        placeFeatures: [],
    });

    useEffect(() => {
        setIsClient(true)
    }, [])

    useEffect(() => {
        setEditorLoaded(true);
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, files, multiple } = e.target;

        if (multiple) {
            // For multiple select options
            const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
            setFormData({
                ...formData,
                [name]: selectedOptions,
            });
        } else if (type === "file") {
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

    const handleDateChange = (dateRange) => {
        // Check if dateRange is valid and contains 'from' and 'to'
        if (dateRange?.from && dateRange?.to) {
            setFormData({
                ...formData,
                startDate: dateRange.from,
                endDate: dateRange.to,
            });
        }
    };



    const handleDescriptionChange = (content) => {
        console.log("Updated Description:", content); // Debug
        setFormData({
            ...formData,
            propertyDescription: content,
        });
    };

    const handleSliderImagesChange = (files) => {
        setFormData({
            ...formData,
            sliderImages: files,  // Update the slider images
        });
    };

    const handleGuestChange = (value) => {
        setFormData((prev) => ({ ...prev, guests: value }));
    };

    const handleBedroomChange = (value) => {
        setFormData((prev) => ({ ...prev, bedrooms: value }));
    };

    const handleBedChange = (value) => {
        setFormData((prev) => ({ ...prev, beds: value }));
    };

    const handleBathroomChange = (value) => {
        setFormData((prev) => ({ ...prev, bathrooms: value }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = new FormData();
        const yourAuthToken = "test";

        Object.entries(formData).forEach(([key, value]) => {
            if (key === "sliderImages" && Array.isArray(value)) {
                value.forEach((file, index) => {
                    payload.append("slider_images", file);
                });
            } else {
                payload.append(key, value);
            }
        });

        // Debugging: Check FormData contents
        for (let pair of payload.entries()) {
            console.log(pair[0], pair[1]);
        }

        try {
            const response = await fetch("http://localhost:6969/api/property", {
                method: "POST",
                body: payload,
                headers: {
                    Authorization: `Bearer ${yourAuthToken}`,

                },
            });

            if (response.ok) {
                const result = await response.json();
                alert("Property added successfully!");
            } else {
                const errorData = await response.json();
                console.error("Error adding property:", errorData);
            }
        } catch (error) {
            console.error("Request failed:", error);
        }
    };
    const categoryOptions = [
        { value: "House", label: "House" },
        { value: "Flat/Apartment", label: "Flat/Apartment" },
        { value: "Barn", label: "Barn" },
        { value: "Castle", label: "Castle" },
        { value: "Dome", label: "Dome" },
        { value: "Guest House", label: "Guest House" },
        { value: "Hotel", label: "Hotel" },
    ];

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
        { value: "Carbon Monoxide alarm", label: "Carbon Monoxide alarm" },
    ];

    const placeFeaturesOptions = [
        { value: "Exterior security camera present", label: "Exterior security camera present" },
        { value: "Noise decibel monitor present", label: "Noise decibel monitor present" },
        { value: "Weapon(s) on the property", label: "Weapon(s) on the property" },
    ];

    const [currentStep, setCurrentStep] = useState(1);

    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const handlePreviousStep = () => {
        setCurrentStep(currentStep - 1);
    };

    return (
        <>
            <div className="bg-[#dc3545] text-white px-2 py-4">
                <h1 className="text-center font-semibold text-lg">Add Property</h1>
            </div>
            {isClient && (
                <div className="px-2 py-4">
                    <form onSubmit={handleSubmit}>
                        {currentStep === 1 && (
                            <div className="form-container">
                                <div className="form-group">
                                    <label htmlFor="category">Which of these best describes your place?</label>
                                    <Select
                                        id="category"
                                        name="category"
                                        options={categoryOptions}
                                        value={categoryOptions.find(option => option.value === formData.category)}
                                        onChange={(option) => setFormData({ ...formData, category: option.value })}
                                        isClearable
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="category">What type of place will guests have?</label>
                                    <Select
                                        id="placeType"
                                        name="placeType"
                                        options={[
                                            { value: "An Entire Place", label: "An Entire Place" },
                                            { value: "A Room", label: "A Room" },
                                            { value: "A Shared Room In hostel", label: "A Shared Room In hostel" },
                                        ]}
                                        value={formData.placeType ? { value: formData.placeType, label: formData.placeType } : null}
                                        onChange={(option) => setFormData({ ...formData, placeType: option.value })}
                                        isClearable
                                        required
                                    />

                                </div>

                                <div className="form-group">
                                    <label htmlFor="category">What about these guest favourites?</label>
                                    <Select
                                        id="amenities"
                                        name="amenities"
                                        options={amenitiesOptions}
                                        value={formData.amenities.map((item) => ({ value: item, label: item }))}
                                        onChange={(options) => setFormData({ ...formData, amenities: options.map(option => option.value) })}
                                        isMulti
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category">Do you have any standout amenities?</label>
                                    <Select
                                        id="standoutAmenities"
                                        name="standoutAmenities"
                                        options={standoutAmenitiesOptions}
                                        value={formData.standoutAmenities.map((item) => ({ value: item, label: item }))}
                                        onChange={(options) => setFormData({ ...formData, standoutAmenities: options.map(option => option.value) })}
                                        isMulti
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category">Do you have any of these safety items?</label>
                                    <Select
                                        id="safetyItems"
                                        name="safetyItems"
                                        options={safetyItemsOptions}
                                        value={formData.safetyItems.map((item) => ({ value: item, label: item }))}
                                        onChange={(options) => setFormData({ ...formData, safetyItems: options.map(option => option.value) })}
                                        isMulti
                                        required
                                    />
                                </div>


                                <div className="form-group">
                                    <label htmlFor="category">Does your place have any of these?</label>
                                    <Select
                                        id="placeFeatures"
                                        name="placeFeatures"
                                        options={placeFeaturesOptions}
                                        value={formData.placeFeatures.map((item) => ({ value: item, label: item }))}
                                        onChange={(options) => setFormData({ ...formData, placeFeatures: options.map(option => option.value) })}
                                        isMulti
                                        required
                                    />
                                </div>
                                <button type="button" className="btn btn-success" onClick={handleNextStep}>Next</button>
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="form-container">
                                <div className="form-group">
                                    <label htmlFor="category">No. Of guests</label>
                                    <GuestSelector
                                        value={formData.guests} // Controlled value
                                        onChange={handleGuestChange} // Handle change
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category">No. Of Bedroom</label>
                                    <GuestSelector
                                        value={formData.bedrooms} // Controlled value
                                        onChange={handleBedroomChange} // Handle change
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category">No. Of Beds</label>
                                    <GuestSelector
                                        value={formData.beds} // Controlled value
                                        onChange={handleBedChange} // Handle change
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category">No. Of Bathroom</label>
                                    <GuestSelector
                                        value={formData.bathrooms} // Controlled value
                                        onChange={handleBathroomChange} // Handle change
                                    />

                                </div>
                                <button type="button" className="btn btn-danger" onClick={handlePreviousStep}>Previous</button>
                                <button type="button" className="btn btn-success mt-2" onClick={handleNextStep}>Next</button>
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div className="form-container">
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
                                            onChange={(content) => handleDescriptionChange(content)}

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
                                <button type="button" className="btn btn-danger" onClick={handlePreviousStep}>Previous</button>
                                <button type="button" className="btn btn-success mt-2" onClick={handleNextStep}>Next</button>
                            </div>
                        )}

                        {currentStep === 4 && (
                            <div className="form-container">
                                <div className="form-group">
                                    <label htmlFor="mainImageFile">Main Image</label>
                                    <input
                                        type="file"
                                        id="mainImageFile"
                                        name="mainImageFile"
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="sliderImages">Slider Images</label>
                                    <ImageUpload
                                        onChange={handleSliderImagesChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="availableDate">Available Date</label>
                                    <DatePickerWithRange onChange={handleDateChange} />
                                </div>
                                <button type="button" className="btn btn-danger" onClick={handlePreviousStep}>Previous</button>

                                <button type="submit" className="submit-btn mt-2">
                                    Submit
                                </button>
                            </div>



                        )}
                    </form>
                </div>
            )}
        </>
    );
};

export default Property;
