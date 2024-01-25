import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";
import { useSelector } from "react-redux";

const Signup = () => {
  const navigate = useNavigate();
  const email = useSelector((state) => state.userReducer).email;
  const pass = useSelector((state) => state.userReducer).password;

  useEffect(() => {
    if (email !== "" && pass !== "") {
      navigate("/tasks");
      return;
    }
  }, [email, pass]);

  return (
    <div className="container">
      <Form title="Signup" />
    </div>
  );
};

export default Signup;
