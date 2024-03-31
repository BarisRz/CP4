import { useEffect, useState } from "react";
import axios from "axios";

function OtherList() {
  const [allPlayersLists, setAllPlayersLists] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/otherlists`)
      .then((response) => {
        setAllPlayersLists(response.data);
      });
  }, []);
  console.log(allPlayersLists);
  return (
    <div className="flex flex-col gap-3 mt-4">
      <p className="text-6xl font-bold py-[72px] bg-gradient-to-l from-secondary/75 to-secondary/[0] rounded-2xl mb-2 max-1200:rounded-none max-1200:text-5xl max-1200:py-16 max-900:py-14 max-700:py-12 max-350:py-8 max-900:text-4xl max-700:text-3xl max-700:text-center">
        Watch the list of other players!
      </p>
      <div className="flex flex-wrap gap-6 mb-[42px] max-1200:gap-1 mx-1 flex-col">
        {allPlayersLists.map((player) => (
          <div className="bg-gradient-to-r from-secondary/75 to-secondary/[0] p-1">
            {player.userId}
          </div>
        ))}
      </div>
    </div>
  );
}

export default OtherList;
