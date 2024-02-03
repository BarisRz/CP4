import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import LoadingSVG from "../components/Loading";

function ProtectedRoute() {
  const navigate = useNavigate();
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/protected`, {
        withCredentials: true,
      })
      .then(() => {
        setAllowed(true);
      })
      .catch((err) => {
        navigate("/login", { replace: true });
        console.error(err);
      });
  }, []);

  if (!allowed) return <LoadingSVG />;

  return <Outlet />;
}

export default ProtectedRoute;
