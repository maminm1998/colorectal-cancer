import CaseDemographic from "./Components/ISFAHAN/caseDemographic";
import ControlDemographic from "./Components/ISFAHAN/controlDemographic";
import ControlHabit from "./Components/ISFAHAN/controlHabit";
import CaseHabit from "./Components/ISFAHAN/caseHabit";
import CaseFFQ from "./Components/ISFAHAN/caseFFQ";
import ControlFFQ from "./Components/ISFAHAN/controlFFQ";
import AbadanCaseDemographic from "./Components/ABADAN/caseDemographic";
import AbadanControlDemographic from "./Components/ABADAN/controlDemographic";
import AbadanControlHabit from "./Components/ABADAN/controlHabit";
import AbadanCaseHabit from "./Components/ABADAN/caseHabit";
import AbadanCaseFFQ from "./Components/ABADAN/caseFFQ";
import AbadanControlFFQ from "./Components/ABADAN/controlFFQ";
import ExportExcel from "./Components/exportExcel";
import HomePage from "./Components/homePage";

const Routes = [
  {
    path: "/*",
    element: <HomePage />,
    children: [
      //isfahan
      { path: "case-demographic", element: <CaseDemographic /> },
      { path: "control-demographic", element: <ControlDemographic /> },
      { path: "control-habit", element: <ControlHabit /> },
      { path: "case-habit", element: <CaseHabit /> },
      { path: "case-ffq", element: <CaseFFQ /> },
      { path: "control-ffq", element: <ControlFFQ /> },
      //abadab
      { path: "case-demographic-abadan", element: <AbadanCaseDemographic /> },
      {
        path: "control-demographic-abadan",
        element: <AbadanControlDemographic />,
      },
      { path: "control-habit-abadan", element: <AbadanControlHabit /> },
      { path: "case-habit-abadan", element: <AbadanCaseHabit /> },
      { path: "case-ffq-abadan", element: <AbadanCaseFFQ /> },
      { path: "control-ffq-abadan", element: <AbadanControlFFQ /> },
      { path: "export", element: <ExportExcel /> },
    ],
  },
  {
    path: "/colorectal-cancer/*",
    element: <HomePage />,
    children: [
      //isfahan
      { path: "case-demographic", element: <CaseDemographic /> },
      { path: "control-demographic", element: <ControlDemographic /> },
      { path: "control-habit", element: <ControlHabit /> },
      { path: "case-habit", element: <CaseHabit /> },
      { path: "case-ffq", element: <CaseFFQ /> },
      { path: "control-ffq", element: <ControlFFQ /> },
      //abadab
      { path: "case-demographic-abadan", element: <AbadanCaseDemographic /> },
      {
        path: "control-demographic-abadan",
        element: <AbadanControlDemographic />,
      },
      { path: "control-habit-abadan", element: <AbadanControlHabit /> },
      { path: "case-habit-abadan", element: <AbadanCaseHabit /> },
      { path: "case-ffq-abadan", element: <AbadanCaseFFQ /> },
      { path: "control-ffq-abadan", element: <AbadanControlFFQ /> },
      { path: "export", element: <ExportExcel /> },
    ],
  },
];

export default Routes;
