import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeUser } from "../store/lib/user.reducer";
import { BallTriangle } from "react-loader-spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Form = ({ title }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setLoading] = useState(false);

  const url = `https://todolist-server-n303.onrender.com`;

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const handleLogin = async () => {
    const validateEmail = user.email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

    if (user.email === "" || user.password === "") {
      return alert("please fill all details"); // toaster
    } else if (!validateEmail) {
      return alert("please enter a valid email!");
    }
    const email = user.email;
    const password = user.password;
    const loginUser = {
      email: email,
      password: password,
    };

    console.log("loginUser: ", loginUser);

    try {
      setLoading(!isLoading);
      const result = await axios.post(url + "/login", loginUser);
      console.log("result: ", result);

      if (result.data.message === "user not found!") {
        alert("invalid details!");
        setUser({
          email: "",
          password: "",
        });
        setLoading(!isLoading);
        return;
      }

      setLoading(!isLoading);
      dispatch(storeUser(result.data.rows));
      navigate("/tasks");
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleSignup = async () => {
    console.log("user: ", user);

    const validateEmail = user.email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

    if (user.email === "" || user.username === "" || user.password === "") {
      return alert("please fill all details"); // toaster
    } else if (!validateEmail) {
      return alert("please enter a valid email!");
    }

    try {
      setLoading(!isLoading);
      const result = await axios.post(url + "/signup", user);
      console.log("result: ", result);

      if (result.status === 400) {
        alert("internal server error");
        setLoading(!isLoading);
        return;
      }

      dispatch(storeUser(result.data.rows));
      navigate("/tasks");
      setLoading(!isLoading);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="loginform">
      <h3>{title}</h3>
      {title === "Signup" && (
        <input
          type="text"
          placeholder="username"
          name="username"
          value={user.username}
          onChange={handleInput}
          className="rounded-sm border border-r-5 border-black p-1 m-1"
        />
      )}
      <input
        type="text"
        placeholder="email"
        name="email"
        value={user.email}
        onChange={handleInput}
        className="rounded-sm border border-r-5 border-black p-1 m-1"
      />
      <input
        type="password"
        placeholder="password"
        name="password"
        value={user.password}
        onChange={handleInput}
        className="rounded-sm border border-r-5 border-black p-1 m-1"
      />
      <button
        onClick={title === "Signup" ? handleSignup : handleLogin}
        className="rounded-sm p-1 m-1 bg-black text-white px-3"
      >
        {isLoading ? (
          <BallTriangle
            height={50}
            width={50}
            radius={5}
            color="white"
            ariaLabel="ball-triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        ) : (
          <h4>submit</h4>
        )}
      </button>
      {title === "Signup" ? (
        <h2>
          already a user?{" "}
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            Login
          </button>
        </h2>
      ) : (
        <h4>
          Not a user?{" "}
          <button onClick={() => navigate("/signup")}>Signup</button>{" "}
        </h4>
      )}
    </form>
  );
};

export default Form;
