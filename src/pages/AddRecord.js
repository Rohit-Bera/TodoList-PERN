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
import Title from "../components/Title";

const AddRecord = () => {
  const user = useSelector((state) => state.userReducer).username;
  const email = useSelector((state) => state.userReducer).email;
  const pass = useSelector((state) => state.userReducer).password;
  const user_id = useSelector((state) => state.userReducer).id;

  const rows = useSelector((state) => state.tasksReducer).tasks;

  const [isLoading, setLoading] = useState(false);
  const [addLoading, setaddLoading] = useState(false);
  const [editLoading, seteditLoading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (email === "" && pass === "") {
      navigate("/");
      return;
    }
  }, []);

  // const url = `http://localhost:5800`;

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
    setaddLoading(true);
    const response = await addTask({ record, user_id });

    if (response) {
      setaddLoading(false);
      getRecords();
    }
    setRecord({
      date: "",
      task: "",
    });
    setaddLoading(false);
  };

  const handleUpdate = async () => {
    // console.log("record: ", record);
    // console.log("id: ", id);
    seteditLoading(true);
    const response = await updateTask({ record, id });

    seteditLoading(false);
    setRecord({
      date: "",
      task: "",
    });
    setId("");
    getRecords();
    seteditLoading(false);
  };

  const getRecords = async () => {
    setLoading(true);
    const response = await getTask({ user_id });

    if (response.error) {
      setRecords(rows);
      setLoading(false);
      return;
    } else {
      dispatch(allTask(response.rows));
      setRecords(response.rows);

      setLoading(false);
      return;
    }
  };

  const deleteData = async (id) => {
    const result = await deleteTask({ id });

    getRecords();
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

            {addLoading ? (
              <Loader />
            ) : (
              <Button title="+" clickAction={handleAdd} />
            )}

            {editLoading ? (
              <Loader />
            ) : (
              <Button title="update" clickAction={handleUpdate} />
            )}
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
