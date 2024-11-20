import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import AddIcon from "../../../public/images/icons/addIcon";
import EditIcon from "../../../public/images/icons/editIcon";
import DeleteIcon from "../../../public/images/icons/deleteIcon";
import {
  categories,
  categoriesDelete,
  categoriesPriorityUpdate,
} from "../../api/ApiClient";
import Loading from "../../components/elements/loading";
import { Link, useNavigate } from "react-router-dom";
import Tooltip from "../../components/elements/Tooltip";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Categories = () => {
  let maxHeightTable = window?.innerHeight - 365;
  const [level, setLevel] = useState(1);
  const [categoriesData, setCategoriesData] = useState({});
  const [categoryItemIds, setCategoryItemIds] = useState([]);
  const [filterData, setFilterData] = useState("");
  const navigate = useNavigate();
  const categoriesMutation = useMutation(categories, {
    onSuccess: (res) => {
      setCategoriesData(res?.data?.data);
    },
  });
  const categoriesDeleteMutation = useMutation(categoriesDelete, {
    onSuccess: () => {
      categoriesMutation?.mutate({ level, filterData });
    },
  });
  const categoriesPriorityUpdateMutation = useMutation(
    categoriesPriorityUpdate,
    {
      onSuccess: () => {
        // categoriesMutation?.mutate({ level, filterData });
      },
    }
  );
  useEffect(() => {
    categoriesMutation?.mutate({ level: 1, filterData });
    setLevel(1);
  }, []);

  // make it droggable function

  const handleOnDragEnd = (result) => {
    const table = categoriesData[result?.destination?.droppableId];
    const sourceIndex = result?.source?.index;
    const destinationIndex = result?.destination?.index;
    const sourcePriority = table[sourceIndex]?.priority;
    const sourceId = table[sourceIndex]?.id;
    const destinationPriority = table[destinationIndex]?.priority;
    if (sourceIndex > destinationIndex) {
      categoriesPriorityUpdateMutation.mutate({
        model: "category",
        model_id: sourceId,
        priority: +destinationPriority - 1,
      });
      setCategoriesData((prev) => {
        return {
          ...prev,
          [result?.destination?.droppableId]: [
            ...table,
            (table[sourceIndex].priority = +destinationPriority - 1),
          ]
            .slice(0, -1)
            .sort((a, b) => a.priority - b.priority),
        };
      });
    }
    if (sourceIndex < destinationIndex) {
      categoriesPriorityUpdateMutation.mutate({
        model: "category",
        model_id: sourceId,
        priority: +destinationPriority + 1,
      });
      setCategoriesData((prev) => {
        return {
          ...prev,
          [result?.destination?.droppableId]: [
            ...table,
            (table[sourceIndex].priority = +destinationPriority + 1),
          ]
            .slice(0, -1)
            .sort((a, b) => a.priority - b.priority),
        };
      });
    }
  };

  const selectAll = (e) => {
    if (e?.target?.checked) {
      setCategoryItemIds([]);
      for (let category of Object.keys(categoriesData)) {
        for (let item of categoriesData[category]) {
          setCategoryItemIds((prev) => [...prev, item?.id]);
        }
      }
      // Object.keys(categoriesData).map((category) => {
      //   categoriesData[category]?.map((item) => {
      //     setCategoryItemIds((prev) => [...prev, item?.id]);
      //   });
      // });
    } else {
      setCategoryItemIds([]);
    }
  };

  const groupDelete = () => {
    for (let id of categoryItemIds) {
      categoriesDeleteMutation?.mutate({ id });
    }
    setCategoryItemIds([]);
  };

  const handleEditCategory = (item) => {
    navigate("/categories/edit", { state: item });
  };

  let total = 0;
  for (let category of Object.keys(categoriesData)) {
    for (let item of categoriesData[category]) {
      total++;
    }
  }

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="w-full px-5 pt-5">
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
                  d="M19.9 22.75H4.1c-1.92 0-2.85-.98-2.85-2.98v-4.04c0-2.01.93-2.98 2.85-2.98h15.8c1.92 0 2.85.98 2.85 2.98v4.04c0 2-.93 2.98-2.85 2.98zm-15.8-8.5c-1.01 0-1.35.21-1.35 1.48v4.04c0 1.27.34 1.48 1.35 1.48h15.8c1.01 0 1.35-.21 1.35-1.48v-4.04c0-1.27-.34-1.48-1.35-1.48H4.1zM19.9 11.25H4.1c-1.92 0-2.85-.98-2.85-2.98V4.23c0-2.01.93-2.98 2.85-2.98h15.8c1.92 0 2.85.98 2.85 2.98v4.04c0 2-.93 2.98-2.85 2.98zM4.1 2.75c-1.01 0-1.35.21-1.35 1.48v4.04c0 1.27.34 1.48 1.35 1.48h15.8c1.01 0 1.35-.21 1.35-1.48V4.23c0-1.27-.34-1.48-1.35-1.48H4.1z"
                ></path>
              </svg>
              دسته‌بندی‌ها:
            </h5>
            <Link to={"/categories/add"}>
              <button
                className="flex items-center justify-center gap-1.5 h-11 bg-primary hover:bg-blacklead transition-colors duration-500 px-3 text-white rounded-[4px] font-KalamehMed font-medium"
                onClick={() => {}}
              >
                <AddIcon className="fill-white" />
                افزودن دسته‌بندی جدید
              </button>
            </Link>
          </div>
          <div className="w-full rounded-lg bg-blue-lightt flex items-center p-3 gap-3 mt-5">
            <button
              className={`h-11 rounded-[4px] flex items-center justify-center px-3 text-sm hover:bg-[#478F95] hover:text-white hover:shadow-inner transition duration-500 ${
                level === 1
                  ? "bg-[#478F95] text-white shadow-inner"
                  : "bg-white text-[#545456]"
              }`}
              onClick={() => {
                setLevel(1);
                categoriesMutation?.mutate({ level: 1, filterData });
                setCategoryItemIds([]);
              }}
            >
              مجموعه ها
            </button>
            <button
              className={`h-11 rounded-[4px] flex items-center justify-center px-3 text-sm hover:bg-[#478F95] hover:text-white hover:shadow-inner transition duration-500 ${
                level === 2
                  ? "bg-[#478F95] text-white shadow-inner"
                  : "bg-white text-[#545456]"
              }`}
              onClick={() => {
                setLevel(2);
                categoriesMutation?.mutate({ level: 2, filterData });
                setCategoryItemIds([]);
              }}
            >
              زیر مجموعه ها
            </button>
            <button
              className={`h-11 rounded-[4px] flex items-center justify-center px-3 text-sm hover:bg-[#478F95] hover:text-white hover:shadow-inner transition duration-500 ${
                level === 3
                  ? "bg-[#478F95] text-white shadow-inner"
                  : "bg-white text-[#545456]"
              }`}
              onClick={() => {
                setLevel(3);
                categoriesMutation?.mutate({ level: 3, filterData });
                setCategoryItemIds([]);
              }}
            >
              زیر شاخه ها
            </button>

            <div className="flex items-center gap-3 h-11 bg-white rounded-lg px-2 w-2/5 mr-auto">
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
              <input
                type="text"
                className="flex-1 placeholder:text-[#C4C7C7] text-dark focus:outline-none"
                placeholder="جستجو در دسته‌بندی‌ها"
                onChange={(e) => setFilterData(e?.target?.value)}
              />
            </div>
            <button
              className="font-KalamehSemi font-semibold text-sm h-11 bg-primary hover:bg-blacklead transition-colors duration-500 px-3 text-white rounded-[4px]"
              onClick={() => {
                categoriesMutation?.mutate({ level, filterData });
              }}
            >
              جستجو
            </button>
          </div>
          <div className="w-full rounded-lg bg-blue-lightt flex items-center justify-between p-3 gap-3 mt-4">
            <div className="flex items-center gap-2 ">
              <input
                type="checkbox"
                checked={categoryItemIds?.length === total && total !== 0}
                onChange={(e) => selectAll(e)}
              />
              <span className="font-KalamehMed font-medium">انتخاب همه</span>
            </div>
            <button
              className="font-KalamehMed font-medium text-sm h-11 bg-[#EFF1F1] hover:bg-[#C4C7C7] transition-colors duration-500 px-3 text-[#CA3636] rounded-[4px] flex items-center gap-1"
              onClick={() => groupDelete()}
            >
              <DeleteIcon className="fill-[#CA3636]" />
              حذف
            </button>
          </div>
          <div className="w-full flex mt-4 justify-end border border-blacklead rounded-lg px-4">
            <div className="w-[95%] grid grid-cols-7 gap-x-4 items-center h-11 px-5">
              <div className="col-span-1"></div>
              <div className="col-span-1">
                <p className="font-KalamehMed text-sm font-medium">تصویر</p>
              </div>
              <div className="col-span-1">
                <p className="font-KalamehMed text-sm font-medium">نام</p>
              </div>
              <div className="col-span-1">
                <p className="font-KalamehMed text-sm font-medium">آیکون</p>
              </div>
              <div className="col-span-1">
                <p className="font-KalamehMed text-sm font-medium">
                  آدرس اختصاصی
                </p>
              </div>
              <div className="col-span-1 justify-self-center">
                <p className="font-KalamehMed text-sm font-medium">محصول ها</p>
              </div>
            </div>
          </div>
          <div
            className="w-full overflow-y-scroll hide-scrollbar"
            style={{ maxHeight: maxHeightTable }}
          >
            {categoriesMutation?.isLoading ||
            // categoriesPriorityUpdateMutation?.isLoading ||
            categoriesDeleteMutation?.isLoading ? (
              <div className="w-full flex items-center justify-center mt-5">
                <Loading className="w-14 h-14 text-blacklead animate-pulse" />
              </div>
            ) : categoriesData?.length === 0 && filterData ? (
              <div className="w-full flex justify-center mt-5">
                متاسفانه هیچ دسته بندی یافت نشد
              </div>
            ) : (
              Object.keys(categoriesData).map((category) => (
                <Droppable droppableId={`${category}`}>
                  {(provided) => (
                    <div
                      id={`${category}`}
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="w-full bg-blue-lightt rounded-lg pt-[3.25rem] px-4 pb-4 mt-4 relative"
                    >
                      <div
                        className="bg-white rounded-bl-lg px-4 flex items-center h-11 absolute top-0 right-0 font-KalamehMed font-medium text-sm"
                        style={{
                          boxShadow: "inset 1px -1px 2px rgba(21, 21, 21, 0.3)",
                        }}
                      >
                        {category}
                      </div>
                      <div className="w-full">
                        {categoriesData[category]?.map((item, index) => (
                          <Draggable
                            key={item?.id}
                            draggableId={`${item?.id}`}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                className="w-full table"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <div className="w-full flex items-center mt-3">
                                  <div className="w-full flex items-center">
                                    <div className="w-[5%]">
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
                                    <div className="w-[95%] bg-white hover:bg-[#E0E3E3] transition-colors duration-500 rounded-lg py-3 px-5 grid grid-cols-7 gap-x-4 items-center">
                                      <div className="col-span-1">
                                        <input
                                          type="checkbox"
                                          checked={
                                            categoryItemIds.findIndex(
                                              (cId) => cId === item?.id
                                            ) === -1
                                              ? false
                                              : true
                                          }
                                          onChange={() =>
                                            setCategoryItemIds((prev) => {
                                              const categoryId = prev.findIndex(
                                                (cId) => cId === item?.id
                                              );

                                              if (categoryId === -1) {
                                                return [...prev, item?.id];
                                              } else {
                                                return [
                                                  ...prev.slice(0, categoryId),
                                                  ...prev.slice(categoryId + 1),
                                                ];
                                              }
                                            })
                                          }
                                        />
                                      </div>
                                      <div className="col-span-1">
                                        <img
                                          src={item?.media?.main?.file}
                                          alt="item pic"
                                          className="object-contain max-h-20"
                                        />
                                      </div>
                                      <div className="col-span-1">
                                        <p className="font-KalamehMed text-sm font-medium">
                                          {item?.name}
                                        </p>
                                      </div>

                                      <div className="col-span-1">
                                        <img
                                          src={item?.media?.icon?.file}
                                          alt="item pic"
                                          className="object-contain max-h-20"
                                        />
                                      </div>
                                      <div className="col-span-1">
                                        <p className="font-KalamehMed text-sm font-medium">
                                          {item?.slug}
                                        </p>
                                      </div>
                                      <div className="col-span-1 justify-self-center">
                                        <p className="font-Kalameh text-sm">
                                          {item?.products_count} محصول
                                        </p>
                                      </div>
                                      <div className="col-span-1 flex items-center justify-end gap-5 ">
                                        <Tooltip
                                          svgIcon={
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              fill="none"
                                              viewBox="0 0 24 24"
                                              className="fill-[#003E43] hover:fill-[#4FB3BF] transition-colors duration-500"
                                            >
                                              <path d="M12 16.33c-2.39 0-4.33-1.94-4.33-4.33S9.61 7.67 12 7.67s4.33 1.94 4.33 4.33-1.94 4.33-4.33 4.33zm0-7.16c-1.56 0-2.83 1.27-2.83 2.83s1.27 2.83 2.83 2.83 2.83-1.27 2.83-2.83S13.56 9.17 12 9.17z"></path>
                                              <path d="M12 21.02c-3.76 0-7.31-2.2-9.75-6.02-1.06-1.65-1.06-4.34 0-6 2.45-3.82 6-6.02 9.75-6.02s7.3 2.2 9.74 6.02c1.06 1.65 1.06 4.34 0 6-2.44 3.82-5.99 6.02-9.74 6.02zm0-16.54c-3.23 0-6.32 1.94-8.48 5.33-.75 1.17-.75 3.21 0 4.38 2.16 3.39 5.25 5.33 8.48 5.33 3.23 0 6.32-1.94 8.48-5.33.75-1.17.75-3.21 0-4.38-2.16-3.39-5.25-5.33-8.48-5.33z"></path>
                                            </svg>
                                          }
                                          title="مشاهده"
                                        />

                                        <button
                                          onClick={() =>
                                            handleEditCategory(item)
                                          }
                                          className="focus:outline-none"
                                        >
                                          <Tooltip
                                            svgIcon={
                                              <EditIcon className="fill-[#003E43] hover:fill-[#4FB3BF] transition-colors duration-500" />
                                            }
                                            title="ویرایش"
                                          />
                                        </button>
                                        <button
                                          onClick={() =>
                                            categoriesDeleteMutation?.mutate({
                                              id: item?.id,
                                            })
                                          }
                                          className="focus:outline-none"
                                        >
                                          <Tooltip
                                            svgIcon={
                                              <DeleteIcon className="fill-[#CA3636] hover:fill-[#7D3C45] transition-colors duration-500" />
                                            }
                                            title="حذف"
                                          />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                      </div>
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))
            )}
          </div>
        </div>
      </DragDropContext>
    </>
  );
};

export default Categories;
