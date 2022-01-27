import React from "react";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import MovieRow from "../components/MovieRow";
import requests from "../services/Request";
import "./TvPage.css";

const TvPage = () => {
  return (
    <div className="tvPage">
      <Banner />
      <div className="tvPage__tvs">
        <MovieRow
          title="Action Adventure Series"
          type="tv"
          fetchUrl={requests.fetchActionAdventureSeries}
        />
        <MovieRow
          title="Season Series"
          type="tv"
          fetchUrl={requests.fetchSeasonSeries}
        />
        <MovieRow
          title="Kids Series"
          type="tv"
          fetchUrl={requests.fetchKidsSeries}
        />

        <MovieRow
          title="Family  Series"
          type="tv"
          fetchUrl={requests.fetchFamilySeries}
        />
      </div>
      <Footer />
    </div>
  );
};

export default TvPage;
