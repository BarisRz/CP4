import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { failed } from "../services/toast";

function Admin() {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/admin`, {
        withCredentials: true,
      })
      .then(() => {})
      .catch((err) => {
        console.error(err);
        failed("Please log in as an admin to access this page.");
        navigate("/login", { replace: true });
      });
  }, []);

  return (
    <div className="h-screen2 flex justify-center items-center pb-[72px]">
      La page admin looooool
    </div>
  );
}

export default Admin;
