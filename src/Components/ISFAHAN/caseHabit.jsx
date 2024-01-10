import React from "react";
import DynamicForm from "../../DynamicForm/DynamicForm";
import {Habit} from "../question";
import swal from "sweetalert";

const questionType = "casehabit";

export default function CaseHabit() {
  let isCompletedBefore = localStorage.getItem(questionType);
  return (
    <>
      {isCompletedBefore ? (
        swal({
          title: "شما قبلا این پرسشنامه را پر کرده اید",
          icon: "error",
          buttons: "متوجه شدم",
        })
      ) : (
        <div className="border-2 my-1 border-blue-500 rounded-lg w-[95%] m-auto">
          <div className="bg-blue-500 rounded-t-lg p-2 text-white font-bold text-xl">
            پرسشنامه
          </div>
          <DynamicForm questionType={questionType} questions={Habit} />
        </div>
      )}
    </>
  );
}
