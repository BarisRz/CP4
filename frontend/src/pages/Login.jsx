import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { useUser } from "../contexts/UserContext";
import { success, failed } from "../services/toast";
import hero from "../assets/SignUp.png";
import AnimatedPage from "../components/AnimatedPage";

function Login() {
  const [utilisateur, setUtilisateur] = useState({
    pseudo: "",
    password: "",
  });
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUtilisateur({ ...utilisateur, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/login`,
        utilisateur,
        { withCredentials: true }
      );
      if (res.status === 200) {
        success(`Welcome ${utilisateur.pseudo}!`);
        setUser(res.data.utilisateur);
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error(error);
      failed(error.response.data);
    }
  };

  return (
    <AnimatedPage>
      <div
        className="flex flex-col items-center justify-center h-screen2 pb-[72px] bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${hero})` }}
      >
        <form
          onSubmit={handleSubmit}
          method="POST"
          className="flex flex-col items-center justify-center gap-6 bg-primary w-[500px] h-[550px] rounded-2xl shadow-2xl shadow-black"
        >
          <label htmlFor="pseudo" className="text-white">
            <p className="pb-2 font-bold text-xl">Username</p>
            <div className="flex items-center rounded-3xl px-2 py-1 bg-tertiary/[0.1] w-80 h-12">
              <input
                type="text"
                name="pseudo"
                id="pseudo"
                className="px-2 w-11/12 bg-transparent outline-none mx-auto text-lg"
                placeholder="Enter your username"
                value={utilisateur.pseudo}
                onChange={handleChange}
                required
              />
            </div>
          </label>
          <label htmlFor="password" className="text-white">
            <p className="pb-2 font-bold text-xl">Password</p>
            <div className="flex items-center rounded-3xl px-2 py-1 bg-tertiary/[0.1] w-80 h-12">
              <input
                type="password"
                name="password"
                id="password"
                className="px-2 w-11/12 bg-transparent outline-none mx-auto text-lg"
                placeholder="Enter your username"
                value={utilisateur.password}
                onChange={handleChange}
                required
              />
            </div>
          </label>
          <button
            type="submit"
            className="flex items-center justify-center rounded-3xl px-2 py-1 w-80 h-12 mt-6 bg-gradient-to-r from-secondary to-blue-500 font-bold hover:scale-105 hover:saturate-150 transition"
          >
            Login
          </button>
          <NavLink to="/signup" className="text-gray-400">
            Don't have an account yet?{" "}
            <span className="text-secondary">Sign up</span>
          </NavLink>
        </form>
      </div>
    </AnimatedPage>
  );
}

export default Login;
