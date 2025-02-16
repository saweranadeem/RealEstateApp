import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import Loader from "./Loader";

const SignUp = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false);
  const [error, setError] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ Prevent form from reloading the page
    let errors = {};
    if (!userName) errors.userName = "User name is required";

    if (!password) errors.password = "Password is required";

    if (!email) errors.email = "Email is required";

    setError(errors);
    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((errormsg) => {
        toast.error(errormsg);
      });
    }

    const formData = { userName, email, password };
    setloading(true);
    try {
      const response = await fetch("/api/user/sign-up", {
        method: "post",
        headers: {
          "Content-Type": "application/json", //type of data
        },
        body: JSON.stringify(formData), //it tells the browser take the data from frontend(body) and send it to the backend
      });

      const data = await response.json();
      setloading(false);
      if (data.success === true) {
        toast.success(data.message);
      }
      navigate("/sign-in");
    } catch (error) {
      setloading(false);
      toast.error(error.message || "Error while making registration");
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
            name="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 rounded-lg"
          />
          <input
            type="password" // ✅ Changed type from "text" to "password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-slate-700 p-3 rounded-lg uppercase text-white hover:opacity-95 disabled:opacity-80"
          >
            Sign Up
          </button>
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
