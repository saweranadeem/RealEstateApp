import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure toast styles are loaded
import Loader from "./Loader";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/slices/UserSlice";

import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [loading, setLoading] = useState(false);
  const { loading, error } = useSelector((state) => state.user);
  const [errors, setError] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ Prevent form from reloading the page

    let errors = {};
    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";

    setError(errors);

    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((errormsg) => {
        toast.error(errormsg);
      });
      return;
    }

    // setLoading(true);
    dispatch(signInStart());

    try {
      const response = await fetch("/api/user/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      // setLoading(false);

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong!");
      }

      // toast.success(data.message);
      dispatch(signInSuccess(data.user));
      setTimeout(() => {
        navigate("/"); // ✅ Only navigate after toast
      }, 1500);
    } catch (error) {
      // setLoading(false);
      // toast.error(error.message || "Error while logging in");
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center my-7 font-semibold">Sign In</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 rounded-lg"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-3 rounded-lg"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-slate-700 p-3 cursor-pointer rounded-lg uppercase text-white hover:opacity-95 disabled:opacity-80"
          >
            Sign In
          </button>
          <OAuth  />
        </form>
        <div className="mt-3 text-lg">
          <p>
            Dont have an account?
            <Link to="/sign-up">
              <span className="text-blue-700 ml-2">Sign up</span>
            </Link>
          </p>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Login;
