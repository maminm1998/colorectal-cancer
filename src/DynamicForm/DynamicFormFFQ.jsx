import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./../App.css";
import Modal from "./../organism/Modal";
import swal from "sweetalert";
import { useNavigate } from "react-router";

const DynamicForm = ({ questions, questionType }) => {
  const navigate = useNavigate();
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [formDisplay, setFormDisplay] = useState(false);

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
    onSubmit: async (values) => {
      // Use async/await to handle the fetch promise
      try {
        const response = await fetch(
          `http://ffqbackend.liara.run/${questionType}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );

        if (response.status === 201) {
          localStorage.setItem(questionType, true);
          swal({
            title: "اطلاعات با موفقیت ثبت شد.",
            icon: "success",
            buttons: "متوجه شدم",
          });
          setTimeout(() => {
            navigate("/"); // Use navigate to go to the home page after a delay
          }, 1000);
        }
      } catch (error) {
        // Handle any fetch errors or rejections
        swal({
          title:
            "در ثبت اطلاعات مشکلی وجود دارد لطفا با شماره 09981110126 تماس بگیرید؛ با تشکر از شما",
          icon: "error",
          buttons: "متوجه شدم",
        });
        console.log("Error:", error);
      }
    },
  });

  const shouldShowOtherInput = (questionId) => {
    const question = questions.find((q) => q.id === questionId);
    return question?.type === "radio" && formik.values[questionId] === "other";
  };
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (
      (questionType == "caseffq" && password === "1") ||
      (questionType == "casedemographic" && password === "2") ||
      (questionType == "casehabit" && password === "3") ||
      (questionType == "controlffq" && password === "4") ||
      (questionType == "controldemographic" && password === "5") ||
      (questionType == "controlhabit" && password === "6")
    ) {
      setPasswordModalOpen(false);
      setFormDisplay(true);
    } else {
      swal({
        title: "رمز عبور نادرست می باشد!",
        icon: "error",
        buttons: "OK",
      });
    }
  };

  useEffect(() => {
    // Open password modal when component mounts
    setPasswordModalOpen(true);
  }, []);

  if (!formDisplay) {
    return (
      <div>
        <Modal
          isOpen={passwordModalOpen}
          onClose={() => setPasswordModalOpen(false)}
        >
          <form onSubmit={handlePasswordSubmit}>
            <input
              type="password"
              className="w-full border-2 p-2 rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 w-full p-2 my-2 text-white rounded-lg"
            >
              ثبت رمز
            </button>
          </form>
        </Modal>
      </div>
    );
  }

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
              loading="lazy"
              className="w-24 h-20 rounded-lg border-blue-500 border-4 ml-2"
              alt={`تصویر ${question.label}`}
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
        onClick={() => {
          formik.errors &&
            formik.errors.length > 0 &&
            swal({
              title: "لطفا تمامی آیتم ها را به درستی وارد نمایید",
              icon: "error",
              buttons: "متوجه شدم",
            });
        }}
        disabled={formik.isSubmitting}
        className={`py-2 px-4 text-white font-semibold rounded shadow mt-4 ${
          formik.isSubmitting === true ? "bg-blue-200" : "bg-blue-500"
        }`}
      >
        {formik.isSubmitting ? "لطفا چند لحظه صبر کنید" : "ثبت اطلاعات"}
      </button>
    </form>
  );
};

export default DynamicForm;
