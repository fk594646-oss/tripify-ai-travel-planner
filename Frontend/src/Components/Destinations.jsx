import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';

const DestinationsSection = () => {
    const destinations = [
        {
            id: 1,
            name: 'Hunza Valley',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940',
            layout: 'full'
        },
        {
            id: 2,
            name: 'Skardu',
            image: 'https://images.unsplash.com/photo-1695724426547-c695ce34c358?q=80&w=699&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            layout: 'half'
        },
        {
            id: 3,
            name: 'Naran Kaghan',
            image: 'https://images.unsplash.com/photo-1722599504918-a7e94343184a?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            layout: 'half'
        },
        {
            id: 4,
            name: 'Swat Valley',
            image: 'https://images.unsplash.com/photo-1680020009117-911d3d3b4927?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            layout: 'full'
        },
        {
            id: 5,
            name: 'Fairy Meadows',
            image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070',
            layout: 'third'
        },
        {
            id: 6,
            name: 'Murree Hills',
            image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?q=80&w=2070',
            layout: 'third'
        },
        {
            id: 7,
            name: 'Chitral Valley',
            image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021',
            layout: 'third'
        }
    ];

    const renderDestination = (destination) => {
        const layoutClass = {
            full: 'col-span-1 md:col-span-6',
            half: 'col-span-1 md:col-span-3',
            third: 'col-span-1 md:col-span-2'
        };

        return (
            <div id="destinations-section"
                key={destination.id}
                className={`${layoutClass[destination.layout]} group relative h-72 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500`}
            >
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-110"
                    style={{
                        backgroundImage: `url('${destination.image}')`,
                    }}
                >
                    {/* Overlay - gets darker on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/85 group-hover:via-black/50 transition-all duration-500"></div>
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                    <div className="transform translate-y-0 group-hover:-translate-y-2 transition-transform duration-500">
                        <div className="flex items-center space-x-2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <MapPin className="w-4 h-4 text-emerald-400" />
                            <span className="text-emerald-400 text-sm font-medium">Pakistan</span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                            {destination.name}
                        </h3>
                       
                    </div>
                </div>

                {/* Glowing Border on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 rounded-2xl ring-4 ring-emerald-500/50"></div>
                </div>

                {/* Shine Effect on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="inline-block mb-4">
                        <span className="bg-emerald-100 text-emerald-600 text-sm font-semibold px-4 py-2 rounded-full">
                            Popular Destinations
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Explore Pakistan's{' '}
                        <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                            Hidden Gems
                        </span>
                    </h2>
                    <p className="text-base text-gray-600 max-w-2xl mx-auto">
                        Discover breathtaking landscapes, majestic mountains, and serene valleys that make Pakistan a paradise for travelers
                    </p>
                </div>

                {/* Destinations Grid */}
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                    {destinations.map(destination => renderDestination(destination))}
                </div>

               
            </div>
        </div>
    );
};

export default DestinationsSection;