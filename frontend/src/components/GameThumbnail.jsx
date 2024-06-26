import { useState } from "react";
import { Link } from "react-router-dom";

import notfound from "../assets/notfound.jpg";

function GameThumbnail({ game }) {
  const [gameId, setGameId] = useState(game.id);
  return (
    <Link to={`/games/${game.id}`}>
      <div className="w-[220px] h-[220px] bg-primary rounded-2xl flex flex-col hover:scale-110 transition overflow-hidden shadow-2xl max-1200:w-[20vw] min-w-36">
        <div
          className=" bg-transparent h-[140px] flex-2"
          style={{
            backgroundImage: `url(${
              game.background_image ? game.background_image : notfound
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="flex-1 border-black border text-base text-center font-medium text-white p-2 rounded-b-2xl flex flex-col relative">
          <p className="h-full flex justify-center items-center">{game.name}</p>
          <div className="absolute w-[40px] h-[40px] bg-secondary text-black font-black self-end bottom-[173px] right-[3px] flex justify-center items-center rounded-full">
            {game.rating}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default GameThumbnail;
