import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ADD_GUARANTEE_VALIDATION_SCHEMA } from "../../constant/formik/validation_schema";
import AddMediaCategory from "../../components/category/add-media-category";
import { useMutation, useQuery } from "@tanstack/react-query";
import { uodateGuarantee, singleGuarantee } from "../../api/ApiClient";
import Loading from "../../components/elements/loading";

const EditGuarantee = () => {
  const navigate = useNavigate();
  const [guaranteeData, setGuaranteeData] = useState({});
  const { id } = useParams();
  const getGuaranteeQuery = useQuery(
    ["getColorQuery"],
    async () => singleGuarantee(id),
    {
      onSuccess: (res) => setGuaranteeData(res?.data?.data),
    }
  );
  const updateGuaranteeMutataion = useMutation(
    (data) => uodateGuarantee(data),
    {
      onSuccess: (res) => {
        navigate(-1);
        formik.resetForm();
      },
    }
  );
  const formik = useFormik({
    initialValues: {
      name: guaranteeData?.name || "",
    },
    enableReinitialize: true,
    validationSchema: () => ADD_GUARANTEE_VALIDATION_SCHEMA(),
    onSubmit: (values) => {
      updateGuaranteeMutataion.mutate({ id, body: values });
    },
  });

  return (
    <div className="w-full p-5">
      <div className="w-full flex items-center justify-between">
        <h5 className="font-KalamehMed text-lg font-medium flex text-black gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              fill="#222427"
              d="M12 15.75c-4.14 0-7.5-3.25-7.5-7.25S7.86 1.25 12 1.25c4.14 0 7.5 3.25 7.5 7.25s-3.36 7.25-7.5 7.25zm0-13c-3.31 0-6 2.58-6 5.75s2.69 5.75 6 5.75 6-2.58 6-5.75-2.69-5.75-6-5.75z"
            ></path>
            <path
              fill="#222427"
              d="M15.62 22.75c-.28 0-.56-.07-.85-.2l-2.69-1.27a.543.543 0 00-.18 0l-2.67 1.26c-.59.28-1.21.27-1.69-.04-.5-.32-.79-.91-.78-1.61l.01-7.38c0-.41.32-.77.75-.75.41 0 .75.34.75.75l-.01 7.38c0 .22.06.33.09.34.02.01.11.02.25-.05l2.68-1.27c.43-.2 1.02-.2 1.45 0l2.69 1.27c.14.07.23.06.25.05.03-.02.09-.13.09-.34v-7.56c0-.41.34-.75.75-.75s.75.34.75.75v7.56c0 .71-.29 1.29-.79 1.61-.26.17-.55.25-.85.25z"
            ></path>
          </svg>
          گارانتی ها
        </h5>
        <button
          onClick={() => navigate(-1)}
          className="flex flex-row justify-between bg-[#EFF1F1] text-white rounded-[4px] p-[10px] "
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.13 19.0586H7.13C6.72 19.0586 6.38 18.7186 6.38 18.3086C6.38 17.8986 6.72 17.5586 7.13 17.5586H15.13C17.47 17.5586 19.38 15.6486 19.38 13.3086C19.38 10.9686 17.47 9.05859 15.13 9.05859H4.13C3.72 9.05859 3.38 8.71859 3.38 8.30859C3.38 7.89859 3.72 7.55859 4.13 7.55859H15.13C18.3 7.55859 20.88 10.1386 20.88 13.3086C20.88 16.4786 18.3 19.0586 15.13 19.0586Z"
              fill="#222427"
            />
            <path
              d="M6.43006 11.5589C6.24006 11.5589 6.05006 11.4889 5.90006 11.3389L3.34006 8.77891C3.05006 8.48891 3.05006 8.00891 3.34006 7.71891L5.90006 5.15891C6.19006 4.86891 6.67006 4.86891 6.96006 5.15891C7.25006 5.44891 7.25006 5.92891 6.96006 6.21891L4.93006 8.24891L6.96006 10.2789C7.25006 10.5689 7.25006 11.0489 6.96006 11.3389C6.82006 11.4889 6.62006 11.5589 6.43006 11.5589Z"
              fill="#222427"
            />
          </svg>

          <p className="text-[16px] text-[#222427] mr-1">بازگشت</p>
        </button>
      </div>

      <div className="w-full">
        <form onSubmit={formik.handleSubmit}>
          <div className="w-full bg-blue-lightt rounded-lg p-6 mt-4 flex flex-col gap-5 ">
            <div className="w-full flex flex-row justify-center items-center gap-3">
              <div className="w-1/6 bg-white rounded-lg p-4 font-bold text-[#003E43]">
                نام گارانتی:*
              </div>
              <input
                className="w-5/6 outline-none bg-white rounded-lg p-4 font-Kalameh placeholder:text-[#C4C7C7]"
                placeholder="برای مثال: گارانتی ۱۸ ماهه"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </div>
            {formik.errors.name && formik.touched.name && (
              <small className="text-red-700">{formik.errors.name}</small>
            )}

            <button
              className="bg-primary text-white rounded-[4px] font-Kalameh flex flex-row justify-center items-center gap-2 h-[44px]"
              type="button"
              onClick={formik.handleSubmit}
            >
              {updateGuaranteeMutataion.isLoading ? (
                <Loading className="w-16 h-16 text-blacklead animate-pulse" />
              ) : (
                <>
                  <svg
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.5 12.75H8.5C8.09 12.75 7.75 12.41 7.75 12C7.75 11.59 8.09 11.25 8.5 11.25H16.5C16.91 11.25 17.25 11.59 17.25 12C17.25 12.41 16.91 12.75 16.5 12.75Z"
                      fill="white"
                    />
                    <path
                      d="M12.5 16.75C12.09 16.75 11.75 16.41 11.75 16V8C11.75 7.59 12.09 7.25 12.5 7.25C12.91 7.25 13.25 7.59 13.25 8V16C13.25 16.41 12.91 16.75 12.5 16.75Z"
                      fill="white"
                    />
                    <path
                      d="M15.5 22.75H9.5C4.07 22.75 1.75 20.43 1.75 15V9C1.75 3.57 4.07 1.25 9.5 1.25H15.5C20.93 1.25 23.25 3.57 23.25 9V15C23.25 20.43 20.93 22.75 15.5 22.75ZM9.5 2.75C4.89 2.75 3.25 4.39 3.25 9V15C3.25 19.61 4.89 21.25 9.5 21.25H15.5C20.11 21.25 21.75 19.61 21.75 15V9C21.75 4.39 20.11 2.75 15.5 2.75H9.5Z"
                      fill="white"
                    />
                  </svg>
                  ذخیره گارانتی
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditGuarantee;
