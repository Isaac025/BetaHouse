import React, { useState } from "react";

const Hero = ({ onSearch }) => {
  const increment = () => setBedrooms(bedrooms + 1);
  const decrement = () => {
    if (bedrooms > 0) setBedrooms(bedrooms - 1); // prevent negative values
  };

  const [location, setLocation] = useState("");
  const [bedrooms, setBedrooms] = useState(0);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(location, bedrooms);
  };

  return (
    <div className="component px-4">
      <div className="text-center text-[#FFFFFF] mt-[60px] lg:mt-[120px] lg:mb-[50px]">
        <h1 className="font-[700] text-[32px] sm:text-[48px] lg:mb-[50px] lg:text-[68px] tracking-[1px] lg:tracking-[2px] leading-tight">
          Browse Our Properties
        </h1>
        <p className="font-[400] text-[16px] sm:text-[20px] lg:text-[26px] max-w-[784px] mx-auto mt-3">
          Find your perfect home among our curated properties. Start browsing
          now!
        </p>
      </div>

      <div className="bg-[#FFFFFF33] lg:h-[135px] h-0   block px-5 ">
        <form
          onSubmit={handleSearch}
          className="flex flex-col lg:flex-row items-stretch md:translate-y-[30%]  lg:h-[85px] max-w-[1240px] mx-auto w-full bg-[#fdfdfd] rounded-[10px] mt-8 lg:mt-16 overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row flex-1 justify-center">
            {/* LOCATION */}
            <div className="flex-1 max-w-[300px] border-b lg:border-b-0 lg:border-r border-gray-300 p-3 flex flex-col justify-center mx-auto">
              <label
                htmlFor="location"
                className="font-[600] block mb-2 text-[14px] text-center"
              >
                LOCATION
              </label>
              <input
                type="text"
                id="location"
                placeholder="eg. Gbagada"
                className="w-full outline-none placeholder:text-[#787878] text-[15px] font-[400] text-center"
              />
            </div>

            {/* PROPERTY TYPE */}
            <div className="flex-1 max-w-[300px] border-b lg:border-b-0 lg:border-r border-gray-300 p-3 flex flex-col justify-center mx-auto">
              <label
                htmlFor="ptype"
                className="font-[600] block mb-2 text-[14px] text-center"
              >
                PROPERTY TYPE
              </label>
              <input
                type="text"
                id="ptype"
                placeholder="eg. Duplex, Bedroom Flat"
                className="w-full outline-none placeholder:text-[#787878] text-[15px] font-[400] text-center"
              />
            </div>

            {/* BEDROOM */}
            <div className="flex-1 max-w-[300px] border-b lg:border-b-0  border-gray-300 p-3 flex flex-col justify-center mx-auto">
              <label
                htmlFor="bedroom"
                className="font-[600] block mb-2 text-[14px] text-center"
              >
                BEDROOM
              </label>
              <div className="flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={decrement}
                  className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-100"
                >
                  -
                </button>

                <span className="text-[15px] font-[500]">{bedrooms}</span>
                <button
                  type="button"
                  onClick={increment}
                  className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer lg:w-[250px] bg-[#3D9970] text-white font-semibold px-4 py-4 lg:py-0 text-[16px] sm:text-[18px] rounded-b-[10px] lg:rounded-b-none lg:rounded-tr-[10px] lg:rounded-br-[10px]"
          >
            Find Property
          </button>
        </form>
      </div>
    </div>
  );
};

export default Hero;
