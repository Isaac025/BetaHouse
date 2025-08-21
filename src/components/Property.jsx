import React, { useState, useEffect, useContext } from "react";
import { axiosInstance } from "../../utils/axiosInstance";
import { useAppContext } from "../hooks/useAppContext";

// Assets
import filter from "../assets/filter.png";
import homes1 from "../assets/homes1.png";
import homes2 from "../assets/homes2.png";
import homes3 from "../assets/homes3.png";
import homes4 from "../assets/homes4.png";
import homes5 from "../assets/homes5.png";
import homes6 from "../assets/homes6.png";
import homes7 from "../assets/homes7.png";
import homes8 from "../assets/homes8.png";
import homes9 from "../assets/homes8.png";
import map from "../assets/location.png";
import bath from "../assets/bath.png";
import bed from "../assets/bed.png";
import arrow from "../assets/direct1.png";
import pin from "../assets/pin.png";
import like from "../assets/like.png";

const Property = ({ filters }) => {
  const { token } = useAppContext();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dummy data (for non-logged-in users)
  const dummyProperties = [
    {
      imgg: homes1,
      title: "Real House Luxury Villa",
      location: "Victoria Island, Lagos",
      bedrooms: 6,
      bathrooms: 3,
      price: "3,340,000,000",
      availability: "For Rent",
    },
    {
      imgg: homes2,
      title: "Exquisite Haven Villa",
      location: "Festac, Lagos",
      bedrooms: 5,
      bathrooms: 3,
      price: "4,000,000/1 Year",
      availability: "For Rent",
    },
    {
      imgg: homes3,
      title: "Luxe Palatial Villa",
      location: "Gbagada, Lagos",
      bedrooms: 7,
      bathrooms: 3,
      price: "5,350,000,000",
      availability: "For Sale",
    },
    {
      imgg: homes4,
      title: "Harmony Luxury Villa",
      location: "Mushin, Lagos",
      bedrooms: 4,
      bathrooms: 3,
      price: "4,000,000/1 Year",
      availability: "For Rent",
    },
    {
      imgg: homes5,
      title: "Real House Luxury Villa",
      location: "Victoria Island, Lagos",
      bedrooms: 6,
      bathrooms: 4,
      price: "350,000,000",
      availability: "For Sale",
    },
    {
      imgg: homes6,
      title: "Real House Luxury Villa",
      location: "Lekki-Ajah, Lagos",
      bedrooms: 5,
      bathrooms: 3,
      price: "4,200,000/1 Year",
      availability: "For Sale",
    },
    {
      imgg: homes7,
      title: "Infinite Bliss Villa",
      location: "Ishiagu, Enugu",
      bedrooms: 5,
      bathrooms: 3,
      price: "2,350,000,000",
      availability: "For Rent",
    },
    {
      imgg: homes8,
      title: "Real House Luxury Villa",
      location: "Works Layout, Owerri",
      bedrooms: 8,
      bathrooms: 6,
      price: "3,350,000/1 Year",
      availability: "For Rent",
    },
    {
      imgg: homes9,
      title: "Real House Luxury Villa",
      location: "Ikeja, Lagos",
      bedrooms: 6,
      bathrooms: 6,
      price: "600,000,000",
      availability: "For Sale",
    },
  ];

  // Fetch properties if logged in, else use dummy
  useEffect(() => {
    const fetchProperties = async () => {
      if (!token) {
        setProperties(dummyProperties); // set dummy for guests
        setLoading(false);
        return;
      }

      try {
        const response = await axiosInstance.get("/property", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProperties(response.data.properties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [token]);

  // Filtering
  const filtered = properties.filter((p) => {
    const matchLocation = filters?.location
      ? p.location?.toLowerCase().includes(filters.location.toLowerCase())
      : true;

    const matchBedrooms = filters?.bedrooms
      ? p.bedrooms === Number(filters.bedrooms)
      : true;

    return matchLocation && matchBedrooms;
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 9;
  const totalPages = Math.ceil(filtered.length / propertiesPerPage);

  const indexOfLast = currentPage * propertiesPerPage;
  const indexOfFirst = indexOfLast - propertiesPerPage;
  const currentProperties = filtered.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <p className="text-center mt-10">Loading properties...</p>;
  }

  return (
    <div className="component mt-[40px]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center items-start md:justify-between gap-4">
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2">
            <img src={filter} alt="filter" />
            <p className="md:text-[21px] text-[18px] font-[400] text-[#181A20]">
              More Filter
            </p>
          </div>
          <p className="text-[#181A20] font-[400] md:text-[21px] text-[18px]">
            Showing {indexOfFirst + 1} –{" "}
            {Math.min(indexOfLast, filtered.length)} of {filtered.length}{" "}
            results
          </p>
        </div>
        <div className="flex items-center gap-2 text-[#181A20] md:text-[21px] text-[18px]">
          <span className="text-[#717171] font-[400] ">Sort by:</span>
          <select>
            <option value="default" className="text-[#181A20]">
              Default
            </option>
          </select>
        </div>
      </div>

      {/* Properties */}
      <div className="flex flex-wrap gap-8 lg:justify-between items-center justify-center mt-[20px]">
        {currentProperties.length > 0 ? (
          currentProperties.map((property, index) => (
            <div
              key={property._id || index}
              className="relative h-[520px] w-[370px] rounded-[9.17px] border-[0.92px] border-[#DDD8D8] bg-[#FFFFFF]"
            >
              <img
                src={property.imgg}
                alt="property"
                className="h-[297.24px] w-full rounded-tl-[9.17px] rounded-tr-[9.17px]"
              />
              <div className="p-[10px] ">
                <h4 className="text-[#444444] text-[20.68px] font-[600] mb-2">
                  {property.title}
                </h4>
                <div className="flex items-center gap-3 text-[#666666] font-[400] text-[15px] mb-2">
                  <img src={map} alt="map logo" />
                  <p>{property.location}</p>
                </div>
                <div className="text-[#666666] flex items-center gap-6 font-[400] text-[16px]">
                  <div className="flex items-center gap-3">
                    <img src={bed} alt="bed frame" />
                    <p>{property.bedrooms} Bedrooms</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <img src={bath} alt="bathtub" />
                    <p>{property.bathrooms} Bathrooms</p>
                  </div>
                </div>
                <hr className="border-[0.92px] border-[#DDD8D8] my-7" />
                <div className="flex items-center gap-15">
                  <p className="font-[600] text-[#373737] text-[18px] md:text-[22px]">
                    # {property.price}
                  </p>
                  <div className="flex items-center gap-5">
                    <img src={arrow} alt="" />
                    <img src={pin} alt="" />
                    <img src={like} alt="" />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-around gap-32 absolute top-[10px] left-[25px]">
                <div className="bg-[#3D9970] text-[#FFFFFF] w-[96px] flex items-center justify-center h-[36px] rounded-[3px] text-[13px] font-[500] ">
                  <p>Featured</p>
                </div>
                <div className="bg-[#D3D3D3B2] text-[#FFFFFF] w-[96px] flex items-center justify-center h-[36px] rounded-[3px] text-[13px] font-[500] ">
                  <p>{property.availability}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No properties found.</p>
        )}
      </div>

      {/* Pagination */}
      {filtered.length > propertiesPerPage && (
        <div className="flex justify-center mt-10 gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className={`px-3 py-1 rounded ${
              currentPage === 1 ? "text-gray-400" : "text-black"
            }`}
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`px-3 py-1 rounded ${
                currentPage === number
                  ? "bg-[#3D9970] text-white"
                  : "text-black"
              }`}
            >
              {number}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages ? "text-gray-400" : "text-black"
            }`}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default Property;
