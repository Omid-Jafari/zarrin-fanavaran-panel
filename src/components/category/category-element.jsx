import React from "react";
import toast from "react-hot-toast";

function CategoryElement({ item, child = false, setCategoryTitle }) {
  const handleSelectCategory = (item) => {
    if (item.level == 3) {
      toast.error("زیر شاخه ها نمیتواند زیرمجموعه داشته باشند");
    } else {
      setCategoryTitle(item);
    }
  };
  return (
    <div className={`${child ? "mx-3 border-r-2  border-primary p-3" : ""}`}>
      <p
        name="parent_id"
        onClick={(e) => handleSelectCategory(item)}
        className={`hover:text-primary cursor-pointer `}
      >
        {item.name}
      </p>
      {item?.children &&
        item?.children.map((item) => (
          <CategoryElement
            setCategoryTitle={setCategoryTitle}
            child={true}
            item={item}
          />
        ))}
    </div>
  );
}

export default CategoryElement;
