import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import CountryDropdown from "./countryDropdown";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

export default function LoginModal({ isOpen, onClose }) {

    const [formData, setFormData] = useState({
        email: "",
        phone: "",
        password: "",
    });
    const [message, setMessage] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSignup = async () => {
        try {
            const response = await axios.post("http://localhost:6969/auth/signup", formData, {
                withCredentials: true,
            });
            setMessage(response.data.message);
            onClose();
        } catch (error) {
            setMessage(error.response?.data?.error || "Something went wrong!");
        }
    };

    const googlelogin = async () => {
        try {
          const url = "http://localhost:6969/auth/google"; 
          window.location.href = url;
        } catch (error) {
          console.error('Error making the API call:', error);
        }
      };
    

    return (
        <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50"
            open={isOpen}
        >
            <div className="bg-white rounded-lg w-1/4">
                <div className="modal-header p-4 flex  items-center border-b">
                    <button className="text-black">
                        <span onClick={onClose}>
                            <IoMdClose />
                        </span>
                    </button>
                    <h4 className="text-base flex-grow text-center font-semibold">
                        Login or Signup
                    </h4>
                </div>
                <div className="modal-body px-6 pt-6">
                    <div className="d-flex flex-col text-center">
                        <form>
                            <div className="form-group mb-4">
                                <CountryDropdown />
                            </div>

                            <div className="form-group mb-4">
                                <input
                                    type="tel"
                                    name="phone"
                                    className="form-control border rounded-lg p-3 w-full"
                                    placeholder="Your Phone Number..."
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group mb-4">
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control border rounded-lg p-3 w-full"
                                    placeholder="Your email address..."
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group mb-4">
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control border rounded-lg p-3 w-full"
                                    placeholder="Your password..."
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <button
                                type="button"
                                onClick={handleSignup}
                                className="btn btn-info bg-blue-500 text-white w-full py-2 rounded-full"
                            >
                                Signup
                            </button>
                        </form>
                        {message && <p className="text-center text-red-500 mt-4">{message}</p>}

                    </div>
                </div>
                <div className="modal-footer flex justify-center  px-6">
                    <div className="orclass w-full">or</div>
                </div>
                <div className="flex justify-center flex-wrap py-2" >
                    {/* Google Button */}
                    <a href="#" className="w-full text-center" onClick={googlelogin}>
                        <div className="flex items-center w-72 h-12 mx-auto rounded border-2 transition bg-white hover:shadow-lg">
                            <div className="p-3">
                                <FcGoogle />

                            </div>
                            <p className="w-full text-center text-gray-600 font-medium font-roboto">Sign in with Google</p>
                        </div>
                    </a>

                    {/* Facebook Button */}
                    {/*<a href="#" className="w-full text-center mt-4">
                        <div className="flex items-center w-72 h-12 mx-auto rounded shadow-md transition hover:shadow-lg border-2 ">
                            <div className="p-3">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5">
                                    <path fill="#FFFFFF" d="M32 30a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h28a2 2 0 0 1 2 2v28z" />
                                    <path fill="#4267b2" d="M22 32V20h4l1-5h-5v-2c0-2 1.002-3 3-3h2V5h-4c-3.675 0-6 2.881-6 7v3h-4v5h4v12h5z" />
                                </svg>
                            </div>
                            <p className="w-full text-center text-gray-600 font-medium font-roboto">Sign in with Facebook</p>
                        </div>
                    </a>*/}
                </div>

            </div>
        </div>
    );
}
