import { useState } from "react";
import { Link } from "react-router-dom";

function GameThumbnail({ game }) {
  const [gameId, setGameId] = useState(game.id);
  return (
    <Link to={`/games/${game.id}`}>
      <div className="w-[220px] h-[220px] bg-white rounded-2xl flex flex-col hover:scale-110 transition overflow-hidden shadow-2xl">
        <div
          className=" bg-transparent h-[140px]"
          style={{
            backgroundImage: `url(${game.background_image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="flex-1 bg-black text-xl font-medium text-white p-2">
          {game.name}
        </div>
      </div>
    </Link>
  );
}

export default GameThumbnail;
