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
import List from "./Components/list";
import HomePage from "./Components/homePage";
import NewCaseFFQ from "./Components/ISFAHAN/newCaseFFQ";
import NewControlFFQ from "./Components/ISFAHAN/newControlFFQ";
import NewAbadanCaseFFQ from "./Components/ABADAN/newAbadanCaseFFQ";
import NewAbadanControlFFQ from "./Components/ABADAN/newAbadanControlFFQ";
import NotFound from "./Components/NotFound";
import DiabeticFootUlcerFFQ from "./Components/DiabeticFootUlcer/DiabeticFootUlcerFFQ";
import DiabeticFootUlcerDemographic from "./Components/DiabeticFootUlcer/DiabeticFootUlcerDemographic";
import DiabeticFootUlcerInterview from "./Components/DiabeticFootUlcer/DiabeticFootUlcerInterview";
import Thanks from "./Components/Thanks";
import FFQValidationDemographic from "./Components/ffqValidation/FFQValidationDemographic";
import FFQValidationHabit from "./Components/ffqValidation/FFQValidationHabit";
import FFQValidation from "./Components/ffqValidation/FFQValidation";

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
      { path: "new-case-ffq", element: <NewCaseFFQ /> },
      { path: "new-control-ffq", element: <NewControlFFQ /> },
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
      { path: "list", element: <List /> },
      { path: "new-abadan-case-ffq", element: <NewAbadanCaseFFQ /> },
      { path: "new-abadan-control-ffq", element: <NewAbadanControlFFQ /> },
      { path: "*", element: <NotFound /> },
      { path: "thanks", element: <Thanks /> },
      // isfahan ffq validation
      {
        path: "ffq-validation-demographic",
        element: <FFQValidationDemographic />,
      },
      {
        path: "ffq-validation-habit",
        element: <FFQValidationHabit />,
      },
      {
        path: "ffq-validation",
        element: <FFQValidation />,
      },

      //diabtic foot ulcer
      { path: "diabetic-foot-ulcer-ffq", element: <DiabeticFootUlcerFFQ /> },
      {
        path: "diabetic-foot-ulcer-demographic",
        element: <DiabeticFootUlcerDemographic />,
      },
      {
        path: "diabetic-foot-ulcer-interview",
        element: <DiabeticFootUlcerInterview />,
      },
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
      { path: "new-case-ffq", element: <NewCaseFFQ /> },
      { path: "new-control-ffq", element: <NewControlFFQ /> },
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
      { path: "new-abadan-case-ffq", element: <NewAbadanCaseFFQ /> },
      { path: "new-abadan-control-ffq", element: <NewAbadanControlFFQ /> },
      //diabtic foot ulcer
      { path: "diabetic-foot-ulcer-ffq", element: <DiabeticFootUlcerFFQ /> },
      {
        path: "diabetic-foot-ulcer-demographic",
        element: <DiabeticFootUlcerDemographic />,
      },
      {
        path: "diabetic-foot-ulcer-interview",
        element: <DiabeticFootUlcerInterview />,
      },
      // isfahan ffq validation
      {
        path: "ffq-validation-demographic",
        element: <FFQValidationDemographic />,
      },
      {
        path: "ffq-validation-habit",
        element: <FFQValidationHabit />,
      },
      {
        path: "ffq-validation",
        element: <FFQValidation />,
      },
      //Export
      { path: "export", element: <ExportExcel /> },
      { path: "list", element: <List /> },
      { path: "*", element: <NotFound /> },
      { path: "thanks", element: <Thanks /> },
    ],
  },
];

export default Routes;
