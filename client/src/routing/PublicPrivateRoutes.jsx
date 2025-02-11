import React from "react";
import { Routes, Route } from "react-router-dom";
import About from "../pages/About";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Login from "../auth/Login";
import SignUp from "../auth/SignUp";
const PublicPrivateRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/profile" element={<SignUp />} />
      </Routes>
    </>
  );
};

export default PublicPrivateRoutes;
