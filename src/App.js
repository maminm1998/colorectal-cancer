import React from "react";
import { useRoutes } from "react-router-dom";
import Routes from "./Router.js";
import "./App.css";
function App() {
  let router = useRoutes(Routes);
  return (
    <>
      {router}
     
    </>
  );
}
export default App;
