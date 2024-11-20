import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { createFolder } from "../../api/ApiClient";

function AddFolderMediaModal({ show, hide }) {
  const [path, setpath] = useState();
  const query=useQueryClient()
  const addFolderMutation = useMutation((path) => createFolder(path), {
    onSuccess: (res) => {
        console.log("sbsbsdbdfbs");
        handleCreateFolder()

    },
  });

  const handleCreateFolder=()=>{
    query.invalidateQueries("filesQuery")
  }
  return (
    <div>
      <span onClick={()=>addFolderMutation.mutate(path)} className="cursor-pointer">افزودن</span>
      <input
        onChange={(e) => setpath(e.target.value)}
        className="border-2 mx-4"
        placeholder="اسم فولدر"
      />
    </div>
  );
}

export default AddFolderMediaModal;
