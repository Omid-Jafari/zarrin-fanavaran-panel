import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import DeleteIcon from "../../../public/images/icons/deleteIcon";
import VideoPlayIcon from "../../../public/images/icons/videoPlayIcon";
import { deleteFiles, folderList } from "../../api/ApiClient";
import ShowImageModal from "../../components/common/show-image-modal";
import Loading from "../../components/elements/loading";
import AddFileMediaModal from "../../components/meida/add-file-media-modal";
function MediaSingle() {
  const [folders, setfolders] = useState([]);
  const [selectedItemForDelete, setSelectedItemForDelete] = useState([]);
  const param = useParams();
  const navigate = useNavigate();
  console.log("Sdvdsbddvsb", param?.file);
  // const filesQuerySub = useQuery(["filesQuerysub"], async () => files(`/`), {
  const filesQuerySub = useQuery(
    ["filesQuerysub"],
    async () => folderList(`/${param?.path}`),
    {
      onSuccess: (res) => {
        setfolders(res.data?.data.files);
        console.log("dsbsdbsdbdb", res.data?.data.files);
      },
    }
  );
  const deleteFileQuery = useMutation((path) => deleteFiles(path), {
    onSuccess: () => {
      filesQuerySub.refetch();
    },
  });

  const handleSelectedItem = (item,checked) => {
    // selectedItemForDelete.push(item?.id)
    console.log("sdvsdvsdv",checked);
    if(checked){
      setSelectedItemForDelete((prev) => [...prev, item?.full_path]);
    }else{

      setSelectedItemForDelete(prev=>prev.filter(f=>f!=item?.full_path))
    }

    
  };
  const handleDeleteSelectedFile = () => {
    selectedItemForDelete.length != 0 &&
      selectedItemForDelete?.map((item) => {
        deleteFileQuery.mutateAsync({ path: item });
      });
      setSelectedItemForDelete([])
  };
  useEffect(() => {
    console.log("dvdvsdvsdvsdv",selectedItemForDelete);
  }, [selectedItemForDelete])
  
  const handleSelectAllFileForDelete=(e)=>{
    if(e.target.checked){
      setSelectedItemForDelete([])
      folders.map(item=>{
        setSelectedItemForDelete((prev) => [...prev, item?.full_path]);
      })
    }else{

      setSelectedItemForDelete([])
    }
    
  }

  return (
    <>
      <div className=" col-span-10 font-KalamehMed font-medium">
        <div className="flex p-5 justify-between">
          <div className="flex justify-center items-center">
            <VideoPlayIcon className="fill-black ml-2" />
            <span className="text-lg">محصولات</span>
          </div>
          <div className="flex flex-row space-x-3 space-x-reverse">
            <span>
              <AddFileMediaModal path={param?.path} />
            </span>

            <button
              onClick={() => navigate(-1)}
              className="flex flex-row justify-between bg-[#EFF1F1] 
                      text-white rounded-[4px] p-[10px] "
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

              <p className="text-[16px] text-[#222427] mr-1">برگشت</p>
            </button>
          </div>
        </div>
        <div className="w-[97%] mx-auto rounded-lg bg-blue-lightt flex items-center px-4 py-3 gap-4 mt-5">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              // checked={
              //   attributesIds?.length === attributesData?.length &&
              //   attributesData?.length !== 0
              // }
              onChange={(e) => handleSelectAllFileForDelete(e)}
            />
            <span className="font-KalamehMed font-medium">انتخاب همه</span>
          </div>
          <button
            className="font-KalamehMed font-medium text-sm h-11 bg-[#EFF1F1] hover:bg-[#C4C7C7] transition-colors duration-500 px-3 text-[#CA3636] rounded-[4px] flex items-center gap-1"
            onClick={() => handleDeleteSelectedFile()}
          >
            <DeleteIcon className="fill-[#CA3636]" />
            حذف
          </button>
        </div>

        {filesQuerySub.isLoading ? (
          <div className="w-full flex flex-row justify-center items-center">
            <Loading className="w-36 h-36 text-blacklead animate-pulse" />
          </div>
        ) : (
          <div className="grid grid-cols-10 m-5 p-2.5 bg-blue-lightt rounded-[8px]">
            {folders?.map((item) => (
              <div
                className="col-span-2 cursor-pointer hover:scale-105 transition-all duration-200 flex justify-center items-center
              rounded-[8px] m-2.5 bg-white py-10 px-4 relative"
              >
                <div className="absolute top-2 right-3">
                  <input
                    type="checkbox"
                    checked={
                     selectedItemForDelete.includes(item?.full_path)
                    }
                    onChange={(e) => handleSelectedItem(item,e.target.checked)}
                  />
                </div>
                {item.mime_type == "image/png" ? (
                  <div>
                    <img src={item?.file} alt="FolderProduct" />
                  </div>
                ) : item.mime_type == "video/mp4" ? (
                  <div className="relative flex justify-center items-center">
                    <span className="absolute ">
                      <svg
                        width="50"
                        height="50"
                        viewBox="0 0 50 50"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M24.9376 45.8346C36.4435 45.8346 45.7709 36.5072 45.7709 25.0013C45.7709 13.4954 36.4435 4.16797 24.9376 4.16797C13.4316 4.16797 4.10425 13.4954 4.10425 25.0013C4.10425 36.5072 13.4316 45.8346 24.9376 45.8346Z"
                          fill="#F9FCFD"
                        />
                        <path
                          opacity="0.9"
                          d="M18.2083 25.4785V21.9993C18.2083 17.666 21.2708 15.8952 25.0208 18.0618L28.0416 19.8118L31.0624 21.5618C34.8124 23.7285 34.8124 27.2702 31.0624 29.4368L28.0416 31.1868L25.0208 32.9368C21.2708 35.1035 18.2083 33.3327 18.2083 28.9993V25.4785Z"
                          stroke="#478F95"
                          stroke-width="3"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                    <video src={item?.file} alt="FolderProduct" />
                  </div>
                ) : (
                  <div>
                    <img src={item?.file} alt="FolderProduct" />
                  </div>
                )}

                {/* //force */}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default MediaSingle;
