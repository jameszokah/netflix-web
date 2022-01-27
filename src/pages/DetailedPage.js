import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { hasAuth } from "../features/auth/authSlice";
import { login } from "../features/user/userSlice";
import { getVideo, getMovieId } from "../features/movieRow/movieRowSlice";
import netflix from "../services/apiConfig";
import { auth, db } from "../services/firebase";
import requests, { BASE_IMG_URL } from "../services/Request";
import NetflixSpinner from "../components/NetflixSpinner";
import NetflixLogo0 from "../img/netflix_logo0.png";
import MovieRow from "../components/MovieRow";
import { BsFillPlayFill } from "react-icons/bs";
import "./DetailedPage.css";
import TvSeasonRow from "../components/TvSeasonRow";
import useShortenTitle from "../utils/useShortenTitle";
import Footer from "../components/Footer";

const DetailedPage = () => {
  const [showMore, setShowMore] = useState(false);
  const { shortTitle } = useShortenTitle();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mediaType } = useSelector((state) => state.movieRow);
  const collectionUserRef = collection(db, "users");
  const { movieId } = useParams();

  const { data: movie, loading } = useQuery(
    ["detailedMovie", movieId],
    async () => {
      const resp = await netflix.get(
        `/${mediaType}/${movieId}${requests.fetchEachMovie}`
      );
      return resp?.data;
    }
  );

  // console.log(movie);
  console.log(mediaType);

  const play = (movie) => {
    navigate("/player", { replace: true });
    dispatch(getVideo(movie));
    dispatch(getMovieId(movie?.id));
  };

  useEffect(() => {}, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const dbUsers = await getDocs(collectionUserRef);

        const dbUserList = dbUsers.docs.map((doc) => doc.data());
        const dbUser = dbUserList.find((data) => data?.uid === user?.uid);
        console.log(dbUser);
        dispatch(login({ uid: user.uid, email: user.email, ...dbUser }));
        dispatch(hasAuth(true));
      } else {
        dispatch(hasAuth(false));
      }
      console.log(user);
    });

    return unsubscribe;
  }, [dispatch, collectionUserRef]);
  if (loading) {
    return <NetflixSpinner />;
  }
  return (
    <div className="detailedPage">
      <div className="detailedPage__headers">
        <header
          className="detailedPage__header"
          style={{
            backgroundSize: "cover",
            backgroundImage:
              movie?.backdrop_path &&
              `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2)), url(${BASE_IMG_URL}${movie?.backdrop_path})`,
            backgroundPosition: "top center",
            backgroundRepeat: "no-repeat",
          }}
        ></header>
        <div className="detailedPage__fadeBottom"></div>
        <div className="detailedPage__fadeLeft">
          <div className="detailedPage__header__content">
            <div className="detailedPage__series__type">
              {mediaType === "tv" ? (
                <>
                  <img src={NetflixLogo0} alt="netflix-series" />
                  <h2>SERIES</h2>
                </>
              ) : (
                ""
              )}
            </div>
            <h1 className="detailedPage__title">
              {mediaType === "tv"
                ? movie?.name || movie?.original_name
                : movie?.title || movie?.original_title}
            </h1>
            {movie && (
              <div className="detailedPage__info">
                <p className="detailedPage__releaseYear">
                  {mediaType === "tv"
                    ? new Date(movie?.first_air_date).getFullYear()
                    : new Date(movie?.release_date).getFullYear()}
                </p>

                {mediaType === "tv" ? (
                  <p className="detailedPage__tv__ma">TV-MA</p>
                ) : (
                  ""
                )}
                <p className="detailedPage__info__seasons">
                  {mediaType === "tv"
                    ? movie?.number_of_seasons === 1
                      ? `${movie?.number_of_seasons} season`
                      : `${movie?.number_of_seasons} seasons`
                    : ""}
                </p>
                <p className="detailedPage__HD">HD</p>
                <p className="detailedPage__averageVote">
                  {movie?.vote_average}
                </p>
              </div>
            )}
            <div className="detailedPage__buttons">
              <button
                className="detailedPage__button detailedPage__button__play"
                onClick={(e) => play(movie)}
              >
                <span>
                  <BsFillPlayFill size="1.4rem" />
                </span>
                Play from begining
              </button>
              {/* <button className="detailedPage__button detailedPage__button__add">
              <span>
                <GrAdd size="1.25rem" color="grey" />
              </span>{" "}
              List
            </button> */}
            </div>
            <div className="detailedPage__description">
              <p>
                {showMore ? movie?.overview : shortTitle(movie?.overview, 200)}
              </p>
              <h4
                style={{ cursor: "pointer" }}
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? "show less" : "show more"}
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div className="detailedPage__contents">
        {mediaType === "movie" ? (
          <MovieRow
            title="Similar Movies"
            fetchUrl={`movie/${movie?.id}${requests.fetchSimilarMovies}`}
            type={mediaType}
          />
        ) : (
          movie?.seasons &&
          movie?.seasons.map((season) => (
            <TvSeasonRow
              key={season?.id}
              title={season?.name}
              movieId={movieId}
              type={mediaType}
              fetchUrl={`tv/${movie?.id}/season/${season?.season_number}${requests.fetchSeasonSeries}`}
            />
          ))
        )}
      </div>
      <Footer />
    </div>
  );
};

export default DetailedPage;
