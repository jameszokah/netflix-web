import React, { useState, useEffect } from "react";
import "./Nav.css";
import NetflixLogo from "../img/NetflixLogo1.svg";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

const Nav = ({ profile, profileSelect }) => {
  const [searchMovie, setSearchMovie] = useState("");
  const [changeNavBg, setChangeNavBg] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  let navigate = useNavigate();
  const { user, defaultAvatar } = useSelector((state) => state.user);
  const { isAuth } = useSelector((state) => state.auth);

  const transitionNavBg = () => {
    if (window.scrollY > 120) {
      setChangeNavBg(true);
    } else {
      setChangeNavBg(false);
    }
  };

  const netflixLogo = () => {
    if (profile) {
      navigate("/browse", { repalce: true });
    } else {
      navigate("/profile", { repalce: true });
    }
  };

  const handleSearchMovie = (e) => {
    if (e.key === "Enter") {
      navigate(`/search/${searchMovie}`);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBg);
    return () => {
      window.removeEventListener("scroll", transitionNavBg);
    };
  }, []);

  return (
    <>
      <div className={`nav ${changeNavBg ? "nav__black" : ""}`}>
        <div className="nav__left">
          <img
            src={NetflixLogo}
            alt="nav-logo"
            className="nav__logo"
            onClick={() => netflixLogo()}
          />

          {profile ? (
            ""
          ) : (
            <div className="nav__links">
              <NavLink
                to="browse"
                className={({ isActive }) =>
                  `nav__link ${isActive ? "nav__link__active" : ""}`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="tv"
                className={({ isActive }) =>
                  `nav__link ${isActive ? "nav__link__active" : ""}`
                }
              >
                TV Shows
              </NavLink>
              <NavLink
                to="movie"
                className={({ isActive }) =>
                  `nav__link ${isActive ? "nav__link__active" : ""}`
                }
              >
                Movies
              </NavLink>

              <NavLink
                to="mylist"
                className={({ isActive }) =>
                  `nav__link ${isActive ? "nav__link__active" : ""}`
                }
              >
                MyList
              </NavLink>
            </div>
          )}
        </div>

        <div className="nav__right">
          {profile || profileSelect ? (
            ""
          ) : (
            <div
              className={`search ${showSearch ? "" : "showSearch"}`}
              style={{
                width: showSearch ? isTabletOrMobile ? "220px" : "300px" : "50px",
              }}
            >
              <input
                type="text"
                placeholder="search"
                value={searchMovie}
                onChange={(e) => setSearchMovie(e.target.value)}
                onKeyPress={(e) => handleSearchMovie(e)}
              />
              <FaSearch
                size="1.5em"
                color="#fff"
                className="fa-search"
                onClick={() => setShowSearch(!showSearch)}
              />
            </div>
          )}
          {profileSelect ? (
            ""
          ) : (
            <img
              src={
                isAuth
                  ? user?.avatar
                    ? user?.avatar
                    : defaultAvatar
                  : defaultAvatar
              }
              alt="nav-avatar"
              className="nav__avatar"
              onClick={() => navigate("/profile", { replace: true })}
            />
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Nav;
