import React from "react";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
function HomePage() {
  return (
    <div>
      <div className="m-5 flex items-center justify-around max-lg:flex-col">
        <Link
          to="case-ffq"
          className="text-white bg-blue-500 w-full mx-2 text-center max-lg:my-2 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none dark:focus:ring-blue-800"
        >
          Case FFQ
        </Link>
        <Link
          to="control-ffq"
          className="text-white bg-blue-500 w-full mx-2 text-center max-lg:my-2 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none dark:focus:ring-blue-800"
        >
          Control FFQ
        </Link>
        <Link
          to="case-habit"
          className="text-white bg-blue-500 w-full mx-2 text-center max-lg:my-2 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none dark:focus:ring-blue-800"
        >
          Case Habit
        </Link>
        <Link
          to="control-habit"
          className="text-white bg-blue-500 w-full mx-2 text-center max-lg:my-2 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none dark:focus:ring-blue-800"
        >
          Control Habit
        </Link>
        <Link
          to="case-demographic"
          className="text-white bg-blue-500 w-full mx-2 text-center max-lg:my-2 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none dark:focus:ring-blue-800"
        >
          Case Demographic
        </Link>
        <Link
          to="control-demographic"
          className="text-white bg-blue-500 w-full mx-2 text-center max-lg:my-2 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none dark:focus:ring-blue-800"
        >
          Control Demographic
        </Link>
      </div>
      <Outlet />;
    </div>
  );
}

export default HomePage;
