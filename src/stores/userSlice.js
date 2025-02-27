import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Imposto valore dello state
const savedUsers = JSON.parse(localStorage.getItem("users")) || [];

// Faccio chiamata API e salvo in localStorage
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get("http://localhost:5000/users");
  localStorage.setItem("users", JSON.stringify(response.data));
  return response.data;
});

// Inizializzo valore dell'utente loggato
const storedUser = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))
  : null;

const usersSlice = createSlice({
  name: "users",
  initialState: {
    value: savedUsers,
    currentUser: storedUser,
    status: "idle",
    error: null,
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

    deleteUser: (state, action) => {
      state.value = state.value.filter((user) => user.id !== action.payload);
      localStorage.setItem("users", JSON.stringify(state.value));
    },

    updateUser: (state, action) => {
      const { id, name, email, description, profileId } = action.payload;
      // Verifica quale utente (in tutto l'array) ha l'id uguale a quello delle modifiche
      const index = state.value.findIndex((user) => user.id === id);
      if (index !== -1) {
        state.value[index].name = name;
        state.value[index].email = email;
        state.value[index].description = description;
        state.value[index].profileId = profileId;
        localStorage.setItem("users", JSON.stringify(state.value));
        // Se l'utente aggiornato è anche quello connesso, aggiornalo anche in currentUser
        if (state.currentUser && state.currentUser.id === id) {
          state.currentUser = {
            ...state.currentUser,
            name,
            email,
            description,
            profileId,
          };
          localStorage.setItem(
            "currentUser",
            JSON.stringify(state.currentUser)
          );
        }
      }
    },

    createUser: (state, action) => {
      const newUser = action.payload;
      const newId =
        state.value.length > 0
          ? Math.max(...state.value.map((u) => u.id)) + 1
          : 0;
      newUser.id = newId;
      state.value.push(newUser);
      localStorage.setItem("users", JSON.stringify(state.value));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        // popolo lo state con i dati ricevuti
        state.value = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  login,
  logout,
  changeName,
  changeDescription,
  deleteUser,
  updateUser,
  createUser,
} = usersSlice.actions;
export default usersSlice.reducer;
