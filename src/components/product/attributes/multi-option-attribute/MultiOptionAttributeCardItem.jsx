import React, { useContext } from "react";
import { useRef } from "react";
import { useState } from "react";
import AddProductContext from "../../../../context/product/AddProductContext";
import { fromEdit } from "../../../../utils/FromEdit";
import EditMultiOprtionAttribite from "./EditMultiOprtionAttribite";
// import EditSingleOptionAttributeModal from "./EditSingleOptionAttributeModal";

// import EditTextAttributeModal from "./EditTextAttributeModal";

function MultiOptionAttributeCardItem({ attr, index }) {
  const { step, dispatch, productData } = useContext(AddProductContext);
  const [open, setOpen] = useState(false);
  const editAttrModalRef = useRef("");
  const handleDeleteAttr = (item) => {
    if (fromEdit()) {
      const attributes = productData?.attributes?.filter(
        (attr, indexx) => indexx != productData?.attributes.indexOf(item)
      );
      handleAddData({ attributes });
    } else {
      const attributes = productData?.attributes?.filter(
        (attr, indexx) => indexx != index
      );
      handleAddData({ attributes });
    }
  };
  console.log("vsdvsdvdsv", attr);
  const handleEditAttr = (item, index) => {
    console.log("Sdvsdvsdv", item);
    editAttrModalRef.current.opeModal(attr, index);
  };

  const handleAddData = (data) => {
    dispatch({
      type: "ADD",
      productData: data,
    });
  };

  return (
    <div className="w-full bg-white flex flex-col my-2 rounded-[4px] p-3">
      <EditMultiOprtionAttribite ref={editAttrModalRef} />
      {/* title */}
      <div className="flex flex-row justify-between">
        <p className="font-Kalameh text-black items-center  text-[14px] flex gap-2 font-[600] ">
          <img
            className="w-[24px] h-[24px]"
            src={attr?.attrData?.media?.icon?.file}
          />
          {attr?.attrData?.name}
        </p>

        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 7.5H21"
            stroke="#222427"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <path
            d="M3 12.5H21"
            stroke="#222427"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <path
            d="M3 17.5H21"
            stroke="#222427"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
      </div>

      <div className="mt-3 flex-col ">
        <p className="font-Kalameh text-black items-center  text-[12px] flex gap-2 font-[400] ">
          متن :
        </p>
        {fromEdit() && attr?.option_ids == undefined
          ? attr?.attrData?.options?.map((item) => (
              <div className="w-full bg-[#DBEEF6] flex px-2 flex-row justify-between mt-2 rounded-lg">
                <p className="font-Kalameh text-black items-center  text-[14px] flex py-3  gap-2 font-[500] ">
                  {item?.name_fa}
                </p>
              </div>
            ))
          : attr?.attrData?.options?.map((item) =>
              attr?.option_ids.map(
                (op) =>
                  op == item?.id && (
                    <div className="w-full bg-[#DBEEF6] flex px-2 flex-row justify-between mt-2 rounded-lg">
                      <p className="font-Kalameh text-black items-center  text-[14px] flex py-3  gap-2 font-[500] ">
                        {item?.name_fa}
                      </p>
                    </div>
                  )
              )
            )}

        <div className="flex flex-row w-full justify-end gap-2 p-3 rounded-[8px]">
          <span onClick={() => handleEditAttr(attr, index)}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.2599 3.60022L5.04985 12.2902C4.73985 12.6202 4.43985 13.2702 4.37985 13.7202L4.00985 16.9602C3.87985 18.1302 4.71985 18.9302 5.87985 18.7302L9.09985 18.1802C9.54985 18.1002 10.1799 17.7702 10.4899 17.4302L18.6999 8.74022C20.1199 7.24022 20.7599 5.53022 18.5499 3.44022C16.3499 1.37022 14.6799 2.10022 13.2599 3.60022Z"
                stroke="#222427"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.8901 5.0498C12.3201 7.8098 14.5601 9.9198 17.3401 10.1998"
                stroke="#222427"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3 22H21"
                stroke="#222427"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>

          <span onClick={() => handleDeleteAttr(attr)}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                stroke="#CA3636"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.16992 14.8299L14.8299 9.16992"
                stroke="#CA3636"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14.8299 14.8299L9.16992 9.16992"
                stroke="#CA3636"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}

export default MultiOptionAttributeCardItem;
