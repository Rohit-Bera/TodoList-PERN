import React, { useEffect, useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddRecord from "./components/AddRecord";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Error404 from "./components/Error404";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/tasks",
    element: <AddRecord />,
  },
  {
    path: "*",
    element: <Error404 />,
  },
]);

function App() {
  return <RouterProvider router={Router} />;
}

export default App;
