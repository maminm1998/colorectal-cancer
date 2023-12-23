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

  const downloadExcel = () => {
    if (fetchedData.length === 0) {
    } else {
      const worksheet = XLSX.utils.json_to_sheet(fetchedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, `data.xlsx`);
    }
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
          Case Demographic
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
          Control Demographic
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
          Case FFQ
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
          Control FFQ
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
          Case Habit
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
          Control Habit
        </button>
      </div>
      {fetchedData.length > 0 ? (
        <Table data={fetchedData} />
      ) : (
        <div className="w-[95%] text-white rounded-lg m-auto text-center bg-orange-500 p-5">
          لطفا برای خروجی گرفتن انتخاب کنید
        </div>
      )}
    </div>
  );
}
