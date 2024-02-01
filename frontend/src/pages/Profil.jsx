import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

import { useUser } from "../contexts/UserContext";
import GameThumbnail from "../components/GameThumbnail";

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
      for (let i = 0; i < res.data.length && i < 5; i++) {
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
      for (let i = 0; i < res.data.length && i < 5; i++) {
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
      <p className="text-6xl font-bold py-[72px] bg-gradient-to-l from-secondary/75 to-secondary/[0] rounded-2xl">
        Welcome {user.pseudo}!
      </p>
      <div className="flex text-3xl justify-around font-bold bg-gradient-to-r from-primary to-secondary/[0] p-4 rounded-2xl">
        <div>
          <p>Played</p>
          <p className="text-center text-5xl">{tailleUserList}</p>
        </div>
        <div>
          <p>Favorite</p>
          <p className="text-center text-5xl">{tailleFavoriteList}</p>
        </div>
      </div>
      <div>
        <div className="my-8">
          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold self-end">Your favorite</p>
            <NavLink
              to="/mylist"
              className="flex items-center font-bold rounded-2xl p-2 px-4 bg-gradient-to-r from-secondary to-blue-500"
            >
              See the whole list
            </NavLink>
          </div>
          <div className="flex mt-4 mb-28 gap-[25px] flex-wrap">
            {isLoading ? (
              <div
                role="status"
                className="h-[220px] flex items-center justify-center w-full"
              >
                <svg
                  aria-hidden="true"
                  className="inline w-8 h-8 text-primary animate-spin dark:text-gray-600 fill-secondary"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              favoriteList
                .slice(0, 5)
                .map((game) => <GameThumbnail key={game.id} game={game} />)
            )}
          </div>
        </div>
        <div className="my-8">
          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold self-end">Your list</p>
            <NavLink
              to="/mylist"
              className="flex items-center font-bold rounded-2xl p-2 px-4 bg-gradient-to-r from-secondary to-blue-500"
            >
              See the whole list
            </NavLink>
          </div>
          <div className="flex mt-4 mb-28 gap-[25px] flex-wrap">
            {isLoading ? (
              <div
                role="status"
                className="h-[220px] flex items-center justify-center w-full"
              >
                <svg
                  aria-hidden="true"
                  className="inline w-8 h-8 text-primary animate-spin dark:text-gray-600 fill-secondary"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
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
