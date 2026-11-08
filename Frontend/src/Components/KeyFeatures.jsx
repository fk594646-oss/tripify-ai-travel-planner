import React from 'react';
import { Sparkles, Calendar, Headphones } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FeaturesSection = () => {
    const navigate = useNavigate();
    const features = [
        {
            id: 1,
            title: 'Personalization',
            icon: Sparkles,
            bgImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2035',
            details: 'Get AI-powered recommendations tailored to your unique travel style, preferences, and budget. Every itinerary is crafted just for you.',
        },
        {
            id: 2,
            title: 'Seamless Booking',
            icon: Calendar,
            bgImage: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074',
            details: 'Book flights, hotels, activities, and transportation all in one place. No more juggling multiple websites and apps.',
        },
        {
            id: 3,
            title: 'Real-Time Assistance',
            icon: Headphones,
            bgImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073',
            details: '24/7 AI-powered chat support ready to help you at any time. Get instant answers and solutions throughout your journey.',
        },
    ];

    return (
        <div className="bg-gradient-to-br from-gray-50 to-emerald-50 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-block mb-4">
                        <span className="bg-emerald-100 text-emerald-600 text-sm font-semibold px-4 py-2 rounded-full">
                            Key Features
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Everything You Need for the{' '}
                        <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                            Perfect Trip
                        </span>
                    </h2>
                    <p className="text-base text-gray-600 max-w-2xl mx-auto">
                        Discover how Tripyfy makes travel planning effortless with intelligent features designed for modern travelers
                    </p>
                </div>

                {/* Features Cards */}
                <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {features.map((feature) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={feature.id}
                                className="group relative h-80 rounded-3xl overflow-hidden shadow-xl cursor-pointer"
                            >
                                {/* Background Image with Overlay - Darkens on hover */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-110"
                                    style={{
                                        backgroundImage: `url('${feature.bgImage}')`,
                                    }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70 group-hover:from-black/70 group-hover:via-black/80 group-hover:to-black/90 transition-all duration-500"></div>
                                </div>

                                {/* Main Content (Center) - Hides on hover */}
                                <div className="relative h-full flex flex-col items-center justify-center text-center px-6 z-10 transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-[-20px]">
                                    <div className="bg-emerald-500/20 backdrop-blur-sm p-3 rounded-2xl mb-3 border border-emerald-400/30">
                                        <Icon className="w-10 h-10 text-emerald-300" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">
                                        {feature.title}
                                    </h3>
                                </div>

                                {/* Hover Details Card (Slides up 80% from bottom) */}
                                <div className="absolute inset-x-0 bottom-0 h-[80%] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-20">
                                    <div className="h-full bg-gradient-to-br from-emerald-600 via-teal-700 to-green-800 rounded-t-3xl p-6 shadow-2xl flex flex-col justify-center">
                                        <div className="flex items-center space-x-3 mb-3">
                                            <div className="bg-white/25 backdrop-blur-sm p-2 rounded-xl">
                                                <Icon className="w-5 h-5 text-white" />
                                            </div>
                                            <h4 className="text-lg font-bold text-white">
                                                {feature.title}
                                            </h4>
                                        </div>
                                        <p className="text-white/95 text-sm leading-relaxed">
                                            {feature.details}
                                        </p>
                                    </div>
                                </div>

                                {/* Gradient Border Effect on Hover */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="absolute inset-0 rounded-3xl border-4 border-emerald-400/50"></div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-10">
                    <p className="text-gray-600 mb-4">Ready to experience smarter travel?</p>
                    <button 
                     onClick={() => navigate('/travelplanner')}
                    className=" cursor-pointer px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                        Get Started Free
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FeaturesSection;