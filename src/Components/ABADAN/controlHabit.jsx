import React from "react";
import DynamicForm from "../../DynamicForm/DynamicForm";
import { HABIT } from "../question";
import swal from "sweetalert";

const questionType = "abadancontrolhabit";

export default function ControlHabit() {
  let isCompletedBefore = localStorage.getItem(questionType);
  return (
    <>
      <div className="border-2 my-1 border-blue-500 rounded-lg w-[95%] m-auto">
        <div className="bg-blue-500 rounded-t-lg p-2 text-white font-bold text-xl">
          پرسشنامه
        </div>
        <DynamicForm questionType={questionType} questions={HABIT} />
      </div>
    </>
  );
}
