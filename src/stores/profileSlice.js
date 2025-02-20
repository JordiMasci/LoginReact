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
        newText: true,
        // viewName: true,
        // viewImg: true,
        // viewEmail: true,
      },
      {
        id: 2,
        changeText: true,
        newText: false,
        // viewName: true,
        // viewImg: true,
        // viewEmail: false,
      },
      {
        id: 3,
        changeText: false,
        newText: false,
        // viewName: true,
        // viewImg: false,
        // viewEmail: false,
      },
    ],
  },
});

export { profileById };
export default profileSlice.reducer;
