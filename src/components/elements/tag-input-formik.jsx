import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { WithContext as ReactTags } from "react-tag-input";
import { suggestTag } from "../../api/ApiClient";

function TagInputFormik({ formik }) {
  const [tags, setTags] = useState([]);
  const [openSuggest, setopenSuggest] = useState(false);
  const [suggestt, setsuggestt] = useState([]);

  const sref = useRef(null);

  const mutateTag = useMutation((tag) => suggestTag(tag), {
    onSuccess: (res) => {
      if (res?.data?.data) {
        setopenSuggest(true);
        setsuggestt(res?.data?.data);
      }
    },
  });
  useEffect(() => {
    if(formik.values?.meta_keywords.length!=0)
    setTags(formik.values?.meta_keywords);
   
  }, []);

  useEffect(() => {
    formik.values.meta_keywords = tags;
  }, [tags]);

  function handleKeyDown(e) {
    // If user did not press enter key, return
    if (e.key !== "Enter") return;
    // Get the value of the input
    const value = e.target.value;

    // If the value is empty, return
    if (!value.trim()) return;
    // Add the value to the tags array
    tags.length <= 6 && setTags([...tags, value]);
    // Clear the input
    e.target.value = "";
  }

  const handleRemove = (index) => {
    setTags(tags.filter((item, indexx) => indexx != index));
  };

  const handleSuggest = (tag) => {
    if (tag != "") mutateTag.mutate(tag);
  };

  const addSuggest = (value) => {
    tags.length <= 6 && setTags([...tags, value]);
    setopenSuggest(false);
    sref.current.value = "";
  };
  useEffect(() => {
    setTimeout(() => {
      setopenSuggest(false);
    }, 5000);
  }, [openSuggest]);

  return (
    <div className="flex flex-row gap-4 relative">
      {tags.map((tag, index) => (
        <div
          className="flex flex-row  gap-3  h-[30px] bg-[#E0E3E3] text-[#222427] rounded-[4px] p-2 font-Kalameh justify-center items-center"
          key={index}
        >
          <span className="close" onClick={() => handleRemove(index)}>
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.56709 15C1.16876 15 0.77044 14.8533 0.455975 14.5389C-0.151992 13.9312 -0.151992 12.9253 0.455975 12.3175L12.3218 0.455816C12.9298 -0.151939 13.9361 -0.151939 14.544 0.455816C15.152 1.06357 15.152 2.06951 14.544 2.67726L2.6782 14.5389C2.3847 14.8533 1.96541 15 1.56709 15Z"
                fill="#222427"
              />
              <path
                d="M13.4329 15C13.0346 15 12.6363 14.8533 12.3218 14.5389L0.455975 2.67726C-0.151992 2.06951 -0.151992 1.06357 0.455975 0.455816C1.06394 -0.151939 2.07023 -0.151939 2.6782 0.455816L14.544 12.3175C15.152 12.9253 15.152 13.9312 14.544 14.5389C14.2296 14.8533 13.8312 15 13.4329 15Z"
                fill="#222427"
              />
            </svg>
          </span>
          <span className="text">{tag}</span>
        </div>
      ))}
      <div className="relative">
        <input
          onKeyDown={handleKeyDown}
          type="text"
          ref={sref}
          className="border-none outline-none font-Kalameh"
          onChange={(e) => handleSuggest(e.target.value)}
        />
        {openSuggest && (
          <div className="bg-[#E0E3E3] rounded-sm w-52 flex flex-col justify-center items-center top-7 shadow-lg absolute">
            {suggestt.map((suggest) => (
              <p
                onClick={(e) => addSuggest(suggest?.name)}
                className="p-2 text-black w-full text-center border-b"
              >
                {suggest?.name}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TagInputFormik;
