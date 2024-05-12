import React from "react";
import { useRoutes } from "react-router-dom";
import Routes from "./Router.js";
import "./App.css";
function App() {
  let router = useRoutes(Routes);
  return (
    <>
      <div className="max-md:hidden md:block bg-blue-200 w-full m-auto">
        <div className="m-auto text-center h-screen flex items-center justify-center">
          <p className="text-3xl bg-blue-500 px-20 py-5 rounded-xl text-white">
            لطفا با موبایل وارد شوید.
          </p>
        </div>
      </div>
      <div className="md:hidden max-md:block">{router}</div>
    </>
  );
}
export default App;
