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
        viewUsers: true,
        changeData: true,
      },
      {
        id: 2,
        viewUsers: true,
        changeData: false,
      },
      {
        id: 3,
        changeData: false,
        deleteData: false,
      },
    ],
  },
});

export { profileById };
export default profileSlice.reducer;
