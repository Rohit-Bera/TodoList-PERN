import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "users tasks",
  initialState: {
    tasks: [],
  },
  reducers: {
    allTask: (state, action) => {
      state.tasks = action.payload.rows;
      // console.log("action.payload: ", action.payload);
    },
  },
});

export const { allTask } = taskSlice.actions;
export default taskSlice.reducer;
