import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { dataPermissions, editRole, singleRole } from "../../../api/ApiClient";
import Loading from "../../../components/elements/loading";
import * as Yup from "yup";
import CustomRadioBtn from "../../../components/common/customRadioBtn";

const EditRoles = () => {
  const navigate = useNavigate();
  const [permissionsData, setPermissionsData] = useState([]);
  const [roleData, setRoleData] = useState({});
  const { id } = useParams();

  const editRoleMutataion = useMutation((data) => editRole(id, data), {
    onSuccess: (res) => {
      navigate(-1);
      formik.resetForm();
    },
  });
  const dataPermissionsQuery = useQuery(
    ["dataPermissionsQuery"],
    (data) => dataPermissions(data),
    {
      onSuccess: (res) => {
        setPermissionsData(res?.data?.data);
      },
    }
  );
  const singleRoleQuery = useQuery(["singleRoleQuery"], () => singleRole(id), {
    onSuccess: (res) => {
      setRoleData(res?.data?.data);
    },
  });
  console.log("roleData", roleData);
  const formik = useFormik({
    initialValues: {
      name: roleData?.name,
      permissions: roleData?.permissions,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("لطفا نام را وارد کنید"),
      permissions: Yup.array()
        .of(Yup.string())
        .min(1, "لطفا حداقل یک دسترسی انتخاب کنید"),
    }),
    onSubmit: (values) => {
      editRoleMutataion.mutate(values);
    },
  });
  return (
    <>
      <div className="w-full p-5">
        <div className="w-full flex items-center justify-between">
          <h5 className="font-KalamehMed text-lg font-medium flex items-center text-black gap-2">
            ویرایش نقش:
          </h5>
          <button
            onClick={() => navigate(-1)}
            className="flex gap-1  bg-[#EFF1F1] font-semibold font-KalamehSemi rounded-lg hover:bg-[#E0E3E3] transition-colors duration-500 p-[10px] "
          >
            بازگشت
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.56994 19.3191C9.37994 19.3191 9.18994 19.2491 9.03994 19.0991L2.96994 13.0291C2.67994 12.7391 2.67994 12.2591 2.96994 11.9691L9.03994 5.89914C9.32994 5.60914 9.80994 5.60914 10.0999 5.89914C10.3899 6.18914 10.3899 6.66914 10.0999 6.95914L4.55994 12.4991L10.0999 18.0391C10.3899 18.3291 10.3899 18.8091 10.0999 19.0991C9.95994 19.2491 9.75994 19.3191 9.56994 19.3191Z"
                fill="#222427"
              />
              <path
                d="M20.4999 13.25H3.66992C3.25992 13.25 2.91992 12.91 2.91992 12.5C2.91992 12.09 3.25992 11.75 3.66992 11.75H20.4999C20.9099 11.75 21.2499 12.09 21.2499 12.5C21.2499 12.91 20.9099 13.25 20.4999 13.25Z"
                fill="#222427"
              />
            </svg>
          </button>
        </div>
        {singleRoleQuery?.isLoading ? (
          <div className="w-full flex justify-center">
            <Loading className="w-14 h-14 text-primary animate-pulse" />
          </div>
        ) : (
          <form className="w-full bg-blue-lightt rounded-lg p-6 mt-4 flex flex-col gap-5 ">
            <div className="w-full flex flex-row justify-center items-start gap-3">
              <div className="w-1/6 bg-white rounded-lg p-4 font-medium text-sm flex items-center gap-2 font-KalamehMed text-primary">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.1499 22.75C4.7399 22.75 4.3999 22.41 4.3999 22V2C4.3999 1.59 4.7399 1.25 5.1499 1.25C5.5599 1.25 5.8999 1.59 5.8999 2V22C5.8999 22.41 5.5599 22.75 5.1499 22.75Z"
                    fill="#00838F"
                  />
                  <path
                    d="M16.3499 16.75H5.1499C4.7399 16.75 4.3999 16.41 4.3999 16C4.3999 15.59 4.7399 15.25 5.1499 15.25H16.3499C17.4399 15.25 17.9499 14.96 18.0499 14.71C18.1499 14.46 17.9999 13.9 17.2199 13.13L16.0199 11.93C15.5299 11.5 15.2299 10.85 15.1999 10.13C15.1699 9.37 15.4699 8.62 16.0199 8.07L17.2199 6.87C17.9599 6.13 18.1899 5.53 18.0799 5.27C17.9699 5.01 17.3999 4.75 16.3499 4.75H5.1499C4.7299 4.75 4.3999 4.41 4.3999 4C4.3999 3.59 4.7399 3.25 5.1499 3.25H16.3499C18.5399 3.25 19.2399 4.16 19.4699 4.7C19.6899 5.24 19.8399 6.38 18.2799 7.94L17.0799 9.14C16.8299 9.39 16.6899 9.74 16.6999 10.09C16.7099 10.39 16.8299 10.66 17.0399 10.85L18.2799 12.08C19.8099 13.61 19.6599 14.75 19.4399 15.3C19.2099 15.83 18.4999 16.75 16.3499 16.75Z"
                    fill="#00838F"
                  />
                </svg>
                عنوان نقش:
              </div>
              <input
                className="w-5/6 outline-none bg-white rounded-lg p-4 font-Kalameh placeholder:text-[#C4C7C7]"
                placeholder="مثال: ادمین کل"
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.errors.name && formik.touched.name && (
              <small className="text-red-700">{formik.errors.name}</small>
            )}
            {dataPermissionsQuery?.isLoading ? (
              <div className="w-full flex justify-center">
                <Loading className="w-14 h-14 text-primary animate-pulse" />
              </div>
            ) : (
              Object.entries(permissionsData)?.map((permiName) => (
                <div
                  key={permiName[0]}
                  className="w-full flex flex-col justify-center items-start gap-3"
                >
                  <div className="w-1/6 bg-white rounded-lg p-4 font-medium text-sm flex items-center gap-2 font-KalamehMed text-primary">
                    {permiName[0]}
                  </div>
                  <div className="bg-white rounded-lg p-4 font-Kalameh w-full flex flex-wrap gap-3">
                    {permiName[1]?.map((permi) => (
                      <div
                        onClick={() => {
                          let oldPermi = formik.values.permissions;
                          let PermiIndex = oldPermi.findIndex(
                            (pId) => pId === permi?.key
                          );
                          if (PermiIndex === -1) {
                            formik?.setFieldValue("permissions", [
                              ...oldPermi,
                              permi?.key,
                            ]);
                          } else {
                            formik?.setFieldValue("permissions", [
                              ...oldPermi.slice(0, PermiIndex),
                              ...oldPermi.slice(PermiIndex + 1),
                            ]);
                          }
                        }}
                        key={permi?.name}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <CustomRadioBtn
                          clickFunc={() => {}}
                          checkCondition={formik.values.permissions?.includes(
                            permi?.key
                          )}
                        />
                        <span
                          className={`text-base font-medium font-KalamehMed  ${
                            formik.values.permissions?.includes(permi?.key)
                              ? ""
                              : "text-[#8E9191]"
                          }`}
                        >
                          {permi?.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
            {formik.errors.permissions && formik.touched.permissions && (
              <small className="text-red-700">
                {formik.errors.permissions}
              </small>
            )}
            <button
              className="bg-primary text-white rounded-[4px] font-Kalameh flex flex-row justify-center items-center gap-2 h-[44px]"
              type="button"
              onClick={formik.handleSubmit}
            >
              {editRoleMutataion.isLoading ? (
                <Loading className="w-16 h-16 text-white animate-pulse" />
              ) : (
                <>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z"
                      fill="white"
                    />
                    <path
                      d="M10.5799 15.5816C10.3799 15.5816 10.1899 15.5016 10.0499 15.3616L7.21994 12.5316C6.92994 12.2416 6.92994 11.7616 7.21994 11.4716C7.50994 11.1816 7.98994 11.1816 8.27994 11.4716L10.5799 13.7716L15.7199 8.63156C16.0099 8.34156 16.4899 8.34156 16.7799 8.63156C17.0699 8.92156 17.0699 9.40156 16.7799 9.69156L11.1099 15.3616C10.9699 15.5016 10.7799 15.5816 10.5799 15.5816Z"
                      fill="white"
                    />
                  </svg>
                  تایید و افزودن
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default EditRoles;
