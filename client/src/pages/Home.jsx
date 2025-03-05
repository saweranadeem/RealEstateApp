import React from "react";

const Home = () => {
  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find your next <span className="text-slate-500">perfect</span>
          <br />
          place with ease
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          Sawaira Estate is the best place to find your next perfect place to
          live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <a
          href="https://www.realestate.com.au/" // Fixed the URL
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
          target="_blank" // Opens in a new tab
          rel="noopener noreferrer" // Security best practice
        >
          Let's get started...
        </a>
      </div>
    </div>
  );
};

export default Home;
