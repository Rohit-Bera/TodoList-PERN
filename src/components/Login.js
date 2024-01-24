import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { storeUser } from "../store/lib/user.reducer";
import "../App.css";

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
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const url = `http://localhost:5800`;
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const handleLogin = async () => {
    console.log("user: ", user);

    if (user.email === "" || user.password === "") {
      return alert("please fill all details"); // toaster
    }

    try {
      const result = await axios.post(url + "/login", user);
      console.log("result: ", result);

      if (result) {
        dispatch(storeUser(result.data.rows));
        navigate("/tasks");
      } else {
        alert("Invalid details");
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit} className="loginform">
          <h2>Login page</h2>
          <input
            type="text"
            placeholder="email"
            name="email"
            value={user.email}
            onChange={handleInput}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            value={user.password}
            onChange={handleInput}
          />
          <button onClick={handleLogin}>submit</button>
          <h4>
            Not a user?{" "}
            <button onClick={() => navigate("/signup")}>Signup</button>{" "}
          </h4>
        </form>
      </div>
    </>
  );
};

export default Login;
