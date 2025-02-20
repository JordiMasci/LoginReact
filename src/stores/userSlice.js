import { createSlice } from "@reduxjs/toolkit";
import bcrypt from "bcryptjs";
import foto_1 from "../assets/foto-1.jpg";
import foto_2 from "../assets/foto-2.jpg";
import foto_3 from "../assets/foto-3.jpg";

const storedUser = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))
  : null;

const usersSlice = createSlice({
  name: "users",
  initialState: {
    value: [
      {
        id: 0,
        name: "Gaia",
        email: "gaia@email.com",
        password: "ciaociao",
        isChecked: false,
        img: foto_1,
        gender: "f",
        profileId: 1,
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima, perferendis!",
      },
      {
        id: 1,
        name: "Barbara",
        email: "barbara@email.com",
        password: "ciaociao2",
        isChecked: false,
        img: foto_2,
        gender: "f",
        profileId: 2,
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima, perferendis!",
      },
      {
        id: 2,
        name: "Riccardo",
        email: "riccardo@email.com",
        password: "ciaociao3",
        isChecked: false,
        img: foto_3,
        gender: "m",
        profileId: 3,
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima, perferendis!",
      },
    ],
    currentUser: storedUser,
  },
  reducers: {
    login: (state, action) => {
      const user = state.value.find(
        (u) =>
          u.email == action.payload.email &&
          u.password == action.payload.password
      );

      if (user) {
        user.isChecked = action.payload.isChecked;
        state.currentUser = user;
        localStorage.setItem("currentUser", JSON.stringify(user));
      }
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },

    changeName: (state, action) => {
      if (state.currentUser) {
        state.currentUser.name = action.payload;
        localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
      }
    },
  },
});

export const { login, logout, changeName } = usersSlice.actions;
export default usersSlice.reducer;
