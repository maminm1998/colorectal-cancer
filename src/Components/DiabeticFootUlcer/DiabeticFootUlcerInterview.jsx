import React from "react";
import * as Yup from "yup";
import swal from "sweetalert";
import DynamicForm from "../../DynamicForm/DynamicForm";
import { useEffect } from "react";
const questions = [
  {
    subLabel: "",
    id: "نام",
    label: "نام",
    type: "text",
    validation: Yup.string("لطفا نام خود را به درستی وارد کنید")
      .required("وارد کردن نام الزامی است")
      .min(3, "لطفا نام خود را به درستی وارد کنید")
      .matches(
        /^[پچجحخهعغآ؟.،آفقثصضشسیبلاتنمکگوئدذرزطظژ!!ؤإأءًٌٍَُِّ\s]+$/u,
        "لطفا نام خود را به درستی وارد نمایید"
      ),
    placeholder: "نام خود را وارد نمایید",
  },
  {
    subLabel: "",
    id: "نام خانوادگی",
    label: "نام خانوادگی",
    type: "text",
    validation: Yup.string("لطفا نام خانوادگی خود را به درستی وارد کنید")
      .required("وارد کردن نام خانوادگی الزامی است")
      .min(3, "لطفا نام خانوادگی خود را به درستی وارد کنید")
      .matches(
        /^[پچجحخهعغآ؟.،آفقثصضشسیبلاتنمکگوئدذرزطظژ!!ؤإأءًٌٍَُِّ\s]+$/u,
        "لطفا نام خانوادگی خود را به درستی وارد نمایید"
      ),
    placeholder: "نام خانوادگی خود را وارد نمایید",
  },
  {
    img: "",
    subLabel: "",
    id: "کد بیمار :",
    label: "کد بیمار",
    type: "text",
    validation: Yup.string("لطفا کد را به درستی وارد کنید").required(
      "وارد کردن کد بیمار الزامی است"
    ),
    placeholder: "کد بیمار اینجا را وارد نمایید",
  },
  {
    subLabel: "",
    id: "شماره تلفن :",
    label: "شماره تلفن",
    type: "text",
    validation: Yup.string("لطفا شماره تلفن را به درستی وارد کنید").required(
      "وارد کردن شماره تلفن الزامی است"
    ),
    placeholder: "شماره تلفن خود را با صفر ابتدایی وارد نمایید",
  },
  {
    subLabel: "",
    id: "وزن (کیلوگرم)",
    label: "وزن (کیلوگرم)",
    type: "number",
    validation: Yup.number(
      "لطفا وزن خود را با کیبورد انگلیسی و به درستی وارد کنید"
    )
      .required("لطفا وزن خود را با کیبورد انگلیسی و به درستی وارد کنید")
      .max(200, "لطفا وزن خود را به درستی وارد نمایید")
      .positive("لطفا وزن خود را به درستی وارد نمایید")
      .min(30, "لطفا وزن خود را به درستی وارد نمایید"),
    placeholder: "منظور وزن با حداقل لباس و بدون کفش می باشد",
  },
  {
    subLabel: "",
    id: "وزن قبل از ابتلا به دیابت(کیلوگرم)",
    label: "وزن قبل از ابتلا به دیابت(کیلوگرم)",
    type: "number",
    validation: Yup.number(
      "لطفا وزن قبل از ابتلا به دیابت خود را با کیبورد انگلیسی و به درستی وارد کنید"
    )
      .max(200, "لطفا وزن قبل از ابتلا به دیابت خود را به درستی وارد نمایید")
      .positive("لطفا وزن قبل از ابتلا به دیابت خود را به درستی وارد نمایید")
      .min(30, "لطفا وزن قبل از ابتلا به دیابت خود را به درستی وارد نمایید"),
    placeholder:
      "منظور وزن قبل از ابتلا به دیابت با حداقل لباس و بدون کفش می باشد",
  },
  {
    subLabel: "",
    id: "قد (برحسب سانتی متر) :",
    label: "قد (برحسب سانتی متر) :",
    type: "number",
    validation: Yup.number(
      "لطفا قد خود را با کیبورد انگلیسی و به درستی وارد کنید"
    )
      .required("لطفا قد خود را با کیبورد انگلیسی و به درستی وارد کنید")
      .min(100, "لطفا قد خود را به درستی وارد نمایید")
      .max(250, "لطفا قد خود را به درستی وارد نمایید")
      .positive("لطفا قد خود را به درستی وارد نمایید")
      .integer(
        "لطفا زمان وارد شده را بدون اعشار و به صورت عدد صحیح وارد نمایید"
      ),
    placeholder: "قد بدون کفش وارد شود",
  },
  {
    subLabel: "",
    id: "دور کمر (برحسب سانتی متر) :",
    label: "دور کمر (برحسب سانتی متر) :",
    type: "number",
    validation: Yup.number(
      "لطفا دور کمر خود را با کیبورد انگلیسی و به درستی وارد کنید"
    ).positive("لطفا دور کمر خود را به درستی وارد نمایید"),
    placeholder: "",
  },
  {
    subLabel: "",
    id: "سال تشخیص دیابت",
    label: "از چه سالی دیابت شما تشخیص داده شد؟ ",
    type: "number",
    validation: Yup.number(
      "لطفا سال تشخیص دیابت خود را با کیبورد انگلیسی و به درستی وارد کنید"
    )
      .required(
        "لطفا سال تشخیص دیابت خود را با کیبورد انگلیسی و به درستی وارد کنید"
      )
      .max(150, "لطفا سال تشخیص دیابت خود را به درستی وارد نمایید")
      .min(0, "لطفا سال تشخیص دیابت خود را به درستی وارد نمایید")
      .positive("لطفا سال تشخیص دیابت خود را به درستی وارد نمایید")
      .integer(
        "لطفا زمان وارد شده را بدون اعشار و به صورت عدد صحیح وارد نمایید"
      ),
    placeholder: "مثلا : 2",
  },
  {
    subLabel: "",
    id: "آخرین مقدار قند خون ناشتا (در یک ماه اخیر)",
    label: "آخرین مقدار قند خون ناشتا (در یک ماه اخیر)",
    type: "number",
    validation: Yup.number(
      "لطفا آخرین مقدار قند خون ناشتا (در یک ماه اخیر) را با کیبورد انگلیسی و به درستی وارد کنید"
    )
      .max(
        1000,
        "لطفا آخرین مقدار قند خون ناشتا (در یک ماه اخیر) را به درستی وارد نمایید"
      )
      .min(
        0,
        "لطفا آخرین مقدار قند خون ناشتا (در یک ماه اخیر) را به درستی وارد نمایید"
      )
      .positive(
        "لطفا آخرین مقدار قند خون ناشتا (در یک ماه اخیر) را به درستی وارد نمایید"
      )
      .integer(
        "لطفا آخرین مقدار قند خون ناشتا (در یک ماه اخیر) وارد شده را بدون اعشار و به صورت عدد صحیح وارد نمایید"
      ),
    placeholder: "مثلا : 176",
  },
  {
    subLabel: "",
    id: "آخرین مقدار قند خون بعد وعده غذایی (در یک ماه اخیر)",
    label: "آخرین مقدار قند خون بعد وعده غذایی (در یک ماه اخیر)",
    type: "number",
    validation: Yup.number(
      "لطفا آخرین مقدار قند خون بعد وعده غذایی (در یک ماه اخیر) را با کیبورد انگلیسی و به درستی وارد کنید"
    )
      .max(
        1000,
        "لطفا آخرین مقدار قند خون بعد وعده غذایی (در یک ماه اخیر) را به درستی وارد نمایید"
      )
      .min(
        0,
        "لطفا آخرین مقدار قند خون بعد وعده غذایی (در یک ماه اخیر) را به درستی وارد نمایید"
      )
      .positive(
        "لطفا آخرین مقدار قند خون بعد وعده غذایی (در یک ماه اخیر) را به درستی وارد نمایید"
      )
      .integer(
        "لطفا آخرین مقدار قند خون بعد وعده غذایی (در یک ماه اخیر) وارد شده را بدون اعشار و به صورت عدد صحیح وارد نمایید"
      ),
    placeholder: "مثلا : 176",
  },
  {
    subLabel: "",
    id: "میانگین خوانش صبحگاهی در هفته یا ماه اخیر چقدر بوده است؟",
    label: "میانگین خوانش صبحگاهی در هفته یا ماه اخیر چقدر بوده است؟",
    type: "radio",
    options: [
      { id: "1", label: "قند خون کمتر از 100 میلی گرم/دسی لیتر بوده است" },
      {
        id: "2",
        label: "قند خون کمتر بین 100 تا 125 میلی گرم/دسی لیتر بوده است",
      },
      {
        id: "3",
        label: "قند خون کمتر بین 125 تا 200 میلی گرم/دسی لیتر بوده است",
      },
      { id: "4", label: "قند خون بیشتر از 200 میلی گرم/دسی لیتر بوده است" },
      { id: "5", label: "نامعلوم" },
    ],
    validation: Yup.string().required(
      "لطفا میانگین خوانش صبحگاهی را مشخص نمایید"
    ),
  },
  {
    subLabel: "",
    id: "به طور تقریبی چندین بار قند خون کمتر از 72mg/dl تجربه میکنید؟ ",
    label: "به طور تقریبی چندین بار قند خون کمتر از 72mg/dl تجربه میکنید؟ ",
    type: "radio",
    options: [
      { id: "1", label: "هرگز" },
      {
        id: "2",
        label: "حداقل سالی یک بار",
      },
      {
        id: "3",
        label: "حداقل ماهی یک بار",
      },
      { id: "4", label: "حداقل هفته ای یک بار" },
      { id: "5", label: "تقریبا هر روز" },
      { id: "6", label: "نامعلوم" },
    ],
    validation: Yup.string().required(
      "لطفا میزان قند کمتر از 72 را مشخص نمایید"
    ),
  },
  {
    subLabel: "",
    id: "آیا برای کنترل دیابت دارو مصرف میکنید؟",
    label: "آیا برای کنترل دیابت دارو مصرف میکنید؟",
    type: "radio",
    options: [
      { id: "1", label: "بله" },
      {
        id: "2",
        label: "خیر",
      },
    ],
    validation: Yup.string().required("لطفا داروی مصرفی را مشخص نمایید"),
  },
  {
    subLabel: "",
    id: "با توجه به سوال قبل، در صورتی که بیمار داروی کنترل قند مصرف می کند در باکس زیر وارد نمایید:",
    label:
      "با توجه به سوال قبل، در صورتی که بیمار داروی کنترل قند مصرف می کند در باکس زیر وارد نمایید:",
    type: "text",
    placeholder: "نام داروی های مصرفی اینجا وارد نمایید",
    validation: Yup.string(),
  },
  {
    subLabel: "",
    id: "توتال کلسترول (Total Cholestrol)",
    label: "توتال کلسترول (Total Cholestrol)",
    type: "number",
    validation: Yup.number(
      "لطفا توتال کلسترول (Total Cholestrol) خود را با کیبورد انگلیسی و به درستی وارد کنید"
    )
      .max(
        3000,
        "لطفا توتال کلسترول (Total Cholestrol) خود را به درستی وارد نمایید"
      )
      .positive(
        "لطفا توتال کلسترول (Total Cholestrol) خود را به درستی وارد نمایید"
      )
      .min(
        10,
        "لطفا توتال کلسترول (Total Cholestrol) خود را به درستی وارد نمایید"
      ),
    placeholder: "میزان توتال کلسترول (Total Cholestrol) اینجا وارد نمایید",
  },
  {
    subLabel: "",
    id: "لیپوپروتئین با چگالی پایین (LDL)",
    label: "لیپوپروتئین با چگالی پایین (LDL)",
    type: "number",
    validation: Yup.number(
      "لطفا لیپوپروتئین با چگالی پایین (LDL) خود را با کیبورد انگلیسی و به درستی وارد کنید"
    )
      .max(
        3000,
        "لطفا لیپوپروتئین با چگالی پایین (LDL) خود را به درستی وارد نمایید"
      )
      .positive(
        "لطفا لیپوپروتئین با چگالی پایین (LDL) خود را به درستی وارد نمایید"
      )
      .min(
        10,
        "لطفا لیپوپروتئین با چگالی پایین (LDL) خود را به درستی وارد نمایید"
      ),
    placeholder: "میزان لیپوپروتئین با چگالی پایین (LDL) اینجا وارد نمایید",
  },
  {
    subLabel: "",
    id: "لیپوپروتئین با چگالی بالا (HDL)",
    label: "لیپوپروتئین با چگالی بالا (HDL)",
    type: "number",
    validation: Yup.number(
      "لطفا لیپوپروتئین با چگالی بالا (HDL) خود را با کیبورد انگلیسی و به درستی وارد کنید"
    )
      .max(
        3000,
        "لطفا لیپوپروتئین با چگالی بالا (HDL) خود را به درستی وارد نمایید"
      )
      .positive(
        "لطفا لیپوپروتئین با چگالی بالا (HDL) خود را به درستی وارد نمایید"
      )
      .min(
        10,
        "لطفا لیپوپروتئین با چگالی بالا (HDL) خود را به درستی وارد نمایید"
      ),
    placeholder: "میزان لیپوپروتئین با چگالی بالا (HDL) اینجا وارد نمایید",
  },
  {
    subLabel: "",
    id: "تری گلیسیرید (Triglyceride)",
    label: "تری گلیسیرید (Triglyceride)",
    type: "number",
    validation: Yup.number(
      "لطفا تری گلیسیرید (Triglyceride) خود را با کیبورد انگلیسی و به درستی وارد کنید"
    )
      .max(3000, "لطفا تری گلیسیرید (Triglyceride) خود را به درستی وارد نمایید")
      .positive("لطفا تری گلیسیرید (Triglyceride) خود را به درستی وارد نمایید")
      .min(10, "لطفا تری گلیسیرید (Triglyceride) خود را به درستی وارد نمایید"),
    placeholder: "میزان تری گلیسیرید (Triglyceride) اینجا وارد نمایید",
  },
  {
    subLabel: "",
    id: "HbA1C",
    label: "HbA1C",
    type: "number",
    validation: Yup.number(
      "لطفا HbA1C خود را با کیبورد انگلیسی و به درستی وارد کنید"
    )
      .max(30, "لطفا HbA1C خود را به درستی وارد نمایید")
      .positive("لطفا HbA1C خود را به درستی وارد نمایید")
      .min(0, "لطفا HbA1C خود را به درستی وارد نمایید"),
    placeholder: "میزان HbA1C اینجا وارد نمایید",
  },
  {
    subLabel: "",
    id: "Hb",
    label: "Hb",
    type: "number",
    validation: Yup.number(
      "لطفا Hb خود را با کیبورد انگلیسی و به درستی وارد کنید"
    )
      .max(30, "لطفا Hb خود را به درستی وارد نمایید")
      .positive("لطفا Hb خود را به درستی وارد نمایید")
      .min(0, "لطفا Hb خود را به درستی وارد نمایید"),
    placeholder: "میزان Hb اینجا وارد نمایید",
  },
  {
    subLabel: "",
    id: "ALT",
    label: "ALT",
    type: "number",
    validation: Yup.number(
      "لطفا ALT خود را با کیبورد انگلیسی و به درستی وارد کنید"
    ).positive("لطفا ALT خود را به درستی وارد نمایید"),
    placeholder: "میزان ALT اینجا وارد نمایید",
  },
  {
    subLabel: "",
    id: "AST",
    label: "AST",
    type: "number",
    validation: Yup.number(
      "لطفا AST خود را با کیبورد انگلیسی و به درستی وارد کنید"
    ).positive("لطفا AST خود را به درستی وارد نمایید"),
    placeholder: "میزان AST اینجا وارد نمایید",
  },
  {
    subLabel: "",
    id: "Creatinine",
    label: "Creatinine",
    type: "number",
    validation: Yup.number(
      "لطفا Creatinine خود را با کیبورد انگلیسی و به درستی وارد کنید"
    ).positive("لطفا Creatinine خود را به درستی وارد نمایید"),
    placeholder: "میزان Creatinine اینجا وارد نمایید",
  },
  {
    subLabel: "",
    id: "Albumin Levels",
    label: "Albumin Levels",
    type: "number",
    validation: Yup.number(
      "لطفا Albumin Levels خود را با کیبورد انگلیسی و به درستی وارد کنید"
    )
      .positive("لطفا Albumin Levels خود را به درستی وارد نمایید")
      .min(0, "لطفا Albumin Levels خود را به درستی وارد نمایید"),
    placeholder: "میزان Albumin Levels اینجا وارد نمایید",
  },
  {
    subLabel: "",
    id: "Alb/Creatinine Ratio",
    label: "Alb/Creatinine Ratio",
    type: "number",
    validation: Yup.number(
      "لطفا Alb/Creatinine Ratio خود را با کیبورد انگلیسی و به درستی وارد کنید"
    )
      .positive("لطفا Alb/Creatinine Ratio خود را به درستی وارد نمایید")
      .min(0, "لطفا Alb/Creatinine Ratio خود را به درستی وارد نمایید"),
    placeholder: "میزان Alb/Creatinine Ratio اینجا وارد نمایید",
  },
  {
    subLabel: "",
    id: "آیا تاکنون به علت قند خون بالا یا کتواسیدوز دیابتی در بیمارستان بستری شده اید؟",
    label:
      "آیا تاکنون به علت قند خون بالا یا کتواسیدوز دیابتی در بیمارستان بستری شده اید؟",
    type: "radio",
    options: [
      { id: "1", label: "بله" },
      {
        id: "2",
        label: "خیر",
      },
      {
        id: "3",
        label: "مطمئن نیستم",
      },
    ],
    validation: Yup.string().required("لطفا داروی مصرفی را مشخص نمایید"),
  },
  {
    subLabel: "حداقل 1 و حداکثر ۸ گزینه را می‌توانید انتخاب کنید.",
    id: "در طول زندگی خود، به کدامیک از بیماری های زیر مبتلا شده اید؟",
    label: "در طول زندگی خود، به کدامیک از بیماری های زیر مبتلا شده اید؟",
    type: "checkbox",
    options: [
      { id: "1", label: "فشارخون بالا" },
      { id: "2", label: "مشکلات تیرویید" },
      { id: "3", label: "سوزش سر دل یا رفلاکس" },
      { id: "4", label: "فشار خون" },
      { id: "5", label: "پای دیابتی" },
      { id: "6", label: "حمله قلبی" },
      { id: "7", label: "سکته" },
      { id: "8", label: "هپاتیت" },
      { id: "9", label: "مشکلات چشمی دیابتی" },
      { id: "10", label: "بیماری کلیوی دیابتی" },
      {
        id: "11",
        label: "سرطان",
      },
      { id: "12", label: "کبد چرب" },
      { id: "13", label: "بیماری های دیگر" },
      { id: "هیچکدام", label: "هیچکدام" },
    ],
    validation: Yup.array()
      .max(8, "حداکثر مجاز به انتخاب 8 بیماری هستید")
      .required("لطفا سابقه بیماری خود را مشخص نمایید "),
  },
  {
    subLabel: "",
    id: "سایر بیماری ها",
    label: "سایر بیماری ها",
    type: "text",
    validation: Yup.string("لطفا سایر بیماری ها را به درستی وارد کنید").matches(
      /^[پچجحخهعغآ؟.،آفقثصضشسیبلاتنمکگوئدذرزطظژ!!ؤإأءًٌٍَُِّ\s]+$/u,
      "لطفا سایر بیماری ها را به درستی وارد نمایید"
    ),
    placeholder: "",
  },
  {
    subLabel: "",
    id: "زمان ابتلا به زخم پای دیابتی",
    label: "از چه سالی به زخم پای دیابتی مبتلا شده اید؟",
    type: "number",
    validation: Yup.number(
      "لطفا زمان ابتلا به زخم پای دیابتی خود را با کیبورد انگلیسی و به درستی وارد کنید"
    )
      .required(
        "لطفا زمان ابتلا به زخم پای دیابتی خود را با کیبورد انگلیسی و به درستی وارد کنید"
      )
      .max(150, "لطفا زمان ابتلا به زخم پای دیابتی خود را به درستی وارد نمایید")
      .min(0, "لطفا زمان ابتلا به زخم پای دیابتی خود را به درستی وارد نمایید")
      .positive("لطفا زمان ابتلا به زخم پای دیابتی خود را به درستی وارد نمایید")
      .integer(
        "لطفا زمان وارد شده را بدون اعشار و به صورت عدد صحیح وارد نمایید"
      ),
    placeholder: "مثلا : 2",
  },
  {
    subLabel: "",
    id: "آیا پرهیز غذایی خاصی یا حساسیتی دارید؟",
    label: "آیا پرهیز غذایی خاصی یا حساسیتی دارید؟",
    type: "text",
    validation: Yup.string(
      "لطفا پرهیز غذایی خود را به درستی وارد کنید"
    ).matches(
      /^[پچجحخهعغآ؟.،آفقثصضشسیبلاتنمکگوئدذرزطظژ!!ؤإأءًٌٍَُِّ\s]+$/u,
      "لطفا پرهیز غذایی خود را به درستی وارد نمایید"
    ),
    placeholder: "پرهیز غذایی خود را وارد نمایید",
  },
  {
    subLabel: "",
    id: "SAS1",
    label: "در 6 ماه گذشته  سبکی سر (Lightheadness) داشته ام.",
    type: "radio",
    options: [
      { id: "1", label: "بله" },
      {
        id: "2",
        label: "خیر",
      },
      {
        id: "3",
        label: "اذیت نشدم",
      },
      {
        id: "4",
        label: "خیلی کم",
      },
      {
        id: "5",
        label: "کم و بیش",
      },
      {
        id: "6",
        label: "تا حد متوسط",
      },
      {
        id: "7",
        label: "زیاد",
      },
    ],
    validation: Yup.string().required("لطفا به سوال پاسخ دهید."),
  },
  {
    subLabel: "",
    id: "SAS2",
    label: "در 6 ماه گذشته، خشکی دهان یا خشکی چشم ها داشته ام.",
    type: "radio",
    options: [
      { id: "1", label: "بله" },
      {
        id: "2",
        label: "خیر",
      },
      {
        id: "3",
        label: "اذیت نشدم",
      },
      {
        id: "4",
        label: "خیلی کم",
      },
      {
        id: "5",
        label: "کم و بیش",
      },
      {
        id: "6",
        label: "تا حد متوسط",
      },
      {
        id: "7",
        label: "زیاد",
      },
    ],
    validation: Yup.string().required("لطفا به سوال پاسخ دهید."),
  },
  {
    subLabel: "",
    id: "SAS3",
    label: "در 6 ماه گذشته، رنگ پریدگی یا سیانوز پاها داشته ام.",
    type: "radio",
    options: [
      { id: "1", label: "بله" },
      {
        id: "2",
        label: "خیر",
      },
      {
        id: "3",
        label: "اذیت نشدم",
      },
      {
        id: "4",
        label: "خیلی کم",
      },
      {
        id: "5",
        label: "کم و بیش",
      },
      {
        id: "6",
        label: "تا حد متوسط",
      },
      {
        id: "7",
        label: "زیاد",
      },
    ],
    validation: Yup.string().required("لطفا به سوال پاسخ دهید."),
  },
  {
    subLabel: "",
    id: "SAS4",
    label:
      "در 6 ماه گذشته، سردی پا ها در مقایسه با سایر قسمت های بدن در موقع استراحت داشته ام.",
    type: "radio",
    options: [
      { id: "1", label: "بله" },
      {
        id: "2",
        label: "خیر",
      },
      {
        id: "3",
        label: "اذیت نشدم",
      },
      {
        id: "4",
        label: "خیلی کم",
      },
      {
        id: "5",
        label: "کم و بیش",
      },
      {
        id: "6",
        label: "تا حد متوسط",
      },
      {
        id: "7",
        label: "زیاد",
      },
    ],
    validation: Yup.string().required("لطفا به سوال پاسخ دهید."),
  },
  {
    subLabel: "",
    id: "SAS5",
    label:
      "در 6 ماه گذشته، کاهش تعریق پاها در مقایسه با سایر قسمت های بدن در موقع استراحت داشته ام.",
    type: "radio",
    options: [
      { id: "1", label: "بله" },
      {
        id: "2",
        label: "خیر",
      },
      {
        id: "3",
        label: "اذیت نشدم",
      },
      {
        id: "4",
        label: "خیلی کم",
      },
      {
        id: "5",
        label: "کم و بیش",
      },
      {
        id: "6",
        label: "تا حد متوسط",
      },
      {
        id: "7",
        label: "زیاد",
      },
    ],
    validation: Yup.string().required("لطفا به سوال پاسخ دهید."),
  },
  {
    subLabel: "",
    id: "SAS6",
    label:
      "در 6 ماه گذشته، کاهش یا عدم تعریق پاها بعد از ورزش یا در هوای گرم داشته ام.",
    type: "radio",
    options: [
      { id: "1", label: "بله" },
      {
        id: "2",
        label: "خیر",
      },
      {
        id: "3",
        label: "اذیت نشدم",
      },
      {
        id: "4",
        label: "خیلی کم",
      },
      {
        id: "5",
        label: "کم و بیش",
      },
      {
        id: "6",
        label: "تا حد متوسط",
      },
      {
        id: "7",
        label: "زیاد",
      },
    ],
    validation: Yup.string().required("لطفا به سوال پاسخ دهید."),
  },
  {
    subLabel: "",
    id: "SAS7",
    label:
      "در 6 ماه گذشته، افزایش تعریق دست ها در مقایسه با سایر قسمت های بدن در موقع استراحت داشته ام.",
    type: "radio",
    options: [
      { id: "1", label: "بله" },
      {
        id: "2",
        label: "خیر",
      },
      {
        id: "3",
        label: "اذیت نشدم",
      },
      {
        id: "4",
        label: "خیلی کم",
      },
      {
        id: "5",
        label: "کم و بیش",
      },
      {
        id: "6",
        label: "تا حد متوسط",
      },
      {
        id: "7",
        label: "زیاد",
      },
    ],
    validation: Yup.string().required("لطفا به سوال پاسخ دهید."),
  },
  {
    subLabel: "",
    id: "SAS8",
    label:
      "در 6 ماه گذشته، تهوع، استفراغ یا نفخ بعد از خوردن مقدار کمی غذا داشته ام.",
    type: "radio",
    options: [
      { id: "1", label: "بله" },
      {
        id: "2",
        label: "خیر",
      },
      {
        id: "3",
        label: "اذیت نشدم",
      },
      {
        id: "4",
        label: "خیلی کم",
      },
      {
        id: "5",
        label: "کم و بیش",
      },
      {
        id: "6",
        label: "تا حد متوسط",
      },
      {
        id: "7",
        label: "زیاد",
      },
    ],
    validation: Yup.string().required("لطفا به سوال پاسخ دهید."),
  },
  {
    subLabel: "",
    id: "SAS9",
    label:
      "در 6 ماه گذشته، اسهال مداوم (شل کار کردن شکم بیشتر از ۳ بار در روز) داشته ام.",
    type: "radio",
    options: [
      { id: "1", label: "بله" },
      {
        id: "2",
        label: "خیر",
      },
      {
        id: "3",
        label: "اذیت نشدم",
      },
      {
        id: "4",
        label: "خیلی کم",
      },
      {
        id: "5",
        label: "کم و بیش",
      },
      {
        id: "6",
        label: "تا حد متوسط",
      },
      {
        id: "7",
        label: "زیاد",
      },
    ],
    validation: Yup.string().required("لطفا به سوال پاسخ دهید."),
  },
  {
    subLabel: "",
    id: "SAS10",
    label:
      "در 6 ماه گذشته، یبوست مداوم (کمتر از یک بار کار کردن شکم در ۲ روز) داشته ام.",
    type: "radio",
    options: [
      { id: "1", label: "بله" },
      {
        id: "2",
        label: "خیر",
      },
      {
        id: "3",
        label: "اذیت نشدم",
      },
      {
        id: "4",
        label: "خیلی کم",
      },
      {
        id: "5",
        label: "کم و بیش",
      },
      {
        id: "6",
        label: "تا حد متوسط",
      },
      {
        id: "7",
        label: "زیاد",
      },
    ],
    validation: Yup.string().required("لطفا به سوال پاسخ دهید."),
  },
  {
    subLabel: "",
    id: "SAS11",
    label: "در 6 ماه گذشته، بی اختیاری ادرار داشته ام.",
    type: "radio",
    options: [
      { id: "1", label: "بله" },
      {
        id: "2",
        label: "خیر",
      },
      {
        id: "3",
        label: "اذیت نشدم",
      },
      {
        id: "4",
        label: "خیلی کم",
      },
      {
        id: "5",
        label: "کم و بیش",
      },
      {
        id: "6",
        label: "تا حد متوسط",
      },
      {
        id: "7",
        label: "زیاد",
      },
    ],
    validation: Yup.string().required("لطفا به سوال پاسخ دهید."),
  },
  {
    subLabel: "",
    id: "SAS12",
    label: "در 6 ماه گذشته، مشکل در نعوظ مردان (erection) داشته ام.",
    type: "radio",
    options: [
      { id: "1", label: "بله" },
      {
        id: "2",
        label: "خیر",
      },
      {
        id: "3",
        label: "اذیت نشدم",
      },
      {
        id: "4",
        label: "خیلی کم",
      },
      {
        id: "5",
        label: "کم و بیش",
      },
      {
        id: "6",
        label: "تا حد متوسط",
      },
      {
        id: "7",
        label: "زیاد",
      },
    ],
    validation: Yup.string().required("لطفا به سوال پاسخ دهید."),
  },
];
const questionType = "diabeticfootulcerinterview";
export default function DiabeticFootUlcerInterview() {
  let isCompletedBefore = localStorage.getItem(questionType);
  // Use useEffect to show the swal message when the component mounts

  useEffect(() => {
    if (isCompletedBefore && !localStorage.getItem(`${questionType}admin`)) {
      swal({
        title: "شما قبلا این پرسشنامه را پر کرده اید",
        icon: "error",
        buttons: "متوجه شدم",
      });
    }
  }, [isCompletedBefore]);

  if (isCompletedBefore && !localStorage.getItem(`${questionType}admin`)) {
    return null; // Return null if the form has been completed before
  }

  return (
    <div className="border-2 my-1 border-blue-500 rounded-lg w-[95%] m-auto">
      <div className="bg-blue-500 rounded-t-lg p-2 text-white font-bold text-xl">
        پرسشنامه
      </div>
      <DynamicForm questionType={questionType} questions={questions} />
    </div>
  );
}
