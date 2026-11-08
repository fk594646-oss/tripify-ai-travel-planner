import React, { useState, useEffect } from 'react';
import { Plane, ArrowRight, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleExplore = () => {
        const section = document.getElementById('destinations-section');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2035')`,
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-emerald-900/60"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">

                {/* Badge */}
                <div
                    className={`inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 rounded-full px-5 py-2 mb-8 transition-all duration-1000 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
                    }`}
                >
                    <Plane className="w-4 h-4 text-emerald-300" />
                    <span className="text-emerald-100 text-sm">AI-Powered Travel Planner</span>
                </div>

                {/* Heading */}
                <h1
                    className={`text-5xl md:text-7xl font-bold text-white mb-6 transition-all duration-1000 delay-200 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                >
                    Discover Your Next
                    <span className="block mt-2 bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                        Adventure Awaits
                    </span>
                </h1>

                {/* Description */}
                <p
                    className={`text-xl text-gray-200 mb-10 max-w-3xl mx-auto transition-all duration-1000 delay-400 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                >
                    Let AI craft your perfect journey with personalized itineraries
                    and unforgettable destinations.
                </p>

                {/* Buttons */}
                <div
                    className={`flex flex-col sm:flex-row justify-center gap-4 transition-all duration-1000 delay-600 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                >
                    <button
                        onClick={() => navigate('/travelplanner')}
                        className="cursor-pointer px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full font-semibold text-lg hover:scale-105 transition flex items-center gap-2"
                    >
                        Plan Your Trip
                        <ArrowRight className="w-5 h-5" />
                    </button>

                    <button
                        onClick={handleExplore}
                        className=" cursor-pointer px-8 py-4 bg-white/10 border border-white/30 text-white rounded-full font-semibold text-lg hover:bg-white/20 transition flex items-center gap-2"
                    >
                        <MapPin className="w-5 h-5" />
                        Explore Destinations
                    </button>
                </div>

                {/* Stats (UPPER + GAP FIXED) */}
                <div
                    className={`mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-1000 delay-800 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                >
                    <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                        <div className="text-4xl font-bold text-emerald-400">50K+</div>
                        <div className="text-gray-300">Happy Travelers</div>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                        <div className="text-4xl font-bold text-emerald-400">200+</div>
                        <div className="text-gray-300">Destinations</div>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                        <div className="text-4xl font-bold text-emerald-400">4.9★</div>
                        <div className="text-gray-300">Average Rating</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
