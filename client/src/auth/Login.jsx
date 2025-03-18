import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Loader";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/slices/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { loading } = useSelector((state) => state.user);
  const [errors, setError] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    dispatch(signInStart());

    try {
      const response = await fetch("/api/user/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong!");
      }

      dispatch(signInSuccess(data.user));
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
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
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-3 rounded-lg w-full pr-10"
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiFillEyeInvisible size={24} />
              ) : (
                <AiFillEye size={24} />
              )}
            </span>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-slate-700 p-3 cursor-pointer rounded-lg uppercase text-white hover:opacity-95 disabled:opacity-80"
          >
            Sign In
          </button>
          <OAuth />
        </form>
        <div className="mt-3 text-lg">
          <p>
            Don't have an account?
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
