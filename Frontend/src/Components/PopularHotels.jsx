import React, { useState, useEffect } from 'react';
import { MapPin, Star, ArrowRight } from 'lucide-react';

const PopularHotels = ({ searchFilters }) => {
    const [displayedHotels, setDisplayedHotels] = useState([]);

    const allHotels = {
        'Hunza Valley': [
            {
                id: 1,
                name: "Hunza Serena Hotel",
                city: "Hunza Valley",
                image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/574998207.jpg?k=58232aa148a3c9e969b01ccb7a01d07b00f5d96e43b5ba713723cbdfe54f73ac&o=",
                description: "Hunza Serena Inn offers comfortable rooms with free WiFi, air-conditioning, and modern amenities",
                rating: 4.9,
                reviews: 478,
                price: 32000,
                bookmeUrl: "https://www.booking.com/hotel/pk/hunza-serena-inn.en-gb.html"
            },
            {
                id: 2,
                name: "Tourist Cottage Hunza",
                city: "Hunza Valley",
                image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/295975319.jpg?k=ac43a1b1d580b3ade113e6d12877b1584655ee43c4acf34a15ac45a813d192ee&o=",
                description: "Perched on a hilltop offering breathtaking valley views with traditional Hunza architecture.",
                rating: 4.8,
                reviews: 392,
                price: 28000,
                bookmeUrl: "https://www.booking.com/hotel/pk/tourist-cottage-hunza-hunza.en-gb.html"
            },
            {
                id: 3,
                name: "Dastan-E-Hunza",
                city: "Hunza Valley",
                image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/726925401.jpg?k=43056bcbb953e99c268b11725d56ef437ff6b260ee09d7f1078f82348061a9d7&o=",
                description: "Comfortable stay with modern amenities and stunning views of Ultar Sar peak.",
                rating: 4.7,
                reviews: 325,
                price: 24000,
                bookmeUrl: "https://www.booking.com/hotel/pk/dastan-e-hunza.en-gb.html"
            },
            {
                id: 4,
                name: "Hunza Elites hotel",
                city: "Hunza Valley",
                image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/660365451.jpg?k=a42917909d3bd00d8f91be6eeb7f4aaf2cdd617d51027cffd4703867d1bd971a&o=",
                description: "Family-run boutique hotel offering warm hospitality and traditional Hunza cuisine.",
                rating: 4.6,
                reviews: 268,
                price: 20776,
                bookmeUrl: "https://www.booking.com/hotel/pk/hunza-elites-by-orane.en-gb.html"
            }
        ],
        'Skardu': [
            {
                id: 5,
                name: "Arish Luxury Suites",
                city: "Skardu",
                image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/302756579.jpg?k=bc126b03d76e764d4f6c11599141880892bf5baa1cee822d05f2c5a520891c0a&o=",
                description: "Paradise on earth with lakeside cottages and mesmerizing natural beauty of Lower Kachura Lake.",
                rating: 4.9,
                reviews: 542,
                price: 35000,
                bookmeUrl: "https://www.booking.com/hotel/pk/arish-luxury-suites.en-gb.html"
            },
            {
                id: 6,
                name: "Signature Skardu Hotel",
                city: "Skardu",
                image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/701195247.jpg?k=cbfea0d48b9f207ad4b28ee8dd98d9af14b66bdd294c9278addde27c68911d2a&o=",
                description: "Premium luxury resort with modern facilities and stunning mountain vistas.",
                rating: 4.8,
                reviews: 456,
                price: 38000,
                bookmeUrl: "https://www.booking.com/hotel/pk/signature-skardu.en-gb.html"
            },
            {
                id: 7,
                name: "Pacific Guest House Skardu",
                city: "Skardu",
                image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/668742167.jpg?k=3bfca5efe87b443089a289fe065a5f0700e3873d92e555660ec1305709e2602e&o=",
                description: "Comfortable accommodations with easy access to Skardu's major attractions.",
                rating: 4.6,
                reviews: 312,
                price: 26000,
                bookmeUrl: "https://www.booking.com/hotel/pk/pacific-guest-house.en-gb.html"
            },
            {
                id: 8,
                name: "PC Legacy Skardu",
                city: "Skardu",
                image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/607398286.jpg?k=6a101267d0c97fdcd32161615d227fb3191fbec9493e783ec8b17fa911276595&o=",
                description: "Adventure hub for trekkers with cozy rooms and expedition support services.",
                rating: 4.7,
                reviews: 289,
                price: 22000,
                bookmeUrl: "https://www.booking.com/hotel/pk/pc-legacy-skardu.en-gb.html"
            }
        ],
        'Naran Kaghan': [
            {
                id: 9,
                name: "Grand Heritage Hotel",
                city: "Naran",
                image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/311547557.jpg?k=04aa73daf88fbd215759974bcbb77ba7e75b47d80f9f7b0e31793155cb5dc495&o=",
                description: "Riverside luxury resort surrounded by pine forests and mountain streams.",
                rating: 4.8,
                reviews: 418,
                price: 30000,
                bookmeUrl: "https://www.booking.com/hotel/pk/grand-heritage.en-gb.html"
            },
            {
                id: 10,
                name: "Arcadian Cottages Naran",
                city: "Naran",
                image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/697744012.jpg?k=724c554d2d59673a584299c21b4883a01105761f2093af0c2feb468a880617f7&o=",
                description: "Family-friendly hotel with modern amenities and stunning valley views.",
                rating: 4.6,
                reviews: 356,
                price: 25000,
                bookmeUrl: "https://www.booking.com/hotel/pk/arcadian-cottages-naran.en-gb.html"
            },
            {
                id: 11,
                name: "Centurion Hotel",
                city: "Naran",
                image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/253642440.jpg?k=022c283afef565d3678f5550c36e8e289c6bc614028197571cc311772a487301&o=",
                description: "Comfortable stay with traditional hospitality near Saif-ul-Malook Lake.",
                rating: 4.7,
                reviews: 298,
                price: 28000,
                bookmeUrl: "https://www.booking.com/hotel/pk/centurion.en-gb.html"
            },
            {
                id: 12,
                name: "The Abbott Crown Hotel",
                city: "Kaghan",
                image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/561940229.jpg?k=368eaa26176c2cb25116c89531442632ba9bcf5f1a96d46337698e17175a7645&o=",
                description: "Cozy riverside accommodation perfect for nature lovers and trekkers.",
                rating: 4.5,
                reviews: 234,
                price: 22000,
                bookmeUrl: "https://www.booking.com/hotel/pk/the-abbott-crown.en-gb.html"
            }
        ],
        'Swat Valley': [
            {
                id: 13,
                name: "Burj Al Swat Hotel",
                city: "Swat Valley",
                image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/480074065.jpg?k=7d3bd32a0b03953304ef91009423aa727b1f6bd4bc2aefd450cc119588a0a90f&o=",
                description: "Switzerland of Pakistan - luxurious stay amidst lush green valleys and rivers.",
                rating: 4.9,
                reviews: 512,
                price: 34000,
                bookmeUrl: "https://www.booking.com/hotel/pk/burj-al-swat-swat1.en-gb.html"
            },
            {
                id: 14,
                name: "Shelton Rezidor Swat",
                city: "Swat Valley",
                image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/352462873.jpg?k=0f97d218b8f89c1890fefe789d3ed81f50e7414b24b3b05eba0250a7fd2a7af1&o=",
                description: "Premium ski resort offering winter sports and summer retreats with modern facilities.",
                rating: 4.8,
                reviews: 445,
                price: 32000,
                bookmeUrl: "https://www.booking.com/hotel/pk/shelton-swat-swat.en-gb.html"
            }
        ],
        'Fairy Meadows': [
            {
                id: 17,
                name: "Fairy meadows BroadView Hotel",
                city: "Fairy Meadows",
                image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/667824530.jpg?k=382cc029ce4731e491965cf7cd36cb243993bbccdf744f42a1291d25e522c7a1&o=",
                description: "Rustic wooden cottages with direct views of Nanga Parbat, the Killer Mountain.",
                rating: 4.9,
                reviews: 387,
                price: 18000,
                bookmeUrl: "https://www.booking.com/hotel/pk/fairy-meadows-broadview.en-gb.html"
            }
        ],
        'Murree Hills': [
            {
                id: 19,
                name: "The Roomy Lodge",
                city: "Murree Hills",
                image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/366130298.jpg?k=60f14ad365388555fa422da03df477872143a4117263e673ba8b9860460ea947&o=",
                description: "Mountain retreat offering breathtaking valley views and cozy hill station ambiance.",
                rating: 4.8,
                reviews: 512,
                price: 28000,
                bookmeUrl: "https://www.booking.com/hotel/pk/the-roomy-lodge.en-gb.html"
            }
        ],
        'Chitral Valley': [
            {
                id: 24,
                name: "Hilal Gardens",
                city: "Chitral Valley",
                image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/739781296.jpg?k=5b9bfeef0ca123b450f0d6f20e14ca3199444b890833c613fea1bd172879ebef&o=",
                description: "Gateway to the Hindu Kush mountains with traditional Chitrali hospitality.",
                rating: 4.8,
                reviews: 324,
                price: 26000,
                bookmeUrl: "https://www.booking.com/hotel/pk/hilal-gardens.en-gb.html"
            }
        ]
    };

    const getRandomHotels = (count) => {
        const cities = Object.keys(allHotels);
        const selectedHotels = [];
        const usedCities = new Set();

        while (selectedHotels.length < count && usedCities.size < cities.length) {
            const randomCity = cities[Math.floor(Math.random() * cities.length)];
            
            if (!usedCities.has(randomCity)) {
                const cityHotels = allHotels[randomCity];
                const randomHotel = cityHotels[Math.floor(Math.random() * cityHotels.length)];
                selectedHotels.push(randomHotel);
                usedCities.add(randomCity);
            }
        }

        return selectedHotels;
    };

    const filterHotels = () => {
        if (!searchFilters || !searchFilters.destination) {
            return getRandomHotels(6);
        }

        const cityHotels = allHotels[searchFilters.destination] || [];
        const count = Math.floor(Math.random() * 3) + 3;
        return cityHotels.slice(0, count);
    };

    useEffect(() => {
        setDisplayedHotels(filterHotels());
    }, [searchFilters]);

    const handleBookNow = (bookmeUrl) => {
        window.open(bookmeUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
                        {searchFilters?.destination 
                            ? `Hotels in ${searchFilters.destination}` 
                            : 'Popular Hotels'}
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        {searchFilters?.destination
                            ? `Explore ${displayedHotels.length} handpicked hotels in ${searchFilters.destination}`
                            : "Discover our handpicked selection of premium hotels across Pakistan's most beautiful destinations"}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayedHotels.map((hotel) => (
                        <div
                            key={hotel.id}
                            className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-gray-100"
                        >
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={hotel.image}
                                    alt={hotel.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center space-x-1.5">
                                    <MapPin className="w-4 h-4 text-emerald-600" />
                                    <span className="text-sm font-semibold text-gray-700">{hotel.city}</span>
                                </div>

                                <div className="absolute top-4 right-4 bg-emerald-500 rounded-full px-3 py-1.5 flex items-center space-x-1">
                                    <Star className="w-4 h-4 text-white fill-white" />
                                    <span className="text-sm font-bold text-white">{hotel.rating}</span>
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">
                                    {hotel.name}
                                </h3>

                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                    {hotel.description}
                                </p>

                                <div className="flex items-center space-x-2 mb-4">
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, index) => (
                                            <Star
                                                key={index}
                                                className={`w-4 h-4 ${
                                                    index < Math.floor(hotel.rating)
                                                        ? 'text-yellow-400 fill-yellow-400'
                                                        : 'text-gray-300'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-500">
                                        ({hotel.reviews} reviews)
                                    </span>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <div>
                                        <p className="text-sm text-gray-500">Starting from</p>
                                        <p className="text-2xl font-bold text-emerald-600">
                                            PKR {hotel.price.toLocaleString()}
                                            <span className="text-sm text-gray-500 font-normal">/night</span>
                                        </p>
                                    </div>
                                </div>

                                <button 
                                    onClick={() => handleBookNow(hotel.bookmeUrl)}
                                    className="cursor-pointer w-full mt-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl py-3 font-semibold hover:shadow-lg hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
                                >
                                    <span>Book Now</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PopularHotels;