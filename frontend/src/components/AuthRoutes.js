import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function AuthRoutes() {
  let location = useLocation();
  const { userInfo } = useContext(UserContext);

  const username = userInfo?.username;
  console.log(username);
  if (!username) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return <Outlet />;
}

export default AuthRoutes;
