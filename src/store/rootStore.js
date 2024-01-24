import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./lib/user.reducer";
import tasksReducer from "./lib/tasks.reducer";

export const rootReducer = combineReducers({
  userReducer,
  tasksReducer,
});

export default rootReducer;
