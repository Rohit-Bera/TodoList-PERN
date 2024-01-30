import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user reducer",
  initialState: {
    id: "",
    username: "",
    email: "",
    password: "",
  },
  reducers: {
    storeUser: (state, action) => {
      console.log("action: ", action);
      const { id, username, email, password } = action.payload;

      state.id = id;
      state.username = username;
      state.email = email;
      state.password = password;
    },
  },
});

export const { storeUser } = userSlice.actions;
export default userSlice.reducer;
