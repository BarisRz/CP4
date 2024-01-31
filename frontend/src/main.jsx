import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { UserProvider } from "./contexts/UserContext";
import App from "./pages/App";
import Home from "./pages/Home";

import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Admin from "./pages/Admin";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <UserProvider>
    <ToastContainer className="toast-position" />
    <RouterProvider router={router} />
  </UserProvider>
);
