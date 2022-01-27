import React, { Suspense } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getMovieRow } from "../features/movieRow/movieRowSlice";
import { useInfiniteQuery } from "react-query";
import "./MovieRow.css";
import LazyLoad from "react-lazyload";
import netflix from "../services/apiConfig";
import NetflixSpinner from "./NetflixSpinner";
import { useMediaQuery } from "react-responsive";
import { Swiper, SwiperSlide } from "swiper/react";
// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation } from "swiper";
import InfiniteScroll from "react-infinite-scroll-component";

// Import Swiper styles
import "swiper/css";
// import "swiper/swiper.min.css";
import "swiper/css/pagination";
import "swiper/css/navigation";
const MovieCard = React.lazy(() => import("./MovieCard"));

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

const MovieRow = ({ title, isOriginals, fetchUrl, type }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  // const dispatch = useDispatch();
  // const movies = useSelector((state) => state.movieRow.movies);
  const {
    data: movies,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["getMovieRow", fetchUrl],
    async ({ pageParam = 1 }) => {
      const res = await netflix.get(`${fetchUrl}&page=${pageParam}`);

      return res?.data?.results;
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        const totalPages = lastPage.total_pages;
        const page = lastPage.page + 1;
        return page <= totalPages ? page : undefined;
      },
    }
  );

  // useEffect(() => {
  //   const onScroll = (e) => {
  //     let fetching = false;
  //     const { scrollWidth, scrollLeft, clientWidth } =
  //       e.target.scrollingElement;
  //     console.log(scrollWidth);
  //     if (scrollWidth - scrollLeft <= clientWidth) {
  //       fetching = true;

  //       fetching = false;
  //     }
  //   };
  //   document.addEventListener("scroll", onScroll);

  //   return () => {
  //     document.removeEventListener("scroll", onScroll);
  //   };
  // }, []);

  console.log(movies);
  return (
    <div className="movieRow">
      <Suspense fallback={<NetflixSpinner />}>
        <h2>{movies && title}</h2>
        {movies &&
          movies.pages.map((page) => (
            <InfiniteScroll
              dataLength={page.length} //This is important field to render the next data
              next={fetchNextPage}
              hasMore={isFetchingNextPage}
              loader={<NetflixSpinner />}
            >
              <div className="movieRow__content">
                {isTabletOrMobile ? (
                  movies &&
                  page.map((movie) => (
                    <LazyLoad height={200} key={movie?.id} scroll>
                      <MovieCard
                        movie={movie}
                        isOriginals={isOriginals}
                        type={type === "all" ? movie?.media_type : type}
                      />
                    </LazyLoad>
                  ))
                ) : (
                  <Swiper
                    slidesPerView={isOriginals ? 6 : 5}
                    spaceBetween={20}
                    // slidesPerGroup={3}
                    loop={true}
                    loopFillGroupWithBlank={true}
                    // pagination={{
                    //   clickable: true,
                    // }}
                    navigation={true}
                    className="mySwiper"
                  >
                    {movies &&
                      page.map((movie) => (
                        <SwiperSlide key={movie?.id}>
                          <LazyLoad height={200} key={movie?.id} scroll>
                            <MovieCard
                              movie={movie}
                              isOriginals={isOriginals}
                              type={type === "all" ? movie?.media_type : type}
                            />
                          </LazyLoad>
                        </SwiperSlide>
                      ))}
                  </Swiper>
                )}
              </div>
            </InfiniteScroll>
          ))}
      </Suspense>
    </div>
  );
};

export default MovieRow;
