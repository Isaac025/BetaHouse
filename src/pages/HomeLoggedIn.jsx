import React, { useState } from "react";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import Property from "../components/Property";
import Discover from "../components/Discover";
import Footer from "../components/Footer";

const Home = () => {
  const [filters, setFilters] = useState({
    location: "",
    bedrooms: 0,
  });

  // for hero submission
  const handleSearch = (location, bedrooms) => {
    setFilters({ location, bedrooms });
  };

  return (
    <div>
      <div className="heropage max-h-[959px] h-screen">
        <Nav />
        
        <Hero onSearch={handleSearch} />
      </div>

      
      <Property filters={filters} />

      <Discover />
      <Footer />
    </div>
  );
};

export default Home;
