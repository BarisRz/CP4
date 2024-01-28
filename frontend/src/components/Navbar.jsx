import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

import logo from "../assets/logo.svg";
import search from "../assets/search.svg";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      if (isScrolled !== scrolled) {
        setScrolled(!scrolled);
      }
    };

    document.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <div
      className={`text-white fixed w-full z-20 flex-col transition duration-700 ${
        scrolled ? "bg-primary shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="w-[1200px] mx-auto p-4 flex justify-between">
        <div className="flex items-center gap-4 font-bold">
          <NavLink to="/">
            <img src={logo} alt="logo of website" />
          </NavLink>
          <div className="bg-white h-8 w-[1px]" />
          <NavLink to="/" className="relative cursor-pointer">
            Popular
            <span className="underline-nav" />
          </NavLink>
          <NavLink to="/" className="relative cursor-pointer">
            Last Released
            <span className="underline-nav" />
          </NavLink>
          <NavLink to="/" className="relative cursor-pointer">
            Other Lists
            <span className="underline-nav" />
          </NavLink>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="flex items-center rounded-3xl px-2 py-1"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
          >
            <img src={search} alt="icon of searchbar" />
            <input
              type="search"
              name=""
              id=""
              className="px-2 w-10/12 bg-transparent outline-none"
              placeholder="Search for a game"
            />
          </div>
          <NavLink
            to="login"
            className="bg-secondary font-bold py-1 px-4 rounded-3xl border-2 border-transparent hover:border-white transition hover:scale-105"
          >
            Log In
          </NavLink>
          <NavLink
            to="signup"
            className="bg-tertiary text-black py-1 px-4 font-bold rounded-3xl border-2 border-transparent hover:border-white transition hover:scale-105"
          >
            Sign Up
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
