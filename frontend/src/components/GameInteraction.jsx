import { Rating } from "react-simple-star-rating";
import { useState, useEffect } from "react";
import axios from "axios";

import { useUser } from "../contexts/UserContext";
import favorite from "../assets/favorite.svg";
import favoriteblank from "../assets/favoriteblank.svg";
import controllerplayed from "../assets/controllerplayed.svg";
import controllernotplayed from "../assets/controllernotplayed.svg";

function GameInteraction({ game }) {
  const { user } = useUser();
  const [refresh, setRefresh] = useState(false);
  const [isRated, setIsRated] = useState(null);
  const [isLiked, setIsLiked] = useState(0);
  const [isPlayed, setIsPlayed] = useState(false);

  useEffect(() => {
    if (!game.id) return;
    const bodyrequest = { id: user.id };
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/game/${game.id}`,
        bodyrequest
      )
      .then((res) => {
        console.log("de la db", res.data);
        setIsRated(res.data.rating);
        setIsLiked(res.data.liked);
        setIsPlayed(res.data);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          console.error("Game not found");
        }
      });
  }, [game, refresh]);

  const updateGame = async (like, ratings) => {
    if (isPlayed === false) {
      const body = { id: user.id, liked: like, rating: ratings };
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/played/${game.id}`,
          body
        );
        if (res.status === 201) {
          setRefresh(!refresh);
        }
      } catch (err) {
        if (err.response?.status === 404) {
          console.error("Game not found");
        }
        console.error(err);
      }
    }
    if (isPlayed !== false) {
      const body = { id: user.id, liked: like, rating: ratings };
      try {
        const res = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/played/${game.id}`,
          body
        );
        if (res.status === 200) {
          setRefresh(!refresh);
        }
      } catch (err) {
        if (err.response?.status === 404) {
          console.error("Game not found");
        }
        console.error(err);
      }
    }
  };
  const handleRating = (rate) => {
    setIsRated(rate);
    updateGame(isLiked, rate);
  };
  return (
    <div className="flex w-11/12 justify-around">
      <div className="flex items-center">
        <Rating
          onClick={handleRating}
          className="custom-rating"
          SVGclassName="inline-block"
          initialValue={isRated === null ? game.rating : isRated}
          allowFraction
          transition
          fillColor="#26ccf2"
          emptyColor="#333232"
        />
        <p>({game.rating})</p>
      </div>
      <div className="flex items-center">
        <button
          type="button"
          onClick={() => {
            const like = isLiked === 0 ? 1 : 0;
            setIsLiked(like);
            updateGame(like);
          }}
        >
          <img
            src={isLiked ? favorite : favoriteblank}
            alt="favorite"
            className="w-11 hover:scale-110 transition active:scale-125"
          />
        </button>
      </div>
      <button type="button" onClick={() => {}}>
        <img
          src={isPlayed !== false ? controllerplayed : controllernotplayed}
          alt="favorite"
          className="w-11 hover:scale-110 transition active:scale-125"
        />
      </button>
    </div>
  );
}

export default GameInteraction;
