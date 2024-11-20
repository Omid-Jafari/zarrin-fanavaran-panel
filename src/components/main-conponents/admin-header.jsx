import { useMutation } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { logOutUser } from "../../api/ApiClient";
import UserContext from "../../context/UserContext";
import Loading from "../elements/loading";

function AdminHeader() {
  const navigate = useNavigate();
  const { isLogin, dispatch, user } = useContext(UserContext);
  console.log("user", user);

  const logOutMutation = useMutation((values) => logOutUser(), {
    onSuccess: (res) => {
      handleLogOut();
    },
  });
  const handleLogOut = () => {
    dispatch({
      type: "LOGOUT",
      user: null,
      isLogin: false,
    });
    localStorage.removeItem("userData");
    localStorage.removeItem("login");
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };
  return (
    <>
      <div className="w-full flex justify-between items-center bg-blacklead py-2 px-5 ">
        <div className="flex cursor-pointer bg-white px-5 group transition-colors duration-500 hover:bg-cyann items-center h-[51px] rounded-[4px] font-Kalameh text-lg min-w-[250px]">
          <div className="w-[35px] h-[35px] p-0.5 bg-blacklead rounded-full ml-3 flex items-center justify-center">
            <img
              src={user?.media?.avatar?.file}
              className="w-full h-full"
              alt=""
            />
          </div>
          <h4 className="group-hover:text-white transition-colors duration-500">
            {user?.full_name}
          </h4>
        </div>

        <div
          onClick={() => logOutMutation.mutate()}
          className="flex  cursor-pointer bg-white px-5 items-center h-11 group transition-colors duration-500 hover:bg-cyann rounded-[4px] font-KalamehMed font-medium"
        >
          {logOutMutation?.isLoading ? (
            <Loading className="w-14 h-14 text-blacklead animate-pulse" />
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="25"
                fill="none"
                viewBox="0 0 24 25"
                className="fill-[#222427] group-hover:fill-white transition-colors duration-500"
              >
                <path d="M17.44 15.87c-.19 0-.38-.07-.53-.22a.754.754 0 010-1.06l2.03-2.03-2.03-2.03a.754.754 0 010-1.06c.29-.29.77-.29 1.06 0l2.56 2.56c.29.29.29.77 0 1.06l-2.56 2.56c-.15.15-.34.22-.53.22z"></path>
                <path d="M19.93 13.31H9.76c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h10.17c.41 0 .75.34.75.75s-.34.75-.75.75z"></path>
                <path d="M11.76 21.25c-5.15 0-8.75-3.6-8.75-8.75s3.6-8.75 8.75-8.75c.41 0 .75.34.75.75s-.34.75-.75.75c-4.27 0-7.25 2.98-7.25 7.25s2.98 7.25 7.25 7.25c.41 0 .75.34.75.75s-.34.75-.75.75z"></path>
              </svg>

              <button className="mr-1 group-hover:text-white transition-colors duration-500">
                خروج
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminHeader;
