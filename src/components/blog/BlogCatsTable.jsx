import { useMutation } from "@tanstack/react-query";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";
import DeleteIcon from "../../../public/images/icons/deleteIcon";
import EditIcon from "../../../public/images/icons/editIcon";
import { categoriesPriorityUpdate } from "../../api/ApiClient";
import Checkbox from "../../components/common/checkbox";
import Loading from "../../components/elements/loading";
import { useStrictDroppable } from "../../utils/hooks/useStrictDroppable";
import Tooltip from "../elements/Tooltip";

const BlogCatsTable = (props) => {
  const {
    setBlogIds,
    blogIds,
    blogsCatsMutation,
    blogsDeleteMutation,
    blogsData,
    setBlogsData,
  } = props;

  const categoriesPriorityUpdateMutation = useMutation(
    categoriesPriorityUpdate,
    {
      onSuccess: () => {
        // categoriesMutation?.mutate({ level, filterData });
      },
    }
  );

  const [enabled] = useStrictDroppable(blogsCatsMutation?.isLoading);
  const handleOnDragEnd = (result) => {
    const items = Array.from(blogsData);
    const sourceIndex = result?.source?.index;
    const destinationIndex = result?.destination?.index;
    // const sourcePriority = table[sourceIndex]?.priority;
    const sourceId = items[sourceIndex]?.id;
    const destinationPriority = items[destinationIndex]?.priority;
    const [reorderedItem] = items.splice(sourceIndex, 1);
    items.splice(destinationIndex, 0, reorderedItem);
    setBlogsData(items);
    if (sourceIndex > destinationIndex) {
      categoriesPriorityUpdateMutation.mutate({
        model: "blogCategory",
        model_id: sourceId,
        priority: +destinationPriority - 1,
      });
    }
    if (sourceIndex < destinationIndex) {
      categoriesPriorityUpdateMutation.mutate({
        model: "blogCategory",
        model_id: sourceId,
        priority: +destinationPriority + 1,
      });
    }
  };
  return (
    <>
      {/* header content */}

      <div className="w-full flex justify-end border border-blacklead rounded-lg px-4">
        <div className="w-[95%] grid grid-cols-5 gap-x-4 items-center h-11 px-5">
          <div className="col-span-1"></div>
          <div className="col-span-1">
            <p className="font-KalamehMed text-sm font-medium">نام</p>
          </div>
          <div className="col-span-1">
            <p className="font-KalamehMed text-sm font-medium">آدرس اختصاصی</p>
          </div>
          <div className="col-span-1 justify-self-center">
            <p className="font-KalamehMed text-sm font-medium">مقالات</p>
          </div>
        </div>
      </div>
      {/* table rows */}
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {blogsCatsMutation?.isLoading ||
        // categoriesPriorityUpdateMutation?.isLoading ||
        blogsDeleteMutation?.isLoading ? (
          <div className="w-full flex items-center justify-center mt-5">
            <Loading className="w-14 h-14 text-blacklead animate-pulse" />
          </div>
        ) : blogsData?.length === 0 ? (
          <div className="w-full flex justify-center mt-5">
            متاسفانه هیچ دسته بندی یافت نشد
          </div>
        ) : (
          enabled && (
            <Droppable droppableId={`blogCatTable`}>
              {(provided) => (
                <div
                  id={`blogCatTable`}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="w-full bg-blue-lightt rounded-lg p-4 relative"
                >
                  <div className="w-full">
                    {blogsData?.map((blogCat, index) => (
                      <Draggable
                        key={blogCat?.id}
                        draggableId={`${blogCat?.id}`}
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
                                <div className="w-[95%] bg-white hover:bg-[#E0E3E3] transition-colors duration-500 rounded-lg py-3 px-5 grid grid-cols-5 gap-x-4 items-center">
                                  <div className="col-span-1">
                                    <Checkbox
                                      id={blogCat?.id}
                                      state={blogIds}
                                      setState={setBlogIds}
                                    />
                                  </div>
                                  {console.log("blogCat", blogCat)}
                                  <div
                                    className="col-span-1 line-clamp-1"
                                    title={blogCat?.name}
                                  >
                                    <p className="font-KalamehMed text-sm font-medium">
                                      {blogCat?.name}
                                    </p>
                                  </div>
                                  <div
                                    className="col-span-1 line-clamp-1"
                                    title={blogCat?.slug}
                                  >
                                    <p className="font-KalamehMed text-sm font-medium ">
                                      {blogCat?.slug}
                                    </p>
                                  </div>
                                  <div className="col-span-1 justify-self-center">
                                    <p className="font-KalamehMed text-sm font-medium">
                                      {blogCat?.blogs_count} مقاله
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

                                    <Link
                                      to={`/blog/page/cats/${blogCat?.id}`}
                                      className="focus:outline-none"
                                    >
                                      <Tooltip
                                        svgIcon={
                                          <EditIcon className="fill-[#003E43] hover:fill-[#4FB3BF] transition-colors duration-500" />
                                        }
                                        title="ویرایش"
                                      />
                                    </Link>
                                    <button
                                      onClick={() =>
                                        blogsDeleteMutation?.mutate({
                                          id: blogCat?.id,
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
          )
        )}
      </DragDropContext>
    </>
  );
};

export default BlogCatsTable;
