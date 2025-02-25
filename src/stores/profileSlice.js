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
        superAdmin: true,
        changeData: true,
        deleteData: true,
      },
      {
        id: 2,
        name: "Admin",
        admin: true,
        changeData: true,
        deleteData: false,
      },
      {
        id: 3,
        name: "Utente",
        user: true,
        changeData: false,
        deleteData: false,
      },
    ],
  },
});

export { profileById };
export default profileSlice.reducer;
