import { createSlice } from "@reduxjs/toolkit";
import { Value } from "sass";

const profileById = (state, profileId) => {
  return state.profiles.value.find((profile) => profile.id == profileId);
};

const profileSlice = createSlice({
  name: "profiles",
  initialState: {
    value: [
      {
        id: 1,
        changeText: true,
        changeName: true,
      },
      {
        id: 2,
        changeText: true,
        changeName: false,
      },
      {
        id: 3,
        changeText: false,
        changeName: false,
      },
    ],
  },
});

export { profileById };
export default profileSlice.reducer;
