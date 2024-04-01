import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { failed } from "../services/toast";
import Fistik from "../assets/Fistik.jpg";

function Admin() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/admin`, {
        withCredentials: true,
      })
      .then(() => {
        setAdmin(true);
      })
      .catch((err) => {
        console.error(err);
        failed("Please log in as an admin to access this page.");
        navigate("/login", { replace: true });
      });
  }, []);
  if (!admin) return null;
  return (
    <div
      className="h-screen2 flex justify-center items-center pb-[72px] text-6xl bg-contain bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${Fistik})` }}
    >
      <p className="bg-secondary">La page admin</p>
    </div>
  );
}

export default Admin;
