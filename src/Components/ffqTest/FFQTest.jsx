import React from "react";
import DynamicFormNewFFQ from "../../DynamicForm/DynamicFormNewFFQ";
import { NEWFFQ } from "../newFFQ";
import swal from "sweetalert";
const questionType = "newFFQ";

export default function NewFFQ() {
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
            پرسشنامه (برای بزرگنمایی تصاویر بر روی خود تصویر کلیک کنید)
          </div>
          <DynamicFormNewFFQ questionType={questionType} questions={NEWFFQ} />
        </div>
      )}
    </>
  );
}
