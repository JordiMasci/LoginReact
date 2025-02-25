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
        name: "Super Admin",
        changeData: true,
        deleteData: true,
        superAdmin: true,
      },
      {
        id: 2,
        name: "Admin",
        changeData: true,
        deleteData: false,
        superAdmin: false,
      },
      {
        id: 3,
        name: "Utente",
        changeData: false,
        deleteData: false,
        superAdmin: false,
      },
    ],
  },
});

export { profileById };
export default profileSlice.reducer;
