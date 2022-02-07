import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import LazyLoad from "react-lazyload";
import { useInfiniteQuery } from "react-query";
import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import NetflixSpinner from "../components/NetflixSpinner";
import netflix from "../services/apiConfig";
import requests from "../services/Request";
import "./searchPage.css";

const SearchPage = () => {
  const { searchTerm } = useParams();

  const {
    data: movies,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["search", searchTerm],
    async ({ pageParam = 1 }) => {
      const resp = await netflix.get(
        `${requests.fetchSearchQuery}${searchTerm}&page=${pageParam}`
      );
      return resp?.data;
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        const totalPages = lastPage.total_pages;
        console.log("total page numb: ", totalPages);
        const page = lastPage.page + 1;
        console.log("page numb: ", page);
        return page <= totalPages ? page : undefined;
      },
    }
  );

  console.log(movies);

  // const { loading, data } = useQuery(["search", searchTerm], async () => {
  //   const resp = await netflix.get(`${requests.fetchSearchQuery}${searchTerm}`);
  //   return resp?.data?.results;
  // });

  return (
    <div className="searchPage">
      <h1>{searchTerm}</h1>
      {movies &&
        movies.pages.map((page) => (
          <InfiniteScroll
            dataLength={page?.results.length} //This is important field to render the next data
            next={fetchNextPage}
            hasMore={isFetchingNextPage}
            loader={<NetflixSpinner />}
          >
            <div className="searchPage__content">
              {movies &&
                page?.results.map((movie) => (
                  <LazyLoad height={200} key={movie?.id} scroll>
                    <MovieCard movie={movie} type={movie?.media_type} />
                  </LazyLoad>
                ))}
            </div>
          </InfiniteScroll>
        ))}
    </div>
  );
};

export default SearchPage;
