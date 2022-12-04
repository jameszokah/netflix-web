import React, { useState } from "react";
import IframeResizer from "iframe-resizer-react";
import "./PlayPage.css";
import { useSelector } from "react-redux";
import NetflixSpinner from "../components/NetflixSpinner";
import PlayAnimationPage from "./PlayAnimationPage";

const PlayPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [playIntro, setPlayIntro] = useState(true);

  const { video, mediaType, movieId } = useSelector((state) => state.movieRow);

  document.title = video?.title || "playing";

  const videoLink =
    mediaType === "movie"
      ? `https://netflix-player.000webhostapp.com/se_player.php?video_id=${video?.id}&tmdb=1`
      : `https://netflix-player.000webhostapp.com/se_player.php?video_id=${movieId}&tmdb=1&s=${
          video?.season_number ? video?.season_number : 1
        }&e=${video?.episode_number ? video?.episode_number : 1}`;
  return (
    <>
      {playIntro ? (
        <PlayAnimationPage setPlayIntro={setPlayIntro} />
      ) : (
        <div className="playPage">
          {isLoading ? <NetflixSpinner /> : null}
          <IframeResizer
            src={videoLink}
            title=""
            frameBorder="0"
            allowFullScreen
            style={{
              width: "100vw",
              minWidth: "100vw",
              height: "100vh",
              maxHeight: "100vh",
              boxSizing: "border-box",
              border: "none",
              borderTop: "none",
              overflow: "hidden",
            }}
            marginHeight="0"
            marginWidth="0"
            autoResize
            loading="lazy"
            onLoad={() => setIsLoading(false)}
            scrolling={false}
          />
        </div>
      )}
    </>
  );
};

export default PlayPage;
