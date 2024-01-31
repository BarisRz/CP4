import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import heroimg from "../assets/Hero.png";
import arrow from "../assets/arrow.svg";
import arrowb from "../assets/arrowb.svg";
import GameThumbnail from "../components/GameThumbnail";
import AnimatedPage from "../components/AnimatedPage";

import { useUser } from "../contexts/UserContext";

function Home() {
  const { user } = useUser();
  const API_KEY = import.meta.env.VITE_API_KEY;
  const url = `https://api.rawg.io/api/games?key=${API_KEY}`;

  const [recommendedGames, setRecommendedGames] = useState([]);
  const [metacriticGames, setMetacriticGames] = useState([]);

  // Fetch de l'API
  useEffect(() => {
    axios
      .get(`${url}${"&page_size=5"}`)
      .then((response) => {
        console.info("recommended: ", response.data.results);
        setRecommendedGames(response.data.results);
      })
      .catch((error) => console.error("Error:", error));

    axios
      .get(`${url}${"&ordering=-metacritic&page_size=5"}`)
      .then((response) => {
        console.info("metacritic: ", response.data.results);
        setMetacriticGames(response.data.results);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <AnimatedPage>
      <div className="landing h-screen2 flex items-center pb-[72px]">
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
          <NavLink to={`${user ? "popular" : "login"}`}>
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
        <button
          type="button"
          className="absolute top-[90%] left-[48%] transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-secondary to-blue-500 animate-bounce rounded-full p-1"
          onClick={() =>
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: "smooth",
            })
          }
        >
          <img src={arrowb} alt="arrow" className="w-10" />
        </button>
      </div>
      <div>
        <div className="flex justify-between items-center">
          <p className="text-2xl font-bold self-end">
            Most recommended by Players
          </p>
          <NavLink
            to="popular"
            className="flex items-center font-bold rounded-2xl p-2 px-4 bg-gradient-to-r from-secondary to-blue-500"
          >
            See more
          </NavLink>
        </div>
        <div className="flex my-4 gap-[25px] flex-wrap">
          {recommendedGames.map((game) => (
            <GameThumbnail key={game.id} game={game} />
          ))}
        </div>
      </div>
      <div className="my-8">
        <div className="flex justify-between items-center">
          <p className="text-2xl font-bold self-end">Highest Metacritic</p>
          <NavLink
            to="popular"
            className="flex items-center font-bold rounded-2xl p-2 px-4 bg-gradient-to-r from-secondary to-blue-500"
          >
            See more
          </NavLink>
        </div>
        <div className="flex mt-4 mb-28 gap-[25px] flex-wrap">
          {metacriticGames.map((game) => (
            <GameThumbnail key={game.id} game={game} />
          ))}
        </div>
      </div>
    </AnimatedPage>
  );
}

export default Home;
