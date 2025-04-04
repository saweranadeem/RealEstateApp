import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Loader";
import OAuth from "../components/OAuth";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const SignUp = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const UserName = userName.trim();
    const Email = email.trim();
    const Password = password.trim();

    let errors = {};
    if (!UserName) {
      errors.userName = "Username is required";
    }

    if (!Email) {
      errors.email = "Email is required";
    }

    if (!Password) {
      errors.password = "Password is required";
    }

    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((errormsg) => toast.error(errormsg));
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/user/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: UserName,
          email: Email,
          password: Password,
        }),
      });

      const data = await response.json();

      setLoading(false);

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong!");
      }

      toast.success(data.message);
      setTimeout(() => navigate("/sign-in"), 1500);
    } catch (error) {
      setLoading(false);
      toast.error(error.message || "Error while signing up");
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center my-7 font-semibold">Sign Up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="border p-3 rounded-lg"
          />
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
            Sign Up
          </button>
          <OAuth />
        </form>
        <div className="mt-3 text-lg">
          <p>
            Already have an account?
            <Link to="/sign-in">
              <span className="text-blue-700 ml-2">Login</span>
            </Link>
          </p>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default SignUp;
