import { createSlice } from "@reduxjs/toolkit";
import bcrypt from "bcryptjs";
import foto_1 from "../assets/foto-1.jpg";
import foto_2 from "../assets/foto-2.jpg";
import foto_3 from "../assets/foto-3.jpg";
import foto_4 from "../assets/foto-4.jpg";
import foto_5 from "../assets/foto-5.jpg";
import foto_6 from "../assets/foto-6.jpg";
import foto_7 from "../assets/foto-7.jpg";
import foto_8 from "../assets/foto-8.jpg";
import foto_9 from "../assets/foto-9.jpg";

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
        img: foto_6,
        gender: "f",
        profileId: 1,
        description:
          "Ama viaggiare e scoprire nuove culture. Appassionata di fotografia.",
      },
      {
        id: 1,
        name: "Barbara",
        email: "barbara@email.com",
        password: "ciaociao2",
        isChecked: false,
        img: foto_9,
        gender: "f",
        profileId: 2,
        description:
          "Grafica e designer, sempre alla ricerca di ispirazione nei dettagli.",
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
          "Amante della tecnologia e del coding, sempre con un nuovo progetto in mente.",
      },
      {
        id: 3,
        name: "Luca",
        email: "luca@email.com",
        password: "pass123",
        isChecked: false,
        img: foto_4,
        gender: "m",
        profileId: 3,
        description:
          "Sportivo e appassionato di fitness, adora le sfide e il lavoro di squadra.",
      },
      {
        id: 4,
        name: "Elena",
        email: "elena@email.com",
        password: "elenaPass",
        isChecked: false,
        img: foto_5,
        gender: "f",
        profileId: 3,
        description:
          "Musicista nel tempo libero, sempre con una chitarra in mano e una canzone in testa.",
      },
      {
        id: 5,
        name: "Marco",
        email: "marco@email.com",
        password: "marco321",
        isChecked: false,
        img: foto_2,
        gender: "m",
        profileId: 3,
        description:
          "Appassionato di cucina e buon cibo, sperimenta sempre nuove ricette.",
      },
      {
        id: 6,
        name: "Sofia",
        email: "sofia@email.com",
        password: "sofia123",
        isChecked: false,
        img: foto_7,
        gender: "f",
        profileId: 3,
        description:
          "Grande lettrice, ama i romanzi storici e scrive recensioni sui libri che legge.",
      },
      {
        id: 7,
        name: "Andrea",
        email: "andrea@email.com",
        password: "andreaPass",
        isChecked: false,
        img: foto_1,
        gender: "m",
        profileId: 3,
        description:
          "Viaggia per il mondo come fotografo freelance, racconta storie attraverso le immagini.",
      },
      {
        id: 8,
        name: "Valentina",
        email: "valentina@email.com",
        password: "valepass",
        isChecked: false,
        img: foto_8,
        gender: "f",
        profileId: 3,
        description:
          "Ingegnere ambientale, lavora per un futuro più sostenibile e green.",
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
        // Cambia il nome dell'utente connesso
        state.currentUser.name = action.payload;
        // Aggiorna la lista utenti con il nuovo nome
        const userIndex = state.value.findIndex(
          (u) => u.id === state.currentUser.id
        );
        if (userIndex !== -1) {
          state.value[userIndex].name = action.payload;
        }
        localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
      }
    },

    changeDescription: (state, action) => {
      if (state.currentUser) {
        // Cambia la descrizione dell'utente connesso
        state.currentUser.description = action.payload;
        // Aggiorna la lista utenti con la nuova descrizione
        const userIndex = state.value.findIndex(
          (u) => u.id === state.currentUser.id
        );
        if (userIndex !== -1) {
          state.value[userIndex].description = action.payload;
        }
        localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
      }
    },
  },
});

export const { login, logout, changeName, changeDescription } =
  usersSlice.actions;
export default usersSlice.reducer;
