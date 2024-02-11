import { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import axios from "axios";
import { useParams } from "react-router-dom";

import { useUser } from "../contexts/UserContext";
import GameInteraction from "../components/GameInteraction";

function Game() {
  const { user, setUser } = useUser();
  const { id } = useParams();
  const [game, setGame] = useState({});

  const API_KEY = import.meta.env.VITE_API_KEY;
  const url = `https://api.rawg.io/api/games/${id}?key=${API_KEY}`;

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setGame(response.data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="flex flex-col pt-10 gap-2 w-full">
      <div className="flex gap-2 w-full bg-gradient-to-l from-primary to-secondary/[0] py-4 rounded-2xl">
        {game?.background_image ? (
          <img
            src={game.background_image}
            alt={`the game ${game.name}`}
            className="w-[500px] h-[280x] object-cover border-2 border-secondary shadow-2xl"
          />
        ) : (
          <div className="w-[500px] h-[280px] object-cover border-2 border-secondary shadow-2xl flex justify-center items-center text-xl">
            No image available 😱
          </div>
        )}
        <div className="h-[284px] flex flex-col justify-between">
          <p className="font-extrabold text-5xl w-full bg-gradient-to-r from-secondary to-secondary/[0]">
            {game.name}
          </p>
          <div className="pt-4 flex flex-col gap-1">
            <p className="font-bold">
              <span className="font-bold text-secondary">Metacritic :</span>{" "}
              {game.metacritic}
            </p>
            <p className="font-bold">
              <span className="font-bold text-secondary">
                Average playtime :
              </span>{" "}
              {game.playtime} h
            </p>
            <p className="font-bold">
              <span className="font-bold text-secondary">Released :</span>{" "}
              {new Date(game.released).toLocaleDateString("fr-FR")}
            </p>
            <p className="font-bold">
              <span className="font-bold text-secondary">Genre :</span>{" "}
              {game?.genres?.map((genre) => genre.name).join(", ")}
            </p>
            <p className="font-bold">
              <span className="font-bold text-secondary">Platform :</span>{" "}
              {game?.platforms?.map((genre) => genre.platform.name).join(", ")}
            </p>
            <p className="font-bold">
              <span className="font-bold text-secondary">Developers :</span>{" "}
              {game?.developers?.map((genre) => genre.name).join(", ")}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center py-8 bg-gradient-to-r from-primary to-secondary/[0] rounded-2xl">
        {user === false ? (
          <div className="flex items-center">
            <Rating
              className="custom-rating"
              SVGclassName="inline-block"
              readonly
              initialValue={game.rating}
              allowFraction
              fillColor="#26ccf2"
              emptyColor="#333232"
            />
            <p>({game.rating})</p>
          </div>
        ) : (
          <GameInteraction game={game} />
        )}
      </div>
      <div className="flex flex-wrap items-center gap-2 p-4 bg-gradient-to-l from-primary to-secondary/[0] rounded-2xl">
        <p className="font-bold">Community Tags:</p>
        {game?.tags?.map((tags) => (
          <p
            key={tags.id}
            className="p-2 bg-primary rounded-xl border border-secondary/50"
          >
            {tags.name}
          </p>
        ))}
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: game.description }}
        className="text-lg bg-primary p-8 mb-8 rounded-2xl"
      />
    </div>
  );
}

export default Game;
