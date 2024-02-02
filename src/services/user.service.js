import axios from "axios";

const url = `https://todolist-server-n303.onrender.com`;

export const loginService = async (user) => {
  try {
    const result = await axios.post(url + "/login", user);
    console.log("result: ", result);

    if (result.data.message === "user not found!") {
      alert("invalid details!");
      return { error: result.data.message };
    }

    const rows = result.data.rows;

    return { rows };
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

export const signUpServcie = async (user) => {
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
