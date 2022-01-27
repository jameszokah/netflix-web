import React from "react";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import MovieRow from "../components/MovieRow";
import requests from "../services/Request";
import "./MoviePage.css";

const MoviePage = () => {
  return (
    <div className="moviePage">
      <Banner />
      <div className="moviePage__movies">
        <MovieRow
          title="War Movies"
          type="movie"
          fetchUrl={requests.fetchWarMovies}
        />
        <MovieRow
          title="Horror Movies"
          type="movie"
          fetchUrl={requests.fetchHorrorMovies}
        />
        <MovieRow
          title="Discoves Movies"
          type="movie"
          fetchUrl={requests.discoverMovies}
        />
        <MovieRow
          title="Animation Movies"
          type="movie"
          fetchUrl={requests.fetchAnimationMovies}
        />
      </div>
      <Footer />
    </div>
  );
};

export default MoviePage;
