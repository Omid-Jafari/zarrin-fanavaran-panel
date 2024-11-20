import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useRef, useState } from "react";
import DatePicker from "react-multi-date-picker";
import * as Yup from "yup";
import { editUser } from "../../../api/ApiClient";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import CustomRadioBtn from "../../common/customRadioBtn";

const FirstUserSection = (props) => {
  const { userData, id } = props;
  const query = useQueryClient();
  const [edit, setEdit] = useState({
    name: false,
    born_at: false,
    national_code: false,
  });
  const datePickerRef = useRef();
  const editUserMutataion = useMutation((data) => editUser(id, data), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    onSuccess: (res) => {
      query.invalidateQueries("singleUserQuery");
      setEdit({
        name: false,
        born_at: false,
        national_code: false,
      });
    },
  });
  const formik = useFormik({
    initialValues: {
      first_name: userData?.first_name,
      last_name: userData?.last_name,
      born_at: userData?.jborn_at,
      national_code: userData?.national_code,
      status: userData?.status,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      national_code:
        edit.national_code &&
        Yup.number().required("لطفا کد ملی را وارد کنید").nullable(),
      first_name:
        edit.name && Yup.string().required("لطفا نام یوزر را وارد کنید"),
      last_name:
        edit.name && Yup.string().required("لطفا نام یوزر را وارد کنید"),
      born_at:
        edit.born_at &&
        Yup.string().required("لطفا تاریخ تولد یوزر را وارد کنید"),
    }),

    onSubmit: (data) => {
      if (edit?.born_at) {
        data.born_at = data?.born_at.format("YYYY/MM/DD");
      }
      editUserMutataion.mutate(data);
    },
  });
  function handleChange(value) {
    formik.setFieldValue("born_at", value);
  }
  return (
    <div className="flex gap-3 w-full ">
      <div className="flex flex-col gap-5">
        <div className="flex gap-2 items-center font-medium font-KalamehMed text-sm text-primary rounded-lg bg-white h-14 px-4 w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              fill="#00838F"
              d="M12.12 13.53h-.17c-2.27-.07-3.97-1.84-3.97-4.02 0-2.22 1.81-4.03 4.03-4.03s4.03 1.81 4.03 4.03a4.014 4.014 0 01-3.89 4.02h-.03zM12 6.97c-1.4 0-2.53 1.14-2.53 2.53a2.52 2.52 0 002.43 2.53.84.84 0 01.23 0 2.535 2.535 0 002.4-2.53c0-1.39-1.13-2.53-2.53-2.53zM12 22.75c-2.69 0-5.26-1-7.25-2.82a.755.755 0 01-.24-.63c.13-1.19.87-2.3 2.1-3.12 2.98-1.98 7.81-1.98 10.78 0 1.23.83 1.97 1.93 2.1 3.12.03.24-.06.47-.24.63A10.71 10.71 0 0112 22.75zM6.08 19.1A9.208 9.208 0 0012 21.25c2.17 0 4.26-.76 5.92-2.15-.18-.61-.66-1.2-1.37-1.68-2.46-1.64-6.63-1.64-9.11 0-.71.48-1.18 1.07-1.36 1.68z"
            ></path>
            <path
              fill="#00838F"
              d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12S6.07 1.25 12 1.25 22.75 6.07 22.75 12 17.93 22.75 12 22.75zm0-20C6.9 2.75 2.75 6.9 2.75 12S6.9 21.25 12 21.25s9.25-4.15 9.25-9.25S17.1 2.75 12 2.75z"
            ></path>
          </svg>
          نام کاربری:
        </div>
        <div className="flex gap-2 items-center font-medium font-KalamehMed text-sm text-primary rounded-lg bg-white h-14 px-4 w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              fill="#00838F"
              d="M8 5.75c-.41 0-.75-.34-.75-.75V2c0-.41.34-.75.75-.75s.75.34.75.75v3c0 .41-.34.75-.75.75zM16 5.75c-.41 0-.75-.34-.75-.75V2c0-.41.34-.75.75-.75s.75.34.75.75v3c0 .41-.34.75-.75.75zM20.5 9.84h-17c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h17c.41 0 .75.34.75.75s-.34.75-.75.75z"
            ></path>
            <path
              fill="#00838F"
              d="M16 22.75H8c-3.65 0-5.75-2.1-5.75-5.75V8.5c0-3.65 2.1-5.75 5.75-5.75h8c3.65 0 5.75 2.1 5.75 5.75V17c0 3.65-2.1 5.75-5.75 5.75zM8 4.25c-2.86 0-4.25 1.39-4.25 4.25V17c0 2.86 1.39 4.25 4.25 4.25h8c2.86 0 4.25-1.39 4.25-4.25V8.5c0-2.86-1.39-4.25-4.25-4.25H8z"
            ></path>
            <path
              fill="#222427"
              d="M8.5 14.5c-.13 0-.26-.03-.38-.08s-.23-.12-.33-.21c-.09-.1-.16-.21-.21-.33a.995.995 0 01-.08-.38c0-.26.11-.52.29-.71.1-.09.21-.16.33-.21.18-.08.38-.1.58-.06.06.01.12.03.18.06.06.02.12.05.18.09l.15.12c.04.05.09.1.12.15.04.06.07.12.09.18.03.06.05.12.06.18.01.07.02.13.02.2 0 .26-.11.52-.29.71-.19.18-.45.29-.71.29zM12 14.5c-.26 0-.52-.11-.71-.29l-.12-.15a.757.757 0 01-.09-.18.636.636 0 01-.06-.18c-.01-.07-.02-.13-.02-.2 0-.13.03-.26.08-.38s.12-.23.21-.33c.28-.28.73-.37 1.09-.21.13.05.23.12.33.21.18.19.29.45.29.71 0 .07-.01.13-.02.2-.01.06-.03.12-.06.18-.02.06-.05.12-.09.18l-.12.15c-.1.09-.2.16-.33.21-.12.05-.25.08-.38.08zM8.5 18c-.13 0-.26-.03-.38-.08s-.23-.12-.33-.21c-.09-.1-.16-.2-.21-.33A.996.996 0 017.5 17c0-.26.11-.52.29-.71.1-.09.21-.16.33-.21.37-.16.81-.07 1.09.21.04.05.09.1.12.15.04.06.07.12.09.18.03.06.05.12.06.19.01.06.02.13.02.19 0 .26-.11.52-.29.71-.19.18-.45.29-.71.29z"
            ></path>
          </svg>
          تاریخ عضویت:
        </div>
        <div className="flex gap-2 items-center font-medium font-KalamehMed text-sm text-primary rounded-lg bg-white h-14 px-4 w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              fill="#00838F"
              d="M17 21.75H7c-4.41 0-5.75-1.34-5.75-5.75V8c0-4.41 1.34-5.75 5.75-5.75h10c4.41 0 5.75 1.34 5.75 5.75v8c0 4.41-1.34 5.75-5.75 5.75zm-10-18c-3.58 0-4.25.68-4.25 4.25v8c0 3.57.67 4.25 4.25 4.25h10c3.58 0 4.25-.68 4.25-4.25V8c0-3.57-.67-4.25-4.25-4.25H7z"
            ></path>
            <path
              fill="#00838F"
              d="M19 8.75h-5c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h5c.41 0 .75.34.75.75s-.34.75-.75.75zM19 12.75h-4c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h4c.41 0 .75.34.75.75s-.34.75-.75.75zM19 16.75h-2c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h2c.41 0 .75.34.75.75s-.34.75-.75.75zM8.5 12.04c-1.41 0-2.56-1.15-2.56-2.56 0-1.41 1.15-2.56 2.56-2.56 1.41 0 2.56 1.15 2.56 2.56 0 1.41-1.15 2.56-2.56 2.56zm0-3.62c-.58 0-1.06.48-1.06 1.06 0 .58.48 1.06 1.06 1.06.58 0 1.06-.48 1.06-1.06 0-.58-.48-1.06-1.06-1.06zM12 17.08c-.38 0-.71-.29-.75-.68a2.301 2.301 0 00-2.07-2.05 7.95 7.95 0 00-1.38 0c-1.09.1-1.96.96-2.07 2.05-.04.41-.41.72-.82.67a.75.75 0 01-.67-.82c.18-1.8 1.61-3.23 3.42-3.39.55-.05 1.11-.05 1.66 0 1.8.17 3.24 1.6 3.42 3.39a.75.75 0 01-.67.82c-.02.01-.05.01-.07.01z"
            ></path>
          </svg>
          نام و نام خانوادگی:
        </div>
        <div className="flex gap-2 items-center font-medium font-KalamehMed text-sm text-primary rounded-lg bg-white h-14 px-4 w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              fill="#00838F"
              d="M22 22.75H2c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h20c.41 0 .75.34.75.75s-.34.75-.75.75z"
            ></path>
            <path
              fill="#00838F"
              d="M20.89 22.75c-.41 0-.75-.34-.75-.75v-9c0-1.24-1.16-2.25-2.58-2.25H6.44c-1.42 0-2.58 1.01-2.58 2.25v9c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-9c0-2.07 1.83-3.75 4.08-3.75h11.11c2.25 0 4.08 1.68 4.08 3.75v9a.74.74 0 01-.74.75z"
            ></path>
            <path
              fill="#00838F"
              d="M18.44 10.75c-.41 0-.75-.34-.75-.75V7.17c0-.78-.75-1.42-1.66-1.42H7.98c-.92 0-1.66.64-1.66 1.42V10c0 .41-.34.75-.75.75s-.76-.34-.76-.75V7.17c0-1.61 1.42-2.92 3.16-2.92h8.05c1.74 0 3.16 1.31 3.16 2.92V10a.74.74 0 01-.74.75zM17.33 17.75a2.1 2.1 0 01-2.1-2.1v-.31c0-.33-.27-.6-.6-.6-.33 0-.6.27-.6.6v.31a2.1 2.1 0 11-4.2 0v-.31c0-.33-.27-.6-.6-.6-.33 0-.6.27-.6.6v.31a2.1 2.1 0 11-4.2 0v-.33c0-.32-.26-.59-.59-.6h-.37a.755.755 0 01-.74-.76c.01-.41.34-.74.75-.74h.38c1.14.02 2.07.96 2.07 2.1v.33c0 .33.27.6.6.6.33 0 .6-.27.6-.6v-.31a2.1 2.1 0 114.2 0v.31c0 .33.27.6.6.6.33 0 .6-.27.6-.6v-.31a2.1 2.1 0 114.2 0v.31c0 .33.27.6.6.6.33 0 .6-.27.6-.6v-.31c0-1.16.94-2.1 2.1-2.1h.45c.41 0 .75.34.75.75s-.34.75-.75.75h-.45c-.33 0-.6.27-.6.6v.31a2.1 2.1 0 01-2.1 2.1z"
            ></path>
            <path
              fill="#00838F"
              d="M8 5.75c-.41 0-.75-.34-.75-.75V3c0-.41.34-.75.75-.75s.75.34.75.75v2c0 .41-.34.75-.75.75zM16 5.75c-.41 0-.75-.34-.75-.75V3c0-.41.34-.75.75-.75s.75.34.75.75v2c0 .41-.34.75-.75.75zM12 5.75c-.41 0-.75-.34-.75-.75V2c0-.41.34-.75.75-.75s.75.34.75.75v3c0 .41-.34.75-.75.75z"
            ></path>
          </svg>
          تاریخ تولد:
        </div>
        <div className="flex gap-2 items-center font-medium font-KalamehMed text-sm text-primary rounded-lg bg-white h-14 px-4 w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              fill="#00838F"
              d="M12 .95v.01C5.908.96.96 5.908.96 12 .96 18.09 5.908 23.04 12 23.04v.009l.467-.02c.168-.008.336-.02.502-.035l.1-.007c.125-.012.249-.029.373-.045.06-.008.12-.014.18-.023.11-.015.217-.035.324-.054.074-.013.148-.025.22-.04.076-.014.151-.032.226-.049.123-.027.245-.053.365-.084l.034-.01a11.011 11.011 0 008.192-9.555c.018-.186.034-.373.043-.56v-.005a11.283 11.283 0 000-1.13l-.006-.078c-.009-.161-.021-.323-.037-.482l-.001-.008a11.012 11.012 0 00-8.225-9.557l-.013-.002c-.129-.033-.26-.063-.39-.091-.056-.013-.11-.026-.167-.037-.099-.02-.199-.036-.299-.053-.088-.016-.176-.031-.264-.044-.06-.01-.122-.015-.182-.023-.124-.016-.248-.033-.373-.045l-.12-.01a11.079 11.079 0 00-.447-.03L12 .949zm0 .97v20.16A10.073 10.073 0 011.92 12C1.92 6.426 6.427 1.92 12 1.92zm.96 1.972c1.305.148 2.66.641 3.977 1.459a.48.48 0 11-.507.817c-1.162-.723-2.344-1.164-3.47-1.31v-.966zm-1.92.01c-1.268.162-2.587.651-3.871 1.45a.48.48 0 00.507.815c1.12-.696 2.259-1.132 3.364-1.293v-.972zm1.92 1.917c2.302.254 4.423 1.335 5.797 2.994a.48.48 0 11-.738.612c-1.197-1.443-3.042-2.393-5.059-2.64V5.82zm-1.92.005c-2.276.268-4.367 1.346-5.728 2.989a.48.48 0 10.74.612c1.182-1.427 2.998-2.37 4.988-2.63v-.97zm1.92 1.92c3.407.449 5.28 3.428 5.28 5.543 0 1.22-.603 2.299-1.537 2.748-.292.14-.601.21-.914.21-.54 0-1.093-.207-1.599-.612-.62-.58-.832-1.28-1.02-1.9a6.824 6.824 0 00-.21-.614V11.72c.706.351.935 1.1 1.128 1.735.16.527.325 1.072.73 1.453.485.385 1.004.484 1.47.261.593-.286.992-1.043.992-1.883 0-1.755-1.624-4.13-4.32-4.57v-.974zm-1.92.019c-2.315.327-3.569 1.534-4.228 2.556-1.29 2-1.279 4.745-.614 6.31a.482.482 0 00.885-.375c-.487-1.147-.643-3.585.536-5.414.747-1.16 1.901-1.858 3.421-2.1v-.977zm-.001 1.943a5.24 5.24 0 00-.907.293c-1.39.589-2.222 1.738-2.41 3.322-.323 2.707 1.322 5.993 2.335 6.745a.485.485 0 00.674-.1.48.48 0 00-.1-.672c-.704-.521-2.246-3.423-1.956-5.86.147-1.24.764-2.098 1.832-2.551.18-.077.357-.135.532-.185v-.992zm1.921.018c.707.18 1.363.56 1.926 1.133.96.975 1.448 2.283 1.434 3.072a.48.48 0 01-.48.47h-.01a.48.48 0 01-.47-.489c.01-.49-.344-1.554-1.158-2.38a3.231 3.231 0 00-1.242-.808v-.998zm-1.92 1.954c-.503.181-.823.49-1.016.765-.564.805-.61 2.08-.125 3.41a7.633 7.633 0 001.141 2.022v-1.798a5.884 5.884 0 01-.24-.553c-.371-1.02-.368-1.991.01-2.532a1.08 1.08 0 01.23-.236v-1.078zm1.92 3.773c.527.843 1.53 1.822 3.379 2.011a.48.48 0 11-.098.955c-1.513-.155-2.561-.766-3.281-1.468V15.45zm0 2.955c.358.263.738.485 1.142.65a.48.48 0 11-.364.888 6.239 6.239 0 01-.778-.392v-1.146z"
            ></path>
          </svg>
          کد ملی:
        </div>
        <div className="flex gap-2 items-center font-medium font-KalamehMed text-sm text-primary rounded-lg bg-white h-14 px-4 w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              fill="#00838F"
              d="M12 22.75c-.67 0-1.35-.17-1.95-.52L4.11 18.8c-1.2-.7-1.95-1.99-1.95-3.38V8.58c0-1.39.75-2.68 1.95-3.38l5.94-3.43c1.2-.7 2.69-.7 3.9 0l5.94 3.43c1.2.7 1.95 1.99 1.95 3.38v6.84c0 1.39-.75 2.68-1.95 3.38l-5.94 3.43c-.6.35-1.28.52-1.95.52zm0-20c-.41 0-.83.11-1.2.32L4.86 6.5c-.74.43-1.2 1.22-1.2 2.08v6.84c0 .85.46 1.65 1.2 2.08l5.94 3.43c.74.43 1.66.43 2.4 0l5.94-3.43c.74-.43 1.2-1.22 1.2-2.08V8.58c0-.85-.46-1.65-1.2-2.08L13.2 3.07c-.37-.21-.79-.32-1.2-.32z"
            ></path>
            <path
              fill="#00838F"
              d="M12 11.75c-1.7 0-3.08-1.38-3.08-3.08 0-1.7 1.38-3.08 3.08-3.08 1.7 0 3.08 1.38 3.08 3.08 0 1.7-1.38 3.08-3.08 3.08zm0-4.66c-.87 0-1.58.71-1.58 1.58 0 .87.71 1.58 1.58 1.58.87 0 1.58-.71 1.58-1.58 0-.87-.71-1.58-1.58-1.58zM16 17.41c-.41 0-.75-.34-.75-.75 0-1.38-1.46-2.51-3.25-2.51s-3.25 1.13-3.25 2.51c0 .41-.34.75-.75.75s-.75-.34-.75-.75c0-2.21 2.13-4.01 4.75-4.01s4.75 1.8 4.75 4.01c0 .41-.34.75-.75.75z"
            ></path>
          </svg>
          وضعیت کاربر:
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-5">
        <div className="flex gap-2 items-center rounded-lg bg-white h-14 px-4 w-full">
          {userData?.mobile_number}
        </div>
        <div className="flex gap-2 items-center rounded-lg bg-white h-14 px-4 w-full">
          {userData?.jcreated_at}
        </div>
        <div className="flex items-center h-14 w-full">
          <div className="flex-1 rounded-r-lg bg-white h-full flex items-center gap-4 px-4">
            {edit.name ? (
              <>
                <div className="w-1/2 flex gap-2 items-center py-2 h-full">
                  <input
                    type="text"
                    className="rounded-lg bg-blue-lightt outline-0 flex-1 placeholder:text-[#C4C7C7] px-2 h-full"
                    placeholder="نام"
                    id="first_name"
                    name="first_name"
                    value={formik.values?.first_name}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.first_name && formik.touched.first_name && (
                    <div className="text-red-600 text-sm">
                      {formik.errors.first_name}
                    </div>
                  )}
                </div>
                <div className="w-1/2 flex gap-2 items-center py-2 h-full">
                  <input
                    type="text"
                    className="rounded-lg bg-blue-lightt outline-0 flex-1 placeholder:text-[#C4C7C7] px-2 h-full"
                    placeholder="نام خانوادگی"
                    id="last_name"
                    name="last_name"
                    value={formik.values?.last_name}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.last_name && formik.touched.last_name && (
                    <div className="text-red-600 text-sm">
                      {formik.errors.last_name}
                    </div>
                  )}
                </div>
              </>
            ) : (
              userData?.full_name
            )}
          </div>
          {edit.name ? (
            <button
              onClick={() => formik.handleSubmit()}
              className="rounded-l-lg bg-cyann h-full flex items-center gap-2 px-5 text-white hover:bg-primary transition-colors duration-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="24"
                fill="none"
                viewBox="0 0 25 24"
              >
                <path
                  fill="#fff"
                  d="M15.5 22.75h-6c-5.43 0-7.75-2.32-7.75-7.75V9c0-5.43 2.32-7.75 7.75-7.75h6c5.43 0 7.75 2.32 7.75 7.75v6c0 5.43-2.32 7.75-7.75 7.75zm-6-20C4.89 2.75 3.25 4.39 3.25 9v6c0 4.61 1.64 6.25 6.25 6.25h6c4.61 0 6.25-1.64 6.25-6.25V9c0-4.61-1.64-6.25-6.25-6.25h-6z"
                ></path>
                <path
                  fill="#fff"
                  d="M11.08 15.58a.75.75 0 01-.53-.22l-2.83-2.83a.754.754 0 010-1.06c.29-.29.77-.29 1.06 0l2.3 2.3 5.14-5.14c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06l-5.67 5.67a.75.75 0 01-.53.22z"
                ></path>
              </svg>
              ثبت
            </button>
          ) : (
            <button
              onClick={() => setEdit({ ...edit, name: true })}
              className="rounded-l-lg bg-cyann h-full flex items-center gap-2 px-3 group text-white hover:bg-primary transition-colors duration-500"
            >
              <div className="flex flex-col items-end">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="24"
                  fill="none"
                  viewBox="0 0 25 24"
                >
                  <path
                    fill="#fff"
                    d="M5.615 21.52c-.61 0-1.18-.21-1.59-.6-.52-.49-.77-1.23-.68-2.03l.37-3.24c.07-.61.44-1.42.87-1.86l8.21-8.69c2.05-2.17 4.19-2.23 6.36-.18s2.23 4.19.18 6.36l-8.21 8.69c-.42.45-1.2.87-1.81.97l-3.22.55c-.17.01-.32.03-.48.03zm10.39-16.61c-.77 0-1.44.48-2.12 1.2l-8.21 8.7c-.2.21-.43.71-.47 1l-.37 3.24c-.04.33.04.6.22.77.18.17.45.23.78.18l3.22-.55c.29-.05.77-.31.97-.52l8.21-8.69c1.24-1.32 1.69-2.54-.12-4.24-.8-.77-1.49-1.09-2.11-1.09z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M17.415 12.95h-.07a6.86 6.86 0 01-6.11-5.78c-.06-.41.22-.79.63-.86.41-.06.79.22.86.63a5.372 5.372 0 004.78 4.52c.41.04.71.41.67.82-.05.38-.38.67-.76.67z"
                  ></path>
                </svg>
                <div className="bg-white h-[2px] rounded-full w-[2px] group-hover:w-full transition-all duration-500"></div>
              </div>
              ویرایش
            </button>
          )}
        </div>
        <div className="flex items-center h-14 w-full">
          <div className="flex-1 rounded-r-lg bg-white h-full flex items-center gap-4 px-4">
            {edit.born_at ? (
              <>
                <div className="w-full flex gap-2 items-center py-2 h-full">
                  <DatePicker
                    ref={datePickerRef}
                    value={formik.values.born_at}
                    onChange={handleChange}
                    format="YYYY/MM/DD"
                    calendar={persian}
                    locale={persian_fa}
                    inputClass="w-full outline-none bg-[#DBEEF6] p-3 rounded-lg "
                  />
                  {formik.errors.born_at && formik.touched.born_at && (
                    <div className="text-red-600 text-sm">
                      {formik.errors.born_at}
                    </div>
                  )}
                </div>
              </>
            ) : (
              userData?.jborn_at
            )}
          </div>
          {edit.born_at ? (
            <button
              onClick={() => formik.handleSubmit()}
              className="rounded-l-lg bg-cyann h-full flex items-center gap-2 px-5 text-white hover:bg-primary transition-colors duration-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="24"
                fill="none"
                viewBox="0 0 25 24"
              >
                <path
                  fill="#fff"
                  d="M15.5 22.75h-6c-5.43 0-7.75-2.32-7.75-7.75V9c0-5.43 2.32-7.75 7.75-7.75h6c5.43 0 7.75 2.32 7.75 7.75v6c0 5.43-2.32 7.75-7.75 7.75zm-6-20C4.89 2.75 3.25 4.39 3.25 9v6c0 4.61 1.64 6.25 6.25 6.25h6c4.61 0 6.25-1.64 6.25-6.25V9c0-4.61-1.64-6.25-6.25-6.25h-6z"
                ></path>
                <path
                  fill="#fff"
                  d="M11.08 15.58a.75.75 0 01-.53-.22l-2.83-2.83a.754.754 0 010-1.06c.29-.29.77-.29 1.06 0l2.3 2.3 5.14-5.14c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06l-5.67 5.67a.75.75 0 01-.53.22z"
                ></path>
              </svg>
              ثبت
            </button>
          ) : (
            <button
              onClick={() => setEdit({ ...edit, born_at: true })}
              className="rounded-l-lg bg-cyann h-full flex items-center gap-2 px-3 group text-white hover:bg-primary transition-colors duration-500"
            >
              <div className="flex flex-col items-end">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="24"
                  fill="none"
                  viewBox="0 0 25 24"
                >
                  <path
                    fill="#fff"
                    d="M5.615 21.52c-.61 0-1.18-.21-1.59-.6-.52-.49-.77-1.23-.68-2.03l.37-3.24c.07-.61.44-1.42.87-1.86l8.21-8.69c2.05-2.17 4.19-2.23 6.36-.18s2.23 4.19.18 6.36l-8.21 8.69c-.42.45-1.2.87-1.81.97l-3.22.55c-.17.01-.32.03-.48.03zm10.39-16.61c-.77 0-1.44.48-2.12 1.2l-8.21 8.7c-.2.21-.43.71-.47 1l-.37 3.24c-.04.33.04.6.22.77.18.17.45.23.78.18l3.22-.55c.29-.05.77-.31.97-.52l8.21-8.69c1.24-1.32 1.69-2.54-.12-4.24-.8-.77-1.49-1.09-2.11-1.09z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M17.415 12.95h-.07a6.86 6.86 0 01-6.11-5.78c-.06-.41.22-.79.63-.86.41-.06.79.22.86.63a5.372 5.372 0 004.78 4.52c.41.04.71.41.67.82-.05.38-.38.67-.76.67z"
                  ></path>
                </svg>
                <div className="bg-white h-[2px] rounded-full w-[2px] group-hover:w-full transition-all duration-500"></div>
              </div>
              ویرایش
            </button>
          )}
        </div>
        <div className="flex items-center h-14 w-full">
          <div className="flex-1 rounded-r-lg bg-white h-full flex items-center gap-4 px-4">
            {edit.national_code ? (
              <>
                <div className="w-full flex gap-2 items-center py-2 h-full">
                  <input
                    type="number"
                    className="rounded-lg bg-blue-lightt outline-0 flex-1 placeholder:text-[#C4C7C7] px-2 h-full"
                    placeholder="کد ملی"
                    id="national_code"
                    name="national_code"
                    value={formik.values?.national_code}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.national_code &&
                    formik.touched.national_code && (
                      <div className="text-red-600 text-sm">
                        {formik.errors.national_code}
                      </div>
                    )}
                </div>
              </>
            ) : (
              userData?.national_code
            )}
          </div>
          {edit.national_code ? (
            <button
              onClick={() => formik.handleSubmit()}
              className="rounded-l-lg bg-cyann h-full flex items-center gap-2 px-5 text-white hover:bg-primary transition-colors duration-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="24"
                fill="none"
                viewBox="0 0 25 24"
              >
                <path
                  fill="#fff"
                  d="M15.5 22.75h-6c-5.43 0-7.75-2.32-7.75-7.75V9c0-5.43 2.32-7.75 7.75-7.75h6c5.43 0 7.75 2.32 7.75 7.75v6c0 5.43-2.32 7.75-7.75 7.75zm-6-20C4.89 2.75 3.25 4.39 3.25 9v6c0 4.61 1.64 6.25 6.25 6.25h6c4.61 0 6.25-1.64 6.25-6.25V9c0-4.61-1.64-6.25-6.25-6.25h-6z"
                ></path>
                <path
                  fill="#fff"
                  d="M11.08 15.58a.75.75 0 01-.53-.22l-2.83-2.83a.754.754 0 010-1.06c.29-.29.77-.29 1.06 0l2.3 2.3 5.14-5.14c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06l-5.67 5.67a.75.75 0 01-.53.22z"
                ></path>
              </svg>
              ثبت
            </button>
          ) : (
            <button
              onClick={() => setEdit({ ...edit, national_code: true })}
              className="rounded-l-lg bg-cyann h-full flex items-center gap-2 px-3 group text-white hover:bg-primary transition-colors duration-500"
            >
              <div className="flex flex-col items-end">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="24"
                  fill="none"
                  viewBox="0 0 25 24"
                >
                  <path
                    fill="#fff"
                    d="M5.615 21.52c-.61 0-1.18-.21-1.59-.6-.52-.49-.77-1.23-.68-2.03l.37-3.24c.07-.61.44-1.42.87-1.86l8.21-8.69c2.05-2.17 4.19-2.23 6.36-.18s2.23 4.19.18 6.36l-8.21 8.69c-.42.45-1.2.87-1.81.97l-3.22.55c-.17.01-.32.03-.48.03zm10.39-16.61c-.77 0-1.44.48-2.12 1.2l-8.21 8.7c-.2.21-.43.71-.47 1l-.37 3.24c-.04.33.04.6.22.77.18.17.45.23.78.18l3.22-.55c.29-.05.77-.31.97-.52l8.21-8.69c1.24-1.32 1.69-2.54-.12-4.24-.8-.77-1.49-1.09-2.11-1.09z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M17.415 12.95h-.07a6.86 6.86 0 01-6.11-5.78c-.06-.41.22-.79.63-.86.41-.06.79.22.86.63a5.372 5.372 0 004.78 4.52c.41.04.71.41.67.82-.05.38-.38.67-.76.67z"
                  ></path>
                </svg>
                <div className="bg-white h-[2px] rounded-full w-[2px] group-hover:w-full transition-all duration-500"></div>
              </div>
              ویرایش
            </button>
          )}
        </div>
        <div className="flex gap-2 items-center rounded-lg bg-white h-14 px-4 w-full">
          <CustomRadioBtn
            clickFunc={() => {
              formik.values.status === "ACTIVE"
                ? formik.setFieldValue("status", "INACTIVE")
                : formik.setFieldValue("status", "ACTIVE");
              formik.handleSubmit();
            }}
            checkCondition={formik.values.status === "ACTIVE"}
          />
          {userData?.status_info?.name}
        </div>
      </div>
    </div>
  );
};

export default FirstUserSection;
