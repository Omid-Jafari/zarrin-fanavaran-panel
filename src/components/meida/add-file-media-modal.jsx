import React, { useState } from "react";
import UploadImageModal from "./upload-image-modal";

function AddFileMediaModal(path) {
  const onUpload = () => {
    onUploadImage();
    console.log(onUploadImage);
  };
  return (
    <div>
      <UploadImageModal path={path} onUpload={onUpload} />
    </div>
  );
}

export default AddFileMediaModal;
