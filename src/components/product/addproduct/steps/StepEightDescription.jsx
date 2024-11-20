import { data } from "autoprefixer";
import React, { useContext, useRef, useState } from "react";
import { useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import AddProductContext from "../../../../context/product/AddProductContext";
import { useStrictDroppable } from "../../../../utils/hooks/useStrictDroppable";
import { fromEdit } from "../../../../utils/FromEdit";
import AddProductSideBarAddBlog from "../sidebar/AddProductSideBarAddBlog";
import AddProductSideBarAddMedia from "../sidebar/AddProductSideBarAddMedia";
import EditProductSideBarAddBlog from "../sidebar/EditProductSideBarAddBlog";
import EditProductSideBarAddMedia from "../sidebar/EditProductSideBarAddMedia";

function StepEightDescription() {
  const { step, productData, dispatch } = useContext(AddProductContext);
  const [openDetail, setopenDetail] = useState("");
  const [openDetailInsource, setopenDetailInsource] = useState("");
  const [descriptions, setDescriptions] = useState([]);
  const AddProductSideBarAddMediaRef = useRef();
  const AddProductSideBarAddBlogRef = useRef();
  const EditProductSideBarAddBlogRef = useRef();
  const EditProductSideBarAddMediaRef = useRef();
  useEffect(() => {
    setDescriptions([]);
    productData?.sidebars?.outsource &&
      setDescriptions((prev) => [...prev, ...productData?.sidebars?.outsource]);
    productData?.sidebars?.insource &&
      setDescriptions((prev) => [...prev, ...productData?.sidebars?.insource]);
  }, [productData]);
  console.log("sdvsdascascascvsdv", descriptions);

  const [enabled] = useStrictDroppable(false);
  const handleNextStep = async () => {
    await hanleSetPriority();
    dispatch({
      type: "STEP",
      step: step + 1,
    });
  };

  const handlepreviosStep = () => {
    dispatch({
      type: "STEP",
      step: step - 1,
    });
  };

  const handleTextAttributesModal = (item) => {
    AddProductSideBarAddMediaRef.current.opeModal(item);
  };
  const AddProductSideBarAddBlogModal = (item) => {
    AddProductSideBarAddBlogRef.current.opeModal(item);
  };
  const AddProductSideBarEditBlogModal = (item, index, type) => {
    EditProductSideBarAddBlogRef.current.opeModal(item, index, type);
  };
  const EditProductSideBarEditBlogModal = (item, index, type) => {
    EditProductSideBarAddMediaRef.current.opeModal(item, index, type);
  };

  const handleOpenDetail = (item, index) => {
    if (openDetail === index) {
      setopenDetail("");
    } else {
      setopenDetail(index);
    }
  };

  const handleOpenDetailInsource = (item, index) => {
    if (openDetailInsource === index) {
      setopenDetailInsource("");
    } else {
      setopenDetailInsource(index);
    }
  };

  const handleAddData = (data) => {
    dispatch({
      type: "ADD",
      productData: data,
    });
  };
  async function hanleSetPriority() {
    const setP = descriptions?.map((desc, index) => {
      return { ...desc, priority: (index + 1) * 1000 };
    });
    const pinsource = setP?.filter((p) => p.source === "insource");
    const poutsource = setP?.filter((p) => p.source === "outsource");
    handleAddData({ sidebars: { insource: pinsource, outsource: poutsource } });
  }
  const handleActiveItem = (index, item, checked, type) => {
    item.status = checked ? "ACTIVE" : "DISABLE";
    // let newData=productData
    let sidebars = productData.sidebars;
    // sidebars[type][index]=item
    // let sidebars=productData.sidebars
    // sidebars[type][index].status=checked?"ACTIVE":"DISABLE"
    handleAddData({ sidebars });
  };
  const handleOnDragEnd = (result) => {
    const sourceIndex = result?.source?.index;
    const destinationIndex = result?.destination?.index;
    const items = Array.from(descriptions);
    const [reorderedItem] = items.splice(sourceIndex, 1);
    items.splice(destinationIndex, 0, reorderedItem);
    setDescriptions(items);
  };
  return (
    <>
      <AddProductSideBarAddMedia ref={AddProductSideBarAddMediaRef} />
      <AddProductSideBarAddBlog ref={AddProductSideBarAddBlogRef} />
      <EditProductSideBarAddBlog ref={EditProductSideBarAddBlogRef} />
      <EditProductSideBarAddMedia ref={EditProductSideBarAddMediaRef} />

      <div className="flex flex-col justify-between items-center  w-full h-full ">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <div className="w-full h-full flex flex-col justify-between ">
            <div className=" w-full flex flex-col">
              <p className="text-[14px] font-bold text-black font-Kalameh">
                ساید بار صفحه محصول:
              </p>
            </div>

            <div className="w-full h-full mt-5">
              <div className="flex flex-row gap-4">
                <button
                  className="flex items-center justify-center gap-1.5 h-11 bg-primary hover:bg-blacklead transition-colors duration-500 px-3 text-white rounded-[4px] font-KalamehMed font-medium"
                  onClick={() => AddProductSideBarAddBlogModal()}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 22.75H8C4.35 22.75 2.25 20.65 2.25 17V7C2.25 3.35 4.35 1.25 8 1.25H16C19.65 1.25 21.75 3.35 21.75 7V17C21.75 20.65 19.65 22.75 16 22.75ZM8 2.75C5.14 2.75 3.75 4.14 3.75 7V17C3.75 19.86 5.14 21.25 8 21.25H16C18.86 21.25 20.25 19.86 20.25 17V7C20.25 4.14 18.86 2.75 16 2.75H8Z"
                      fill="white"
                    />
                    <path
                      d="M9 11.11C8.83 11.11 8.66 11.08 8.5 11.01C8.04 10.81 7.75 10.36 7.75 9.87V2C7.75 1.59 8.09 1.25 8.5 1.25H15.5C15.91 1.25 16.25 1.59 16.25 2V9.85999C16.25 10.36 15.96 10.81 15.5 11C15.05 11.2 14.52 11.11 14.15 10.77L12 8.79999L9.84998 10.78C9.60998 11 9.31 11.11 9 11.11ZM12 7.21002C12.3 7.21002 12.61 7.31998 12.85 7.53998L14.75 9.28998V2.75H9.25V9.28998L11.15 7.53998C11.39 7.31998 11.7 7.21002 12 7.21002Z"
                      fill="white"
                    />
                    <path
                      d="M17.5 14.75H13.25C12.84 14.75 12.5 14.41 12.5 14C12.5 13.59 12.84 13.25 13.25 13.25H17.5C17.91 13.25 18.25 13.59 18.25 14C18.25 14.41 17.91 14.75 17.5 14.75Z"
                      fill="white"
                    />
                    <path
                      d="M17.5 18.75H9C8.59 18.75 8.25 18.41 8.25 18C8.25 17.59 8.59 17.25 9 17.25H17.5C17.91 17.25 18.25 17.59 18.25 18C18.25 18.41 17.91 18.75 17.5 18.75Z"
                      fill="white"
                    />
                  </svg>
                  افزودن مقاله
                </button>

                <button
                  className="flex items-center justify-center gap-1.5 h-11 bg-primary hover:bg-blacklead transition-colors duration-500 px-3 text-white rounded-[4px] font-KalamehMed font-medium"
                  onClick={() => handleTextAttributesModal()}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z"
                      fill="white"
                    />
                    <path
                      d="M21.4795 7.86035H2.51953C2.10953 7.86035 1.76953 7.52035 1.76953 7.11035C1.76953 6.70035 2.09953 6.36035 2.51953 6.36035H21.4795C21.8895 6.36035 22.2295 6.70035 22.2295 7.11035C22.2295 7.52035 21.8995 7.86035 21.4795 7.86035Z"
                      fill="white"
                    />
                    <path
                      d="M8.51953 7.72035C8.10953 7.72035 7.76953 7.38035 7.76953 6.97035V2.11035C7.76953 1.70035 8.10953 1.36035 8.51953 1.36035C8.92953 1.36035 9.26953 1.70035 9.26953 2.11035V6.97035C9.26953 7.38035 8.92953 7.72035 8.51953 7.72035Z"
                      fill="white"
                    />
                    <path
                      d="M15.4805 7.27035C15.0705 7.27035 14.7305 6.93035 14.7305 6.52035V2.11035C14.7305 1.70035 15.0705 1.36035 15.4805 1.36035C15.8905 1.36035 16.2305 1.70035 16.2305 2.11035V6.52035C16.2305 6.94035 15.9005 7.27035 15.4805 7.27035Z"
                      fill="white"
                    />
                    <path
                      d="M11.09 18.1203C10.73 18.1203 10.39 18.0303 10.08 17.8603C9.4 17.4603 9 16.6603 9 15.6503V13.2503C9 12.2403 9.4 11.4303 10.09 11.0303C10.78 10.6303 11.68 10.6903 12.55 11.2003L14.63 12.4003C15.5 12.9003 16.01 13.6503 16.01 14.4503C16.01 15.2503 15.5 16.0003 14.62 16.5003L12.54 17.7003C12.06 17.9803 11.56 18.1203 11.09 18.1203ZM11.1 12.2703C11 12.2703 10.91 12.2903 10.84 12.3303C10.63 12.4503 10.5 12.7903 10.5 13.2503V15.6503C10.5 16.1003 10.63 16.4403 10.84 16.5703C11.05 16.6903 11.41 16.6303 11.8 16.4003L13.88 15.2003C14.27 14.9703 14.51 14.6903 14.51 14.4503C14.51 14.2103 14.28 13.9303 13.88 13.7003L11.8 12.5003C11.54 12.3503 11.29 12.2703 11.1 12.2703Z"
                      fill="white"
                    />
                  </svg>
                  افزودن ویدیو
                </button>
              </div>
              {enabled && (
                <Droppable droppableId={`description`}>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="w-full flex flex-col"
                    >
                      {descriptions?.map((item, index) => (
                        <Draggable
                          key={item?.title}
                          draggableId={`${item?.title}`}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="w-full"
                            >
                              {item?.source === "outsource" && (
                                <div
                                  onClick={() => handleOpenDetail(item, index)}
                                  className={`flex  transition-all ease-linear flex-col items-start mt-2 bg-white rounded-[10px] overflow-hidden  ${
                                    openDetail === index
                                      ? " h-[250px]"
                                      : "h-[64px]"
                                  }`}
                                >
                                  <div className=" my-3 items-center px-4  w-full h-[64px] flex flex-row justify-between">
                                    <svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M21 7.75H3C2.59 7.75 2.25 7.41 2.25 7C2.25 6.59 2.59 6.25 3 6.25H21C21.41 6.25 21.75 6.59 21.75 7C21.75 7.41 21.41 7.75 21 7.75Z"
                                        fill="#222427"
                                      />
                                      <path
                                        d="M21 12.75H3C2.59 12.75 2.25 12.41 2.25 12C2.25 11.59 2.59 11.25 3 11.25H21C21.41 11.25 21.75 11.59 21.75 12C21.75 12.41 21.41 12.75 21 12.75Z"
                                        fill="#222427"
                                      />
                                      <path
                                        d="M21 17.75H3C2.59 17.75 2.25 17.41 2.25 17C2.25 16.59 2.59 16.25 3 16.25H21C21.41 16.25 21.75 16.59 21.75 17C21.75 17.41 21.41 17.75 21 17.75Z"
                                        fill="#222427"
                                      />
                                    </svg>
                                    <div className=" flex flex-row gap-2 justify-center items-center ">
                                      <label
                                        for={`is_default${index}`}
                                        className="inline-flex relative items-center cursor-pointer"
                                      >
                                        <input
                                          type="checkbox"
                                          // name="is_default"
                                          value={
                                            item?.status == "ACTIVE"
                                              ? true
                                              : false
                                          }
                                          id={`is_default${index}`}
                                          className="sr-only peer"
                                          checked={
                                            item?.status == "ACTIVE"
                                              ? true
                                              : false
                                          }
                                          onChange={(e) =>
                                            handleActiveItem(
                                              index,
                                              item,
                                              e.target.checked,
                                              "outsource"
                                            )
                                          }
                                        />
                                        <div
                                          className="w-11 h-6 bg-gray-200 peer-focus:outline-none cursor-pointer rounded-full peer
        peer-checked:after:translate-x-full
         peer-checked:after:border-white after:content-[''] 
         after:absolute after:top-[2px] after:left-[2px] after:bg-white
          after:border-gray-100 after:border after:rounded-full after:h-5 
          after:w-5 after:transition-all dark:bg-[#1C3F3A] peer-checked:bg-green-700"
                                        ></div>
                                      </label>
                                      {fromEdit()
                                        ? item?.typeInEdit == "BLOG"
                                          ? "مقاله"
                                          : "ویدیو"
                                        : item?.type == "BLOG"
                                        ? "مقاله"
                                        : "ویدیو"}
                                    </div>

                                    <svg
                                      className={`transition-all ease-in-out duration-300 ${
                                        openDetail === index
                                          ? " rotate-180"
                                          : "rotate-0"
                                      }`}
                                      width="32"
                                      height="32"
                                      viewBox="0 0 32 32"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <g clip-path="url(#clip0_4685_17972)">
                                        <path
                                          d="M23.893 10.9062H15.5863H8.10633C6.82633 10.9062 6.18633 12.4529 7.093 13.3596L13.9997 20.2662C15.1063 21.3729 16.9063 21.3729 18.013 20.2662L20.6397 17.6396L24.9197 13.3596C25.813 12.4529 25.173 10.9062 23.893 10.9062Z"
                                          fill="#222427"
                                        />
                                      </g>
                                      <defs>
                                        <clipPath id="clip0_4685_17972">
                                          <rect
                                            width="32"
                                            height="32"
                                            fill="white"
                                          />
                                        </clipPath>
                                      </defs>
                                    </svg>
                                  </div>
                                  <div
                                    className={`bg-[#EDF6F7]  w-full h-full mt-8 flex flex-row justify-between items-center p-5  overflow-hidden `}
                                  >
                                    <div className="flex flex-row items-center gap-4 ">
                                      {fromEdit() ? (
                                        <img
                                          className="w-36"
                                          src={item?.media?.poster?.file}
                                        />
                                      ) : (
                                        <img
                                          className="w-36"
                                          src={item?.icon?.file}
                                        />
                                      )}

                                      <div className="flex flex-col">
                                        <span className="font-Kalameh  px-1 text-black font-[600] ">
                                          {" "}
                                          عنوان:
                                          <span className="text-black font-[500] px-2">
                                            {item?.title}
                                          </span>
                                        </span>
                                        <span className="font-Kalameh  px-1 text-black font-[600] ">
                                          {" "}
                                          لینک:
                                          <span className="text-black font-[500] px-2 ">
                                            {item?.link}
                                          </span>
                                        </span>
                                      </div>
                                    </div>
                                    <div className="flex flex-row gap-3">
                                      <button
                                        className="flex items-center justify-center gap-1.5 z-[1] h-11 bg-[#4FB3BF] hover:bg-blacklead transition-colors duration-500 px-3 text-white rounded-[4px] font-KalamehMed font-medium"
                                        onClick={() => {
                                          fromEdit()
                                            ? item?.typeInEdit == "VIDEO"
                                              ? item?.typeInEdit == "VIDEO"
                                              : item?.type == "VIDEO"
                                              ? EditProductSideBarEditBlogModal(
                                                  item,
                                                  index,
                                                  "OUTSOURCE"
                                                )
                                              : AddProductSideBarEditBlogModal(
                                                  item,
                                                  index,
                                                  "OUTSOURCE"
                                                )
                                            : item?.type == "VIDEO"
                                            ? EditProductSideBarEditBlogModal(
                                                item,
                                                index,
                                                "OUTSOURCE"
                                              )
                                            : AddProductSideBarEditBlogModal(
                                                item,
                                                index,
                                                "OUTSOURCE"
                                              );
                                        }}
                                      >
                                        <svg
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H11C11.41 1.25 11.75 1.59 11.75 2C11.75 2.41 11.41 2.75 11 2.75H9C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V13C21.25 12.59 21.59 12.25 22 12.25C22.41 12.25 22.75 12.59 22.75 13V15C22.75 20.43 20.43 22.75 15 22.75Z"
                                            fill="#fafafa"
                                          />
                                          <path
                                            d="M8.50032 17.6901C7.89032 17.6901 7.33032 17.4701 6.92032 17.0701C6.43032 16.5801 6.22032 15.8701 6.33032 15.1201L6.76032 12.1101C6.84032 11.5301 7.22032 10.7801 7.63032 10.3701L15.5103 2.49006C17.5003 0.500059 19.5203 0.500059 21.5103 2.49006C22.6003 3.58006 23.0903 4.69006 22.9903 5.80006C22.9003 6.70006 22.4203 7.58006 21.5103 8.48006L13.6303 16.3601C13.2203 16.7701 12.4703 17.1501 11.8903 17.2301L8.88032 17.6601C8.75032 17.6901 8.62032 17.6901 8.50032 17.6901ZM16.5703 3.55006L8.69032 11.4301C8.50032 11.6201 8.28032 12.0601 8.24032 12.3201L7.81032 15.3301C7.77032 15.6201 7.83032 15.8601 7.98032 16.0101C8.13032 16.1601 8.37032 16.2201 8.66032 16.1801L11.6703 15.7501C11.9303 15.7101 12.3803 15.4901 12.5603 15.3001L20.4403 7.42006C21.0903 6.77006 21.4303 6.19006 21.4803 5.65006C21.5403 5.00006 21.2003 4.31006 20.4403 3.54006C18.8403 1.94006 17.7403 2.39006 16.5703 3.55006Z"
                                            fill="#fafafa"
                                          />
                                          <path
                                            d="M19.8496 9.83003C19.7796 9.83003 19.7096 9.82003 19.6496 9.80003C17.0196 9.06003 14.9296 6.97003 14.1896 4.34003C14.0796 3.94003 14.3096 3.53003 14.7096 3.41003C15.1096 3.30003 15.5196 3.53003 15.6296 3.93003C16.2296 6.06003 17.9196 7.75003 20.0496 8.35003C20.4496 8.46003 20.6796 8.88003 20.5696 9.28003C20.4796 9.62003 20.1796 9.83003 19.8496 9.83003Z"
                                            fill="#fafafa"
                                          />
                                        </svg>
                                        <span>ویرایش</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}
                              {item?.source === "insource" && (
                                <div
                                  onClick={() =>
                                    handleOpenDetailInsource(item, index)
                                  }
                                  className={`flex  transition-all ease-linear flex-col items-start mt-2 bg-white rounded-[10px] overflow-hidden  ${
                                    openDetailInsource === index
                                      ? " h-[250px]"
                                      : "h-[64px]"
                                  }`}
                                >
                                  <div className=" my-3 items-center px-4  w-full h-[64px] flex flex-row justify-between">
                                    <svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M21 7.75H3C2.59 7.75 2.25 7.41 2.25 7C2.25 6.59 2.59 6.25 3 6.25H21C21.41 6.25 21.75 6.59 21.75 7C21.75 7.41 21.41 7.75 21 7.75Z"
                                        fill="#222427"
                                      />
                                      <path
                                        d="M21 12.75H3C2.59 12.75 2.25 12.41 2.25 12C2.25 11.59 2.59 11.25 3 11.25H21C21.41 11.25 21.75 11.59 21.75 12C21.75 12.41 21.41 12.75 21 12.75Z"
                                        fill="#222427"
                                      />
                                      <path
                                        d="M21 17.75H3C2.59 17.75 2.25 17.41 2.25 17C2.25 16.59 2.59 16.25 3 16.25H21C21.41 16.25 21.75 16.59 21.75 17C21.75 17.41 21.41 17.75 21 17.75Z"
                                        fill="#222427"
                                      />
                                    </svg>
                                    <div className=" flex flex-row gap-2 justify-center items-center">
                                      <label
                                        for={`default-toggle${index}`}
                                        className="inline-flex relative items-center cursor-pointer"
                                      >
                                        <input
                                          type="checkbox"
                                          name={`is_default${index}`}
                                          value={
                                            item?.status == "ACTIVE"
                                              ? true
                                              : false
                                          }
                                          id={`default-toggle${index}`}
                                          className="sr-only peer"
                                          checked={
                                            item?.status == "ACTIVE"
                                              ? true
                                              : false
                                          }
                                          onChange={(e) =>
                                            handleActiveItem(
                                              index,
                                              item,
                                              e.target.checked,
                                              "insource"
                                            )
                                          }
                                        />
                                        <div
                                          className="w-11 h-6 bg-gray-200 peer-focus:outline-none cursor-pointer rounded-full peer
            peer-checked:after:translate-x-full
             peer-checked:after:border-white after:content-[''] 
             after:absolute after:top-[2px] after:left-[2px] after:bg-white
              after:border-gray-100 after:border after:rounded-full after:h-5 
              after:w-5 after:transition-all dark:bg-[#1C3F3A] peer-checked:bg-green-700"
                                        ></div>
                                      </label>
                                      {fromEdit()
                                        ? item?.typeInEdit == "BLOG"
                                          ? "مقاله"
                                          : "ویدیو"
                                        : item?.type == "BLOG"
                                        ? "مقاله"
                                        : "ویدیو"}
                                    </div>

                                    <svg
                                      className={`transition-all ease-in-out duration-300 ${
                                        openDetailInsource === index
                                          ? " rotate-180"
                                          : "rotate-0"
                                      }`}
                                      width="32"
                                      height="32"
                                      viewBox="0 0 32 32"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <g clip-path="url(#clip0_4685_17972)">
                                        <path
                                          d="M23.893 10.9062H15.5863H8.10633C6.82633 10.9062 6.18633 12.4529 7.093 13.3596L13.9997 20.2662C15.1063 21.3729 16.9063 21.3729 18.013 20.2662L20.6397 17.6396L24.9197 13.3596C25.813 12.4529 25.173 10.9062 23.893 10.9062Z"
                                          fill="#222427"
                                        />
                                      </g>
                                      <defs>
                                        <clipPath id="clip0_4685_17972">
                                          <rect
                                            width="32"
                                            height="32"
                                            fill="white"
                                          />
                                        </clipPath>
                                      </defs>
                                    </svg>
                                  </div>
                                  <div
                                    className={`bg-[#EDF6F7]  w-full h-full mt-8 flex flex-row justify-between items-center p-5  overflow-hidden`}
                                  >
                                    <div className="flex flex-row items-center gap-4 ">
                                      {fromEdit() &&
                                      item?.typeInEdit == "BLOG" ? (
                                        <span className="font-Kalameh  px-1 text-black font-[600] ">
                                          {" "}
                                          عنوان:
                                          <span className="text-black font-[500] px-2">
                                            {fromEdit()
                                              ? item?.title
                                              : item?.blogItem?.name}
                                          </span>
                                        </span>
                                      ) : item?.type == "BLOG" ? (
                                        <span className="font-Kalameh  px-1 text-black font-[600] ">
                                          {" "}
                                          عنوان:
                                          <span className="text-black font-[500] px-2">
                                            {fromEdit()
                                              ? item?.title
                                              : item?.blogItem?.name}
                                          </span>
                                        </span>
                                      ) : (
                                        <video
                                          className="w-36"
                                          src={
                                            fromEdit()
                                              ? item?.media?.main?.file
                                              : item?.file
                                          }
                                        />
                                      )}

                                      {/* <div className="flex flex-col">
                        <span className="font-Kalameh  px-1 text-black font-[600] ">
                          {" "}
                          عنوان:
                          <span className="text-black font-[500] px-2">
                            {item?.title}
                          </span>
                        </span>
                        <span className="font-Kalameh  px-1 text-black font-[600] ">
                          {" "}
                          لینک:
                          <span className="text-black font-[500] px-2 ">
                            {item?.link}
                          </span>
                        </span>
                      </div> */}
                                    </div>
                                    <div>
                                      <button
                                        className="flex items-center justify-center gap-1.5 h-11 bg-[#4FB3BF] hover:bg-blacklead transition-colors duration-500 px-3 text-white rounded-[4px] font-KalamehMed font-medium"
                                        onClick={() => {
                                          fromEdit()
                                            ? item.typeInEdit == "VIDEO"
                                              ? EditProductSideBarEditBlogModal(
                                                  item,
                                                  index,
                                                  "INSOURCE"
                                                )
                                              : AddProductSideBarEditBlogModal(
                                                  item,
                                                  index,
                                                  "INSOURCE"
                                                )
                                            : item.type == "VIDEO"
                                            ? EditProductSideBarEditBlogModal(
                                                item,
                                                index,
                                                "INSOURCE"
                                              )
                                            : AddProductSideBarEditBlogModal(
                                                item,
                                                index,
                                                "INSOURCE"
                                              );
                                        }}
                                      >
                                        <svg
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H11C11.41 1.25 11.75 1.59 11.75 2C11.75 2.41 11.41 2.75 11 2.75H9C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V13C21.25 12.59 21.59 12.25 22 12.25C22.41 12.25 22.75 12.59 22.75 13V15C22.75 20.43 20.43 22.75 15 22.75Z"
                                            fill="#fafafa"
                                          />
                                          <path
                                            d="M8.50032 17.6901C7.89032 17.6901 7.33032 17.4701 6.92032 17.0701C6.43032 16.5801 6.22032 15.8701 6.33032 15.1201L6.76032 12.1101C6.84032 11.5301 7.22032 10.7801 7.63032 10.3701L15.5103 2.49006C17.5003 0.500059 19.5203 0.500059 21.5103 2.49006C22.6003 3.58006 23.0903 4.69006 22.9903 5.80006C22.9003 6.70006 22.4203 7.58006 21.5103 8.48006L13.6303 16.3601C13.2203 16.7701 12.4703 17.1501 11.8903 17.2301L8.88032 17.6601C8.75032 17.6901 8.62032 17.6901 8.50032 17.6901ZM16.5703 3.55006L8.69032 11.4301C8.50032 11.6201 8.28032 12.0601 8.24032 12.3201L7.81032 15.3301C7.77032 15.6201 7.83032 15.8601 7.98032 16.0101C8.13032 16.1601 8.37032 16.2201 8.66032 16.1801L11.6703 15.7501C11.9303 15.7101 12.3803 15.4901 12.5603 15.3001L20.4403 7.42006C21.0903 6.77006 21.4303 6.19006 21.4803 5.65006C21.5403 5.00006 21.2003 4.31006 20.4403 3.54006C18.8403 1.94006 17.7403 2.39006 16.5703 3.55006Z"
                                            fill="#fafafa"
                                          />
                                          <path
                                            d="M19.8496 9.83003C19.7796 9.83003 19.7096 9.82003 19.6496 9.80003C17.0196 9.06003 14.9296 6.97003 14.1896 4.34003C14.0796 3.94003 14.3096 3.53003 14.7096 3.41003C15.1096 3.30003 15.5196 3.53003 15.6296 3.93003C16.2296 6.06003 17.9196 7.75003 20.0496 8.35003C20.4496 8.46003 20.6796 8.88003 20.5696 9.28003C20.4796 9.62003 20.1796 9.83003 19.8496 9.83003Z"
                                            fill="#fafafa"
                                          />
                                        </svg>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              )}
              {/* <>
              {productData?.sidebars?.outsource &&
                productData?.sidebars?.outsource?.map((item, index) => (
                  <div
                    onClick={() => handleOpenDetail(item, index)}
                    className={`flex  transition-all ease-linear flex-col items-start mt-2 bg-white rounded-[10px] overflow-hidden  ${
                      openDetail === index ? " h-[250px]" : "h-[64px]"
                    }`}
                  >
                    <div className=" my-3 items-center px-4  w-full h-[64px] flex flex-row justify-between">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21 7.75H3C2.59 7.75 2.25 7.41 2.25 7C2.25 6.59 2.59 6.25 3 6.25H21C21.41 6.25 21.75 6.59 21.75 7C21.75 7.41 21.41 7.75 21 7.75Z"
                          fill="#222427"
                        />
                        <path
                          d="M21 12.75H3C2.59 12.75 2.25 12.41 2.25 12C2.25 11.59 2.59 11.25 3 11.25H21C21.41 11.25 21.75 11.59 21.75 12C21.75 12.41 21.41 12.75 21 12.75Z"
                          fill="#222427"
                        />
                        <path
                          d="M21 17.75H3C2.59 17.75 2.25 17.41 2.25 17C2.25 16.59 2.59 16.25 3 16.25H21C21.41 16.25 21.75 16.59 21.75 17C21.75 17.41 21.41 17.75 21 17.75Z"
                          fill="#222427"
                        />
                      </svg>
                      <div className=" flex flex-row gap-2 justify-center items-center ">
                        <label
                          for={`is_default${index}`}
                          className="inline-flex relative items-center cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            // name="is_default"
                            value={item?.status == "ACTIVE" ? true : false}
                            id={`is_default${index}`}
                            className="sr-only peer"
                            checked={item?.status == "ACTIVE" ? true : false}
                            onChange={(e) =>
                              handleActiveItem(
                                index,
                                item,
                                e.target.checked,
                                "outsource"
                              )
                            }
                          />
                          <div
                            className="w-11 h-6 bg-gray-200 peer-focus:outline-none cursor-pointer rounded-full peer
            peer-checked:after:translate-x-full
             peer-checked:after:border-white after:content-[''] 
             after:absolute after:top-[2px] after:left-[2px] after:bg-white
              after:border-gray-100 after:border after:rounded-full after:h-5 
              after:w-5 after:transition-all dark:bg-[#1C3F3A] peer-checked:bg-green-700"
                          ></div>
                        </label>
                        {item?.type == "BLOG" ? "مقاله" : "ویدیو"}
                      </div>

                      <svg
                        className={`transition-all ease-in-out duration-300 ${
                          openDetail === index ? " rotate-180" : "rotate-0"
                        }`}
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_4685_17972)">
                          <path
                            d="M23.893 10.9062H15.5863H8.10633C6.82633 10.9062 6.18633 12.4529 7.093 13.3596L13.9997 20.2662C15.1063 21.3729 16.9063 21.3729 18.013 20.2662L20.6397 17.6396L24.9197 13.3596C25.813 12.4529 25.173 10.9062 23.893 10.9062Z"
                            fill="#222427"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_4685_17972">
                            <rect width="32" height="32" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div
                      className={`bg-[#EDF6F7]  w-full h-full mt-8 flex flex-row justify-between items-center p-5  overflow-hidden `}
                    >
                      <div className="flex flex-row items-center gap-4 ">
                        <img className="w-36" src={item?.icon?.file} />
                        <div className="flex flex-col">
                          <span className="font-Kalameh  px-1 text-black font-[600] ">
                            {" "}
                            عنوان:
                            <span className="text-black font-[500] px-2">
                              {item?.title}
                            </span>
                          </span>
                          <span className="font-Kalameh  px-1 text-black font-[600] ">
                            {" "}
                            لینک:
                            <span className="text-black font-[500] px-2 ">
                              {item?.link}
                            </span>
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-row gap-3">
                        <button
                          className="flex items-center justify-center gap-1.5 z-[1] h-11 bg-[#4FB3BF] hover:bg-blacklead transition-colors duration-500 px-3 text-white rounded-[4px] font-KalamehMed font-medium"
                          onClick={() => {
                            item?.type == "VIDEO"
                              ? EditProductSideBarEditBlogModal(
                                  item,
                                  index,
                                  "OUTSOURCE"
                                )
                              : AddProductSideBarEditBlogModal(
                                  item,
                                  index,
                                  "OUTSOURCE"
                                );
                          }}
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H11C11.41 1.25 11.75 1.59 11.75 2C11.75 2.41 11.41 2.75 11 2.75H9C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V13C21.25 12.59 21.59 12.25 22 12.25C22.41 12.25 22.75 12.59 22.75 13V15C22.75 20.43 20.43 22.75 15 22.75Z"
                              fill="#fafafa"
                            />
                            <path
                              d="M8.50032 17.6901C7.89032 17.6901 7.33032 17.4701 6.92032 17.0701C6.43032 16.5801 6.22032 15.8701 6.33032 15.1201L6.76032 12.1101C6.84032 11.5301 7.22032 10.7801 7.63032 10.3701L15.5103 2.49006C17.5003 0.500059 19.5203 0.500059 21.5103 2.49006C22.6003 3.58006 23.0903 4.69006 22.9903 5.80006C22.9003 6.70006 22.4203 7.58006 21.5103 8.48006L13.6303 16.3601C13.2203 16.7701 12.4703 17.1501 11.8903 17.2301L8.88032 17.6601C8.75032 17.6901 8.62032 17.6901 8.50032 17.6901ZM16.5703 3.55006L8.69032 11.4301C8.50032 11.6201 8.28032 12.0601 8.24032 12.3201L7.81032 15.3301C7.77032 15.6201 7.83032 15.8601 7.98032 16.0101C8.13032 16.1601 8.37032 16.2201 8.66032 16.1801L11.6703 15.7501C11.9303 15.7101 12.3803 15.4901 12.5603 15.3001L20.4403 7.42006C21.0903 6.77006 21.4303 6.19006 21.4803 5.65006C21.5403 5.00006 21.2003 4.31006 20.4403 3.54006C18.8403 1.94006 17.7403 2.39006 16.5703 3.55006Z"
                              fill="#fafafa"
                            />
                            <path
                              d="M19.8496 9.83003C19.7796 9.83003 19.7096 9.82003 19.6496 9.80003C17.0196 9.06003 14.9296 6.97003 14.1896 4.34003C14.0796 3.94003 14.3096 3.53003 14.7096 3.41003C15.1096 3.30003 15.5196 3.53003 15.6296 3.93003C16.2296 6.06003 17.9196 7.75003 20.0496 8.35003C20.4496 8.46003 20.6796 8.88003 20.5696 9.28003C20.4796 9.62003 20.1796 9.83003 19.8496 9.83003Z"
                              fill="#fafafa"
                            />
                          </svg>
                          <span>ویرایش</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </>

            <>
              {productData?.sidebars?.insource &&
                productData?.sidebars?.insource?.map((item, index) => (
                  <div
                    onClick={() => handleOpenDetailInsource(item, index)}
                    className={`flex  transition-all ease-linear flex-col items-start mt-2 bg-white rounded-[10px] overflow-hidden  ${
                      openDetailInsource === index ? " h-[250px]" : "h-[64px]"
                    }`}
                  >
                    <div className=" my-3 items-center px-4  w-full h-[64px] flex flex-row justify-between">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21 7.75H3C2.59 7.75 2.25 7.41 2.25 7C2.25 6.59 2.59 6.25 3 6.25H21C21.41 6.25 21.75 6.59 21.75 7C21.75 7.41 21.41 7.75 21 7.75Z"
                          fill="#222427"
                        />
                        <path
                          d="M21 12.75H3C2.59 12.75 2.25 12.41 2.25 12C2.25 11.59 2.59 11.25 3 11.25H21C21.41 11.25 21.75 11.59 21.75 12C21.75 12.41 21.41 12.75 21 12.75Z"
                          fill="#222427"
                        />
                        <path
                          d="M21 17.75H3C2.59 17.75 2.25 17.41 2.25 17C2.25 16.59 2.59 16.25 3 16.25H21C21.41 16.25 21.75 16.59 21.75 17C21.75 17.41 21.41 17.75 21 17.75Z"
                          fill="#222427"
                        />
                      </svg>
                      <div className=" flex flex-row gap-2 justify-center items-center">
                        <label
                          for={`default-toggle${index}`}
                          className="inline-flex relative items-center cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            name={`is_default${index}`}
                            value={item?.status == "ACTIVE" ? true : false}
                            id={`default-toggle${index}`}
                            className="sr-only peer"
                            checked={item?.status == "ACTIVE" ? true : false}
                            onChange={(e) =>
                              handleActiveItem(
                                index,
                                item,
                                e.target.checked,
                                "insource"
                              )
                            }
                          />
                          <div
                            className="w-11 h-6 bg-gray-200 peer-focus:outline-none cursor-pointer rounded-full peer
            peer-checked:after:translate-x-full
             peer-checked:after:border-white after:content-[''] 
             after:absolute after:top-[2px] after:left-[2px] after:bg-white
              after:border-gray-100 after:border after:rounded-full after:h-5 
              after:w-5 after:transition-all dark:bg-[#1C3F3A] peer-checked:bg-green-700"
                          ></div>
                        </label>
                        {item?.type == "BLOG" ? "مقاله" : "ویدیو"}
                      </div>

                      <svg
                        className={`transition-all ease-in-out duration-300 ${
                          openDetailInsource === index
                            ? " rotate-180"
                            : "rotate-0"
                        }`}
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_4685_17972)">
                          <path
                            d="M23.893 10.9062H15.5863H8.10633C6.82633 10.9062 6.18633 12.4529 7.093 13.3596L13.9997 20.2662C15.1063 21.3729 16.9063 21.3729 18.013 20.2662L20.6397 17.6396L24.9197 13.3596C25.813 12.4529 25.173 10.9062 23.893 10.9062Z"
                            fill="#222427"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_4685_17972">
                            <rect width="32" height="32" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div
                      className={`bg-[#EDF6F7]  w-full h-full mt-8 flex flex-row justify-between items-center p-5  overflow-hidden`}
                    >
                      <div className="flex flex-row items-center gap-4 ">
                        {item?.type == "BLOG" ? (
                          <span className="font-Kalameh  px-1 text-black font-[600] ">
                            {" "}
                            عنوان:
                            <span className="text-black font-[500] px-2">
                              {item?.blogItem?.name}
                            </span>
                          </span>
                        ) : (
                          <video className="w-36" src={item?.file} />
                        )}
                      </div>
                      <div>
                        <button
                          className="flex items-center justify-center gap-1.5 h-11 bg-[#4FB3BF] hover:bg-blacklead transition-colors duration-500 px-3 text-white rounded-[4px] font-KalamehMed font-medium"
                          onClick={() => {
                            item.type == "VIDEO"
                              ? EditProductSideBarEditBlogModal(
                                  item,
                                  index,
                                  "insource"
                                )
                              : AddProductSideBarEditBlogModal(
                                  item,
                                  index,
                                  "insource"
                                );
                          }}
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H11C11.41 1.25 11.75 1.59 11.75 2C11.75 2.41 11.41 2.75 11 2.75H9C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V13C21.25 12.59 21.59 12.25 22 12.25C22.41 12.25 22.75 12.59 22.75 13V15C22.75 20.43 20.43 22.75 15 22.75Z"
                              fill="#fafafa"
                            />
                            <path
                              d="M8.50032 17.6901C7.89032 17.6901 7.33032 17.4701 6.92032 17.0701C6.43032 16.5801 6.22032 15.8701 6.33032 15.1201L6.76032 12.1101C6.84032 11.5301 7.22032 10.7801 7.63032 10.3701L15.5103 2.49006C17.5003 0.500059 19.5203 0.500059 21.5103 2.49006C22.6003 3.58006 23.0903 4.69006 22.9903 5.80006C22.9003 6.70006 22.4203 7.58006 21.5103 8.48006L13.6303 16.3601C13.2203 16.7701 12.4703 17.1501 11.8903 17.2301L8.88032 17.6601C8.75032 17.6901 8.62032 17.6901 8.50032 17.6901ZM16.5703 3.55006L8.69032 11.4301C8.50032 11.6201 8.28032 12.0601 8.24032 12.3201L7.81032 15.3301C7.77032 15.6201 7.83032 15.8601 7.98032 16.0101C8.13032 16.1601 8.37032 16.2201 8.66032 16.1801L11.6703 15.7501C11.9303 15.7101 12.3803 15.4901 12.5603 15.3001L20.4403 7.42006C21.0903 6.77006 21.4303 6.19006 21.4803 5.65006C21.5403 5.00006 21.2003 4.31006 20.4403 3.54006C18.8403 1.94006 17.7403 2.39006 16.5703 3.55006Z"
                              fill="#fafafa"
                            />
                            <path
                              d="M19.8496 9.83003C19.7796 9.83003 19.7096 9.82003 19.6496 9.80003C17.0196 9.06003 14.9296 6.97003 14.1896 4.34003C14.0796 3.94003 14.3096 3.53003 14.7096 3.41003C15.1096 3.30003 15.5196 3.53003 15.6296 3.93003C16.2296 6.06003 17.9196 7.75003 20.0496 8.35003C20.4496 8.46003 20.6796 8.88003 20.5696 9.28003C20.4796 9.62003 20.1796 9.83003 19.8496 9.83003Z"
                              fill="#fafafa"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </> */}
            </div>
          </div>
        </DragDropContext>

        <div className="w-full flex items-center justify-between">
          <button
            className="flex items-center justify-center gap-1.5 h-11 bg-white hover:hover:bg-cyann  transition-colors duration-500 px-3 text-black rounded-[4px] font-KalamehMed font-medium"
            onClick={() => handlepreviosStep()}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z"
                fill="#222427"
              />
              <path
                d="M10.7399 16.2802C10.5499 16.2802 10.3599 16.2102 10.2099 16.0602C9.91993 15.7702 9.91993 15.2902 10.2099 15.0002L13.2099 12.0002L10.2099 9.00016C9.91993 8.71016 9.91993 8.23016 10.2099 7.94016C10.4999 7.65016 10.9799 7.65016 11.2699 7.94016L14.7999 11.4702C15.0899 11.7602 15.0899 12.2402 14.7999 12.5302L11.2699 16.0602C11.1199 16.2102 10.9299 16.2802 10.7399 16.2802Z"
                fill="#222427"
              />
            </svg>
            مرحله قبل
          </button>

          <button
            className="flex items-center justify-center gap-1.5 h-11 bg-primary hover:bg-blacklead transition-colors duration-500 px-3 text-white rounded-[4px] font-KalamehMed font-medium"
            onClick={() => handleNextStep()}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z"
                fill="white"
              />
              <path
                d="M13.26 16.2802C13.07 16.2802 12.88 16.2102 12.73 16.0602L9.20001 12.5302C8.91001 12.2402 8.91001 11.7602 9.20001 11.4702L12.73 7.94016C13.02 7.65016 13.5 7.65016 13.79 7.94016C14.08 8.23016 14.08 8.71016 13.79 9.00016L10.79 12.0002L13.79 15.0002C14.08 15.2902 14.08 15.7702 13.79 16.0602C13.65 16.2102 13.46 16.2802 13.26 16.2802Z"
                fill="white"
              />
            </svg>
            مرحله بعد
          </button>
        </div>
      </div>
    </>
  );
}

export default StepEightDescription;
