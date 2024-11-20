import { useQuery } from "@tanstack/react-query";
import React, { useContext, useReducer } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getSingleProduct } from "../../../api/ApiClient";
import AddProductReducer from "../../../context/product/AddProducReducer";
import AddProductContext from "../../../context/product/AddProductContext";
import AddProduct from "./AddProduct";

function EditProductContainer() {
  const [state, dispatch] = useReducer(AddProductReducer, {
    step: 1,
    productData: {},
  });

  
  const handleAddData=(data)=>{
 
    dispatch({
      type: "ADD",
      productData: data,
    });
  
  }
  const param=useParams()
console.log("dsdbbsdbs",param);
  const getSingleProductQuery=useQuery(["getSingleProductQuery"],()=>getSingleProduct(param?.id),{
    onSuccess:(res)=>{
      reformatData(res?.data?.data)
      console.log("vsdbsdbsdb",res?.data?.data );
    },
    refetchOnWindowFocus:false
  })
  const reformatData=(data)=>{
    
       data.brand_id=data?.brand

data.attrebiutes=data.attributes

data.attrebiutes.map(r=>{
  r.attrData=r.attribute
  r.attrData.options=r?.options
})

data.features
data.feature_ids=data.features?.map(item=>item?.id)

let siders={
  outsource:[],
  insource:[]
}
console.log("Svassdbsdbsdsdb",data?.sidebars);
data?.sidebars?.map(item=>{
  if(item?.type=="OUTSOURCE_BLOG"){
    item.source="outsource"
    item.typeInEdit="BLOG"
    siders.outsource.push(item)
  }if(item?.type=="OUTSOURCE_VIDEO"){
    item.typeInEdit="VIDEO"
    item.source="outsource"
    siders.outsource.push(item)
  } if(item?.type=="VIDEO"){
    item.typeInEdit="VIDEO"
    item.source="insource"
    siders.insource.push(item)
  }if(item?.type=="BLOG"){
    item.typeInEdit="BLOG"
    item.source="insource"
    siders.insource.push(item)
  }
})
data.sidebars=siders
// data?.attributes?.attribute?.map((r,index)=>data.attrebiutes.attrData[index]=r)
console.log("SDvsdvsdvsdvsdv",data);
    handleAddData(data)
  }
  console.log("dsvdsvdvdsv", state.productData);
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

export default EditProductContainer;
