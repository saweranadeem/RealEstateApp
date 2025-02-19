import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify"; // ✅ Import toast

const initialState = {
  currentUser: null,
  error: null,
  loading: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload; // ✅ Fix the state update
      state.loading = false;
      state.error = null;
      toast.success("Login successful!"); // ✅ Success toast
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      toast.error(action.payload || "Login failed!"); // ✅ Error toast
    },
  },
});

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;
export default userSlice.reducer;
