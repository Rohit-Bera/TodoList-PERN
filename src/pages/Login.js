import axios from "axios";
import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import "../App.css";
import Form from "../components/Form";
import { useSelector } from "react-redux";

const Login = () => {
  const email = useSelector((state) => state.userReducer).email;
  const pass = useSelector((state) => state.userReducer).password;

  useEffect(() => {
    if (email !== "" && pass !== "") {
      navigate("/tasks");
      return;
    }
  }, [email, pass]);
  const navigate = useNavigate();

  return (
    <>
      <div className="container">
        <Form title="Login" />
      </div>
    </>
  );
};

export default Login;
