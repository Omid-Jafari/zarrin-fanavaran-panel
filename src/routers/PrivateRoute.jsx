import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPermission } from "../api/ApiClient";
import AdminHeader from "../components/main-conponents/admin-header";
import Sidebar from "../components/main-conponents/sidebar";
import UserContext from "../context/UserContext";
import NoPermissionPage from "../pages/auth/NoPermissionPage";

function PrivateRoute({ children, path }) {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  const [permissions, setPermissions] = useState([])
  const getPermissionQuery=useQuery(["getPermissionQuery"],()=>getPermission(),{
    onSuccess:(res)=>{
     Object.entries(res.data?.data).map(item=>{
        item[1].map(permission=>{
          console.log("Sdvsdvascascsdvsd",permission?.key);
          permissions.push(permission?.key)
        })

      });  
    },refetchOnMount:false,
    refetchOnWindowFocus:false
  })
  useEffect(() => {
    if (!user?.isLogin || user?.user == null) {
      navigate("/login", { replace: true });
    }
  }, []);
 
  let minHeight = window?.innerHeight - 68;
  return (
    <>
      <div className="min-h-screen w-full">
        <AdminHeader />
        <div className="flex h-full w-full" style={{ minHeight: minHeight }}>
          <div className="bg-blacklead">
            <Sidebar />
          </div>
          {
            // permissions.includes(path)?
          <div className="flex-1">{user?.isLogin != null ? children : ""}</div>
          // :<div className="flex-1">
          //   <NoPermissionPage/>
          //   </div>
          }
        </div>
      </div>
    </>
  );
}

export default PrivateRoute;
