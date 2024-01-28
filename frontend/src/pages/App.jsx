import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../styles/root.scss";

function App() {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const gameId = "836449"; // Remplacez ceci par l'ID du jeu que vous recherchez
  const url = `https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => console.info(data))
    .catch((error) => console.error("Error:", error));
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
