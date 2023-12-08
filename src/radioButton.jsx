import React from "react";

export const radioButton = ({ title,name }) => {
  return (
    <div class="radio-section w-full mx-3  flex justify-start items-center flex-wrap">
      <div class="radio-list">
        <h1>{title} </h1>
        <div className=" flex max-md:flex-col justify-start items-start max-md:items-start">
          <div class="radio-item ">
            <input
              name={name}
              value={"خیر"}
              onChange={(e) => {
                form.values.vitD = e.target.value;
                setVitD(true);
              }}
              onBlur={form.handleBlur}
              id="radio79"
              type="radio"
            />
            <label for="radio79">خیر</label>
          </div>
          <div class="radio-item ">
            <input
              name="vitD"
              value={"بله، به صورت مرتب"}
              onChange={(e) => {
                form.values.vitD = e.target.value;
                setVitD(true);
              }}
              onBlur={form.handleBlur}
              id="radio80"
              type="radio"
            />
            <label for="radio80">بله، به صورت مرتب </label>
          </div>
          <div class="radio-item ">
            <input
              name="vitD"
              value={"بله ، گاهی اوقات"}
              onChange={(e) => {
                form.values.vitD = e.target.value;
                setVitD(true);
              }}
              onBlur={form.handleBlur}
              id="radio81"
              type="radio"
            />
            <label for="radio81">بله ، گاهی اوقات </label>
          </div>
        </div>
        <p className="text-red-500">
          {form.errors.vitD && form.touched.vitD && form.errors.vitD}
        </p>
      </div>
    </div>
  );
};
