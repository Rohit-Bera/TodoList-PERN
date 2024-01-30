import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import Input from "../components/Input";
import { handleSubmit, loginService } from "../services/user.service";
import Button from "../components/Button";
import { storeUser } from "../store/lib/user.reducer";
import Loader from "../components/Loader";
import Title from "../components/Title";

const Login = () => {
  const email = useSelector((state) => state.userReducer).email;
  const pass = useSelector((state) => state.userReducer).password;

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (email !== "" && pass !== "") {
      navigate("/tasks");
      return;
    }
  }, [email, pass]);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const handleLogin = async () => {
    setLoading(true);
    const response = await loginService(user);

    response && setLoading(false);

    const { rows } = response;

    setUser({
      email: "",
      password: "",
    });
    if (rows) {
      dispatch(storeUser(rows));
      navigate("/tasks");
    }
  };

  return (
    <>
      <div className="flex justify-evenly items-center h-screen flex-col">
        <Title title="Task Keeper" />
        <form
          onSubmit={handleSubmit}
          className="bg-white flex justify-around items-center flex-col
          h-80 w-72 rounded-xl border border-black border-r-black border-b-black 
          border-r-8 border-b-8 p-10 -mt-16
          "
        >
          <Input
            type="text"
            name="email"
            placeholder="email"
            value={user.email}
            handleInput={handleInput}
          />
          <Input
            type="password"
            name="password"
            placeholder="password"
            value={user.password}
            handleInput={handleInput}
          />
          {isLoading ? (
            <Loader />
          ) : (
            <Button title="login" clickAction={handleLogin} />
          )}
          <h3>
            Not a User?
            <Button title="signup" clickAction={() => navigate("/signup")} />
          </h3>
        </form>
      </div>
    </>
  );
};

export default Login;
