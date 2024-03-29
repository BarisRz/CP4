import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import { useUser } from "../contexts/UserContext";

import "../styles/root.scss";

function App() {
  const { setUser } = useUser();
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/protected`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        setUser(false);
        console.error(err);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-[1200px] min-h-screen text-white mx-auto pt-[72px]">
        <Outlet />
      </div>
    </>
  );
}

export default App;
