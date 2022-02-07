import React from "react";
import { BASE_IMG_URL } from "../services/Request";
import { useNavigate } from "react-router-dom";
import "./MovieCard.css";
import { useDispatch } from "react-redux";
import {
  getMediaType,
  getVideo,
  getMovieId,
} from "../features/movieRow/movieRowSlice";
const TvCard = ({ tv, isOriginals, type, tvs, movieId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDetailed = (tv) => {
    navigate(`/play`);
    dispatch(getMediaType(type));
    dispatch(getVideo(tv));
    dispatch(getMovieId(movieId));
  };
  console.log("tvs:  ", tvs);
  console.log("tv:  ", tv);
  return (
    <div
      className={`movieCard__poster ${
        isOriginals ? "movieCard__poster__originals" : ""
      }`}
      onClick={() => handleDetailed(tv)}
    >
      {tv && (
        <img
          src={`${BASE_IMG_URL}${
            tv?.still_path || tv?.backdrop_path || tvs?.poster_path
          }`}
          alt={tv?.name}
        />
      )}
    </div>
  );
};

export default TvCard;
