import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import heroimg from "../assets/Hero.png";
/*
initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
*/
function Home() {
  return (
    <div className="landing h-[70vh] flex items-center">
      <div className="flex-1">
        <motion.p
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-7xl font-extrabold text-secondary"
        >
          Explore<span className="text-white">,</span> BookMark
          <span className="text-white">,</span> Share
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
            className="p-2 px-4 mt-4 bg-gradient-to-r from-secondary to-blue-500 font-bold rounded-2xl"
          >
            Get Started
          </button>
        </NavLink>
      </div>
      <div className="flex-1">
        <img src={heroimg} alt="hero" className="scale-150" />
      </div>
    </div>
  );
}

export default Home;
