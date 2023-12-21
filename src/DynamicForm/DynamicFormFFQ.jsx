import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./../App.css";
import swal from "sweetalert";
const DynamicForm = ({ questions, questionType }) => {
  const validationSchema = Yup.object().shape(
    questions.reduce((schema, question) => {
      schema[question.id] = question.validation;
      return schema;
    }, {})
  );
  useEffect(() => {}, []);
  const formik = useFormik({
    initialValues: questions.reduce((values, question) => {
      values[question.id] = "";
      return values;
    }, {}),
    validationSchema,
    onSubmit: (values) => {
      fetch(`http://ffqbackend.liara.run/${questionType}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => {
          if (res.status === 201) {
            localStorage.setItem(questions[0].questionType, true);
            swal({
              title: "اطلاعات با موفقیت ثبت شد.",
              icon: "success",
              buttons: "متوجه شدم",
            });
          }
        })
        .catch((e) => {
          swal({
            title:
              "در ثبت اطلاعات مشکلی وجود دارد لطفا با شماره 09981110126 تماس بگیرید؛ با تشکر از شما",
            icon: "error",
            buttons: "متوجه شدم",
          });
          console.log("e:", e);
        });
    },
  });

  const shouldShowOtherInput = (questionId) => {
    const question = questions.find((q) => q.id === questionId);
    return question?.type === "radio" && formik.values[questionId] === "other";
  };

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col flex-wrap">
      {questions.map((question, index) => (
        <div
          key={question.id}
          className={`w-[100%] md:mx-2 max-md:px-2 my-4 ${
            question.img && question.img.length > 0
              ? "flex lg:items-center max-lg:items-start "
              : ""
          }`}
        >
          {question.img && question.img.length > 0 ? (
            <img
              src={question.img}
              className="w-24 h-20 rounded-lg border-blue-500 border-4 ml-2"
              alt="تصویر"
            />
          ) : (
            <></>
          )}
          <div>
            <div
              className={`flex ${
                question.label &&
                question.label.length > 35 &&
                question.type === "text"
                  ? "flex-col !items-start !justify-start text-right"
                  : ""
              } ${
                question.type === "text"
                  ? "justify-start max-md:justify-center my-1 md:mx-1 items-center"
                  : ""
              } md:mx-1 w-full`}
            >
              <p
                className={`md:mx-1
              ${
                question.label &&
                question.label.length > 35 &&
                question.type === "text"
                  ? "!w-[100] mt-4"
                  : ""
              } ${
                  question.type === "text" && question.label.length < 35
                    ? "!w-[10%] text-right max-md:text-right max-md:w-[30%]"
                    : ""
                }`}
              >
                {question.label}
                <p className="text-gray-400">{question.subLabel}</p>
              </p>
              {question.type === "text" && (
                <div
                  className={`md:w-[50%]  ${
                    question.label &&
                    question.label.length > 35 &&
                    question.type === "text"
                      ? "max-md:w-[100%] mt-2"
                      : "max-md:w-[60%]"
                  }`}
                >
                  <input
                    type="text"
                    name={question.id}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values[question.id] || ""}
                    placeholder={question.placeholder}
                    className={`w-full rounded-md p-2 max-sm:placeholder:!text-[13px] max-sm:placeholder:!font-extrabold border-gray-300 border-[1px] ${
                      question.label &&
                      question.label.length > 35 &&
                      question.type === "text"
                        ? ""
                        : ""
                    }`}
                  />
                  {formik.touched[question.id] &&
                    formik.errors[question.id] && (
                      <div className="text-red-500 mt-1">
                        {formik.errors[question.id]}
                      </div>
                    )}
                </div>
              )}
            </div>
            {question.type === "radio" && (
              <div
                role="group"
                className={`flex  ${
                  question.options && question.options.length < 4
                    ? "max-lg:!flex-row"
                    : ""
                } max-lg:flex-col mt-2`}
              >
                {question.options.map((option) => (
                  <label key={option.id} className="flex items-center">
                    <input
                      type="radio"
                      name={question.id}
                      value={option.id}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values[question.id] === option.id}
                      className="mr-2  w-4 h-4 cursor-pointer checked:border-blue-500 checked:border-2"
                    />
                    <span className="text-sm mr-2">{option.label}</span>
                  </label>
                ))}
                {shouldShowOtherInput(question.id) && (
                  <>
                    <input
                      type="text"
                      name={`${question.id}-other`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values[`${question.id}-other`] || ""}
                      placeholder="Please specify..."
                      className="input-style"
                    />
                    {formik.touched[`${question.id}-other`] &&
                      formik.errors[`${question.id}-other`] && (
                        <div className="text-red-500 mt-1">
                          {formik.errors[`${question.id}-other`]}
                        </div>
                      )}
                  </>
                )}
                {formik.touched[question.id] && formik.errors[question.id] && (
                  <div className="text-red-500 mr-10 mt-1">
                    {formik.errors[question.id]}
                  </div>
                )}
              </div>
            )}
            {question.type === "checkbox" && (
              <div role="group" className="flex flex-wrap flex-row">
                {question.options.map((option) => (
                  <label
                    key={option.id}
                    className="flex w-[40%] max-md:w-[100%] items-center mr-4"
                  >
                    <input
                      type="checkbox"
                      name={question.id}
                      value={option.id}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={(formik.values[question.id] || []).includes(
                        option.id
                      )}
                      className="mr-3 ml-1 w-4 h-4 cursor-pointer"
                    />
                    <span className="text-sm">{option.label}</span>
                  </label>
                ))}
                {formik.touched[question.id] && formik.errors[question.id] && (
                  <div className="text-red-500 mt-1">
                    {formik.errors[question.id]}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ))}

      <button
        type="submit"
        className="py-2 px-4 bg-blue-500 text-white font-semibold rounded shadow mt-4"
        onClick={() => {
          formik.errors &&
            formik.errors.length > 0 &&
            swal({
              title: "لطفا تمامی آیتم ها را به درستی وارد نمایید",
              icon: "error",
              buttons: "متوجه شدم",
            });
        }}
      >
        ثبت اطلاعات
      </button>
    </form>
  );
};

export default DynamicForm;
