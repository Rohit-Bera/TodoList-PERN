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

export const addTask = createAsyncThunk(
  "addTask",
  async ({ record, user_id }) => {
    // console.log("record: ", record);

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
