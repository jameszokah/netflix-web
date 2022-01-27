import React from "react";
import "./HomeLayout.css";
import NetflixLogo1 from "../img/NetflixLogo1.svg";
import { useNavigate } from "react-router-dom";

const HomeLayout = ({ children, loginPage }) => {
  const navigate = useNavigate();
  const signIn = () => {
    navigate("/login");
  };
  return (
    <div className="homeLayout">
      <div className="homeLayout__bg">
        <img
          src={NetflixLogo1}
          className="homeLayout__logo"
          alt="netflix-logo"
          onClick={() => navigate("/")}
        />

        {loginPage ? (
          <></>
        ) : (
          <button className="homeLayout__login__btn" onClick={() => signIn()}>
            Sign In
          </button>
        )}
        <div className="homeLayout__gradient"></div>
      </div>
      <div className="homeLayout__body">
        <>{children}</>
      </div>
    </div>
  );
};

export default HomeLayout;
