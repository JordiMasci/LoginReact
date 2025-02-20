import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./userSlice";
import profilesReducer from "./profileSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    profiles: profilesReducer,
  },
});
