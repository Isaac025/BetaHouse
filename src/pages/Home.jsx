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

  // gets called when Hero submits form
  const handleSearch = (location, bedrooms) => {
    setFilters({ location, bedrooms });
  };

  return (
    <div>
      <div className="heropage max-h-[959px] h-screen">
        <Nav />
        {/* Pass the callback to Hero */}
        <Hero onSearch={handleSearch} />
      </div>

      {/* Pass filters into Property */}
      <Property filters={filters} />

      <Discover />
      <Footer />
    </div>
  );
};

export default Home;
