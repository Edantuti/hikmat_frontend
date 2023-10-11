import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    authenticated: { value: false },
    userData: {},
  },
  reducers: {
    changeAuthentication: (state, action: { payload: boolean }) => {
      state.authenticated = { value: action.payload };
    },
    setUserData: (state, action) => {
      state.userData = { ...action.payload };
    },
  },
});

export const { changeAuthentication, setUserData } = AuthSlice.actions;

export default AuthSlice.reducer;
