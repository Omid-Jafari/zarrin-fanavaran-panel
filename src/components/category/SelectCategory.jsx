import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { allCategory } from "../../api/ApiClient";
import AddProductContext from "../../context/product/AddProductContext";
import { fromEdit } from "../../utils/FromEdit";

import { useOnClickOutside } from "../../utils/OutSideClick";
import CategoryElement from "./category-element";
import SelectItemElement from "./select-item-element";

function SelectCategory({ formik, searchCategory, ids }) {
  const [openSelectOption, setopenSelectOption] = useState(false);

  const [category, setcategory] = useState([]);
  const location = useLocation();
  const ref = useRef(null);
  const [names, setnames] = useState([]);

  const [selectedCategory, setSelectedCategoty] = useState([]);
  const allCategoryquery = useMutation(async (s) => allCategory(s), {
    onSuccess: (res) => {
      setcategory(res.data?.data);
      checkedData(res.data?.data);
    },
    // refetchOnWindowFocus: false,
  });

  useEffect(() => {
    ids && setSelectedCategoty((prev) => ids);
    if (fromEdit()) allCategoryquery.mutate(searchCategory);
    console.log("dvssdvsdvsdvdsv");
  }, [ids]);

  useEffect(() => {
    allCategoryquery.mutate(searchCategory);
  }, [searchCategory]);

  useEffect(() => {
    formik.values.category_ids = selectedCategory;
    //   : "";
  }, [selectedCategory]);

  useOnClickOutside(ref, () => setopenSelectOption(false));

  //   const handleCheckbox = (item, index, check) => {

  // console.log("Svdsvsdvsd",check);

  //     Object.entries(item).map((i) => {
  //       i[1].check = check;
  //       if (i[1].check) {
  //         setSelectedCategoty((prev) => [...prev, i[1].id]);
  //       } else {
  //         setSelectedCategoty((prev) => prev.filter((f, index) => f != i[1].id));
  //       }
  //     });
  //     // setcategory((prev) => [...category]);
  //   };

  const handleCheckbox = (item, index, check) => {
    Object.entries(item).map((i) => {
      if (item?.item?.level == check.level && check.check == false) {
        i[1].check = false;
        item?.item?.children?.map((chilOne) => {
          chilOne.check = false;
          chilOne?.children?.map((chilTwo) => {
            chilTwo.check = false;
          });
        });
      } else {
        console.log("SDvsdvsdvsdvsv", check);
        if (check.check == false && check.level == i[1].level) {
          console.log("Sdvsqwdqwdqwdqwdqwdvsdv");
          i[1].check = false;
        } else {
          i[1].check = check.check;
        }
      }
      if (i[1].check) {
        setSelectedCategoty((prev) => [...prev, i[1].id]);
      } else {
        setSelectedCategoty((prev) => prev.filter((f, index) => f != i[1].id));
      }
    });
    // setcategory((prev) => [...category]);
  };

  const handleCheckbox2 = (item, index, check) => {
    Object.entries(item).map((i) => {
      if (check.check) {
        i[1].check = check.check;
      } else {
        item.chil1.check = check.check;
        item.chil1.children.map((ch) => {
          ch.check = false;
        });
      }

      if (i[1].check) {
        setSelectedCategoty((prev) => [...prev, i[1].id]);
      } else {
        setSelectedCategoty((prev) => prev.filter((f, index) => f != i[1].id));
        setSelectedCategoty((prev) =>
          prev.filter(
            (f, index) => f != item.chil1.children.map((item) => item.id)
          )
        );
      }
    });

    // setcategory((prev) => [...category]);
  };
  const handleCheckbox3 = (item, index, check) => {
    console.log("Svdbsdbsdbsdbsvsdvsd", item);
    if (check.check) {
      Object.entries(item).map((i) => {
        i[1].check = check.check;

        if (i[1].check) {
          setSelectedCategoty((prev) => [...prev, i[1].id]);
        } else {
          setSelectedCategoty((prev) =>
            prev.filter((f, index) => f != i[1].id)
          );
        }
      });
    } else {
      console.log("Sdvsqwdqwdqwdqwdqwdvsdv");
      item.chil2.check = false;
      setSelectedCategoty((prev) =>
        prev.filter((f, index) => f != item.chil2.id)
      );
    }
    // setcategory((prev) => [...category]);
  };

  useEffect(() => {}, [category]);

  const checkedData = (cat) => {
    ids.map((cat_id) => {
      cat.map((item) => {
        item.id == cat_id ? (item.check = true) : false;
        item?.children?.map((chil1) => {
          chil1.id == cat_id ? (chil1.check = true) : false;
          chil1?.children?.map((chil2) => {
            chil2.id == cat_id ? (chil2.check = true) : false;
          });
        });
      });
    });
  };

  return (
    <div
      ref={ref}
      className={`w-full bg-white rounded-lg p-4 flex flex-col font-Kalameh
      text-black  placeholder:text-[#C4C7C7] transition-all ease-linear duration-200  z-40 cursor-pointer
       h-full`}
      onClick={(e) => setopenSelectOption(true)}
    >
      {" "}
      <div className="w-full flex flex-row justify-between">
        <p
          className={`${
            openSelectOption ? "font-bold cursor-text text-[#003E43]" : ""
          }`}
        >
          {" "}
          {/* {selectedCategory?.name} */}
          {names.map((item) => (
            <>
              {item} {" , "}
            </>
          ))}
        </p>{" "}
      </div>
      <div
        className={`mt-3 hide-scrollbar flex-col text-[#222427] font-Kalameh  overflow-y-scroll 
          flex
        `}
      >
        {category.map((item, index) => (
          <div className="border-r-2 border-primary px-3 ">
            <div
              // className={`${child ? "mx-3 border-r-2  border-primary p-3" : ""}`}
              className={`${
                false ? "mx-3 border-r-2  border-primary p-3" : ""
              }`}
            >
              <div className="flex items-center space-x-2 space-x-reverse flex-row h-4 ">
                <input
                  value={item?.check}
                  checked={item?.check}
                  type="checkbox"
                  onClick={(e) =>
                    handleCheckbox({ item }, index, {
                      check: e.target.checked,
                      level: 1,
                    })
                  }
                />
                <p
                  name="parent_id"
                  // onClick={(e) => handleSelectCategory(item)}
                  className={`hover:text-primary cursor-pointer `}
                >
                  {item.name}
                </p>
              </div>
              {item?.children &&
                item?.children.map((chil1) => (
                  <div
                    className={`${
                      true ? "mx-3 border-r-2  border-primary p-3" : ""
                    }`}
                  >
                    <div className="flex items-center space-x-2 space-x-reverse flex-row">
                      <input
                        checked={chil1.check}
                        type="checkbox"
                        // onClick={(e) => handleCheckClick(item, chil1, chil2)}
                        onClick={(e) =>
                          handleCheckbox2({ item, chil1 }, index, {
                            check: e.target.checked,
                            level: 2,
                          })
                        }
                      />
                      <p
                        name="parent_id"
                        // onClick={(e) => handleSelectCategory(item)}
                        className={`hover:text-primary cursor-pointer `}
                      >
                        {chil1.name}
                      </p>
                    </div>
                    {chil1?.children &&
                      chil1?.children.map((chil2) => (
                        <div
                          className={`${
                            true ? "mx-3 border-r-2  border-primary p-3" : ""
                          }`}
                        >
                          <div className="flex items-center space-x-2 space-x-reverse flex-row">
                            <input
                              checked={chil2.check}
                              type="checkbox"
                              // onClick={(e)=> handleCheckClick(item,chil1,chil2)}
                              onClick={(e) =>
                                handleCheckbox3({ item, chil1, chil2 }, index, {
                                  check: e.target.checked,
                                  level: 3,
                                })
                              }
                            />
                            <p
                              name="parent_id"
                              //   onClick={(e) => handleSelectCategory(item)}
                              className={`hover:text-primary cursor-pointer `}
                            >
                              {chil2.name}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
            </div>
            {/* <SelectItemElement
              checked={(e) => checked(e)}
              setCategoryTitle={setSelectedCategoty}
              item={item}
              parent={item}
              chil1={null}
              chil2={null}
            /> */}
          </div>
        ))}
      </div>
      {/* <div className="w-full h-64 bg-white absolute top-14 left-1 border-primary border-2  rounded-lg p-4">
        dslvkdslkvklds
      </div> */}
    </div>
  );
}

export default SelectCategory;
