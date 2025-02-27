import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const savedProfiles = JSON.parse(localStorage.getItem("profiles")) || [];

export const fetchProfiles = createAsyncThunk(
  "profiles/fetchUsers",
  async () => {
    const response = await axios.get("http://localhost:5000/profiles");
    localStorage.setItem("profiles", JSON.stringify(response.data));
    return response.data;
  }
);

const profileById = (state, profileId) => {
  return state.profiles.value.find((profile) => profile.id == profileId);
};

const profileSlice = createSlice({
  name: "profiles",
  initialState: {
    value: savedProfiles,
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfiles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfiles.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Popolo lo state con i dati ricevuti
        state.value = action.payload;
      })
      .addCase(fetchProfiles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export { profileById };
export default profileSlice.reducer;
