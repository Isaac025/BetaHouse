import React, { useRef } from "react";
import right from "../assets/front.png";
import left from "../assets/back.png";
import map from "../assets/location.png";
import home1 from "../assets/home1.jpg";
import home2 from "../assets/home2.jpg";
import home3 from "../assets/home3.jpg";
import home4 from "../assets/home4.jpg";

const Discover = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (direction === "left") {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    } else {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const properties = [
    {
      title: "Semi Detached Duplex",
      price: "₦1,430,000,000",
      bedrooms: 6,
      bathrooms: 3,
      size: "720 sq ft",
      location: "Victoria Island, Lagos",
      img: home1,
    },
    {
      title: "Special Duplex",
      price: "₦670,000,000",
      bedrooms: 6,
      bathrooms: 3,
      size: "720 sq ft",
      location: "Victoria Island, Lagos",
      img: home2,
    },
    {
      title: "Split-Level House",
      price: "₦340,000,000",
      bedrooms: 6,
      bathrooms: 3,
      size: "720 sq ft",
      location: "Victoria Island, Lagos",
      img: home3,
    },
    {
      title: "Twin Duplex",
      price: "₦290,000,000",
      bedrooms: 6,
      bathrooms: 3,
      size: "720 sq ft",
      location: "Victoria Island, Lagos",
      img: home4,
    },
    {
      title: "Twin Duplex",
      price: "₦290,000,000",
      bedrooms: 6,
      bathrooms: 3,
      size: "720 sq ft",
      location: "Victoria Island, Lagos",
      imgg: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    },
  ];

  return (
    <div className="component">
      <h1 className="font-[600] text-[#0F1A1E] text-center text-[35px] md:text-[50px] mb-[50px]">
        Discover Our Popular Properties
      </h1>
      <div className="relative max-w-[1200px] mx-auto px-4">
        {/* Left Button */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10 hover:bg-gray-100"
        >
          <img src={left} alt="left-arrow" />
        </button>

        {/* Scrollable container */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-hidden scrollbar-hide scroll-smooth"
        >
          {properties.map((p, i) => (
            <div
              key={i}
              className="min-w-[290px] h-[412px] rounded-[7px]  overflow-hidden relative"
            >
              <img
                src={p.img}
                alt={p.title}
                className="w-full h-full object-cover"
              />
              <div className="p-4 h-[142px] absolute bottom-0 text-[18px] flex flex-col gap-1.5 text-[#ffffff] bg-[#4A4A4C33] w-full">
                <h3 className="font-semibold">{p.title}</h3>
                <p className="">{p.price}</p>
                <div className="text-[14px] flex gap-3">
                  <p>{p.bedrooms} beds |</p>
                  <p>{p.bathrooms} baths |</p>
                  <p>{p.size}</p>
                </div>
                <div className="text-[15px] flex items-center gap-3">
                  <img src={map} alt="" />
                  <p>{p.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Button */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#3D9970] shadow-md p-2 rounded-full z-10 hover:bg-gray-100"
        >
          <img src={right} alt="right-arrow" />
        </button>
      </div>
    </div>
  );
};

export default Discover;
