import { useState } from "react";

function GameThumbnail({ game }) {
  const [gameId, setGameId] = useState(game.id);
  return (
    <div className="w-[220px] h-[220px] bg-white rounded-2xl flex flex-col hover:scale-110 transition overflow-hidden">
      <div
        className=" bg-red-600 h-[140px]"
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
  );
}

export default GameThumbnail;
