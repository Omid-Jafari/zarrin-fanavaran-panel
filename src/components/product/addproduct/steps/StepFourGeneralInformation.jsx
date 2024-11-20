import { useMutation } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { featuresFilterData } from "../../../../api/ApiClient";
import AddProductContext from "../../../../context/product/AddProductContext";
import { useStrictDroppable } from "../../../../utils/hooks/useStrictDroppable";
import Loading from "../../../elements/loading";
import Tooltip from "../../../elements/Tooltip";

function StepFourGeneralInformation() {
  const { step, productData, dispatch } = useContext(AddProductContext);
  const [filtersFeatureData, setFiltersFeatureData] = useState([]);
  const [filterFeatureInput, setFilterFeatureInput] = useState("");
  const [feature_ids, setFeature_ids] = useState(
    productData?.feature_ids || []
  );
  const featuresFilterDataMutation = useMutation(featuresFilterData, {
    onSuccess: (res) => {
      setFiltersFeatureData(res?.data?.data);
    },
  });
  const [enabled] = useStrictDroppable(featuresFilterDataMutation?.isLoading);
  const handleNextStep = () => {
    dispatch({
      type: "ADD",
      productData: { feature_ids: feature_ids },
    });
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
  useEffect(() => {
    featuresFilterDataMutation?.mutate({ filterData: filterFeatureInput });
  }, [filterFeatureInput]);
  const handleOnDragEnd = (result) => {
    const sourceIndex = result?.source?.index;
    const destinationIndex = result?.destination?.index;
    const items = Array.from(filtersFeatureData);
    const [reorderedItem] = items.splice(sourceIndex, 1);
    items.splice(destinationIndex, 0, reorderedItem);
    setFiltersFeatureData(items);
    setFeature_ids(
      items
        .filter((item) => feature_ids.includes(item?.id))
        ?.map((it) => it?.id)
    );
  };

  // useEffect(() => {
  //   dispatch({
  //     type: "ADD",
  //     productData: { feature_ids: feature_ids },
  //   });
  // }, [feature_ids]);
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="flex flex-col justify-between items-center  w-full h-full">
        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex flex-col gap-2">
            <h5 className="text-sm font-medium font-KalamehMed">
              انتخاب ویژگی عمومی محصول‌:
            </h5>
            <p className="text-sm">ویژگی های عمومی مورد نیاز را انتخاب کنید</p>
          </div>

          <div className="w-full flex items-center bg-white rounded-lg p-3">
            <input
              type="text"
              onChange={(e) => setFilterFeatureInput(e?.target?.value)}
              value={filterFeatureInput}
              placeholder="جستجو در ویژگی های عمومی"
              className="flex-1 placeholder:text-[#C4C7C7] text-dark focus:outline-none"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="#222427"
                d="M11.5 21.75c-5.65 0-10.25-4.6-10.25-10.25S5.85 1.25 11.5 1.25s10.25 4.6 10.25 10.25-4.6 10.25-10.25 10.25zm0-19c-4.83 0-8.75 3.93-8.75 8.75s3.92 8.75 8.75 8.75 8.75-3.93 8.75-8.75-3.92-8.75-8.75-8.75zM22 22.75c-.19 0-.38-.07-.53-.22l-2-2a.754.754 0 010-1.06c.29-.29.77-.29 1.06 0l2 2c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22z"
              ></path>
            </svg>
          </div>
          {featuresFilterDataMutation?.isLoading ? (
            <div className="flex justify-center">
              <Loading className="w-16 h-16 text-blacklead animate-pulse" />
            </div>
          ) : (
            <div className="w-full">
              {enabled && (
                <Droppable droppableId="feature">
                  {(provided) => (
                    <div
                      // id="feature"
                      className="w-full flex flex-col"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {filtersFeatureData?.map((feature, index) => (
                        <Draggable
                          key={`option ${index}`}
                          draggableId={`feature-${index + 1}`}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              // id={`option ${index}`}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="w-full bg-white mb-4 h-16 flex items-center justify-between rounded-lg px-4"
                            >
                              <div className="flex">
                                <Tooltip
                                  svgIcon={
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      className="cursor-grab focus:cursor-grabbing"
                                    >
                                      <path
                                        fill="#222427"
                                        d="M21 7.75H3c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h18c.41 0 .75.34.75.75s-.34.75-.75.75zM21 12.75H3c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h18c.41 0 .75.34.75.75s-.34.75-.75.75zM21 17.75H3c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h18c.41 0 .75.34.75.75s-.34.75-.75.75z"
                                      ></path>
                                    </svg>
                                  }
                                  title="جابجایی"
                                />
                              </div>
                              <div className="flex items-center gap-2">
                                <img
                                  src={feature?.media?.icon?.file}
                                  className="max-h-6 object-contain "
                                  alt=""
                                />
                                <p className="">{feature?.name}</p>
                              </div>

                              <label
                                htmlFor={`default-toggle${index}`}
                                class="inline-flex relative items-center cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  id={`default-toggle${index}`}
                                  class="sr-only peer"
                                  checked={
                                    feature_ids.findIndex(
                                      (fId) => fId === feature?.id
                                    ) === -1
                                      ? false
                                      : true
                                  }
                                  onChange={() => {
                                    {
                                      setFeature_ids((prev) => {
                                        const featureId = prev.findIndex(
                                          (fId) => fId === feature?.id
                                        );

                                        if (featureId === -1) {
                                          let arrrr = [...prev, feature?.id];
                                          return filtersFeatureData
                                            .filter((item) =>
                                              arrrr.includes(item?.id)
                                            )
                                            ?.map((it) => it?.id);
                                        } else {
                                          return [
                                            ...prev.slice(0, featureId),
                                            ...prev.slice(featureId + 1),
                                          ];
                                        }
                                      });
                                    }
                                  }}
                                />
                                <div class="w-8 h-4 bg-gray-200 peer-focus:outline-none dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0 after:right-0 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                              </label>
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
          )}
        </div>

        <div className="w-full flex items-center mt-4 justify-between">
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
    </DragDropContext>
  );
}

export default StepFourGeneralInformation;
