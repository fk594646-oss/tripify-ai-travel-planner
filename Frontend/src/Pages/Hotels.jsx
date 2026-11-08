import React, { useState, useRef } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import HotelsHero from '../Components/HotelsHero.jsx';
import PopularHotels from '../Components/PopularHotels.jsx';

function Hotels() {
  const [searchFilters, setSearchFilters] = useState(null);
  const hotelsResultsRef = useRef(null);  // ✅ REF CREATE KIYA

  const handleSearch = (filters) => {
    setSearchFilters(filters);
  };

  return (
    <div>
      <Header />
      <HotelsHero 
        onSearch={handleSearch} 
        hotelsResultsRef={hotelsResultsRef}  // ✅ REF PASS KIYA
      />
      <div ref={hotelsResultsRef}>  {/* ✅ REF YAHAN LAGAYA */}
        <PopularHotels searchFilters={searchFilters} />
      </div>
      <Footer />
    </div>
  );
}

export default Hotels;