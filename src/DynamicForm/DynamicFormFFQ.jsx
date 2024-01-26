import React, { useEffect, useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./../App.css";
import Modal from "./../organism/Modal";
import swal from "sweetalert";
import { useNavigate } from "react-router";

const DynamicForm = ({ questions, questionType }) => {
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [formDisplay, setFormDisplay] = useState(false);
  const navigate = useNavigate();
  const [shouldScrollToError, setShouldScrollToError] = useState(false);
  const firstErrorFieldRef = useRef(null);

  const validationSchema = Yup.object().shape(
    questions.reduce((schema, question) => {
      schema[question.id] = question.validation;

      // Add custom validation for "تلفن همراه جایگزین"
      if (question.id === "تلفن همراه جایگزین") {
        schema[question.id] = schema[question.id].test({
          name: "notEqual",
          message:
            "شماره تلفن همراه جایگزین نمی تواند با تلفن همراه (موبایل) یکسان باشد؛ لطفا شماره دیگری وارد کنید.",
          test: function (value) {
            // Access the values of other fields using `this.parent`
            const mobileNumber = this.parent["تلفن همراه (موبایل) :"];
            return value != mobileNumber;
          },
        });
      }

      return schema;
    }, {})
  );

  const handleImageClick = (imageUrl) => {
    swal({
      content: {
        element: "div",
        attributes: {
          innerHTML: `<img src="${imageUrl}" style="max-width: 100%; height: auto;" />`,
        },
      },
      buttons: "بستن تصویر",
    });
  };

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
          `https://ffqbackend.liara.run/${questionType}`,
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
      (questionType === "caseffq" && password === "63024") ||
      (questionType === "casedemographic" && password === "88554") ||
      (questionType === "casehabit" && password === "36528") ||
      (questionType === "controlffq" && password === "22015") ||
      (questionType === "controldemographic" && password === "99668") ||
      (questionType === "controlhabit" && password === "48756") ||
      (questionType === "abadancaseffq" && password === "22012") ||
      (questionType === "abadancasedemographic" && password === "10025") ||
      (questionType === "abadancasehabit" && password === "39685") ||
      (questionType === "abadancontrolffq" && password === "77785") ||
      (questionType === "abadancontroldemographic" && password === "21458") ||
      (questionType === "abadancontrolhabit" && password === "64250")
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

  useEffect(() => {
    if (shouldScrollToError && firstErrorFieldRef.current) {
      firstErrorFieldRef.current.scrollIntoView({ behavior: "smooth" });
      setShouldScrollToError(false); // Set shouldScrollToError to false after initial scroll
    }
  }, [formik.errors, formik.values, firstErrorFieldRef, shouldScrollToError]);

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
              className="w-24 h-20 rounded-lg cursor-pointer border-blue-500 border-4 ml-2"
              alt={`تصویر ${question.label}`}
              onClick={() => handleImageClick(question.img)}
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
              } ${
                question.label &&
                question.label.length > 35 &&
                question.type === "number"
                  ? "flex-col !items-start !justify-start text-right"
                  : ""
              } ${
                question.type === "number"
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
                } ${
                  question.label &&
                  question.label.length > 35 &&
                  question.type === "number"
                    ? "!w-[100] mt-4"
                    : ""
                } ${
                  question.type === "number" && question.label.length < 35
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
                  } ${
                    question.label &&
                    question.label.length > 35 &&
                    question.type === "number"
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
                    ref={
                      Object.keys(formik.errors)[0] === question.id
                        ? firstErrorFieldRef
                        : null
                    }
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
              {question.type === "number" && (
                <div
                  className={`md:w-[50%]  ${
                    question.label &&
                    question.label.length > 35 &&
                    question.type === "number"
                      ? "max-md:w-[100%] mt-2"
                      : "max-md:w-[60%]"
                  }`}
                >
                  <input
                    type="number"
                    name={question.id}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values[question.id] || ""}
                    ref={
                      Object.keys(formik.errors)[0] === question.id
                        ? firstErrorFieldRef
                        : null
                    }
                    placeholder={question.placeholder}
                    className={`w-full rounded-md p-2 max-sm:placeholder:!text-[13px] max-sm:placeholder:!font-extrabold border-gray-300 border-[1px] ${
                      question.label &&
                      question.label.length > 35 &&
                      question.type === "number"
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
                      ref={
                        Object.keys(formik.errors)[0] === question.id
                          ? firstErrorFieldRef
                          : null
                      }
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
                      ref={
                        Object.keys(formik.errors)[0] === question.id
                          ? firstErrorFieldRef
                          : null
                      }
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
                      ref={
                        Object.keys(formik.errors)[0] === question.id
                          ? firstErrorFieldRef
                          : null
                      }
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
        type="submit" // Change the type to "button" to prevent automatic form submission
        onClick={() => {
          if (Object.keys(formik.errors).length > 0) {
            setShouldScrollToError(true);
            // Extract question labels with validation errors, excluding specific labels
            const excludedLabels = ["Label1", "Label2"]; // Specify the labels to be excluded
            const errorLabels = Object.keys(formik.errors)
              .map((errorKey) => {
                const question = questions.find(
                  (question) => question.id === errorKey
                );
                return question && !excludedLabels.includes(question.label)
                  ? question.label
                  : "";
              })
              .filter((label) => label !== "");

            // Construct the custom error message
            const errorMessageHTML = errorLabels
              .map(
                (message) =>
                  `<div style="font-size: 20px; color: black;">${message}</div>`
              )
              .join("");

            // Display the custom error message in Swal with red title
            swal({
              title: "خطا در ثبت اطلاعات، لطفا موارد زیر به درستی وارد نمایید:",
              content: {
                element: "div",
                attributes: {
                  innerHTML: errorMessageHTML,
                },
              },
              icon: "error",
              buttons: "متوجه شدم",
            }).then(() => {
              const firstErrorField = Object.keys(formik.errors)[0];
              if (
                firstErrorField &&
                formik.errors[firstErrorField] &&
                formik.touched[firstErrorField]
              ) {
                const errorField = document.getElementsByName(firstErrorField);
                if (errorField.length > 0) {
                  errorField[0].scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }
              }
            });
          } else {
            formik.handleSubmit(); // Manually trigger form submission if there are no errors
          }
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
