import React from "react";
import { Routes, Route, useRoutes } from "react-router-dom";
import CaseDemographic from "./Components/caseDemographic";
import ControlDemographic from "./Components/controlDemographic";
import ControlHabit from "./Components/controlHabit";
import CaseHabit from "./Components/caseHabit";
import CaseFFQ from "./Components/caseFFQ";
import ControlFFQ from "./Components/controlFFQ";
import HomePage from "./Components/homePage";
import "./App.css";

function App() {
  let router = useRoutes([
    {
      path: "/colorectal-cancer/*",
      element: <HomePage />,
      children: [
        { path: "case-demographic", element: <CaseDemographic /> },
        { path: "control-demographic", element: <ControlDemographic /> },
        { path: "control-habit", element: <ControlHabit /> },
        { path: "case-habit", element: <CaseHabit /> },
        { path: "case-ffq", element: <CaseFFQ /> },
        { path: "control-ffq", element: <ControlFFQ /> },
      ],
    },
  ]);
  return <>{router}</>;
}
export default App;
