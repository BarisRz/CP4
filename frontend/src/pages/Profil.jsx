import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

import { useUser } from "../contexts/UserContext";
import GameThumbnail from "../components/GameThumbnail";
import LoadingSVG from "../components/Loading";

function Profil() {
  const { user } = useUser();
  const [userList, setUserList] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);
  const [tailleUserList, setTailleUserList] = useState(0);
  const [tailleFavoriteList, setTailleFavoriteList] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    if (!user.pseudo) return;

    const fetchUserList = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/list/${user.pseudo}`,
        {
          withCredentials: true,
        }
      );
      setTailleUserList(res.data.length);
      const userListData = [];
      for (let i = 0; i < res.data.length && i < 5; i += 1) {
        const gameRes = await axios.get(
          `https://api.rawg.io/api/games/${res.data[i].gameId}?key=${API_KEY}`
        );
        userListData.push(gameRes.data);
      }

      return userListData;
    };

    const fetchFavoriteList = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/favorite/${user.pseudo}`,
        {
          withCredentials: true,
        }
      );
      setTailleFavoriteList(res.data.length);
      const favoriteListData = [];
      for (let i = 0; i < res.data.length && i < 5; i += 1) {
        const gameRes = await axios.get(
          `https://api.rawg.io/api/games/${res.data[i].gameId}?key=${API_KEY}`
        );
        favoriteListData.push(gameRes.data);
      }

      return favoriteListData;
    };

    const fetchData = async () => {
      const userListData = await fetchUserList();
      const favoriteListData = await fetchFavoriteList();

      setUserList(userListData);
      setFavoriteList(favoriteListData);
      setIsLoading(false);
    };

    fetchData().catch((err) => {
      console.error(err);
      setIsLoading(false);
    });
  }, [user.pseudo]);

  return (
    <div className="flex flex-col gap-3 mt-4">
      <p className="text-6xl font-bold py-[72px] bg-gradient-to-l from-secondary/75 to-secondary/[0] rounded-2xl max-900:py-12 max-700:py-8 max-350:py-6 max-900:text-5xl max-700:text-5xl max-350:text-3xl">
        Welcome {user.pseudo}!
      </p>
      <div className="flex text-3xl justify-around font-bold bg-gradient-to-r from-primary to-secondary/[0] p-4 rounded-2xl max-350:text-xl">
        <div>
          <p>Played</p>
          <p className="text-center text-5xl max-350:text-2xl">
            {tailleUserList}
          </p>
        </div>
        <div>
          <p>Favorite</p>
          <p className="text-center text-5xl max-350:text-2xl">
            {tailleFavoriteList}
          </p>
        </div>
      </div>
      <div>
        <div className="my-8">
          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold self-end max-350:text-xl">
              Your favorite
            </p>
            <NavLink
              to="/mylist/favorites"
              className="flex items-center font-bold rounded-2xl p-2 px-4 bg-gradient-to-r from-secondary to-blue-500"
            >
              See the whole list
            </NavLink>
          </div>
          <div className="flex mt-4 mb-28 gap-[25px] flex-wrap justify-center">
            {isLoading ? (
              <LoadingSVG />
            ) : (
              favoriteList
                .slice(0, 5)
                .map((game) => <GameThumbnail key={game.id} game={game} />)
            )}
          </div>
        </div>
        <div className="my-8">
          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold self-end max-350:text-xl">
              Your list
            </p>
            <NavLink
              to="/mylist"
              className="flex items-center font-bold rounded-2xl p-2 px-4 bg-gradient-to-r from-secondary to-blue-500"
            >
              See the whole list
            </NavLink>
          </div>
          <div className="flex mt-4 mb-28 gap-[25px] flex-wrap justify-center">
            {isLoading ? (
              <LoadingSVG />
            ) : (
              userList
                .slice(0, 5)
                .map((game) => <GameThumbnail key={game.id} game={game} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profil;
