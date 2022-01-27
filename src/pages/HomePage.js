import React from "react";
import Banner from "../components/Banner";
import MovieRow from "../components/MovieRow";
import requests from "../services/Request";
import Footer from "../components/Footer";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Banner */}
      <Banner />

      {/* Row */}

      <MovieRow
        title="Popular On Netflix"
        fetchUrl={requests.fetchTrendingAll}
        type="all"
      />

      <MovieRow
        title="Netflix Originals"
        isOriginals
        fetchUrl={requests.fetchNetflixOriginals}
        type="tv"
      />

      <MovieRow
        title="Top Rated"
        type="movie"
        fetchUrl={requests.fetchTopRated}
      />

      <MovieRow
        title="Trending Now"
        type="tv"
        isOriginals
        fetchUrl={requests.fetchTrendingSeries}
      />

      <MovieRow
        title="Action Movies"
        fetchUrl={requests.fetchActionMovies}
        type="movie"
      />

      <MovieRow
        title="Comedy Movies"
        type="tv"
        isOriginals
        fetchUrl={requests.fetchComedySeries}
      />

      <MovieRow
        title="Horror Movies"
        type="movie"
        fetchUrl={requests.fetchHorrorMovies}
      />

      <MovieRow
        title="Animation Series"
        isOriginals
        fetchUrl={requests.fetchAnimationMovies}
        type="movie"
      />

      <MovieRow
        title="Romance Movies"
        type="movie"
        fetchUrl={requests.fetchRomanceMovies}
      />

      <MovieRow
        title="Family Series"
        isOriginals
        fetchUrl={requests.fetchFamilySeries}
        type="tv"
      />

      <MovieRow
        title="SciFi Fantasy Series"
        isOriginals
        fetchUrl={requests.fetchSciFiFantasySeries}
        type="tv"
      />

      <MovieRow
        title="Documentaries"
        fetchUrl={requests.fetchDocumentarySeries}
        type="tv"
      />

      <Footer />
    </div>
  );
};

export default HomePage;
