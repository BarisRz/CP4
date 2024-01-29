import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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
          <NavLink
            to="/"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
          >
            <motion.svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              xmlns="http://www.w3.org/2000/svg"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              whileHover={{ rotate: 0 }}
              className="fill-current text-secondary hover:text-white transition-colors duration-500"
            >
              <path d="M11 14H0V26H11L17 20L11 14ZM8 22H4V18H8V22ZM26 11V0H14V11L20 17L26 11ZM18 4H22V8H18V4ZM14 29V40H26V29L20 23L14 29ZM22 36H18V32H22V36ZM29 14L23 20L29 26H40V14H29ZM36 22H32V18H36V22Z" />
            </motion.svg>
          </NavLink>
          <div className="bg-white h-8 w-[1px]" />
          <NavLink
            to="popular"
            className="relative cursor-pointer overflow-hidden"
          >
            <motion.p
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Popular
            </motion.p>
            <span className="underline-nav" />
          </NavLink>
          <NavLink
            to="last-released"
            className="relative cursor-pointer overflow-hidden"
          >
            <motion.p
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              Last Released
            </motion.p>
            <span className="underline-nav" />
          </NavLink>
          <NavLink
            to="lists"
            className="relative cursor-pointer overflow-hidden"
          >
            <motion.p
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              Other Lists
            </motion.p>
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
          <div className="hover:scale-105 transition">
            <NavLink
              to="login"
              className="bg-gradient-to-r from-secondary to-blue-500 font-bold py-[9px] px-4 rounded-3xl hover:saturate-150"
            >
              Log In
            </NavLink>
          </div>
          <div className="hover:scale-105 transition">
            <NavLink
              to="signup"
              className="bg-gradient-to-r from-tertiary to-blue-500 text-black py-[9px] px-4 rounded-3xl font-bold hover:saturate-150"
            >
              Sign Up
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
