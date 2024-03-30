import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "../contexts/UserContext";

import ModalProfil from "./ModalProfil";

import search from "../assets/search.svg";
import loggedicon from "../assets/user-icon.svg";
import adminlock from "../assets/adminlock.svg";
import burger from "../assets/menu-burger.svg";
import cross from "../assets/cross.svg";

function Navbar() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/popular/${searchTerm}`);
  };

  const [scrolled, setScrolled] = useState(false);
  const { user } = useUser();

  const imgRef = useRef(null);
  const location = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      if (isScrolled !== scrolled) {
        setScrolled(!scrolled);
      }
    };
    if (location.pathname !== "/") {
      setScrolled(true);
    }
    document.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled, location]);

  return (
    <div
      className={`text-white fixed w-full z-20 flex-col transition duration-700 max-900:bg-primary max-900:shadow-lg ${
        scrolled ? "bg-primary shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="`w-full flex justify-center">
        <div className="w-[1200px] mx-auto p-4 flex justify-between">
          <div className="flex items-center gap-4 font-bold">
            <NavLink
              to="/"
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
                setScrolled(false);
              }}
            >
              <motion.svg
                viewBox="0 0 40 40"
                xmlns="http://www.w3.org/2000/svg"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                whileHover={{ rotate: 0 }}
                className="fill-current text-secondary hover:text-white transition-colors duration-500 svg-icon w-[40px] h-[40px] max-350:w-[30px] max-350:h-[30px]"
              >
                <path d="M11 14H0V26H11L17 20L11 14ZM8 22H4V18H8V22ZM26 11V0H14V11L20 17L26 11ZM18 4H22V8H18V4ZM14 29V40H26V29L20 23L14 29ZM22 36H18V32H22V36ZM29 14L23 20L29 26H40V14H29ZM36 22H32V18H36V22Z" />
              </motion.svg>
            </NavLink>
            <div className="bg-white h-8 w-[1px]" />
            <NavLink
              to="popular"
              className="relative cursor-pointer overflow-hidden max-700:hidden"
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
              className="relative cursor-pointer overflow-hidden max-700:hidden"
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
              className="relative cursor-pointer overflow-hidden max-700:hidden"
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
          <div className="flex items-center gap-2 mx-2 max-350:gap-1 max-350:mx-0">
            <form
              onSubmit={handleSearch}
              className="flex items-center rounded-3xl px-2 py-1 max-900:max-w-40 max-350:h-8 max-350:w-32"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
            >
              <img src={search} alt="icon of searchbar" />
              <input
                type="search"
                name=""
                id=""
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-2 w-10/12 bg-transparent outline-none"
                placeholder="Search for a game"
              />
            </form>
            {user.admin ? (
              <NavLink to="/admin">
                <img
                  src={adminlock}
                  alt="admin icon"
                  className="w-10 transition hover:scale-105"
                />
              </NavLink>
            ) : (
              ""
            )}
            {!user ? (
              <>
                <div className="hover:scale-105 transition">
                  <NavLink
                    to="login"
                    className="bg-gradient-to-r from-secondary to-blue-500 font-bold py-[9px] px-4 rounded-3xl hover:saturate-150 max-700:hidden"
                  >
                    Log In
                  </NavLink>
                </div>
                <div className="hover:scale-105 transition">
                  <NavLink
                    to="signup"
                    className="bg-gradient-to-r from-tertiary to-blue-500 text-black py-[9px] px-4 rounded-3xl font-bold hover:saturate-150 max-900:hidden"
                  >
                    Sign Up
                  </NavLink>
                </div>
              </>
            ) : (
              <button type="button" onClick={handleImageClick}>
                <img
                  src={loggedicon}
                  ref={imgRef}
                  alt="logged icon"
                  className="w-11 cursor-pointer active:scale-110 transition hover:scale-105"
                  id="profil-icon"
                />
              </button>
            )}
            <button
              type="button"
              className="700:hidden"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <img
                src={menuOpen ? cross : burger}
                alt="menu burger icon"
                className="w-10"
              />
            </button>
            <AnimatePresence>
              {isModalOpen && (
                <ModalProfil
                  closeModal={closeModal}
                  anchor={imgRef}
                  scrolled={scrolled}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      {menuOpen && (
        <div className="w-screen font-bold">
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <NavLink
              to="popular"
              offset={-72}
              duration={500}
              className="block px-4 py-2"
              onClick={() => {
                setMenuOpen(false);
              }}
            >
              Popular
            </NavLink>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <NavLink
              to="last-released"
              offset={-72}
              duration={500}
              className="block px-4 py-2"
              onClick={() => {
                setMenuOpen(false);
              }}
            >
              Last Released
            </NavLink>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <NavLink
              to="contact"
              offset={-72}
              duration={500}
              className="block px-4 py-2"
              onClick={() => {
                setMenuOpen(false);
              }}
            >
              Contact
            </NavLink>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
