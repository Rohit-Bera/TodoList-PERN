import axios from "axios";

const url = `https://todolist-server-n303.onrender.com`;

const validations = (user) => {
  const validateEmail = user.email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

  if (user.email === "" || user.username === "" || user.password === "") {
    alert("please fill all details"); // toaster

    return { error: "details empty!" };
  } else if (!validateEmail) {
    alert("please enter a valid email!");
    return { error: "email invalid" };
  }
};

export const loginService = async (user) => {
  const check = validations(user);

  if (check) {
    return;
  }
  try {
    const result = await axios.post(url + "/login", user);
    console.log("result: ", result);

    if (result.data.message === "user not found!") {
      return alert("invalid details!");
    }

    const rows = result.data.rows;

    return { rows };
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

export const signUpServcie = async (user) => {
  const check = validations(user);

  if (check) {
    return;
  }

  try {
    const result = await axios.post(url + "/signup", user);
    console.log("result: ", result);

    if (result.status === 400) {
      return alert("internal server error");
    }

    const rows = result.data.rows;

    return { rows };
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

export const handleSubmit = (e) => {
  e.preventDefault();
};
