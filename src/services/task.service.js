import axios from "axios";
import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";

const url = `https://todolist-server-n303.onrender.com`;

export const getTask = createAsyncThunk("getTask", async ({ user_id }) => {
  try {
    const response = await axios.get(url + `/getList/${user_id}`);

    return response.data.rows;
  } catch (err) {
    console.log("err: ", err);

    alert("Network error");
    return isRejectedWithValue(err);
  }
});

export const getHistory = async ({ user_id, limit, offset, date = "" }) => {
  try {
    const url = "http://localhost:5800";

    if (date !== "") {
      const response = await axios.get(
        url +
          `/getHistory?id=${user_id}&limit=${limit}&offset=${offset}&date=${date}`
      );

      const rows = response.data?.rows;

      return { rows };
    } else {
      const response = await axios.get(
        url + `/getHistory?id=${user_id}&limit=${limit}&offset=${offset}`
      );
      const rows = response.data?.rows;

      return { rows };
    }
  } catch (err) {
    console.log("err: ", err);

    alert("Network error");
    return { error: err };
  }
};

export const addTask = createAsyncThunk(
  "addTask",
  async ({ record, user_id }) => {
    try {
      const response = await axios.post(url + `/postList/${user_id}`, record);
      console.log("response: ", response);

      response.status === 200 && alert("record added successfull");
      return response.data.rows[0];
    } catch (err) {
      console.log("err: ", err);
      alert("Network error");

      return isRejectedWithValue(err);
    }
  }
);

export const updateTask = createAsyncThunk(
  "updateTask",
  async ({ record, id }) => {
    try {
      const response = await axios.put(url + `/putList/${id}`, record);

      response && alert("record updated successfull!");

      return response.data.rows[0];
    } catch (error) {
      console.log("error: ", error);
      alert("Network error");
    }
  }
);

export const deleteTask = createAsyncThunk("deleteTask", async ({ id }) => {
  try {
    const response = await axios.delete(url + `/deleteList/${id}`);
    console.log("response: ", response);

    response && alert("record deleted successfull!");

    return id;
  } catch (err) {
    console.log("err: ", err);
    alert("Network error");
  }
});
