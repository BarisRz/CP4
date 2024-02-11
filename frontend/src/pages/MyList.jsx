import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { useUser } from "../contexts/UserContext";
import GameThumbnailFETCH from "../components/GameThumbnailFETCH";

function MyList() {
  const { user } = useUser();
  const { filter } = useParams();
  const [userList, setUserList] = useState([]);
  const [copieUserList, setCopieUserList] = useState([]);
  const [whichButton, setWhichButton] = useState(filter || "all");

  useEffect(() => {
    if (!user.pseudo) return;
    setWhichButton("all");
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/users/list/${user.pseudo}`)
      .then((res) => {
        let { data } = res;
        setCopieUserList(data);
        if (filter) {
          data = data.filter((game) => game.liked !== 0);
          setWhichButton("favorites");
        }
        setUserList(data);
      })
      .catch((err) => console.error(err));
  }, [user.pseudo, filter]);

  return (
    <div className="flex flex-col gap-2 mt-4">
      <div>
        <p className="text-6xl font-bold py-[72px] bg-gradient-to-l from-secondary/75 to-secondary/[0] rounded-2xl">
          My Personal List
        </p>
      </div>
      <div className="flex gap-4 px-4 py-8 bg-gradient-to-r from-primary/75 to-primary/[0] justify-center rounded-2xl">
        <button
          type="button"
          onClick={() => {
            setUserList(copieUserList);
            setWhichButton("all");
          }}
          className={`border font-bold border-secondary p-2 rounded-2xl w-[150px] hover:scale-110 transition ${
            whichButton === "all"
              ? "bg-secondary text-primary"
              : "text-secondary"
          }`}
        >
          All
        </button>
        <button
          type="button"
          onClick={() => {
            const filteredUserList = copieUserList.filter(
              (game) => game.liked !== 0
            );
            setUserList(filteredUserList);
            setWhichButton("favorites");
          }}
          className={`border font-bold border-secondary p-2 rounded-2xl w-[150px] hover:scale-110 transition ${
            whichButton === "favorites"
              ? "bg-secondary text-primary"
              : "text-secondary"
          }`}
        >
          Favorites
        </button>
        <button
          type="button"
          onClick={() => {
            const filteredUserList = copieUserList.filter(
              (game) => game.rating !== null
            );
            setUserList(filteredUserList);
            setWhichButton("rated");
          }}
          className={`border font-bold border-secondary p-2 rounded-2xl w-[150px] hover:scale-110 transition ${
            whichButton === "rated"
              ? "bg-secondary text-primary"
              : "text-secondary"
          }`}
        >
          Rated
        </button>
      </div>
      <div className="flex flex-wrap gap-6 mt-4 mb-[72px]">
        {userList.map((game) => (
          <GameThumbnailFETCH
            key={game.gameId}
            gameId={game.gameId}
            rating={game.rating}
            liked={game.liked}
          />
        ))}
      </div>
    </div>
  );
}

export default MyList;
