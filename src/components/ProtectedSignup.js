import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedSignup = ({ children, path }) => {
  const isEmail = useSelector((state) => state.auth.isEmail);
  return isEmail ? children : <Navigate to={path} />;
};

export default ProtectedSignup;
