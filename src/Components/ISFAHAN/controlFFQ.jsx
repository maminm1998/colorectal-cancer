import React from "react";
import DynamicFormFFQ from "../../DynamicForm/DynamicFormFFQ";
import { ISFAHANFFQ } from "../question";
import swal from "sweetalert";

const questionType = "controlffq";
export default function ControlFFQ() {
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
          <DynamicFormFFQ questionType={questionType} questions={ISFAHANFFQ} />
        </div>
      )}
    </>
  );
}
