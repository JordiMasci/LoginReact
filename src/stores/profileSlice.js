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
        changeData: true,
        deleteData: true,
        superAdmin: true,
      },
      {
        id: 2,
        changeData: true,
        deleteData: false,
        superAdmin: false,
      },
      {
        id: 3,
        changeData: false,
        deleteData: false,
        superAdmin: false,
      },
    ],
  },
});

export { profileById };
export default profileSlice.reducer;
