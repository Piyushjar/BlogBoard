import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function AuthRoutes() {
  let location = useLocation();
  const isAuth = localStorage.getItem("isAuthenticated");
  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return <Outlet />;
}

export default AuthRoutes;
