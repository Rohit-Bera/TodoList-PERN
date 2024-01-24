import React, { useState, useEffect } from "react";
import axios from "axios";
import ShowRecord from "./ShowRecord";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { allTask } from "../store/lib/tasks.reducer";

const AddRecord = () => {
  const user = useSelector((state) => state.userReducer).username;
  const email = useSelector((state) => state.userReducer).email;
  const pass = useSelector((state) => state.userReducer).password;
  const user_id = useSelector((state) => state.userReducer).id;

  const navigate = useNavigate();
  useEffect(() => {
    if (email === "" && pass === "") {
      navigate("/");
      return;
    }
  }, []);

  const url = `http://localhost:5800`;
  const [record, setRecord] = useState({
    date: "",
    task: "",
  });

  const [records, setRecords] = useState([]);
  const [id, setId] = useState("");

  useEffect(() => {
    getRecords();
  }, []);

  const dispatch = useDispatch();

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setRecord({ ...record, [name]: value });
  };

  const handleSubmit = async () => {
    console.log("record: ", record);

    if (record.date === "" || record.task === "")
      return alert("please fill all details");

    try {
      const response = await axios.post(url + `/postList/${user_id}`, record);
      console.log("response: ", response);

      response.status === 200 && alert("record added successfull");
      setRecord({
        date: "",
        task: "",
      });
      getRecords();
    } catch (err) {
      console.log("err: ", err);
    }
  };

  const handleUpdate = async () => {
    console.log("record: ", record);
    console.log("id: ", id);
    if (record.date === "" || record.task === "")
      return alert("please fill all details");

    try {
      const response = await axios.put(url + `/putList/${id}`, record);

      response && alert("record updated successfull!");

      if (response.status === 200) {
        setRecord({
          date: "",
          task: "",
        });
        setId("");
        getRecords();
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const rejectRefresh = (e) => {
    e.preventDefault();
  };

  const editData = (item) => {
    console.log("item: ", item);

    setRecord({
      ...record,
      date: item.date,
      task: item.task,
    });

    setId(item.id);
  };

  const getRecords = () => {
    try {
      fetch(url + `/getList/${user_id}`)
        .then((res) => {
          res.json().then((data) => {
            console.log("data :", data);
            setRecords(data?.rows);
            const rows = data?.rows;
            dispatch(allTask(rows));
          });
        })
        .catch((err) => {
          console.log("err: ", err);
        });
    } catch (err) {
      console.log("err: ", err);
    }
  };

  const deleteData = async (id) => {
    try {
      const response = await axios.delete(url + `/deleteList/${id}`);

      response && alert("record deleted successfull!");

      getRecords();
    } catch (err) {
      console.log("err: ", err);
    }
  };

  return (
    <>
      <div className="listContainer">
        <form onSubmit={rejectRefresh}>
          <h3>Hello {user}!</h3>
          <h2>ToDo List</h2>
          <input
            type="date"
            name="date"
            value={record.date}
            onChange={handleInput}
          />
          <input
            type="text"
            name="task"
            value={record.task}
            onChange={handleInput}
            className="task"
          />

          <button onClick={handleSubmit}>submit</button>
          <button onClick={handleUpdate}>update</button>
        </form>
        <ShowRecord
          editData={editData}
          records={records}
          deleteData={deleteData}
        />
      </div>
    </>
  );
};

export default AddRecord;
