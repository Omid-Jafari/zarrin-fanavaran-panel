import React, { useEffect } from "react";
import toast from "react-hot-toast";

function SelectItemElement({ item, child = false, setCategoryTitle ,checked,parent,chil1=null,chil2=null}) {
   
  const handleSelectCategory = (item) => {
    if (item.level == 3) {
      toast.error("زیر شاخه ها نمیتواند زیرمجموعه داشته باشند");
    } else {
      setCategoryTitle(item);
    }
  };

  useEffect(() => {
  }, [item])
  

  const handleCheckClick=(item,chil1,chil2)=>{
    checked({parent,chil1,chil2})
}
  return (
    <div className={`${child ? "mx-3 border-r-2  border-primary p-3" : ""}`}>
      <div className="flex items-center space-x-2 space-x-reverse flex-row">
      <input checked={item.check?true:false} type="checkbox" onClick={(e)=> handleCheckClick(item,chil1,chil2)}/>
      <p
        name="parent_id"
        onClick={(e) => handleSelectCategory(item)}
        className={`hover:text-primary cursor-pointer `}
      >
        {item.name}
      </p>
      </div>
      {item?.children &&
        item?.children.map((item) => (
          <SelectItemElement
            setCategoryTitle={setCategoryTitle}
            child={true}
            item={item}
            checked={checked}
            parent={parent}
            chil1={item.level==2?item:chil1}
            chil2={item.level==3?item:null}
          />
        ))}
    </div>
  );
}

export default SelectItemElement;
