import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify"; // ✅ Import toast

const initialState = {
  currentUser: JSON.parse(localStorage.getItem("currentUser")) || null, // ✅ Persist user in local storage
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
      localStorage.setItem("currentUser", JSON.stringify(action.payload)); // ✅ Store user in local storage
      toast.success("Login successful!");
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      toast.error(action.payload || "Login failed!");
    },
    updateStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
      localStorage.setItem("currentUser", JSON.stringify(action.payload)); // ✅ Store updated user in local storage
      toast.success("User Updated Successfully");
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      toast.error(action.payload || "Updation Failed");
    },

    // ✅ Delete Actions
    deleteStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    deleteSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("currentUser"); // ✅ Remove user from local storage
      toast.success("Account deleted successfully!");
    },
    deleteFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      toast.error(action.payload || "Account deletion failed!");
    },
    signOutStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    signOutSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("currentUser"); // ✅ Remove user from local storage
      toast.success("User Logout successfully!");
    },
    signOutFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      toast.error(action.payload || "Account deletion failed!");
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateStart,
  updateSuccess,
  updateFailure,
  deleteStart,
  deleteSuccess,
  deleteFailure,
  signOutStart,
  signOutSuccess,
  signOutFailure,
} = userSlice.actions;
export default userSlice.reducer;
