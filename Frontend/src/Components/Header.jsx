import React, { useState, useEffect, useRef } from 'react';
import { Plane, User, Settings, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const menuRef = useRef(null);

    // Check if user is logged in
    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUsername = localStorage.getItem('username');
        const storedImage = localStorage.getItem('profileImage');
        
        setIsLoggedIn(!!token);
        if (storedUsername) {
            setUsername(storedUsername);
        }
        if (storedImage) {
            setProfileImage(storedImage);
        }
    }, [location]);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowProfileMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('profileImage');
        setIsLoggedIn(false);
        setUsername("");
        setProfileImage(null);
        setShowProfileMenu(false);
        navigate('/home');
    };

    // Get first letter of username
    const getInitial = () => {
        if (username && username.length > 0) {
            return username.charAt(0).toUpperCase();
        }
        return 'U';
    };

    // Active nav styling  
    const isActive = (path) =>
        location.pathname === path
            ? "text-emerald-700 font-semibold border-b-2 border-emerald-700 pb-1"
            : "text-gray-700 hover:text-emerald-600";

    return (
        <header className="backdrop-blur-md bg-white/40 shadow-sm sticky top-0 z-50 border-b border-white/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-2 rounded-lg shadow-md">
                            <Plane className="w-6 h-6 text-white transform -rotate-45" />
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                            Tripyfy
                        </span>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 flex justify-center">
                        <ul className="flex items-center space-x-8">
                            <li>
                                <Link to="/home" className={`${isActive("/home")} transition-all duration-200`}>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/hotels" className={`${isActive("/hotels")} transition-all duration-200`}>
                                    Hotels
                                </Link>
                            </li>
                            <li>
                                <Link to="/transport" className={`${isActive("/transport")} transition-all duration-200`}>
                                    Transport
                                </Link>
                            </li>
                            <li>
                                <Link to="/tour" className={`${isActive("/tour")} transition-all duration-200`}>
                                    Tour
                                </Link>
                            </li>
                            <li>
                                <Link to="/travelplanner" className={`${isActive("/travelplanner")} transition-all duration-200`}>
                                    Travel Planner
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className={`${isActive("/contact")} transition-all duration-200`}>
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* Auth Buttons or Profile */}
                    <div className="flex items-center space-x-3">
                        {!isLoggedIn ? (
                            <>
                                {/* Login Button */}
                                <Link
                                    to="/login"
                                    className="px-5 py-2 font-medium text-gray-700 hover:text-emerald-600 transition-all duration-200"
                                >
                                    Login
                                </Link>

                                {/* Signup Button */}
                                <Link
                                    to="/signup"
                                    className="px-6 py-2.5 rounded-full font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-600 
                                               hover:scale-105 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                                >
                                    <span className="relative z-10">Sign Up</span>
                                    <span className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
                                </Link>
                            </>
                        ) : (
                            /* Profile Icon with Username Initial or Image */
                            <div className="relative" ref={menuRef}>
                                <button
                                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                                    className="flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 
                                               hover:scale-110 hover:shadow-lg transition-all duration-300 ring-2 ring-white/50 overflow-hidden"
                                >
                                    {profileImage ? (
                                        <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-white text-lg font-bold tracking-wide">
                                            {getInitial()}
                                        </span>
                                    )}
                                </button>

                                {/* Dropdown Menu */}
                                {showProfileMenu && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl 
                                                    border border-white/30 overflow-hidden animate-fadeIn">
                                        <div className="px-4 py-3 border-b border-gray-200">
                                            <p className="text-sm font-semibold text-gray-800 truncate">{username || 'User'}</p>
                                            <p className="text-xs text-gray-500 mt-1">Manage your profile</p>
                                        </div>

                                        <div className="py-2">
                                            <Link
                                                to="/profile-settings"
                                                onClick={() => setShowProfileMenu(false)}
                                                className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 
                                                           hover:text-emerald-600 transition-colors duration-200"
                                            >
                                                <Settings className="w-4 h-4 mr-3" />
                                                Profile Settings
                                            </Link>

                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 
                                                           transition-colors duration-200"
                                            >
                                                <LogOut className="w-4 h-4 mr-3" />
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out;
                }
            `}</style>
        </header>
    );
};
export default Header