import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { allCategory } from "../../api/ApiClient";
import { useOnClickOutside } from "../../utils/OutSideClick";
import CategoryElement from "./category-element";
import SelectItemElement from "./select-item-element";

function BrandSelectBox({ formik }) {
  const [openSelectOption, setopenSelectOption] = useState(false);
  const [category, setcategory] = useState([]);
  const ref=useRef(null)
  const [names, setnames] = useState([])

  const [selectedCategory, setSelectedCategoty] = useState(
    formik.values?.parent_id
  );
  const allCategoryquery = useMutation(async () => allCategory(""), {
    onSuccess: (res) => {
      setcategory(res.data?.data);
    },
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    allCategoryquery.mutate();
  }, []);

  // useEffect(() => {
  //   console.log("asascasvassav",formik.values.category_ids);
  //   let fff = [...category];

  //   formik.values.category_ids&& formik.values.category_ids?.map(item=>
      
  //   fff.map((pr, pin) => {
  //    pr.id==item?pr.check =true:''
     
  //   })
  //   )
  //   // console.log("bsdbsdbsdbsdb",fff);
  //     setcategory(fff);
  //     // filterTruData(fff);
  // }, [formik.values.category_ids])
  

  useEffect(() => {
    selectedCategory?.id
      ? formik.values.category_ids.push(selectedCategory?.id)
      : "";
  }, [selectedCategory]);

  const checked = (itemm) => {
    //v1 parrent map
    // const ll=category.map(item=>item).filter((itemf)=>itemf==itemm.parent?itemf.check=!itemf.check:itemf.check);

    let fff = [...category];

    fff.map((pr, pin) => {
      if (pr == itemm.parent && itemm.chil1 == undefined) {
        pr.check = !pr.check;
      }
      pr?.children.map((res, n) => {
        if (res == itemm.chil1 && itemm.chil2 == undefined) {
          res.check = !res.check;
          if (res.check) pr.check = true;
        }
        res?.children?.map((resx, n2) => {
          if (resx == itemm.chil2) {
            resx.check = !resx.check;
            if (resx.check) {
              pr.check = true;
              res.check = true;
            }
          }
        });
      });
    });
    setcategory(fff);
    filterTruData(fff);
  };
  useEffect(() => {}, [category]);

  const filterTruData = (category) => {
    let ids = [];
    let namess = [];
    // setnames([])
    category.map((item1) => {
      if (item1.check){

        ids.push(item1.id);
        namess.push(item1.name);
        // setnames([...names,item1.name])
      } 

      item1?.children.map((item2) => {
        if (item2.check){

          ids.push(item2.id);
          namess.push(item2.name);
          // setnames([...names,item2.name])
        } 
        item2?.children.map((item3) => {
          if (item3.check){

            ids.push(item3.id);
            namess.push(item3.name);
            // setnames([...names,item3.name])
          }
        });
      });
    });
    console.log("dbdxsbsbsd",namess);
    setnames(namess)
    formik.values.category_ids=ids
  };

  useOnClickOutside(ref, () => setopenSelectOption(false));
console.log("asvasvasva",category);
  return (
    <div
    ref={ref}
      className={`w-full bg-white rounded-lg p-4 flex flex-col font-Kalameh
      text-black placeholder:text-[#C4C7C7] transition-all ease-linear duration-200 absolute z-40 cursor-pointer
     ${openSelectOption ? " h-80  border-primary border-2" : "h-[55px]"} `}
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
          {names.map(item=><>{item} {" , "}</> )}
        </p>{" "}
        <svg
          width="24"
          height="25"
          className={` ${
            openSelectOption ? "rotate-180" : "rotate-0"
          } transition-all ease-linear duration-200`}
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.9202 8.67969H11.6902H6.08024C5.12024 8.67969 4.64024 9.83969 5.32024 10.5197L10.5002 15.6997C11.3302 16.5297 12.6802 16.5297 13.5102 15.6997L15.4802 13.7297L18.6902 10.5197C19.3602 9.83969 18.8802 8.67969 17.9202 8.67969Z"
            fill="#222427"
          />
        </svg>
      </div>
      <div
        className={`mt-3  flex-col text-[#222427] font-Kalameh  overflow-y-scroll  ${
          openSelectOption ? "flex" : "hidden"
        }`}
      >
        <p
          onClick={(e) => setSelectedCategoty({ name: "دسته مادر", id: "0" })}
          className="font-bold text-[#003E43] cursor-pointer"
        >
          دسته مادر
        </p>
        {category.map((item) => (
          <div className="border-r-2 border-primary px-3">
            <SelectItemElement
              checked={(e) => checked(e)}
              setCategoryTitle={setSelectedCategoty}
              item={item}
              parent={item}
              chil1={null}
              chil2={null}
            />
          </div>
        ))}
      </div>
      {/* <div className="w-full h-64 bg-white absolute top-14 left-1 border-primary border-2  rounded-lg p-4">
        dslvkdslkvklds
      </div> */}
    </div>
  );
}

export default BrandSelectBox;
