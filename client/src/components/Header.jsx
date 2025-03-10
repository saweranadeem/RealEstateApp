import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <>
      <header className="bg-gray-100 py-4 shadow-md flex justify-around  items-center">
        <Link to="/">
          <h1 className="text-3xl font-bold">
            <span className="text-slate-500">Sawaira</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>

        <div className="">
          <ul className="list-none flex gap-4 ">
            <Link to="/">
              <li className="hidden text-slate-700 sm:inline  hover:underline">
                Home
              </li>
            </Link>
            <Link to="/about">
              <li className="hidden text-slate-700 sm:inline hover:underline">
                About
              </li>
            </Link>
            <Link to="/profile">
              {currentUser ? (
                <li className="text-slate-700 hover:underline">Profile</li>
              ) : (
                <li className="text-slate-700 hover:underline">Sign in</li>
              )}
            </Link>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
