import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
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
import { Link } from "react-router-dom";

const Profile = () => {
  // Retrieve the logged-in user's data from Redux
  const dispatch = useDispatch();

  const { currentUser, loading } = useSelector((state) => state.user);
  const [error, setshowError] = useState(false);
  const [fetching, setFetching] = useState(false);
  // const[loader,setLoader]=use
  const [userListings, setUserListing] = useState([]);
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
  const fetchList = async () => {
    setFetching(true);
    setshowError(false);
    try {
      const response = await fetch(`/api/user/listings/${currentUser._id}`, {
        method: "get",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();

      if (data.success === false) {
        setshowError(data.message);
      }
      setFetching(false);
      setUserListing(data);
      alert(JSON.stringify(listing));
    } catch (error) {
      setshowError(error);
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
  const handleListingDelete = async (listingId) => {
    alert(JSON.stringify(listingId));
    try {
      const response = await fetch(`/api/list/deleteList/${listingId}`, {
        method: "delete",
      });
      const data = await response.json();
      if (data.success === false) {
        console.error(data.message);
        return;
      }
      setUserListing((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      {fetching && <Loader />}
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
          <Link
            className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95 cursor-pointer"
            to={"/create-listing"}
          >
            Create Listing
          </Link>
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
      <button
        // type="button"
        onClick={fetchList}
        className="text-green-700 text-xl "
        style={{ marginLeft: "165px" }}
      >
        Show Listing
      </button>

      {userListings && userListings.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-center mt-7 text-2xl font-semibold">
            Your Listings
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="border rounded-lg p-3 flex justify-between items-center gap-4"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrl[0]}
                  alt="listing cover"
                  className="h-16 w-16 object-contain"
                />
              </Link>
              <Link
                className="text-slate-700 font-semibold  hover:underline truncate flex-1"
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>

              <div className="flex flex-col item-center">
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className="text-red-700 uppercase"
                >
                  Delete
                </button>
                <Link to={`/updatelist/${listing._id}`}>
                  <button className="text-green-700 uppercase">Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
