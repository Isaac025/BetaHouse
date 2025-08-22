import React from "react";
import logo from "../assets/logo1.png";
import { Link } from "react-router-dom";
import { CiLocationOn, CiPhone } from "react-icons/ci";
import { FaRegEnvelope } from "react-icons/fa";

const Footer = () => {
  const quicklinks = ["Home", "Properties", "About", "Contact Us", "Blog"];
  const more = ["Agents", "Affordable Houses", "FAQ’s"];
  const popular = [
    "Apartment for sale",
    "Apartment for rent",
    "3 bedroom flat",
    "Bungalow",
  ];

  return (
    <footer className="bg-[#035A33] p-6 md:px-12 md:py-16 text-white">
      <div className="component flex flex-col md:flex-row md:justify-between  gap-10">
        <div className="flex flex-col gap-4">
          <Link to="/">
            <img src={logo} alt="logo" className="w-[150px]" />
          </Link>
          <p className="text-[15px] max-w-[373px] w-full">
            Discover, rent, and find your ideal home hassle-free with BetaHouse.
            Take control of your rental journey today!
          </p>
          <div className="text-[15px] flex flex-col gap-3">
            <p className="flex items-center gap-3">
              <CiLocationOn /> 95 Tinubu Estate, Lekki, Lagos
            </p>
            <p className="flex items-center gap-3">
              <CiPhone /> +234 675 8935 675
            </p>
            <p className="flex items-center gap-3">
              <FaRegEnvelope /> support@rentbetahouse.com
            </p>
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-[20px] mb-4">Quick Links</h2>
          <ul className="flex flex-col gap-2 text-[15px]">
            {quicklinks.map((link, i) => (
              <li key={i}>
                <Link to="#" className="hover:text-gray-200 transition">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-[20px] mb-4">More</h2>
          <ul className="flex flex-col gap-2 text-[15px]">
            {more.map((item, i) => (
              <li key={i}>
                <a to="#" className="hover:text-gray-200 transition">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-[20px] mb-4">Popular Search</h2>
          <ul className="flex flex-col gap-2 text-[15px]">
            {popular.map((item, i) => (
              <li key={i}>
                <a to="#" className="hover:text-gray-200 transition">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="component mt-10 border-t border-[#6F6F6F] pt-6 flex flex-col md:flex-row gap-4 md:justify-between font-medium text-[15px] text-[#FFFFFF]">
        <p>Copyright 2025 Betahouse | Designed by Isaac</p>
        <p>Privacy Policy</p>
      </div>
    </footer>
  );
};

export default Footer;
