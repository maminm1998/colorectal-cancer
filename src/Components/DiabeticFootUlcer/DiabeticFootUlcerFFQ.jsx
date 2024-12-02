import React, { useEffect } from "react";
import DynamicFormNewFFQ from "../../DynamicForm/DynamicFormNewFFQ";
import { DIABETICFOOTULCERFFQ } from "../DiabeticFootUlcerFFQ";
import swal from "sweetalert";
const questionType = "diabeticfootulcerffq";

export default function DiabeticFootUlcerFFQ() {
  let isCompletedBefore = localStorage.getItem(questionType);
  // Use useEffect to show the swal message when the component mounts

  useEffect(() => {
    if (isCompletedBefore && !localStorage.getItem(`${questionType}admin`)) {
      swal({
        title: "شما قبلا این پرسشنامه را پر کرده اید",
        icon: "error",
        buttons: "متوجه شدم",
      });
    }
  }, [isCompletedBefore]);

  if (isCompletedBefore && !localStorage.getItem(`${questionType}admin`)) {
    return null; // Return null if the form has been completed before
  }

  return (
    <div className="border-2 my-1 border-blue-500 rounded-lg w-[95%] m-auto">
      <div className="bg-blue-500 rounded-t-lg p-2 text-white font-bold text-xl">
        پرسشنامه (برای بزرگنمایی تصاویر بر روی خود تصویر کلیک کنید)
      </div>
      <DynamicFormNewFFQ
        questionType={questionType}
        questions={DIABETICFOOTULCERFFQ}
        passwordRequired={true}
      />
    </div>
  );
}
