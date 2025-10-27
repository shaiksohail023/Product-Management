import React from "react";
import { useNavigate } from "react-router";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { toast } from "react-toastify";

export const navbar = () => {

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast.info("Logged out successfully!");
            navigate("/login");
        } catch (error) {
            toast.error("Logout failed. Please try again.");
            console.error(error);
        }
    };

    return (

        <nav className="bg-white border-b border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Left: Brand / Text */}
                    <div className="flex-shrink-0 text-xl font-bold text-gray-800 dark:text-white">
                        Product Management
                    </div>

                    {/* Right: Logout Button */}
                    <div className="flex-shrink-0">
                        <button
                            onClick={handleLogout}
                            className="text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>

    )
}

export default navbar