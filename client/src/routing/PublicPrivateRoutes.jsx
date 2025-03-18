import React from "react";
import { Routes, Route } from "react-router-dom";
import About from "../pages/About";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Login from "../auth/Login";
import SignUp from "../auth/SignUp";
import PrivateRoute from "../components/PrivateRoute";
import CreateListing from "../pages/CreateListing";
import UpdateListing from "../pages/UpdateListing";
import Listing from "../pages/listing";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";

import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import Search from "../pages/Search";
const PublicPrivateRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/listing/:id" element={<Listing />} />
        <Route path="/search" element={<Search />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/updatelist/:id" element={<UpdateListing />} />
        </Route>
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </>
  );
};

export default PublicPrivateRoutes;
