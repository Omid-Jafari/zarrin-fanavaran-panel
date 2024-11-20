import toast from "react-hot-toast";

export const CopyIem = (item) => {
  navigator.clipboard
    .writeText(item)
    .then((res) => toast.success("با موفقیت کپی شد"));
};
