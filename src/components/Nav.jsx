import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import profilePic from "../assets/profilePic.png";
import down from "../assets/dropdown.png";
import { axiosInstance } from "../../utils/axiosInstance";
import { useAppContext } from "../hooks/useAppContext";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAppContext();

  const handleLogout = () => {
    logout();
    redirect("/login");
    setDropdownOpen(false);
  };

  const redirect = useNavigate();

  return (
    <div className="shadow-xl h-[80px] ">
      <nav className="component flex items-center justify-between px-4 py-3 bg-transparent">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="logo" className="w-[120px]" />
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          <Link to="/" className="nav-links">
            Home
          </Link>
          <Link to="#" className="nav-links">
            Properties
          </Link>
          <Link to="#" className="nav-links">
            About Us
          </Link>
          <Link to="#" className="nav-links">
            Blog
          </Link>
          <Link to="#" className="nav-links">
            Contact Us
          </Link>
        </div>

        {/* Desktop Buttons or User Profile */}
        <div className="hidden lg:flex items-center gap-4 relative">
          {!user ? (
            <>
              <button
                onClick={() => redirect("/signup")}
                className="cursor-pointer w-[140px] h-[45px] rounded-[8px] border border-[#F5F5F5] font-[400] text-[16px] text-[#F5F5F5]"
              >
                Sign Up
              </button>
              <button
                onClick={() => redirect("/login")}
                className="cursor-pointer w-[140px] h-[45px] rounded-[8px] font-[400] text-[16px] text-[#F5F5F5] bg-[#3D9970]"
              >
                Login
              </button>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2"
              >
                <img
                  src={profilePic}
                  alt="profile"
                  className="w-10 h-10 rounded-full border"
                />
                <span className="text-white font-medium">
                  {user.firstName} {user.lastName}
                </span>
                <img src={down} alt="" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md p-2">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <IoMdClose size={30} className="text-white" />
            ) : (
              <IoMdMenu size={30} className="text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-[70px] left-0 w-full bg-[#1a1a1a] flex flex-col items-center gap-6 py-6 z-50">
            <Link
              to="/"
              className="nav-links text-white"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="#"
              className="nav-links text-white"
              onClick={() => setMenuOpen(false)}
            >
              Properties
            </Link>
            <Link
              to="#"
              className="nav-links text-white"
              onClick={() => setMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="#"
              className="nav-links text-white"
              onClick={() => setMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              to="#"
              className="nav-links text-white"
              onClick={() => setMenuOpen(false)}
            >
              Contact Us
            </Link>

            {/* Mobile Profile */}
            {!user ? (
              <div className="flex flex-col gap-4 mt-4">
                <button
                  onClick={() => redirect("/signup")}
                  className="cursor-pointer w-[200px] h-[45px] rounded-[8px] border border-[#F5F5F5] font-[400] text-[16px] text-[#F5F5F5]"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => redirect("/login")}
                  className="cursor-pointer w-[200px] h-[45px] rounded-[8px] font-[400] text-[16px] text-[#F5F5F5] bg-[#3D9970]"
                >
                  Login
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <img
                  src={profilePic}
                  alt="profile"
                  className="w-12 h-12 rounded-full border"
                />
                <span className="text-white font-medium">
                  {user.firstName} {user.lastName}
                </span>
                <button
                  onClick={handleLogout}
                  className="w-[200px] h-[45px] rounded-[8px] font-[400] text-[16px] text-red-600 border border-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Nav;
