import React from "react";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 px-6">
      {/* Logo Section */}
      <div className="flex-1 flex items-center">
        <Image
          src="/co-logo.png"
          width={80}
          height={80}
          alt="Culinary Odyssey Logo"
        />
        <a
          className="btn btn-ghost text-xl"
          style={{
            fontFamily: '"Bayon", sans-serif',
            fontSize: "48px",
            color: "#C4986A",
          }}
        >
          Culinary Odyssey
        </a>
      </div>

      {/* Navigation Menu */}
      <div className="flex-none">
        <ul className="menu menu-horizontal flex items-center">
          <li>
            <a
              href="./"
              className="text-black active:text-white"
              style={{
                fontFamily: '"Barlow", sans-serif',
                fontSize: "16px",
                marginRight: "5px",
              }}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-black active:text-white"
              style={{
                fontFamily: '"Barlow", sans-serif',
                fontSize: "16px",
                marginRight: "5px",
              }}
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-black active:text-white"
              style={{
                fontFamily: '"Barlow", sans-serif',
                fontSize: "16px",
                marginRight: "5px",
              }}
            >
              Pricing
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-black active:text-white"
              style={{
                fontFamily: '"Barlow", sans-serif',
                fontSize: "16px",
                marginRight: "5px",
              }}
            >
              About Us
            </a>
          </li>
          <li>
            <button
              className="btn px-6 py-3"
              style={{
                fontFamily: '"Barlow", sans-serif',
                fontSize: "18px",
                color: "#FFFFFF",
                background: "#C4986A",
              }}
            >
              <a href="./login">Log In</a>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
