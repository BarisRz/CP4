import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function GameThumbnailFETCH({ gameId, rating, liked }) {
  const [game, setGame] = useState({});
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    if (!gameId) return;
    axios
      .get(`https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`)
      .then((res) => {
        setGame(res.data);
      });
  }, [gameId]);

  return (
    <Link to={`/games/${gameId}`}>
      <div
        className={`w-[220px] h-[220px] bg-primary rounded-2xl flex flex-col hover:scale-110 transition overflow-hidden shadow-2xl ${
          liked === 1 ? "border-2 border-secondary" : ""
        }`}
      >
        <div
          className=" bg-transparent h-[140px] flex-2"
          style={{
            backgroundImage: `url(${game.background_image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="flex-1 border-black border text-base text-center font-medium text-white p-2 rounded-b-2xl flex flex-col relative">
          <p className="h-full flex justify-center items-center">{game.name}</p>
          <div className="absolute w-[40px] h-[40px] bg-secondary text-black font-black self-end bottom-[173px] right-[3px] flex justify-center items-center rounded-full">
            {game.rating}
          </div>
          {rating === null || rating === undefined ? (
            ""
          ) : (
            <div className="absolute w-[30px] h-[30px] bg-blue-500 text-black font-black self-end bottom-[133px] flex justify-center items-center rounded-full shadow">
              {rating}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default GameThumbnailFETCH;
