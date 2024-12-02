import React, { useState, useEffect } from "react";
import Table from "./../organism/Table";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import Modal from "./../organism/Modal";
import swal from "sweetalert";

export default function ExportExcel() {
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [formDisplay, setFormDisplay] = useState(false);
  const [questionType, setQuestionType] = useState(null);

  const fetchAndUpdateData = async (selectedData) => {
    setButtonsDisabled(true); // Disable all buttons
    try {
      const response = await fetch(
        `https://ffqbackend.liara.run/${selectedData}`
      );
      if (response.ok) {
        const jsonData = await response.json();
        setFetchedData(jsonData);
        downloadExcel();
      } else {
        console.log("Error fetching data:", response.status);
        // Handle error, e.g., show a message to the user
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error, e.g., show a message to the user
    }
    setButtonsDisabled(false); // Enable all buttons
  };

  const handleButtonClick = async (selectedData) => {
    await fetchAndUpdateData(selectedData);
    setQuestionType(selectedData);
  };

  useEffect(() => {
    if (fetchedData.length > 0) {
      Swal.fire({
        icon: "success",
        title: "اطلاعات با موفقیت دریافت شد",
        showConfirmButton: false,
        timer: 1500,
      });
    } else if (fetchedData.length === 0 && buttonsDisabled === false) {
      Swal.fire({
        icon: "error",
        title: "اطلاعات موجود نمی باشد",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, [fetchedData, buttonsDisabled]);

  const formatDataForExcel = (data) => {
    const isObject = (value) => typeof value === "object" && value !== null;

    return data.map((item) => {
      const formattedItem = {};
      for (const key in item) {
        if (item.hasOwnProperty(key)) {
          if (isObject(item[key])) {
            // بررسی وجود کلید value و استخراج مقدار
            if ("value" in item[key]) {
              formattedItem[key] = item[key].value;
            } else {
              // در صورت نبودن value، مقادیر Object به رشته تبدیل شود
              formattedItem[key] = Object.values(item[key]).join(" ");
            }
          } else {
            // مقادیر ساده مستقیماً انتقال داده شوند
            formattedItem[key] = item[key];
          }
        }
      }
      return formattedItem;
    });
  };

  const downloadExcel = () => {
    if (fetchedData.length === 0) {
      return;
    }

    const currentDate = new Date()
      .toLocaleDateString("en-US")
      .replaceAll("/", "-");
    const currentTime = new Date()
      .toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
      .replace(/\s(\w+)/, " $1");
    const formattedDateTime = `date_${currentDate}_time_${currentTime}`;

    // فرمت کردن داده‌ها برای اکسل
    const formattedData = formatDataForExcel(fetchedData);

    // بررسی داده‌های فرمت‌شده در کنسول (اختیاری)
    console.log("Formatted Data for Excel:", formattedData);

    // ایجاد شیت اکسل با داده‌های فرمت‌شده
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // ذخیره فایل اکسل
    XLSX.writeFile(workbook, `${questionType}_${formattedDateTime}.xlsx`);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === "12225") {
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
    <div>
      <div className="m-5 flex items-center justify-around max-lg:flex-col">
        <button
          onClick={() => {
            handleButtonClick("caseDemographic");
          }}
          disabled={buttonsDisabled}
          className={`text-white bg-blue-500 w-full mx-2 text-center max-lg:my-2 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none dark:focus:ring-blue-800 ${
            buttonsDisabled === true ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          Isfahan Case Demographic
        </button>
        <button
          onClick={() => {
            handleButtonClick("controlDemographic");
          }}
          disabled={buttonsDisabled}
          className={`text-white bg-blue-500 w-full mx-2 text-center max-lg:my-2 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none dark:focus:ring-blue-800 ${
            buttonsDisabled === true ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          Isfahan Control Demographic
        </button>
        <button
          onClick={() => {
            handleButtonClick("caseffq");
          }}
          disabled={buttonsDisabled}
          className={`text-white bg-blue-500 w-full mx-2 text-center max-lg:my-2 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none dark:focus:ring-blue-800 ${
            buttonsDisabled === true ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          Isfahan Case FFQ
        </button>
        <button
          onClick={() => {
            handleButtonClick("controlffq");
          }}
          disabled={buttonsDisabled}
          className={`text-white bg-blue-500 w-full mx-2 text-center max-lg:my-2 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none dark:focus:ring-blue-800 ${
            buttonsDisabled === true ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          Isfahan Control FFQ
        </button>
        <button
          onClick={() => {
            handleButtonClick("casehabit");
          }}
          disabled={buttonsDisabled}
          className={`text-white bg-blue-500 w-full mx-2 text-center max-lg:my-2 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none dark:focus:ring-blue-800 ${
            buttonsDisabled === true ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          Isfahan Case Habit
        </button>
        <button
          onClick={() => {
            handleButtonClick("controlhabit");
          }}
          disabled={buttonsDisabled}
          className={`text-white bg-blue-500 w-full mx-2 text-center max-lg:my-2 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none dark:focus:ring-blue-800 ${
            buttonsDisabled === true ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          Isfahan Control Habit
        </button>
      </div>
      <div className="m-5 flex items-center justify-around max-lg:flex-col">
        <button
          onClick={() => {
            handleButtonClick("newCaseffq");
          }}
          disabled={buttonsDisabled}
          className={`text-white bg-rose-500 w-full mx-2 text-center max-lg:my-2 hover:bg-rose-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none dark:focus:ring-blue-800 ${
            buttonsDisabled === true ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          New Isfahan Case FFQ
        </button>
        <button
          onClick={() => {
            handleButtonClick("newControlffq");
          }}
          disabled={buttonsDisabled}
          className={`text-white bg-rose-500 w-full mx-2 text-center max-lg:my-2 hover:bg-rose-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none dark:focus:ring-blue-800 ${
            buttonsDisabled === true ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          New Isfahan Control FFQ
        </button>
      </div>
      <div className="m-5 flex items-center justify-around max-lg:flex-col">
        <button
          onClick={() => {
            handleButtonClick("abadancaseDemographic");
          }}
          disabled={buttonsDisabled}
          className={`text-white bg-orange-500 w-full mx-2 text-center max-lg:my-2 hover:bg-orange-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none dark:focus:ring-blue-800 ${
            buttonsDisabled === true ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          Abadan Case Demographic
        </button>
        <button
          onClick={() => {
            handleButtonClick("abadancontrolDemographic");
          }}
          disabled={buttonsDisabled}
          className={`text-white bg-orange-500 w-full mx-2 text-center max-lg:my-2 hover:bg-orange-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none dark:focus:ring-blue-800 ${
            buttonsDisabled === true ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          Abadan Control Demographic
        </button>
        <button
          onClick={() => {
            handleButtonClick("abadancaseffq");
          }}
          disabled={buttonsDisabled}
          className={`text-white bg-orange-500 w-full mx-2 text-center max-lg:my-2 hover:bg-orange-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none dark:focus:ring-blue-800 ${
            buttonsDisabled === true ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          Abadan Case FFQ
        </button>
        <button
          onClick={() => {
            handleButtonClick("abadancontrolffq");
          }}
          disabled={buttonsDisabled}
          className={`text-white bg-orange-500 w-full mx-2 text-center max-lg:my-2 hover:bg-orange-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none dark:focus:ring-blue-800 ${
            buttonsDisabled === true ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          Abadan Control FFQ
        </button>
        <button
          onClick={() => {
            handleButtonClick("abadancasehabit");
          }}
          disabled={buttonsDisabled}
          className={`text-white bg-orange-500 w-full mx-2 text-center max-lg:my-2 hover:bg-orange-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none dark:focus:ring-blue-800 ${
            buttonsDisabled === true ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          Abadan Case Habit
        </button>
        <button
          onClick={() => {
            handleButtonClick("abadancontrolhabit");
          }}
          disabled={buttonsDisabled}
          className={`text-white bg-orange-500 w-full mx-2 text-center max-lg:my-2 hover:bg-orange-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none dark:focus:ring-blue-800 ${
            buttonsDisabled === true ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          Abadan Control Habit
        </button>
      </div>{" "}
      <div className="m-5 flex items-center justify-around max-lg:flex-col">
        <button
          onClick={() => {
            handleButtonClick("newabadancaseffq");
          }}
          disabled={buttonsDisabled}
          className={`text-white bg-rose-500 w-full mx-2 text-center max-lg:my-2 hover:bg-rose-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none dark:focus:ring-blue-800 ${
            buttonsDisabled === true ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          New Abadan Case FFQ
        </button>
        <button
          onClick={() => {
            handleButtonClick("newabadancontrolffq");
          }}
          disabled={buttonsDisabled}
          className={`text-white bg-rose-500 w-full mx-2 text-center max-lg:my-2 hover:bg-rose-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none dark:focus:ring-blue-800 ${
            buttonsDisabled === true ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          New Abadan Control FFQ
        </button>
      </div>
      <div className="m-5 flex items-center justify-around max-lg:flex-col">
        <button
          onClick={() => {
            handleButtonClick("diabeticfootulcerdemographic");
          }}
          disabled={buttonsDisabled}
          className={`text-white bg-teal-500 w-full mx-2 text-center max-lg:my-2 hover:bg-teal-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 my-1 dark:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none dark:focus:ring-blue-800 ${
            buttonsDisabled === true ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          Diabetic Foot Ulcer Demographic
        </button>
        <button
          onClick={() => {
            handleButtonClick("diabeticfootulcerffq");
          }}
          disabled={buttonsDisabled}
          className={`text-white bg-teal-500 w-full mx-2 text-center max-lg:my-2 hover:bg-teal-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 my-1 dark:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none dark:focus:ring-blue-800 ${
            buttonsDisabled === true ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          Diabetic Foot Ulcer FFQ
        </button>
        <button
          onClick={() => {
            handleButtonClick("diabeticfootulcerinterview");
          }}
          disabled={buttonsDisabled}
          className={`text-white bg-teal-500 w-full mx-2 text-center max-lg:my-2 hover:bg-teal-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 my-1 dark:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none dark:focus:ring-blue-800 ${
            buttonsDisabled === true ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          Diabetic Foot Ulcer Interview
        </button>
      </div>
      <div className="m-5 flex items-center justify-around max-lg:flex-col">
        <button
          onClick={() => {
            handleButtonClick("ffqvalidationdemographic");
          }}
          disabled={buttonsDisabled}
          className={`text-white bg-fuchsia-500 w-full mx-2 text-center max-lg:my-2 hover:bg-fuchsia-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 my-1 dark:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none dark:focus:ring-blue-800 ${
            buttonsDisabled === true ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          FFQ Validation Demographic
        </button>
        <button
          onClick={() => {
            handleButtonClick("ffqvalidation");
          }}
          disabled={buttonsDisabled}
          className={`text-white bg-fuchsia-500 w-full mx-2 text-center max-lg:my-2 hover:bg-fuchsia-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 my-1 dark:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none dark:focus:ring-blue-800 ${
            buttonsDisabled === true ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          FFQ Validation
        </button>
        <button
          onClick={() => {
            handleButtonClick("ffqvalidationhabit");
          }}
          disabled={buttonsDisabled}
          className={`text-white bg-fuchsia-500 w-full mx-2 text-center max-lg:my-2 hover:bg-fuchsia-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 my-1 dark:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none dark:focus:ring-blue-800 ${
            buttonsDisabled === true ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          FFQ Validation Habit
        </button>
      </div>
      {fetchedData.length > 0 ? (
        <>
          <Table
            data={fetchedData}
            questionType={questionType ?? questionType}
          />
        </>
      ) : (
        <div className="w-[95%] text-white rounded-lg m-auto text-center bg-green-500 p-5">
          لطفا برای خروجی گرفتن انتخاب کنید
        </div>
      )}
    </div>
  );
}
