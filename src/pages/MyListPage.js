import React from "react";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import "./MyListPage.css";

const MyListPage = () => {
  return (
    <div>
      <Banner />
      <div className="MyListPage__movies"></div>
      <Footer />
    </div>
  );
};

export default MyListPage;
