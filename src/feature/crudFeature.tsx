import { createSlice } from "@reduxjs/toolkit";
import { User } from "../App";

const initialState = sessionStorage.getItem("User")
  ? JSON.parse(sessionStorage.getItem("User") || "")
  : [];

let crudSlice = createSlice({
  name: "crud",
  initialState: initialState,
  reducers: {
    addUser: function (state, action) {
      const check = state.find(
        (user: User) =>
          user.userName === action.payload.userName ||
          user.userPhone === action.payload.userPhone
      );
      if (check) {
        alert("Invalid credentials, try again");
      } else {
        state.push(action.payload);
      }
      sessionStorage.setItem("User", JSON.stringify(state));
    },

    deleteUser: function (state, action) {
      const check: User = state.filter(
        (user: User) => user.userId !== action.payload
      );
      if (check) {
        sessionStorage.setItem("User", JSON.stringify(check));
      }
      return check;
    },

    updateUser: function (state, { payload }) {
      const index = state.findIndex((user: User) => user.userId === payload.id);
      if (index > -1) {
        state[index].userName = payload.name;
        state[index].userPhone = payload.phone;
      }

      sessionStorage.setItem("User", JSON.stringify(state));
    },
  },
});

export const { addUser, deleteUser, updateUser } = crudSlice.actions;
export default crudSlice.reducer;
