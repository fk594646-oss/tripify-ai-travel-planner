import React, { useState, useEffect } from 'react';
import { Car, Users, Fuel, Settings, Star, ArrowRight } from 'lucide-react';

const CarRental = ({ searchFilters }) => {
    const [displayedCars, setDisplayedCars] = useState([]);

    const allCars = {
        'Lahore': [
            {
                id: 1,
                name: "Toyota Fortuner",
                category: "SUV",
                image: "https://saftours.com/wp-content/uploads/2025/03/toyota-fortuner-rent-lahore.jpeg",
                description: "Reliable and comfortable sedan perfect for long journeys across Pakistan.",
                rating: 4.7,
                reviews: 423,
                seats: 5,
                transmission: "Manual",
                fuel: "Petrol",
                price: 8000,
                rentalUrl: "http://saftours.com/mg-hs-rent-lahore/"
            },
            {
                id: 2,
                name: "V8 Land Cruiser",
                category: "SUV",
                image: "https://saftours.com/wp-content/uploads/2021/12/landcruiser-v8-for-rent-in-lahore-1.webp",
                description: "Premium sedan with advanced features for comfortable mountain travel.",
                rating: 4.8,
                reviews: 389,
                seats: 5,
                transmission: "Automatic",
                fuel: "Petrol",
                price: 9500,
                rentalUrl: "https://www.pakwheels.com/rent-a-car/lahore"
            },
            {
                id: 3,
                name: "Toyota Yaris",
                category: "SUV",
                image: "https://saftours.com/wp-content/uploads/2025/01/toyota-yaris-rent-lahore.jpeg",
                description: "Powerful 4x4 SUV ideal for northern areas and rough terrain exploration.",
                rating: 4.9,
                reviews: 312,
                seats: 7,
                transmission: "Automatic",
                fuel: "Diesel",
                price: 15000,
                rentalUrl: "https://saftours.com/toyota-yaris-rent-lahore/"
            },
            {
                id: 4,
                name: "MG HS",
                category: "SUV",
                image: "https://saftours.com/wp-content/uploads/2024/07/mg-hs-rent-lahore-3-jpg-1.webp",
                description: "Economical and fuel-efficient car perfect for city travel and short trips.",
                rating: 4.4,
                reviews: 567,
                seats: 4,
                transmission: "Manual",
                fuel: "Petrol/CNG",
                price: 3500,
                rentalUrl: "https://saftours.com/mg-hs-rent-lahore/"
            }
        ],
        'Islamabad': [
            {
                id: 5,
                name: "Honda City",
                category: "Sedan",
                image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800",
                description: "Modern sedan with excellent fuel economy and comfortable interior.",
                rating: 4.6,
                reviews: 445,
                seats: 5,
                transmission: "Automatic",
                fuel: "Petrol",
                price: 7500,
                rentalUrl: "https://www.pakwheels.com/rent-a-car/islamabad"
            },
            {
                id: 6,
                name: "Toyota Prado",
                category: "Luxury SUV",
                image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800",
                description: "Luxury SUV with superior off-road capability for mountain adventures.",
                rating: 4.9,
                reviews: 278,
                seats: 7,
                transmission: "Automatic",
                fuel: "Diesel",
                price: 18000,
                rentalUrl: "https://www.pakwheels.com/rent-a-car/islamabad"
            },
            {
                id: 7,
                name: "Suzuki Cultus",
                category: "Hatchback",
                image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800",
                description: "Popular family hatchback with spacious interior and great mileage.",
                rating: 4.5,
                reviews: 523,
                seats: 5,
                transmission: "Manual",
                fuel: "Petrol/CNG",
                price: 4000,
                rentalUrl: "https://www.pakwheels.com/rent-a-car/islamabad"
            },
            {
                id: 8,
                name: "Honda BRV",
                category: "SUV",
                image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800",
                description: "Versatile 7-seater SUV perfect for family trips to northern areas.",
                rating: 4.7,
                reviews: 356,
                seats: 7,
                transmission: "Automatic",
                fuel: "Petrol",
                price: 10000,
                rentalUrl: "https://www.pakwheels.com/rent-a-car/islamabad"
            }
        ],
        'Karachi': [
            {
                id: 9,
                name: "Toyota Corolla XLi",
                category: "Sedan",
                image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800",
                description: "Reliable sedan perfect for business trips and family vacations.",
                rating: 4.6,
                reviews: 498,
                seats: 5,
                transmission: "Automatic",
                fuel: "Petrol",
                price: 7000,
                rentalUrl: "https://www.pakwheels.com/rent-a-car/karachi"
            },
            {
                id: 10,
                name: "Land Cruiser V8",
                category: "Luxury SUV",
                image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800",
                description: "Ultimate luxury SUV with unmatched power and comfort for any terrain.",
                rating: 4.9,
                reviews: 234,
                seats: 7,
                transmission: "Automatic",
                fuel: "Diesel",
                price: 20000,
                rentalUrl: "https://www.pakwheels.com/rent-a-car/karachi"
            },
            {
                id: 11,
                name: "Hyundai Tucson",
                category: "SUV",
                image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800",
                description: "Stylish crossover SUV with modern features and smooth drive.",
                rating: 4.7,
                reviews: 367,
                seats: 5,
                transmission: "Automatic",
                fuel: "Petrol",
                price: 11000,
                rentalUrl: "https://www.pakwheels.com/rent-a-car/karachi"
            },
            {
                id: 12,
                name: "Suzuki WagonR",
                category: "Hatchback",
                image: "https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=800",
                description: "Compact and economical car with surprising interior space.",
                rating: 4.4,
                reviews: 612,
                seats: 4,
                transmission: "Manual",
                fuel: "Petrol/CNG",
                price: 3000,
                rentalUrl: "https://www.pakwheels.com/rent-a-car/karachi"
            }
        ],
        'Peshawar': [
            {
                id: 13,
                name: "Toyota Hilux",
                category: "4x4 Pickup",
                image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800",
                description: "Rugged 4x4 pickup truck perfect for mountain terrain and rough roads.",
                rating: 4.8,
                reviews: 289,
                seats: 5,
                transmission: "Manual",
                fuel: "Diesel",
                price: 13000,
                rentalUrl: "https://www.pakwheels.com/rent-a-car/peshawar"
            },
            {
                id: 14,
                name: "Honda Civic Turbo",
                category: "Sedan",
                image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800",
                description: "Turbocharged performance sedan with excellent handling on highways.",
                rating: 4.7,
                reviews: 334,
                seats: 5,
                transmission: "Automatic",
                fuel: "Petrol",
                price: 10000,
                rentalUrl: "https://www.pakwheels.com/rent-a-car/peshawar"
            },
            {
                id: 15,
                name: "Mitsubishi Pajero",
                category: "SUV",
                image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800",
                description: "Powerful SUV with excellent off-road capabilities for mountain trips.",
                rating: 4.8,
                reviews: 267,
                seats: 7,
                transmission: "Automatic",
                fuel: "Diesel",
                price: 14000,
                rentalUrl: "https://www.pakwheels.com/rent-a-car/peshawar"
            },
            {
                id: 16,
                name: "Suzuki Swift",
                category: "Hatchback",
                image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800",
                description: "Sporty hatchback with agile handling and good fuel economy.",
                rating: 4.5,
                reviews: 478,
                seats: 5,
                transmission: "Automatic",
                fuel: "Petrol",
                price: 5500,
                rentalUrl: "https://www.pakwheels.com/rent-a-car/peshawar"
            }
        ],
        'Faisalabad': [
            {
                id: 17,
                name: "Toyota Yaris",
                category: "Sedan",
                image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800",
                description: "Compact sedan with great fuel efficiency and modern features.",
                rating: 4.6,
                reviews: 412,
                seats: 5,
                transmission: "Automatic",
                fuel: "Petrol",
                price: 6500,
                rentalUrl: "https://www.pakwheels.com/rent-a-car/faisalabad"
            },
            {
                id: 18,
                name: "Kia Sportage",
                category: "SUV",
                image: "https://images.unsplash.com/photo-1581540222194-0def2dda95b8?w=800",
                description: "Modern crossover SUV with advanced safety features and comfort.",
                rating: 4.8,
                reviews: 345,
                seats: 5,
                transmission: "Automatic",
                fuel: "Petrol",
                price: 12000,
                rentalUrl: "https://www.pakwheels.com/rent-a-car/faisalabad"
            },
            {
                id: 19,
                name: "Suzuki Alto VXR",
                category: "Hatchback",
                image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800",
                description: "Most economical option for budget-conscious travelers.",
                rating: 4.4,
                reviews: 589,
                seats: 4,
                transmission: "Manual",
                fuel: "Petrol/CNG",
                price: 3000,
                rentalUrl: "https://www.pakwheels.com/rent-a-car/faisalabad"
            },
            {
                id: 20,
                name: "Honda Vezel",
                category: "Crossover",
                image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800",
                description: "Stylish hybrid crossover with excellent fuel economy.",
                rating: 4.7,
                reviews: 298,
                seats: 5,
                transmission: "Automatic",
                fuel: "Hybrid",
                price: 11500,
                rentalUrl: "https://www.pakwheels.com/rent-a-car/faisalabad"
            }
        ]
    };

    const getRandomCars = (count) => {
        const locations = Object.keys(allCars);
        const selectedCars = [];
        const usedLocations = new Set();

        while (selectedCars.length < count && usedLocations.size < locations.length) {
            const randomLocation = locations[Math.floor(Math.random() * locations.length)];
            
            if (!usedLocations.has(randomLocation)) {
                const locationCars = allCars[randomLocation];
                const randomCar = locationCars[Math.floor(Math.random() * locationCars.length)];
                selectedCars.push(randomCar);
                usedLocations.add(randomLocation);
            }
        }

        return selectedCars;
    };

    const filterCars = () => {
        if (!searchFilters || !searchFilters.pickup) {
            return getRandomCars(6);
        }

        const pickupCars = allCars[searchFilters.pickup] || [];
        const count = Math.floor(Math.random() * 3) + 3;
        return pickupCars.slice(0, count);
    };

    useEffect(() => {
        setDisplayedCars(filterCars());
    }, [searchFilters]);

    return (
        <section id="cars-section" className="py-16 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
                        {searchFilters?.pickup 
                            ? `Available Cars in ${searchFilters.pickup}` 
                            : 'Premium Car Rentals'}
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        {searchFilters?.pickup
                            ? `Explore ${displayedCars.length} handpicked vehicles for your journey`
                            : "Choose from our fleet of well-maintained vehicles across Pakistan"}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayedCars.map((car) => (
                        <div
                            key={car.id}
                            className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-gray-100"
                        >
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={car.image}
                                    alt={car.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center space-x-1.5">
                                    <Car className="w-4 h-4 text-emerald-600" />
                                    <span className="text-sm font-semibold text-gray-700">{car.category}</span>
                                </div>

                                <div className="absolute top-4 right-4 bg-emerald-500 rounded-full px-3 py-1.5 flex items-center space-x-1">
                                    <Star className="w-4 h-4 text-white fill-white" />
                                    <span className="text-sm font-bold text-white">{car.rating}</span>
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">
                                    {car.name}
                                </h3>

                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                    {car.description}
                                </p>

                                <div className="grid grid-cols-3 gap-3 mb-4">
                                    <div className="flex flex-col items-center p-2 bg-emerald-50 rounded-lg">
                                        <Users className="w-5 h-5 text-emerald-600 mb-1" />
                                        <span className="text-xs text-gray-600 font-medium">{car.seats} Seats</span>
                                    </div>
                                    <div className="flex flex-col items-center p-2 bg-emerald-50 rounded-lg">
                                        <Settings className="w-5 h-5 text-emerald-600 mb-1" />
                                        <span className="text-xs text-gray-600 font-medium">{car.transmission}</span>
                                    </div>
                                    <div className="flex flex-col items-center p-2 bg-emerald-50 rounded-lg">
                                        <Fuel className="w-5 h-5 text-emerald-600 mb-1" />
                                        <span className="text-xs text-gray-600 font-medium">{car.fuel}</span>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2 mb-4">
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, index) => (
                                            <Star
                                                key={index}
                                                className={`w-4 h-4 ${
                                                    index < Math.floor(car.rating)
                                                        ? 'text-yellow-400 fill-yellow-400'
                                                        : 'text-gray-300'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-500">
                                        ({car.reviews} reviews)
                                    </span>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <div>
                                        <p className="text-sm text-gray-500">Starting from</p>
                                        <p className="text-2xl font-bold text-emerald-600">
                                            PKR {car.price.toLocaleString()}
                                            <span className="text-sm text-gray-500 font-normal">/day</span>
                                        </p>
                                    </div>
                                </div>

                                <a
                                    href={car.rentalUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full mt-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl py-3 font-semibold hover:shadow-lg hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
                                >
                                    <span>Book Now</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default CarRental;