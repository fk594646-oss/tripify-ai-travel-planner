import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';

const AboutSection = () => {
    const [currentImage1, setCurrentImage1] = useState(0);
    const [currentImage2, setCurrentImage2] = useState(0);

    // Images for first section (right side)
    const images1 = [
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021',
        'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073'
    ];

    // Images for second section (left side)
    const images2 = [
        'https://images.unsplash.com/photo-1530789253388-582c481c54b0?q=80&w=2070',
        'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070'
    ];

    // Auto change images every 3 seconds
    useEffect(() => {
        const interval1 = setInterval(() => {
            setCurrentImage1((prev) => (prev + 1) % images1.length);
        }, 3000);

        const interval2 = setInterval(() => {
            setCurrentImage2((prev) => (prev + 1) % images2.length);
        }, 3500); // Slightly different timing for variety

        return () => {
            clearInterval(interval1);
            clearInterval(interval2);
        };
    }, []);

    return (
        <div className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* First Section - Content Left, Image Right */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                    {/* Content */}
                    <div className="space-y-6">
                        <div className="inline-block">
                            <span className="bg-emerald-100 text-emerald-600 text-sm font-semibold px-4 py-2 rounded-full">
                                About Tripyfy
                            </span>
                        </div>
                        
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                            Your Journey Starts with{' '}
                            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                Smart Planning
                            </span>
                        </h2>
                        
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Tripyfy revolutionizes the way you travel by combining cutting-edge AI technology 
                            with personalized travel expertise. We understand that every traveler is unique, 
                            and so should be their journey.
                        </p>

                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3">
                                <div className="bg-emerald-100 rounded-full p-1 mt-1">
                                    <Check className="w-4 h-4 text-emerald-600" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">AI-Powered Recommendations</h4>
                                    <p className="text-gray-600">Get personalized suggestions based on your preferences</p>
                                </div>
                            </li>
                            <li className="flex items-start space-x-3">
                                <div className="bg-emerald-100 rounded-full p-1 mt-1">
                                    <Check className="w-4 h-4 text-emerald-600" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">Real-Time Support</h4>
                                    <p className="text-gray-600">24/7 assistance throughout your entire journey</p>
                                </div>
                            </li>
                            <li className="flex items-start space-x-3">
                                <div className="bg-emerald-100 rounded-full p-1 mt-1">
                                    <Check className="w-4 h-4 text-emerald-600" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">Seamless Booking</h4>
                                    <p className="text-gray-600">Book flights, hotels, and activities all in one place</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Animated Image */}
                    <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
                        {images1.map((img, index) => (
                            <div
                                key={index}
                                className={`absolute inset-0 transition-opacity duration-1000 ${
                                    currentImage1 === index ? 'opacity-100' : 'opacity-0'
                                }`}
                            >
                                <img
                                    src={img}
                                    alt={`Travel destination ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/30 to-transparent"></div>
                            </div>
                        ))}
                        
                        {/* Image Indicators */}
                        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                            {images1.map((_, index) => (
                                <div
                                    key={index}
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                        currentImage1 === index 
                                            ? 'w-8 bg-emerald-400' 
                                            : 'w-2 bg-white/50'
                                    }`}
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Second Section - Image Left, Content Right */}
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Animated Image */}
                    <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl order-2 md:order-1">
                        {images2.map((img, index) => (
                            <div
                                key={index}
                                className={`absolute inset-0 transition-opacity duration-1000 ${
                                    currentImage2 === index ? 'opacity-100' : 'opacity-0'
                                }`}
                            >
                                <img
                                    src={img}
                                    alt={`Travel experience ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/30 to-transparent"></div>
                            </div>
                        ))}
                        
                        {/* Image Indicators */}
                        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                            {images2.map((_, index) => (
                                <div
                                    key={index}
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                        currentImage2 === index 
                                            ? 'w-8 bg-teal-400' 
                                            : 'w-2 bg-white/50'
                                    }`}
                                ></div>
                            ))}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-6 order-1 md:order-2">
                        <div className="inline-block">
                            <span className="bg-teal-100 text-teal-600 text-sm font-semibold px-4 py-2 rounded-full">
                                Why Choose Us
                            </span>
                        </div>
                        
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                            Experience Travel{' '}
                            <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                                Like Never Before
                            </span>
                        </h2>
                        
                        <p className="text-lg text-gray-600 leading-relaxed">
                            We believe travel should be effortless and inspiring. With Tripyfy, you get more 
                            than just a booking platform—you get a travel companion that understands your needs 
                            and creates experiences that matter.
                        </p>

                        <div className="grid grid-cols-2 gap-6 mt-8">
                            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-2xl">
                                <div className="text-3xl font-bold text-emerald-600 mb-2">50K+</div>
                                <div className="text-gray-700 font-medium">Happy Travelers</div>
                            </div>
                            <div className="bg-gradient-to-br from-teal-50 to-emerald-50 p-6 rounded-2xl">
                                <div className="text-3xl font-bold text-teal-600 mb-2">200+</div>
                                <div className="text-gray-700 font-medium">Destinations</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AboutSection;