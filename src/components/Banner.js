import React, { useEffect } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import useShortenTitle from "../utils/useShortenTitle";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Banner.css";
import { getBanner } from "../features/banner/bannerSlice";
import { BASE_IMG_URL } from "../services/Request";
import NetflixLogo0 from "../img/netflix_logo0.png";
import { getMediaType } from "../features/movieRow/movieRowSlice";

const Banner = ({ poster, title, description }) => {
  const { shortTitle } = useShortenTitle();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const banner = useSelector((state) => state.banner.banner);
  const mediaType = banner?.media_type;
  useEffect(() => {
    dispatch(getBanner());
  }, [dispatch]);

  const viewDetailed = (e) => {
    e.preventDefault();
    navigate(`/watch/${banner?.id}`, { replace: true });
    dispatch(getMediaType(mediaType));
  };

  console.log(banner);
  console.log(banner?.media_type);
  console.log(process.env);

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage:
          banner?.backdrop_path &&
          `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2)), url(${BASE_IMG_URL}${banner?.backdrop_path})`,
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="banner__content">
        <div className="banner__series__type">
          {mediaType === "tv" ? (
            <>
              <img src={NetflixLogo0} alt="netflix-series" />
              <h2>SERIES</h2>
            </>
          ) : (
            ""
          )}
        </div>
        <h1 className="banner__title">
          {mediaType === "tv"
            ? banner?.name || banner?.original_name
            : banner?.title || banner?.original_title}
        </h1>
        {banner && (
          <div className="banner__info">
            <p className="banner__match">Match</p>
            <p className="banner__releaseYear">
              {banner && mediaType === "tv"
                ? banner?.first_air_date &&
                  new Date(banner?.first_air_date).getFullYear()
                : banner?.release_date &&
                  new Date(banner?.release_date).getFullYear()}
            </p>

            {banner && (
              <>
                <p className="banner__HD">HD</p>
                {banner?.vote_average && (
                  <p className="banner__averageVote">{banner?.vote_average}</p>
                )}
              </>
            )}
          </div>
        )}
        <div className="banner__buttons">
          <button
            className="banner__button banner__button__play"
            onClick={(e) => viewDetailed(e)}
          >
            <span>
              <BsFillPlayFill size="1.2rem" />
            </span>
            Play
          </button>
          <button className="banner__button">More Info</button>
        </div>
        <div className="banner__description">
          <h2>{shortTitle(banner?.overview, 100)}</h2>
        </div>
      </div>
      <div className="banner__fadeBottom"></div>
      <div className="banner__fadeLeft"></div>
    </header>
  );
};

export default Banner;
