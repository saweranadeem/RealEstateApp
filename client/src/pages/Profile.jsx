import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../auth/Loader.css";
import {
  updateStart,
  updateFailure,
  updateSuccess,
  deleteStart,
  deleteSuccess,
  deleteFailure,
  signInStart,
  signOutFailure,
  signOutStart,
  signOutSuccess,
} from "../../redux/slices/UserSlice";
import Loader from "../auth/Loader";

const Profile = () => {
  // Retrieve the logged-in user's data from Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, loading } = useSelector((state) => state.user);

  // Initialize form state with current user data
  const [formData, setFormData] = useState({});
  // alert(JSON.stringify(currentUser._id));
  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    dispatch(updateStart()); // ✅ Fix function call

    try {
      const response = await fetch(
        `/api/user/updateLoginUser/${currentUser._id}`, // ✅ Fix template string
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // credentials: "include",
          body: JSON.stringify(formData), // ✅ Send entire formData
        }
      );

      const data = await response.json(); // ✅ Await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong!");
      }

      dispatch(updateSuccess(data));
    } catch (error) {
      dispatch(updateFailure(error.message));
    }
  };
  const handleDelete = async () => {
    dispatch(deleteStart());
    try {
      const res = await fetch(`/api/user/deleteUser/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong!");
      }
      dispatch(deleteSuccess(data));
    } catch (error) {
      dispatch(deleteFailure(error.message));
    }
  };
  const handlelogout = async () => {
    dispatch(signOutStart());
    try {
      const response = await fetch("/api/user/logOutuser");
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong!");
      }
      dispatch(signOutSuccess(data));
    } catch (error) {
      dispatch(signOutFailure());
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      {loading && <Loader />}
      <h1 className="text-3xl text-center my-7 font-semibold">Profile</h1>
      {currentUser ? (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            defaultValue={currentUser.userName}
            className="border p-3 rounded-lg"
            id="userName"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            defaultValue={currentUser.email}
            className="border p-3 rounded-lg"
            id="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            // defaultValue={currentUser.password}
            className="border p-3 rounded-lg"
            id="password"
            onChange={handleChange}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-slate-700 p-3 rounded-lg uppercase cursor-pointer text-white hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Loading.." : "Update"}
          </button>
          <div className="flex justify-between">
            <span
              onClick={handleDelete}
              className="text-red-700 cursor-pointer"
            >
              Delete Account
            </span>
            <span
              onClick={handlelogout}
              className="text-red-700 cursor-pointer"
            >
              Sign Out
            </span>
          </div>
        </form>
      ) : (
        <p className="text-center text-red-500">User not logged in!</p>
      )}
    </div>
  );
};

export default Profile;
