import { VerticalAlignBottom } from "@mui/icons-material";
import React, { useContext, useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import toast from "react-hot-toast";
import AddProductContext from "../../../../context/product/AddProductContext";
import { useStrictDroppable } from "../../../../utils/hooks/useStrictDroppable";
import AddAttributeProductModal from "../../attributes/AddAttributeProductModal";
import BooleanAttributeCardItem from "../../attributes/boolean-atribiute/BooleanAttributeCardItem";
import MultiOptionAttributeCardItem from "../../attributes/multi-option-attribute/MultiOptionAttributeCardItem";
import SingleOptionAttributeCardItem from "../../attributes/single-option-attribute/SingleOptionAttributeCardItem";
import TextAttributeCardItem from "../../attributes/text-attibute/TextAttributeCardItem";

function StepThreeSpecifications() {
  const [open, setOpen] = useState(false);
  const { step, dispatch, productData } = useContext(AddProductContext);
  const [mainAttr, setMainAttr] = useState([]);
  const [subAttr, setSubAttr] = useState([]);
  const [enabled] = useStrictDroppable(false);
  useEffect(() => {
    setMainAttr(
      productData?.attributes?.filter((attr) => +attr?.is_main === 1) || []
    );
    setSubAttr(
      productData?.attributes?.filter((attr) => +attr?.is_main === 0) || []
    );
  }, [productData]);
  async function saveData() {
    let i = 0;
    const mainPrio = mainAttr?.map((attr) => {
      i++;
      return { ...attr, priority: i * 1000 };
    });
    const subPrio = subAttr?.map((attr) => {
      i++;
      return { ...attr, priority: i * 1000 };
    });
    await dispatch({
      type: "ADD",
      productData: { attributes: [...mainPrio, ...subPrio] },
    });
  }
  async function handleNextStep() {
    // if (mainAttr.length !== 0) {
      await saveData();
      dispatch({
        type: "STEP",
        step: step + 1,
      });
    // } else {
    //   toast.error("حداقل یک ویژگی اصلی الزامی است");
    // }
  }
  const handlepreviosStep = () => {
    dispatch({
      type: "STEP",
      step: step - 1,
    });
  };
  const handleMainAttr = () => {
    const attrCount = [];
    productData?.attributes &&
      productData?.attributes.map((at) => {
        at.is_main == 1 && attrCount.push(at);
      });
    console.log("SDvsdvsdvsdv", attrCount.length);
    if (attrCount.length < 7) {
      localStorage.setItem("is_main", 1);
      setOpen(true);
    } else {
      toast.error("   شما تا 7 ویژگی اصلی میتوانید اضافه کنید");
    }
  };

  const handleOnDragEndMain = (result) => {
    const sourceIndex = result?.source?.index;
    const destinationIndex = result?.destination?.index;
    const items = Array.from(mainAttr);
    const [reorderedItem] = items.splice(sourceIndex, 1);
    items.splice(destinationIndex, 0, reorderedItem);
    setMainAttr(items);
  };
  const handleOnDragEndSub = (result) => {
    const sourceIndex = result?.source?.index;
    const destinationIndex = result?.destination?.index;
    const items = Array.from(subAttr);
    const [reorderedItem] = items.splice(sourceIndex, 1);
    items.splice(destinationIndex, 0, reorderedItem);
    setSubAttr(items);
  };
  return (
    <>
      <AddAttributeProductModal open={open} setOpen={setOpen} />
      <div className="flex flex-col justify-between items-center  w-full h-full z-10">
        <div className="flex flex-row justify-between items-start  w-full h-full gap-6 mb-5">
          <DragDropContext onDragEnd={handleOnDragEndMain}>
            <div className="w-1/2 flex flex-col ">
              <p className="font-Kalameh text-black text-[14px] font-[600]">
                ویژگی های اصلی:
              </p>

              <div className="bg-white rounded-lg px-4 py-5 mt-4">
                <button
                  onClick={() => {
                    handleMainAttr();
                  }}
                  className="h-[45px] rounded-[6px] font-Kalameh font-[600] w-full flex flex-row justify-center items-center gap-2 bg-[#DBEEF6] transition-colors ease-in-out duration-300 hover:bg-[#bfe2f1]"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 12H16"
                      stroke="#222427"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12 16V8"
                      stroke="#222427"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                      stroke="#222427"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  افزودن ویژگی اصلی
                </button>

                <div className="mt-4 w-full">
                  <span className="font-Kalameh text-[12px] text-black  ">
                    شما تا 7 ویژگی اصلی میتوانید اضافه کنید
                  </span>
                  {enabled && (
                    <Droppable droppableId={`feature`}>
                      {(provided) => (
                        <div
                          id={`feature`}
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="bg-[#DBEEF6] p-2 mt-3 rounded-lg w-full flex flex-col"
                        >
                          {mainAttr?.map((attr, index) => (
                            <Draggable
                              key={index}
                              draggableId={`${index}`}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  className="w-full"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  {attr?.attrData?.type == "TEXT" && (
                                    <TextAttributeCardItem
                                      attr={attr}
                                      index={index}
                                    />
                                  )}
                                  {attr?.attrData?.type == "SINGLE_OPTION" && (
                                    <SingleOptionAttributeCardItem
                                      attr={attr}
                                      index={index}
                                    />
                                  )}
                                  {attr?.attrData?.type ==
                                    "MULTIPLE_OPTION" && (
                                    <MultiOptionAttributeCardItem
                                      attr={attr}
                                      index={index}
                                    />
                                  )}
                                  {attr?.attrData?.type == "BOOLEAN" && (
                                    <BooleanAttributeCardItem
                                      attr={attr}
                                      index={index}
                                    />
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
                </div>
              </div>
            </div>
          </DragDropContext>
          <div className="w-[1px] h-full bg-[#C4C7C7]"></div>
          <DragDropContext onDragEnd={handleOnDragEndSub}>
            <div className="w-1/2 flex flex-col ">
              <p className="font-Kalameh text-black text-[14px] font-[600]">
                ویژگی های فرعی:
              </p>

              <div className="bg-white rounded-lg px-4 py-5 mt-4">
                <button
                  onClick={() => {
                    localStorage.setItem("is_main", 0);
                    setOpen(true);
                  }}
                  className="h-[45px] rounded-[6px] font-Kalameh font-[600] w-full flex flex-row justify-center items-center gap-2 bg-[#DBEEF6] transition-colors ease-in-out duration-300 hover:bg-[#bfe2f1]"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 12H16"
                      stroke="#222427"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12 16V8"
                      stroke="#222427"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                      stroke="#222427"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  افزودن ویژگی فرعی
                </button>
                <div className="mt-4 w-full">
                  <span className="font-Kalameh text-[12px] text-black  "></span>
                  {enabled && (
                    <Droppable droppableId={`subAttr`}>
                      {(provided) => (
                        <div
                          id={`subAttr`}
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="bg-[#DBEEF6] p-2 mt-3  rounded-lg w-full flex flex-col"
                        >
                          {subAttr?.map((attr, index) => (
                            <Draggable
                              key={index}
                              draggableId={`${index}`}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="w-full "
                                >
                                  {console.log("attr?.id", attr)}
                                  {attr?.attrData?.type == "TEXT" && (
                                    <TextAttributeCardItem
                                      attr={attr}
                                      index={index}
                                    />
                                  )}
                                  {attr?.attrData?.type == "SINGLE_OPTION" && (
                                    <SingleOptionAttributeCardItem
                                      attr={attr}
                                      index={index}
                                    />
                                  )}
                                  {attr?.attrData?.type ==
                                    "MULTIPLE_OPTION" && (
                                    <MultiOptionAttributeCardItem
                                      attr={attr}
                                      index={index}
                                    />
                                  )}
                                  {attr?.attrData?.type == "BOOLEAN" && (
                                    <BooleanAttributeCardItem
                                      attr={attr}
                                      index={index}
                                    />
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
                </div>
              </div>
            </div>
          </DragDropContext>
        </div>

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

export default StepThreeSpecifications;
