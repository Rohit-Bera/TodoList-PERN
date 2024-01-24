import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { storeUser } from "../store/lib/user.reducer";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const url = `http://localhost:5800`;

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const handleSignup = async () => {
    console.log("user: ", user);

    if (user.email === "" || user.username === "" || user.password === "") {
      return alert("please fill all details"); // toaster
    }

    try {
      const result = await axios.post(url + "/signup", user);
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
    <div className="container">
      <form onSubmit={handleSubmit} className="loginform">
        <h2>Signup page</h2>
        <input
          type="text"
          placeholder="username"
          name="username"
          value={user.username}
          onChange={handleInput}
        />
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
        <button onClick={handleSignup}>submit</button>
        <h2>
          already a user? <button onClick={() => navigate("/")}>Login</button>{" "}
        </h2>
      </form>
    </div>
  );
};

export default Signup;
