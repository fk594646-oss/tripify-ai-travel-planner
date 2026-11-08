import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Users, Star, Calendar, ArrowRight, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

const TripsSection = () => {
    const [selectedCity, setSelectedCity] = useState('All Cities');
    const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [isVisible, setIsVisible] = useState(false);
    const tripsPerPage = 6;

    // Typewriter Animation State
    const phrases = ["Explore Pakistan Tours", "Discover Adventure", "Journey Awaits"];
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    // Typewriter Effect
    useEffect(() => {
        const currentPhrase = phrases[currentPhraseIndex];
        const typingSpeed = isDeleting ? 50 : 100;
        const pauseTime = 2000;

        const timer = setTimeout(() => {
            if (!isDeleting) {
                if (currentText.length < currentPhrase.length) {
                    setCurrentText(currentPhrase.substring(0, currentText.length + 1));
                } else {
                    setTimeout(() => setIsDeleting(true), pauseTime);
                }
            } else {
                if (currentText.length > 0) {
                    setCurrentText(currentText.substring(0, currentText.length - 1));
                } else {
                    setIsDeleting(false);
                    setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
                }
            }
        }, typingSpeed);

        return () => clearTimeout(timer);
    }, [currentText, isDeleting, currentPhraseIndex]);

    const cities = [
        'All Cities',
        'Islamabad',
        'Lahore',
        'Karachi',
        'Gilgit',
        'Skardu'
    ];

    const allTrips = [
        {
            id: 1,
            title: "Northern Areas Adventure",
            city: "Islamabad",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80",
            destinations: ["Hunza Valley", "Skardu", "Naran"],
            duration: "7 Days / 6 Nights",
            groupSize: "8-12 People",
            price: 85000,
            rating: 4.9,
            reviews: 156,
            departure: "Every Saturday"
        },
        {
            id: 2,
            title: "Swat Valley Paradise",
            city: "Islamabad",
            image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop&q=80",
            destinations: ["Kalam", "Mahodand Lake", "Malam Jabba"],
            duration: "4 Days / 3 Nights",
            groupSize: "6-10 People",
            price: 45000,
            rating: 4.7,
            reviews: 128,
            departure: "Every Thursday"
        },
        {
            id: 3,
            title: "Murree Hills Retreat",
            city: "Islamabad",
            image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=600&fit=crop&q=80",
            destinations: ["Murree", "Nathia Gali", "Patriata"],
            duration: "3 Days / 2 Nights",
            groupSize: "10-15 People",
            price: 32000,
            rating: 4.6,
            reviews: 215,
            departure: "Daily"
        },
        {
            id: 4,
            title: "Kashmir Valley Explorer",
            city: "Islamabad",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80",
            destinations: ["Neelum Valley", "Sharda", "Arang Kel"],
            duration: "5 Days / 4 Nights",
            groupSize: "8-10 People",
            price: 55000,
            rating: 4.8,
            reviews: 187,
            departure: "Every Friday"
        },
        {
            id: 5,
            title: "Lahore Heritage Walk",
            city: "Lahore",
            image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&h=600&fit=crop&q=80",
            destinations: ["Badshahi Mosque", "Lahore Fort", "Food Street"],
            duration: "2 Days / 1 Night",
            groupSize: "15-20 People",
            price: 25000,
            rating: 4.6,
            reviews: 312,
            departure: "Every Weekend"
        },
        {
            id: 6,
            title: "Cultural Lahore Experience",
            city: "Lahore",
            image: "https://images.unsplash.com/photo-1580837119756-563d608dd119?w=800&h=600&fit=crop&q=80",
            destinations: ["Shalimar Gardens", "Wazir Khan Mosque", "Anarkali"],
            duration: "2 Days / 1 Night",
            groupSize: "12-18 People",
            price: 22000,
            rating: 4.7,
            reviews: 268,
            departure: "Every Weekend"
        },
        {
            id: 7,
            title: "Lahore Food & History Tour",
            city: "Lahore",
            image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop&q=80",
            destinations: ["Gawalmandi", "Minar-e-Pakistan", "Lahore Museum"],
            duration: "1 Day",
            groupSize: "10-15 People",
            price: 15000,
            rating: 4.8,
            reviews: 342,
            departure: "Daily"
        },
        {
            id: 8,
            title: "Karachi Coastal Experience",
            city: "Karachi",
            image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop&q=80",
            destinations: ["Clifton Beach", "Mohatta Palace", "Port Grand"],
            duration: "2 Days / 1 Night",
            groupSize: "12-18 People",
            price: 22000,
            rating: 4.5,
            reviews: 198,
            departure: "Every Weekend"
        },
        {
            id: 9,
            title: "Karachi City Highlights",
            city: "Karachi",
            image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop&q=80",
            destinations: ["Quaid Mazar", "Frere Hall", "Empress Market"],
            duration: "1 Day",
            groupSize: "15-20 People",
            price: 18000,
            rating: 4.6,
            reviews: 175,
            departure: "Daily"
        },
        {
            id: 10,
            title: "Karachi Beach & Islands",
            city: "Karachi",
            image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=600&fit=crop&q=80",
            destinations: ["Manora Island", "Hawke's Bay", "Sandspit Beach"],
            duration: "2 Days / 1 Night",
            groupSize: "10-14 People",
            price: 28000,
            rating: 4.7,
            reviews: 223,
            departure: "Every Weekend"
        },
        {
            id: 11,
            title: "Karakoram Highway Tour",
            city: "Gilgit",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80",
            destinations: ["Khunjerab Pass", "Attabad Lake", "Passu"],
            duration: "5 Days / 4 Nights",
            groupSize: "10-15 People",
            price: 65000,
            rating: 4.8,
            reviews: 203,
            departure: "Every Friday"
        },
        {
            id: 12,
            title: "Gilgit Heritage Tour",
            city: "Gilgit",
            image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop&q=80",
            destinations: ["Kargah Buddha", "Naltar Valley", "Bagrot Valley"],
            duration: "4 Days / 3 Nights",
            groupSize: "10-14 People",
            price: 52000,
            rating: 4.7,
            reviews: 143,
            departure: "Every Wednesday"
        },
        {
            id: 13,
            title: "Hunza Cherry Blossom Tour",
            city: "Gilgit",
            image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop&q=80",
            destinations: ["Karimabad", "Altit Fort", "Eagle's Nest"],
            duration: "3 Days / 2 Nights",
            groupSize: "10-15 People",
            price: 35000,
            rating: 4.8,
            reviews: 234,
            departure: "Daily"
        },
        {
            id: 14,
            title: "Gilgit Valley Experience",
            city: "Gilgit",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80",
            destinations: ["Ghizer Valley", "Phander Lake", "Shandur Pass"],
            duration: "6 Days / 5 Nights",
            groupSize: "8-12 People",
            price: 72000,
            rating: 4.9,
            reviews: 165,
            departure: "Every Saturday"
        },
        {
            id: 15,
            title: "Skardu Lakes Safari",
            city: "Skardu",
            image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop&q=80",
            destinations: ["Shangrila Lake", "Satpara Lake", "Shigar Fort"],
            duration: "5 Days / 4 Nights",
            groupSize: "8-12 People",
            price: 68000,
            rating: 4.9,
            reviews: 167,
            departure: "Every Monday"
        },
        {
            id: 16,
            title: "Fairy Meadows Expedition",
            city: "Skardu",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80",
            destinations: ["Fairy Meadows", "Nanga Parbat Base", "Raikot Bridge"],
            duration: "6 Days / 5 Nights",
            groupSize: "8-12 People",
            price: 75000,
            rating: 4.9,
            reviews: 187,
            departure: "Every Sunday"
        },
        {
            id: 17,
            title: "Deosai Plains Adventure",
            city: "Skardu",
            image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=600&fit=crop&q=80",
            destinations: ["Deosai National Park", "Sheosar Lake", "Bara Pani"],
            duration: "4 Days / 3 Nights",
            groupSize: "6-10 People",
            price: 58000,
            rating: 4.8,
            reviews: 198,
            departure: "Every Thursday"
        }
    ];

    const filteredTrips = selectedCity === 'All Cities' 
        ? allTrips 
        : allTrips.filter(trip => trip.city === selectedCity);

    const totalPages = Math.ceil(filteredTrips.length / tripsPerPage);
    const indexOfLastTrip = currentPage * tripsPerPage;
    const indexOfFirstTrip = indexOfLastTrip - tripsPerPage;
    const currentTrips = filteredTrips.slice(indexOfFirstTrip, indexOfLastTrip);

    const handleCitySelect = (city) => {
        setSelectedCity(city);
        setIsCityDropdownOpen(false);
        setCurrentPage(1);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="relative min-h-screen">
            {/* Hero Section with Background */}
            <div className="relative min-h-[600px] flex items-center justify-center overflow-hidden mb-12">
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=2070')`,
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-gray-900/80 to-emerald-900/75"></div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-20 right-20 animate-pulse">
                    <div className="w-24 h-24 bg-emerald-500/20 rounded-full blur-xl"></div>
                </div>
                <div className="absolute bottom-32 left-20 animate-bounce">
                    <div className="w-20 h-20 bg-teal-500/20 rounded-full blur-xl"></div>
                </div>

                <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    {/* Typewriter Heading */}
                    <div 
                        className={`mb-8 transition-all duration-1000 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
                        }`}
                    >
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                                {currentText}
                                <span className="animate-pulse">|</span>
                            </span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Discover breathtaking destinations with our carefully curated tour packages
                        </p>
                    </div>

                    {/* Filter Card */}
                    <div 
                        className={`max-w-md mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl transition-all duration-1000 delay-300 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                    >
                        <label className="block text-white text-sm font-medium mb-3 flex items-center space-x-2">
                            <Filter className="w-5 h-5 text-emerald-400" />
                            <span>Filter by City</span>
                        </label>
                        <div className="relative">
                            <button
                                onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                                className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-3 text-left text-white font-medium hover:bg-white/20 hover:border-emerald-400/50 transition-all duration-200 flex items-center justify-between"
                            >
                                <span>{selectedCity}</span>
                                <svg 
                                    className={`w-5 h-5 text-emerald-400 transition-transform duration-200 ${isCityDropdownOpen ? 'rotate-180' : ''}`} 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {isCityDropdownOpen && (
                                <div className="absolute top-full mt-2 w-full bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl border border-emerald-200 overflow-hidden z-50 max-h-60 overflow-y-auto">
                                    {cities.map((city, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleCitySelect(city)}
                                            className={`w-full px-4 py-3 text-left hover:bg-emerald-50 transition-colors duration-150 font-medium ${
                                                selectedCity === city ? 'bg-emerald-100 text-emerald-700' : 'text-gray-700'
                                            }`}
                                        >
                                            {city}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Trips Grid Section */}
            <section className="py-10 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <div className="text-center mb-10">
                        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
                            Available Tours
                        </h2>
                        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                            Explore handpicked tours across Pakistan — safe, comfortable, and unforgettable
                        </p>
                        <p className="text-gray-500 text-sm mt-4">
                            Showing <span className="font-bold text-emerald-600">{indexOfFirstTrip + 1}</span> to{' '}
                            <span className="font-bold text-emerald-600">{Math.min(indexOfLastTrip, filteredTrips.length)}</span> of{' '}
                            <span className="font-bold text-emerald-600">{filteredTrips.length}</span> tour{filteredTrips.length !== 1 ? 's' : ''}
                        </p>
                    </div>

                    {/* Trips Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {currentTrips.map((trip, index) => (
                            <div 
                                key={trip.id} 
                                className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300 border border-gray-200/50 hover:border-emerald-300"
                            >
                                <div className="relative h-56 overflow-hidden">
                                    <img 
                                        src={trip.image} 
                                        alt={trip.title} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/90 group-hover:via-black/60 group-hover:to-black/30 transition-all duration-300"></div>
                                    
                                    {/* City Badge */}
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center space-x-1.5 shadow-lg transform group-hover:scale-110 transition-transform duration-200">
                                        <MapPin className="w-4 h-4 text-emerald-600" />
                                        <span className="text-sm font-semibold text-gray-700">{trip.city}</span>
                                    </div>
                                    
                                    {/* Rating Badge */}
                                    <div className="absolute top-4 right-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full px-3 py-1.5 flex items-center space-x-1 shadow-lg transform group-hover:scale-110 transition-transform duration-200">
                                        <Star className="w-4 h-4 text-white fill-white" />
                                        <span className="text-sm font-bold text-white">{trip.rating}</span>
                                    </div>
                                    
                                    {/* Title Overlay */}
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h3 className="text-xl font-bold text-white drop-shadow-lg">{trip.title}</h3>
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="p-6">
                                    {/* Destinations */}
                                    <div className="mb-4">
                                        <p className="text-sm text-gray-500 mb-2 font-medium">Tour Destinations:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {trip.destinations.map((dest, idx) => (
                                                <span 
                                                    key={idx} 
                                                    className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-medium border border-emerald-200 hover:bg-emerald-100 transition-colors duration-200"
                                                >
                                                    {dest}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Trip Details Grid */}
                                    <div className="grid grid-cols-2 gap-3 mb-4">
                                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                                            <Clock className="w-4 h-4 text-emerald-600" />
                                            <span className="text-xs">{trip.duration}</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                                            <Users className="w-4 h-4 text-emerald-600" />
                                            <span className="text-xs">{trip.groupSize}</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                                            <Calendar className="w-4 h-4 text-emerald-600" />
                                            <span className="text-xs">{trip.departure}</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                            <span className="text-xs">{trip.reviews} reviews</span>
                                        </div>
                                    </div>

                                    {/* Price & Book Button */}
                                    <div className="pt-4 border-t border-gray-200">
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <p className="text-xs text-gray-500">Starting from</p>
                                                <p className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                                    PKR {trip.price.toLocaleString()}
                                                    <span className="text-sm text-gray-500 font-normal">/person</span>
                                                </p>
                                            </div>
                                        </div>
                                        <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full py-3 font-semibold hover:shadow-lg hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 group">
                                            <span>Book Now</span>
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {filteredTrips.length > tripsPerPage && (
                        <div className="flex justify-center items-center space-x-2">
                            <button 
                                onClick={handlePrevPage} 
                                disabled={currentPage === 1} 
                                className={`p-3 rounded-lg transition-all duration-200 ${
                                    currentPage === 1 
                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                                        : 'bg-white border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 shadow-md hover:shadow-lg'
                                }`}
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            
                            {[...Array(totalPages)].map((_, index) => (
                                <button 
                                    key={index} 
                                    onClick={() => handlePageChange(index + 1)} 
                                    className={`w-12 h-12 rounded-lg font-semibold transition-all duration-200 ${
                                        currentPage === index + 1 
                                            ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/50 scale-110' 
                                            : 'bg-white border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 shadow-md'
                                    }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            
                            <button 
                                onClick={handleNextPage} 
                                disabled={currentPage === totalPages} 
                                className={`p-3 rounded-lg transition-all duration-200 ${
                                    currentPage === totalPages 
                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                                        : 'bg-white border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 shadow-md hover:shadow-lg'
                                }`}
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default TripsSection;