import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import GameThumbnail from "../components/GameThumbnail";
import LoadingSVG from "../components/Loading";

function Popular() {
  const { searchTerm } = useParams();
  const [gamelist, setGamelist] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://api.rawg.io/api/games?key=${API_KEY}${
          page > 1 ? `&page=${page}` : ""
        }${searchTerm ? `&search=${searchTerm}` : ""}`
      )
      .then((response) => {
        setGamelist(response.data.results);
      })
      .catch((error) => console.error("Error:", error))
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchTerm, page]);

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  return (
    <div className="flex flex-col gap-3 mt-4">
      <p className="text-6xl font-bold py-[72px] bg-gradient-to-l from-secondary/75 to-secondary/[0] rounded-2xl mb-2">
        Popular Games
      </p>
      <div className="flex flex-wrap gap-6 mb-[42px] max-[1200px]:gap-0">
        {isLoading ? (
          <LoadingSVG />
        ) : (
          gamelist.map((game) => <GameThumbnail key={game.id} game={game} />)
        )}
      </div>
      <div className="flex justify-center items-center mb-[72px] gap-6">
        <button
          type="button"
          onClick={() => {
            setPage((prev) => (prev === 1 ? 1 : prev - 1));
          }}
          disabled={page === 1}
          className="w-[200px] bg-secondary p-2 rounded-2xl font-bold text-black hover:scale-110 transition shadow-2xl disabled:bg-primary disabled:cursor-not-allowed disabled:text-white disabled:shadow-none disabled:hover:scale-100"
        >
          Previous
        </button>
        <div className="text-lg">{page}</div>
        <button
          type="button"
          onClick={() => {
            setPage((prev) => prev + 1);
          }}
          className="w-[200px] bg-secondary p-2 rounded-2xl font-bold text-black hover:scale-110 transition shadow-2xl"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Popular;
