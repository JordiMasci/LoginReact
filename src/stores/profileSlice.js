import { createSlice } from "@reduxjs/toolkit";

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
        deleteData: true,
      },
      {
        id: 2,
        viewUsers: true,
        deleteData: false,
      },
      {
        id: 3,
        viewUsers: false,
        deleteData: false,
      },
    ],
  },
});

export { profileById };
export default profileSlice.reducer;
