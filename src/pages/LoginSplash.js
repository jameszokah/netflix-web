import React, { useEffect, useRef } from "react";
import "./LoginSplash.css";
import { useNavigate } from "react-router-dom";
import NetflixTaDrum from "../sounds/netflix_TaDum.mp3";

const LoginSplash = () => {
  const navigate = useNavigate();
  const soundRef = useRef(null);
  const handleTadrum = () => {
    soundRef.current.currentTime = 0;
    soundRef.current.play();
  };

  useEffect(() => {
    handleTadrum();
    setTimeout(() => {
      navigate("/profile");
    }, 4200);
  }, [navigate]);
  return (
    <>
      <audio ref={soundRef} src={NetflixTaDrum} />
      <section className="loginSplash">
        <div className="logo">
          <div className="uno"></div>
          <div className="due"></div>
          <div className="tre"></div>
        </div>
      </section>
    </>
  );
};

export default LoginSplash;
