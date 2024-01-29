import axios from "axios";

const url = `https://todolist-server-n303.onrender.com`;

export const getTask = async ({ user_id }) => {
  try {
    const response = await axios.get(url + `/getList/${user_id}`);

    const rows = response.data?.rows;

    if (rows) {
      return { rows };
    }
  } catch (err) {
    console.log("err: ", err);

    alert("Network error");
    return { error: err };
  }
};

export const addTask = async ({ record, user_id }) => {
  // console.log("record: ", record);

  if (record.date === "" || record.task === "")
    return alert("please fill all details");

  try {
    const response = await axios.post(url + `/postList/${user_id}`, record);
    console.log("response: ", response);

    response.status === 200 && alert("record added successfull");

    return response;
  } catch (err) {
    console.log("err: ", err);
    alert("Network error");
  }
};

export const updateTask = async ({ record, id }) => {
  if (record.date === "" || record.task === "")
    return alert("please fill all details");

  try {
    const response = await axios.put(url + `/putList/${id}`, record);

    response && alert("record updated successfull!");

    return response;
  } catch (error) {
    console.log("error: ", error);
    alert("Network error");
  }
};

export const deleteTask = async ({ id }) => {
  try {
    const response = await axios.delete(url + `/deleteList/${id}`);

    response && alert("record deleted successfull!");
  } catch (err) {
    console.log("err: ", err);
    alert("Network error");
  }
};
