import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";

import "../styles/root.scss";

function App() {
  return (
    <>
      <Navbar />
      <div className="main-container max-w-[1200px] min-h-screen text-white mx-auto pt-[72px]">
        <Outlet />
      </div>
    </>
  );
}

export default App;
