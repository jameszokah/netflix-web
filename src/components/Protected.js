import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const Protected = ({ children, path }) => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const location = useLocation();
  console.log(isAuth);
  return isAuth ? (
    children
  ) : (
    <Navigate to={path} state={{ from: location }} replace />
  );
};

export default Protected;
