import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [searchTerm, setsearchTerm] = useState("");
  console.log(searchTerm);
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setsearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="bg-gray-100 py-4 shadow-md flex justify-between items-center px-6">
      <Link to="/">
        <h1 className="text-3xl font-bold">
          <span className="text-slate-500">Sawaira</span>
          <span className="text-slate-700">Estate</span>
        </h1>
      </Link>

      {/* Search Bar */}
      <form className="relative w-72 sm:w-96" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => {
            setsearchTerm(e.target.value);
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
        />
        <button>
          <SearchIcon className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer" />
        </button>
      </form>

      {/* Navigation Links */}
      <ul className="list-none flex gap-4">
        <Link to="/">
          <li className="hidden text-slate-700 sm:inline hover:underline">
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
    </header>
  );
};

export default Header;
