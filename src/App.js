import React from "react";
import { Routes, Route } from "react-router-dom";
import CaseDemographic from "./Components/caseDemographic";
import ControlDemographic from "./Components/controlDemographic";
import ControlHabit from "./Components/controlHabit";
import CaseHabit from "./Components/caseHabit";
import CaseFFQ from "./Components/caseFFQ";
import ControlFFQ from "./Components/controlFFQ";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/case-demographic" element={<CaseDemographic />} />
      <Route path="/control-demographic" element={<ControlDemographic />} />
      <Route path="/control-habit" element={<ControlHabit />} />
      <Route path="/case-habit" element={<CaseHabit />} />
      <Route path="/case-ffq" element={<CaseFFQ />} />
      <Route path="/control-ffq" element={<ControlFFQ />} />
    </Routes>
  );
}
export default App;
