import React from "react";
import { BASE_IMG_URL } from "../services/Request";
import { useNavigate } from "react-router-dom";
import "./MovieCard.css";
import NetflixLogo0 from "../img/netflix_logo0.png";
import { useDispatch } from "react-redux";
import { getMediaType } from "../features/movieRow/movieRowSlice";
const MovieCard = ({ movie, isOriginals, type }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDetailed = (movie) => {
    navigate(`/watch/${movie?.id}`, { replace: false });
    dispatch(getMediaType(type));
  };
  return (
    <>
      {movie?.backdrop_path || movie?.poster_path ? (
        <div
          className={`movieCard__poster ${
            isOriginals ? "movieCard__poster__originals" : ""
          }`}
          onClick={() => handleDetailed(movie)}
        >
          <div className="movieCard__series__type">
            {type === "tv" ? (
              <>
                <img src={NetflixLogo0} alt="netflix-series" />
                <h2>SERIES</h2>
              </>
            ) : (
              ""
            )}
          </div>
          {movie?.backdrop_path || movie?.poster_path ? (
            <img
              src={`${BASE_IMG_URL}${
                movie?.backdrop_path || movie?.poster_path
              }`}
              alt={movie?.name}
            />
          ) : (
            ""
          )}
          <div className="movieCard__poster__title">
            <h3>{movie?.name || movie?.original_title || movie?.title}</h3>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default MovieCard;
