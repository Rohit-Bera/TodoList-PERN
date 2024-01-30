import { createSlice } from "@reduxjs/toolkit";
import {
  addTask,
  deleteTask,
  getTask,
  updateTask,
} from "../../services/task.service";

// alternative way to use redux toolkit
const taskSlice = createSlice({
  name: "users tasks",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {
    allTask: (state, action) => {
      state.tasks = action.payload.rows;
      // console.log("action.payload: ", action.payload);
    },
  },
  extraReducers: (builder) => {
    // read
    builder.addCase(getTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTask.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
      console.log("action.payload: ", action.payload);
    });
    builder.addCase(getTask.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload;
      console.log("action.payload: ", action.payload);
    });

    // create
    builder.addCase(addTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addTask.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload !== false) {
        state.tasks.push(action.payload);
      }
    });
    builder.addCase(addTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //update
    builder.addCase(updateTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateTask.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks = state.tasks.map((e) =>
        e.id === action.payload.id ? action.payload : e
      );
    });
    builder.addCase(updateTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //delete
    builder.addCase(deleteTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.loading = false;

      const id = action.payload;
      console.log("action.payload: ", action.payload);
      if (id) {
        state.tasks = state.tasks.filter((e) => e.id !== id);
      }
    });
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { allTask } = taskSlice.actions;
export default taskSlice.reducer;
