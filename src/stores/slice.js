import { createSlice } from "@reduxjs/toolkit";
import bcrypt from "bcryptjs";
import foto_1 from "../assets/foto-1.jpg";
import foto_2 from "../assets/foto-2.jpg";
import foto_3 from "../assets/foto-3.jpg";

const storedUser = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))
  : null;

const hashPassword = (password) => bcrypt.hashSync(password, 10);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    value: [
      {
        id: 0,
        name: "Gaia",
        email: "gaia@email.com",
        password: hashPassword(password),
        isChecked: false,
        img: foto_1,
        gender: "f",
      },
      {
        id: 1,
        name: "Barbara",
        email: "barbara@email.com",
        password: hashPassword(password),
        isChecked: false,
        img: foto_2,
        gender: "f",
      },
      {
        id: 2,
        name: "Riccardo",
        email: "riccardo@email.com",
        password: hashPassword(password),
        isChecked: false,
        img: foto_3,
        gender: "m",
      },
    ],
    currentUser: storedUser,
  },
  reducers: {
    login: (state, action) => {
      const user = state.value.find((u) => u.email == action.payload.email);
      const hashedPassword = bcrypt.compareSync(
        action.payload.password,
        user.password
      );
      user.isChecked = action.payload.isChecked;

      if (user && hashedPassword) {
        state.currentUser = user;
        localStorage.setItem("currentUser", JSON.stringify(user));
      }
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },
  },
});

export const { login, logout } = usersSlice.actions;
export default usersSlice.reducer;
