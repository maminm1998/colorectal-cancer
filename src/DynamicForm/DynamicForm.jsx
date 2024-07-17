import React, { useEffect, useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./../App.css";
import Modal from "./../organism/Modal";
import swal from "sweetalert";
import { useNavigate } from "react-router";
import TimePicker from "react-time-picker";
import jalaliMoment from "jalali-moment"; // Import jalali-moment library

const DynamicForm = ({ questions, questionType }) => {
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [formDisplay, setFormDisplay] = useState(
    localStorage.getItem(`${questionType}admin`) === "true" ? true : false
  );
  const [selectedOptions, setSelectedOptions] = useState({});
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
  const handleTimePickerChange = (questionId, value) => {
    // Custom logic to update formik values
    formik.setFieldValue(questionId, value);
  };

  const handleTimePickerBlur = (questionId) => {
    // Prevent onBlur from resetting the value
    formik.setFieldTouched(questionId, true);
  };

  const formik = useFormik({
    initialValues: questions.reduce((values, question) => {
      values[question.id] = "";
      return values;
    }, {}),
    validationSchema,
    onSubmit: async (values) => {
      // Use async/await to handle the fetch promise
      const currentDate = jalaliMoment().format("jYYYY/jMM/jDD HH:mm:ss");
      values.submissionDateTime = currentDate;

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
            navigate("/thanks"); // Use navigate to go to the home page after a delay
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

  const handleCheckboxChange = (questionId, optionId) => {
    setSelectedOptions((prevSelectedOptions) => {
      const selectedOptionsForQuestion = prevSelectedOptions[questionId] || [];

      // If the "هیچکدام" option is selected, unselect all other options
      const updatedOptions =
        optionId === "هیچکدام"
          ? selectedOptionsForQuestion.includes("هیچکدام")
            ? []
            : [optionId]
          : selectedOptionsForQuestion.includes("هیچکدام")
          ? [optionId]
          : selectedOptionsForQuestion.includes(optionId)
          ? selectedOptionsForQuestion.filter(
              (selectedOption) => selectedOption !== optionId
            )
          : [...selectedOptionsForQuestion, optionId];

      // Update Formik state
      formik.handleChange({
        target: {
          name: questionId,
          value: updatedOptions,
        },
      });

      return {
        ...prevSelectedOptions,
        [questionId]: updatedOptions,
      };
    });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (
      (questionType === "caseffq" && password === "????") ||
      (questionType === "casedemographic" && password === "88554") ||
      (questionType === "casehabit" && password === "36528") ||
      (questionType === "controlffq" && password === "????") ||
      (questionType === "controldemographic" && password === "99668") ||
      (questionType === "controlhabit" && password === "48756") ||
      (questionType === "abadancaseffq" && password === "????") ||
      (questionType === "abadancasedemographic" && password === "10025") ||
      (questionType === "abadancasehabit" && password === "39685") ||
      (questionType === "abadancontrolffq" && password === "????") ||
      (questionType === "abadancontroldemographic" && password === "21458") ||
      (questionType === "abadancontrolhabit" && password === "64250") ||
      (questionType === "diabeticfootulcerdemographic" &&
        password === "10089") ||
      (questionType === "diabeticfootulcerinterview" && password === "10089") ||
      (questionType === "diabeticfootulcerffq" && password === "10089") ||
      (questionType === "ffqvalidationhabit" && password === "10066") ||
      (questionType === "ffqvalidationdemographic" && password === "10066")
    ) {
      setPasswordModalOpen(false);
      setFormDisplay(true);
    } else if (
      (questionType === "diabeticfootulcerffq" ||
        questionType === "diabeticfootulcerdemographic" ||
        questionType === "diabeticfootulcerinterview") &&
      password === "889975"
    ) {
      setPasswordModalOpen(false);
      setFormDisplay(true);
      localStorage.setItem(`${questionType}admin`, true);
    } else {
      swal({
        title: "رمز عبور نادرست می باشد!",
        icon: "error",
        buttons: "OK",
      });
    }
  };

  useEffect(() => {
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
    <form
      onSubmit={formik.handleSubmit}
      className="flex items-center flex-col flex-wrap"
    >
      {questions.map((question, index) => (
        <div
          key={question.id}
          className={`w-[95%] my-2 ${
            question.type === "radio" || question.type === "checkbox"
              ? "border-2 rounded-t-2xl border-blue-300"
              : ""
          }`}
        >
          <div
            className={`flex ${
              question.label &&
              question.label.length > 35 &&
              question.type === "text"
                ? "flex-col !items-center !justify-center text-center w-full"
                : ""
            } ${
              question.type === "text"
                ? "flex-col !items-center !justify-center text-center w-full"
                : ""
            } ${
              question.label &&
              question.label.length > 50 &&
              question.type === "number"
                ? "flex-col !items-center !justify-center text-center w-full"
                : ""
            } ${
              question.type === "number"
                ? "flex-col !items-center !justify-center text-center w-full"
                : ""
            }
            ${
              question.label &&
              question.label.length > 50 &&
              question.type === "time"
                ? "flex-col justify-center border-2 border-blue-500 bg-blue-200 p-5 text-center rounded-2xl"
                : ""
            } ${
              question.type === "time"
                ? "flex-col justify-center border-2 border-blue-500 p-5 text-center rounded-2xl"
                : ""
            } w-full ${
              question.type === "radio"
                ? "flex-col justify-center bg-blue-500 p-5 text-center rounded-t-2xl text-white"
                : ""
            } ${
              question.type === "checkbox"
                ? "flex-col justify-center bg-blue-500 p-5 text-center rounded-t-2xl text-white"
                : ""
            }`}
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
                  ? "!w-full text-right mb-2"
                  : ""
              } ${
                question.label &&
                question.label.length > 35 &&
                question.type === "number"
                  ? "!w-[100] mt-4"
                  : ""
              } ${
                question.type === "number" && question.label.length < 35
                  ? "!w-full text-right mb-2"
                  : ""
              }`}
            >
              {question.label}
            </p>
            <div
              className={`${
                question.type === "text" || question.type === "time"
                  ? "!text-red-500 mb-1"
                  : "!text-white"
              }`}
            >
              <p className="text-xs">{question.subLabel}</p>
            </div>

            {question.type === "text" && (
              <div
                className={`w-[100%] ${
                  question.label &&
                  question.label.length > 35 &&
                  question.type === "text"
                    ? "max-md:w-[100%] mt-2"
                    : ""
                } ${
                  question.label &&
                  question.label.length > 35 &&
                  question.type === "number"
                    ? "max-md:w-[100%] mt-2"
                    : ""
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
                {formik.touched[question.id] && formik.errors[question.id] && (
                  <div className="text-red-500 mt-1">
                    {formik.errors[question.id]}
                  </div>
                )}
              </div>
            )}
            {question.type === "number" && (
              <div
                className={`w-[100%] ${
                  question.label &&
                  question.label.length > 35 &&
                  question.type === "text"
                    ? "max-md:w-[100%] mt-2"
                    : ""
                } ${
                  question.label &&
                  question.label.length > 35 &&
                  question.type === "number"
                    ? "max-md:w-[100%] mt-2"
                    : ""
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
                {formik.touched[question.id] && formik.errors[question.id] && (
                  <div className="text-red-500 mt-1">
                    {formik.errors[question.id]}
                  </div>
                )}
              </div>
            )}
            {question.type === "time" && (
              <div
                className={`w-[100%] ${
                  question.label &&
                  question.label.length > 35 &&
                  question.type === "time"
                    ? "max-md:w-[100%] mt-2"
                    : "max-md:w-[60%]"
                }`}
              >
                <TimePicker
                  name={question.id}
                  onChange={(value) =>
                    handleTimePickerChange(question.id, value)
                  }
                  onBlur={() => handleTimePickerBlur(question.id)}
                  value={formik.values[question.id] || ""}
                  ref={
                    Object.keys(formik.errors)[0] === question.id
                      ? firstErrorFieldRef
                      : null
                  }
                  format="HH:mm"
                  clearIcon={null}
                  clockIcon={null}
                  hourPlaceholder="ساعت را اینجا وارد کنید"
                  minutePlaceholder="دقیقه را اینجا وارد کنید"
                  className="w-full rounded-md p-2 max-sm:placeholder:!text-[13px] max-sm:placeholder:!font-extrabold" // Added the custom class 'time-picker-full-width'
                />
                {formik.touched[question.id] && formik.errors[question.id] && (
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
              className={`flex !px-1 ${
                question.options && question.options.length < 4 ? "" : ""
              } flex-col mt-2`}
            >
              {question.options.map((option) => (
                <label
                  key={option.id}
                  className={`flex items-center cursor-pointer justify-center border-2 p-2 my-1 rounded-lg ${
                    formik.values[question.id] === option.id
                      ? "border-blue-500 border-2 bg-blue-500 text-white"
                      : ""
                  }`}
                >
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
                    className="mr-2 w-0 h-0 cursor-pointer checked:border-blue-500 checked:border-2"
                  />
                  <span className="text-sm mr-2 text-center">
                    {option.label}
                  </span>
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
            <div
              role="group"
              className="flex items-center justify-center flex-wrap flex-row"
            >
              {question.options.map((option) => (
                <label
                  key={option.id}
                  className={`mx-1 cursor-pointer my-1 border-2 p-2 rounded-lg ${
                    option.label.length > 23 || option.label === "سایر"
                      ? "w-[92%]"
                      : "w-[45%]"
                  } ${
                    option.label === "هیچکدام" ? "text-red-500 !w-[92%]" : ""
                  } ${
                    selectedOptions[question.id]?.includes(option.id)
                      ? "border-blue-500 border-2 bg-blue-500 text-white"
                      : ""
                  } flex flex-col items-center`}
                >
                  <input
                    type="checkbox"
                    name={question.id}
                    value={option.id}
                    onChange={() =>
                      handleCheckboxChange(question.id, option.id)
                    }
                    onBlur={formik.handleBlur}
                    checked={selectedOptions[question.id]?.includes(option.id)}
                    className="mr-0 w-4 h-0 cursor-pointer checked:border-blue-500  checked:border-2"
                  />
                  <span className="text-sm mr-2">{option.label}</span>
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
        className={`py-2 px-4 w-full text-white font-semibold rounded shadow mt-4 ${
          formik.isSubmitting === true ? "bg-blue-200" : "bg-blue-500"
        }`}
      >
        {formik.isSubmitting ? "لطفا چند لحظه صبر کنید" : "ثبت اطلاعات"}
      </button>
    </form>
  );
};

export default DynamicForm;
