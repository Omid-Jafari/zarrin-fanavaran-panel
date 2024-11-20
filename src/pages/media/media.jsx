import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import VideoPlayIcon from "../../../public/images/icons/videoPlayIcon";
import { folderList } from "../../api/ApiClient";
import Loading from "../../components/elements/loading";
import AddFolderMediaModal from "../../components/meida/add-folder-media-modal";
function Media() {
  const [folders, setfolders] = useState([]);
  const filesQuery = useQuery(["filesQuery"], async () => folderList("/"), {
    onSuccess: (res) => {
      setfolders(res?.data?.data?.folders);
    },
  });

  return (
    <>
      <div className="w-ful font-KalamehMed font-medium">
        <div className="flex items-center p-5">
          <VideoPlayIcon className="fill-black ml-2" />
          <span className="text-lg">مدیا</span>
          <span className="mx-5">{/* <AddFolderMediaModal /> */}</span>
        </div>
        {filesQuery.isLoading ? (
          <div className="w-full flex flex-row justify-center items-center">
            <Loading className="w-36 h-36 text-blacklead animate-pulse" />
          </div>
        ) : (
          <div className="grid grid-cols-10 m-5 p-2.5 bg-blue-lightt rounded-[8px]">
            {folders?.map((item) => (
              <div
                className="col-span-2 cursor-pointer hover:scale-105 transition-all duration-200 flex justify-center items-center mr-2.5 ml-2.5 
              rounded-[8px] my-2.5 bg-white p-4"
              >
                <Link to={`files/${item?.split("/")[1]}`}>
                  {/* <Link  to={{pathname:'files',search:`files:${item?.split('/')[1]}`}} > */}
                  <div className="relative flex justify-start items-center">
                    <img
                      src="/public/images/FolderProduct.svg"
                      alt="FolderProduct"
                    />
                    <lable className="absolute text-center w-full text-xl text-white">
                      {item?.split("/")[1]}
                    </lable>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Media;
