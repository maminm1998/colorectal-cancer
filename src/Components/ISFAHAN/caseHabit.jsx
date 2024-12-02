import React, { useEffect } from "react";
import DynamicForm from "../../DynamicForm/DynamicForm";
import { HABIT } from "../question";
import swal from "sweetalert";

const questionType = "casehabit";

export default function CaseHabit() {
  // let isCompletedBefore = localStorage.getItem(questionType);
  // useEffect(() => {
  //   if (isCompletedBefore && !localStorage.getItem(`${questionType}admin`)) {
  //     swal({
  //       title: "شما قبلا این پرسشنامه را پر کرده اید",
  //       icon: "error",
  //       buttons: "متوجه شدم",
  //     });
  //   }
  // }, [isCompletedBefore]);

  // if (isCompletedBefore && !localStorage.getItem(`${questionType}admin`)) {
  //   return null; // Return null if the form has been completed before
  // }
  return (
    <div className="border-2 my-1 border-blue-500 rounded-lg w-[95%] m-auto">
      <div className="bg-blue-500 rounded-t-lg p-2 text-white font-bold text-xl">
        پرسشنامه
      </div>
      <DynamicForm
        passwordRequired={true}
        questionType={questionType}
        questions={HABIT ?? HABIT}
      />
    </div>
  );
}
