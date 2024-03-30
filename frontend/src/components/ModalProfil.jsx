import { motion } from "framer-motion";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";

import { useUser } from "../contexts/UserContext";
import { success } from "../services/toast";

import profilsettings from "../assets/profil-settings.svg";
import list from "../assets/list.svg";
import favorite from "../assets/favorite.svg";
import logout from "../assets/logout.svg";

function ModalProfil({ closeModal, anchor, scrolled }) {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const position = anchor.current
    ? anchor.current.getBoundingClientRect()
    : null;

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/logout`,
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      if (res.status === 200) {
        setUser(false);
        success(`Vous avez été déconnecté !`);
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      exit={{ opacity: 0 }}
      type="button"
      onClick={closeModal}
      className="fixed inset-0 cursor-default z-20"
    >
      <button
        type="button"
        onClick={(e) => e.stopPropagation()}
        className="absolute w-[200px] bg-primary z-50 cursor-default flex flex-col p-4 gap-2 transition duration-700"
        style={{
          top: position ? position.top + 60 : 0,
          left: position ? position.left - 120 : 0,
        }}
      >
        <NavLink
          to="/profil"
          className="flex items-center gap-2 link-profil"
          onClick={closeModal}
        >
          <img src={profilsettings} alt="profil settings" className="w-6" />
          Profil
        </NavLink>
        <div className="w-full h-[1px] bg-white self-center" />
        <NavLink
          to="/mylist"
          className="flex items-center gap-2 link-profil"
          onClick={closeModal}
        >
          <img src={list} alt="profil settings" className="w-6" />
          My list(s)
        </NavLink>
        <div className="w-full h-[1px] bg-white self-center" />
        <NavLink
          to="/mylist/favorites"
          className="flex items-center gap-2 link-profil"
          onClick={closeModal}
        >
          <img src={favorite} alt="profil settings" className="w-6" />
          My favorite(s)
        </NavLink>
        <div className="w-full h-[1px] bg-white self-center" />
        <button
          onClick={(e) => {
            handleLogout(e);
            closeModal();
          }}
          type="button"
          className="flex items-center gap-2 link-profil"
        >
          <img src={logout} alt="profil settings" className="w-6" />
          Log Out
        </button>
      </button>
    </motion.button>
  );
}

export default ModalProfil;
