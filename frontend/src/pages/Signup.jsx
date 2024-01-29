import { useState } from "react";
import axios from "axios";
import { success, failed } from "../services/toast";
import hero from "../assets/SignUp.png";

function SignUp() {
  const [user, setUser] = useState({
    pseudo: "",
    email: "",
    password: "",
  });

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
      }
    } catch (error) {
      console.error(error);
      failed(error.response.data.error);
    }
  };

  return (
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
              value={user.pseudo}
              onChange={handleChange}
            />
          </div>
        </label>
        <label htmlFor="email" className="text-white">
          <p className="pb-2 font-bold text-xl">Email</p>
          <div className="flex items-center rounded-3xl px-2 py-1 bg-tertiary/[0.1] w-80 h-12">
            <input
              type="email"
              name="email"
              id="email"
              className="px-2 w-11/12 bg-transparent outline-none mx-auto text-lg"
              placeholder="Enter your email"
              value={user.email}
              onChange={handleChange}
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
              value={user.password}
              onChange={handleChange}
            />
          </div>
        </label>
        <button
          type="submit"
          className="flex items-center justify-center rounded-3xl px-2 py-1 w-80 h-12 mt-6 bg-gradient-to-r from-secondary to-blue-500 font-bold hover:scale-105 hover:saturate-150 transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
