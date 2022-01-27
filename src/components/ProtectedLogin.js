import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedLogin = ({ children, path }) => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const location = useLocation();
  return isAuth ? (
    <Navigate to={path} state={{ from: location }} replace />
  ) : (
    children
  );
};

export default ProtectedLogin;
