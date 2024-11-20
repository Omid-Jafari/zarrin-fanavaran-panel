import React, { useContext, useReducer } from "react";
import AddProductReducer from "../../../context/product/AddProducReducer";
import AddProductContext from "../../../context/product/AddProductContext";
import AddProduct from "./AddProduct";

function AddProductContainer() {
  const iniBooleanDefaults = {
    blog_relatable: 1,
    commentable: 1,
    in_stock_notificationable: 1,
    wishlistable: 1,
    product_related_type: "SEMI_AUTO",
    blog_related_type: "SEMI_AUTO",
    shipping_type: "MOTOR_DELIVERY",
    relatable: 1,
  };

  const [state, dispatch] = useReducer(AddProductReducer, {
    step: 1,
    productData: { ...iniBooleanDefaults },
  });

  return (
    <AddProductContext.Provider
      value={{
        step: state.step,
        productData: state.productData,
        dispatch,
      }}
    >
      <AddProduct />
    </AddProductContext.Provider>
  );
}

export default AddProductContainer;
