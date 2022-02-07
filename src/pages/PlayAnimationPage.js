import { useEffect, useRef } from "react";
import NetflixTaDrum from "../sounds/netflix_TaDum.mp3";
import "./PlayAnimationPage.css";

const PlayAnimationPage = ({ setPlayIntro }) => {
  const soundRef = useRef(null);
  const handleTadrum = () => {
    soundRef.current.currentTime = 0;
    soundRef.current.play();
  };

  useEffect(() => {
    handleTadrum();
    setTimeout(() => {
      setPlayIntro(false);
    }, 4600);
  }, [setPlayIntro]);

  return (
    <>
      <audio ref={soundRef} src={NetflixTaDrum} />
      <div className="playAnimation">
        <div className="netflixLogo">
          <span>N </span>
          <span>E </span>
          <span>T</span>
          <span>F</span>
          <span>L</span>
          <span>I</span>
          <span>X</span>
        </div>
      </div>
    </>
  );
};

export default PlayAnimationPage;
