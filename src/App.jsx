import { useReducer, useState } from "react";
import { Toaster } from "react-hot-toast";
import { getPermission, loginUser } from "./api/ApiClient";
import AdminHeader from "./components/main-conponents/admin-header";
import Media from "./pages/media/media";
import Sidebar from "./components/main-conponents/sidebar";
import UserContext from "./context/UserContext";
import UserReducer from "./context/UserReducer";
import RouteSystem from "./routers/RouteSystem";
import { useQuery } from "@tanstack/react-query";

function App() {
  const [state, dispatch] = useReducer(UserReducer, {
    isLogin: false,
    user: null,
  });

 
  return (
    <>
    <div className="flex flex-row w-full h-full lg:hidden justify-center items-start text-3xl text-black font-Kalameh">
      برای استفاده از این اپلیکیشن باید صفحه نمایش بزرگ تر از1024px استفاده کنید
    </div>
    <div className="hidden lg:block">
      <UserContext.Provider
        value={{
          isLogin:  localStorage.getItem("login"),
          user:   JSON.parse(localStorage.getItem("userData")),
          dispatch,
        }}
      >
        <RouteSystem />
        <Toaster />
      </UserContext.Provider>
    </div>
    </>
  );
}

export default App;
