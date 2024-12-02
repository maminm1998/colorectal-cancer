import React from "react";
import DynamicFormNewFFQ from "../../DynamicForm/DynamicFormNewFFQ";
import { NEWABADANFFQ } from "../newAbadanFFQ";

const questionType = "newabadancaseffq";

export default function NewCaseFFQ() {
  return (
    <div className="border-2 my-1 border-blue-500 rounded-lg w-[95%] m-auto">
      <div className="bg-blue-500 rounded-t-lg p-2 text-white font-bold text-xl">
        پرسشنامه (برای بزرگنمایی تصاویر بر روی خود تصویر کلیک کنید)
      </div>
      <DynamicFormNewFFQ passwordRequired={true} questionType={questionType} questions={NEWABADANFFQ} />
    </div>
  );
}
