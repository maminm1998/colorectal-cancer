import CaseDemographic from "./Components/caseDemographic";
import ControlDemographic from "./Components/controlDemographic";
import ControlHabit from "./Components/controlHabit";
import CaseHabit from "./Components/caseHabit";
import CaseFFQ from "./Components/caseFFQ";
import ControlFFQ from "./Components/controlFFQ";
import HomePage from "./Components/homePage";

const Routes = [
  {
    path: "/*",
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
];

export default Routes;
