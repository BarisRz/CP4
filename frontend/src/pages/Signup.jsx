import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { success, failed } from "../services/toast";
import hero from "../assets/SignUp.png";
import AnimatedPage from "../components/AnimatedPage";

function SignUp() {
  const [user, setUser] = useState({
    pseudo: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users`,
        user
      );
      if (res.status === 201) {
        success("You have successfully registered");
        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.error(error);
      failed(error.response.data.error);
    }
  };

  return (
    <AnimatedPage>
      <div
        className="flex flex-col items-center justify-center h-screen2 pb-[72px] bg-center bg-no-repeat max-700:pb-0"
        style={{ backgroundImage: `url(${hero})` }}
      >
        <form
          onSubmit={handleSubmit}
          method="POST"
          className="flex flex-col items-center justify-center gap-6 bg-primary w-[500px] h-[550px] rounded-2xl shadow-2xl shadow-black max-700:h-screen max-700:w-screen max-700:rounded-none"
        >
          <label htmlFor="pseudo" className="text-white">
            <p className="pb-2 font-bold text-xl">Username</p>
            <div className="flex items-center rounded-3xl px-2 py-1 bg-tertiary/[0.1] w-80 h-12 max-700:w-72 max-350:w-60">
              <input
                type="text"
                name="pseudo"
                id="pseudo"
                className="px-2 w-11/12 bg-transparent outline-none mx-auto text-lg"
                placeholder="Enter your username"
                value={user.pseudo}
                onChange={handleChange}
                required
              />
            </div>
          </label>
          <label htmlFor="email" className="text-white">
            <p className="pb-2 font-bold text-xl">Email</p>
            <div className="flex items-center rounded-3xl px-2 py-1 bg-tertiary/[0.1] w-80 h-12 max-700:w-72 max-350:w-60">
              <input
                type="email"
                name="email"
                id="email"
                className="px-2 w-11/12 bg-transparent outline-none mx-auto text-lg"
                placeholder="Enter your email"
                value={user.email}
                onChange={handleChange}
                required
              />
            </div>
          </label>
          <label htmlFor="password" className="text-white">
            <p className="pb-2 font-bold text-xl">Password</p>
            <div className="flex items-center rounded-3xl px-2 py-1 bg-tertiary/[0.1] w-80 h-12 max-700:w-72 max-350:w-60">
              <input
                type="password"
                name="password"
                id="password"
                className="px-2 w-11/12 bg-transparent outline-none mx-auto text-lg"
                placeholder="Enter your username"
                value={user.password}
                onChange={handleChange}
                required
                minLength={8}
              />
            </div>
          </label>
          <button
            type="submit"
            className="flex items-center justify-center rounded-3xl px-2 py-1 w-80 h-12 mt-6 bg-gradient-to-r from-secondary to-blue-500 font-bold hover:scale-105 hover:saturate-150 transition max-700:w-72 max-350:w-60"
          >
            Sign Up
          </button>
          <NavLink
            to="/login"
            className="text-gray-400 max-700:w-72 max-350:w-60"
          >
            Already have an account?{" "}
            <span className="text-secondary">Click here</span>
          </NavLink>
        </form>
      </div>
    </AnimatedPage>
  );
}

export default SignUp;
