import React, { Suspense } from "react";
import { useQuery } from "react-query";
import LazyLoad from "react-lazyload";
import netflix from "../services/apiConfig";
import NetflixSpinner from "./NetflixSpinner";
import { useMediaQuery } from "react-responsive";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation } from "swiper";

import "./MovieRow.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
const TvCard = React.lazy(() => import("./TvCard"));

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

const TvSeasonRow = ({ title, fetchUrl, type, isOriginals, movieId }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const { data: movies } = useQuery(["getTvRow", fetchUrl], async () => {
    const res = await netflix.get(`${fetchUrl}`);

    return res?.data;
  });

  console.log(movies);

  return (
    <div className="movieRow">
      <Suspense fallback={<NetflixSpinner />}>
        <h2>{movies && movies?.name}</h2>

        <div className="movieRow__content">
          {isTabletOrMobile ? (
            movies &&
            movies?.episodes?.map((movie) => (
              <LazyLoad height={200} key={movie?.id} scroll>
                <TvCard
                  tv={movie}
                  isOriginals={isOriginals}
                  type={type === "all" ? movie?.media_type : type}
                  tvs={movies}
                  movieId={movieId}
                />
              </LazyLoad>
            ))
          ) : (
            <Swiper
              slidesPerView={isOriginals ? 6 : 5}
              spaceBetween={20}
              // slidesPerGroup={3}
              // loop={true}
              loopFillGroupWithBlank={true}
              // pagination={{
              //   clickable: true,
              // }}
              navigation={true}
              className="mySwiper"
            >
              {movies &&
                movies?.episodes?.map((movie) => (
                  <SwiperSlide>
                    <LazyLoad height={200} key={movie?.id} scroll>
                      <TvCard
                        tv={movie}
                        isOriginals={isOriginals}
                        type={type === "all" ? movie?.media_type : type}
                        tvs={movies}
                        movieId={movieId}
                      />
                    </LazyLoad>
                  </SwiperSlide>
                ))}
            </Swiper>
          )}
        </div>
      </Suspense>
    </div>
  );
};

export default TvSeasonRow;
