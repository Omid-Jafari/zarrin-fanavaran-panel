import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import React from "react";
import { useState } from "react";
import { sendSettingsData } from "../../api/ApiClient";
import Loading from "../elements/loading";
import { RichTextEditor } from "../product/addproduct/RichTextEditor";

function TextAreaSettingItem({ settingItem }) {
  const queryClient = useQueryClient();
  const [editorData, setEditorData] = useState("" || settingItem?.value);
  const formik = useFormik({
    initialValues: {
      field: settingItem?.field,
      value: settingItem?.value,
    },
    onSubmit: (data) => {
      if (settingItem?.properties?.use_editor) {
        data.value = editorData;
      }
      sendSettingDataQuery.mutate(data);
      console.log("aascascsacasc", data);
    },
  });

  const sendSettingDataQuery = useMutation((data) => sendSettingsData(data), {
    onSuccess: (res) => {
      // queryClient.invalidateQueries(['getSettingsQuery'])
    },
  });
  return (
    <div
      className={`${
        settingItem?.properties?.use_editor ? "w-4/6" : "w-3/6"
      } flex flex-row gap-4 items-end`}
    >
      <div className="w-full flex flex-row justify-center items-center gap-[18px]">
        {settingItem?.properties?.use_editor ? (
          <>
            <RichTextEditor
              editorData={editorData}
              setEditorData={setEditorData}
            />
          </>
        ) : (
          <textarea
            rows={"8"}
            className="w-full outline-none bg-white rounded-lg p-4 font-Kalameh 
                    text-black placeholder:text-[#C4C7C7]"
            name={settingItem?.field}
            onChange={(e) => formik.setFieldValue("value", e.target.value)}
            value={formik.values.value}
          />
        )}
      </div>

      <button
        className="flex items-center justify-center gap-1.5 h-11 bg-primary hover:bg-blacklead transition-colors duration-500 px-6 text-white rounded-[4px] font-KalamehMed font-medium"
        onClick={() => formik.handleSubmit()}
      >
        {sendSettingDataQuery.isLoading ? (
          <Loading className="w-14 h-14 text-blacklead animate-pulse" />
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
            ذخیره
          </>
        )}
      </button>
    </div>
  );
}

export default TextAreaSettingItem;
