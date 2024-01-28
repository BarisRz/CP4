import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import heroimg from "../assets/Hero.png";
import arrow from "../assets/arrow.svg";
import arrowb from "../assets/arrowb.svg";
import GameThumbnail from "../components/GameThumbnail";

function Home() {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const url = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=5`;

  const [games, setGames] = useState([]);

  // Fetch de l'API
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        console.log(response.data.results);
        setGames(response.data.results);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <>
      <div className="landing h-screen2 flex items-center">
        <div className="flex-1">
          <motion.p
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-7xl font-extrabold text-secondary"
          >
            Explore<span className="text-white">,</span> BookMark
            <span className="text-white">,</span> Share
            <span className="text-white">,</span>
          </motion.p>
          <motion.p
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-6xl font-extrabold"
          >
            The Game You Enjoy
          </motion.p>
          <NavLink to="popular">
            <button
              type="button"
              className="p-2 px-4 mt-4 bg-gradient-to-r from-secondary to-blue-500 font-bold rounded-2xl flex items-center gap-2"
            >
              Get Started <img src={arrow} alt="arrow icon" className="w-4" />
            </button>
          </NavLink>
        </div>
        <div className="flex-1">
          <img src={heroimg} alt="hero" className="scale-150" />
        </div>
        <div className="absolute top-[90%] left-[48%] transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-secondary to-blue-500 animate-bounce rounded-full p-1">
          <img src={arrowb} alt="arrow" className="w-10" />
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center">
          <p className="text-2xl font-bold">Popular among others</p>
          <NavLink
            to="popular"
            className="flex items-center font-bold rounded-2xl p-2 px-4 bg-gradient-to-r from-secondary to-blue-500"
          >
            See more
          </NavLink>
        </div>
        <div className="flex my-4 gap-[25px] flex-wrap">
          {games.map((game) => (
            <GameThumbnail key={game.id} game={game} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
