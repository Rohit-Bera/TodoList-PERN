import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUpServcie, handleSubmit } from "../services/user.service";
import { storeUser } from "../store/lib/user.reducer";
import Input from "../components/Input";
import Button from "../components/Button";
import Title from "../components/Title";
import Loader from "../components/Loader";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector((state) => state.userReducer).email;
  const pass = useSelector((state) => state.userReducer).password;

  useEffect(() => {
    if (email !== "" && pass !== "") {
      navigate("/tasks");
      return;
    }
  }, [email, pass]);

  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const handleSignup = async () => {
    console.log("user: ", user);

    setLoading(!isLoading);
    const response = await signUpServcie(user);

    response && setLoading(false);

    const { rows } = response;
    if (rows) {
      dispatch(storeUser(rows));
      navigate("/tasks");
    }
  };

  return (
    <div className="flex items-center justify-evenly h-screen flex-col">
      <Title title="Task Keeper" />
      <form
        onSubmit={handleSubmit}
        className="bg-white flex justify-around items-center flex-col
          h-80 w-72 rounded-xl border border-black border-r-black border-b-black 
          border-r-8 border-b-8 p-10 -mt-16"
      >
        <Input
          type="text"
          name="username"
          placeholder="username"
          value={user.username}
          handleInput={handleInput}
        />
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
          <Button title="sign up" clickAction={handleSignup} />
        )}

        <h3>
          Already a User?
          <Button title="login" clickAction={() => navigate("/")} />
        </h3>
      </form>
    </div>
  );
};

export default Signup;
