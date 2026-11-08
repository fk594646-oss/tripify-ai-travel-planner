import React, { useState } from 'react';
import Header from '../Components/Header';
import TransportHero from '../Components/TransportHero';
import Footer from '../Components/Footer';
import CarRental from '../Components/CarRental.jsx';

function Transport() {
  const [searchFilters, setSearchFilters] = useState(null);

  const handleSearch = (filters) => {
    setSearchFilters(filters);
  };

  return (
    <div>
      <Header />
      <TransportHero onSearch={handleSearch} />
      <CarRental searchFilters={searchFilters} />
      <Footer />
    </div>
  );
}

export default Transport;