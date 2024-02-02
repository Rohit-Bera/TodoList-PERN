import React, { useState, useEffect } from "react";
import axios from "axios";
import ShowRecord from "../components/ShowRecord";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { allTask } from "../store/lib/tasks.reducer";
import {
  addTask,
  deleteTask,
  getTask,
  updateTask,
} from "../services/task.service";
import Loader from "../components/Loader";
import { handleSubmit } from "../services/user.service";
import Input from "../components/Input";
import Button from "../components/Button";

const AddRecord = () => {
  const user = useSelector((state) => state.userReducer).username;
  const email = useSelector((state) => state.userReducer).email;
  const pass = useSelector((state) => state.userReducer).password;
  const user_id = useSelector((state) => state.userReducer).id;

  const isLoading = useSelector((state) => state.tasksReducer).loading;

  const records = useSelector((state) => state.tasksReducer).tasks;
  console.log("records: ", records);

  const navigate = useNavigate();
  useEffect(() => {
    if (email === "" && pass === "") {
      navigate("/");
      return;
    }
  }, []);

  useEffect(() => {
    getRecords();
  }, []);
  // const url = `http://localhost:5800`;

  const [record, setRecord] = useState({
    date: "",
    task: "",
  });

  const [id, setId] = useState("");

  const dispatch = useDispatch();

  const getRecords = () => {
    dispatch(getTask({ user_id }));
  };

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setRecord({ ...record, [name]: value });
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

  const handleAdd = async () => {
    if (record.date === "" || record.task === "")
      return alert("please fill all details");

    dispatch(addTask({ record, user_id }));
    setRecord({
      date: "",
      task: "",
    });
  };

  const handleUpdate = async () => {
    if (record.date === "" || record.task === "")
      return alert("please fill all details");

    dispatch(updateTask({ record, id }));
    setRecord({
      date: "",
      task: "",
    });
    setId("");
  };

  const deleteData = async (id) => {
    dispatch(deleteTask({ id }));
    setId("");
  };

  const commonStyle = "flex justify-around items-center";

  return (
    <>
      <div
        className={`min-h-screen overflow-hidden ${commonStyle} w-[100%] flex-wrap flex-col`}
      >
        <div
          className={`${commonStyle} bg-casual w-[70vw] h-[11vh] mt-10 flex-wrap text-white rounded-xl
          border-r-primary border-b-primary border-r-8 border-b-8`}
        >
          <span> Hello {user} </span>
          <span> What are your today's updates ?</span>
          <Button
            title="history"
            className="bg-black border-2 border-white"
            clickAction={() => navigate("/history?page=1&l=8&off=0")}
          />
        </div>

        <div
          className={`bg-primary w-[70vw] min-h-[70vh] mt-8 overflow-hidden p-1 rounded-xl flex-col 
          border-r-black border-b-black border-r-8 border-b-8`}
        >
          <form onSubmit={handleSubmit} className={`flex-wrap`}>
            <Input
              type="date"
              name="date"
              value={record.date}
              handleInput={handleInput}
            />
            <Input
              type="text"
              name="task"
              value={record.task}
              handleInput={handleInput}
              className="w-[50vw]"
              placeholder="your today's task"
            />

            <Button title="+" clickAction={handleAdd} />

            <Button title="update" clickAction={handleUpdate} />
          </form>
          {isLoading ? (
            <div className={`w-full h-full ${commonStyle}`}>
              <Loader />
            </div>
          ) : (
            <ShowRecord
              editData={editData}
              records={records}
              deleteData={deleteData}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default AddRecord;
