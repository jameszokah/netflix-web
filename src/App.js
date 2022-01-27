import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TvPage from "./pages/TvPage";
import MoviePage from "./pages/MoviePage";
import DetailedPage from "./pages/DetailedPage";
import Nav from "./components/Nav";
import MyListPage from "./pages/MyListPage";
import GetStartedPage from "./pages/GetStartedPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import PlayPage from "./pages/PlayPage";
import LoginSplash from "./pages/LoginSplash";
import PlayAnimationPage from "./pages/PlayAnimationPage";
import Protected from "./components/Protected";
import ProtectedSignup from "./components/ProtectedSignup";
import ProtectedLogin from "./components/ProtectedLogin";
import Intro from "./components/Intro";
import SearchPage from "./pages/SearchPage";
import ProfileSelectPage from "./pages/ProfileSelectPage";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route element={<Nav />}>
          <Route
            path="browse"
            element={
              <Protected path="/login">
                <HomePage key="home page" />
              </Protected>
            }
          />
          <Route
            path="tv"
            element={
              <Protected path="/login">
                <TvPage key="tv page" />
              </Protected>
            }
          />
          <Route
            path="movie"
            element={
              <Protected path="/login">
                <MoviePage key="movie page" />
              </Protected>
            }
          />

          <Route
            path="mylist"
            element={
              <Protected path="/login">
                <MyListPage key="mylist page" />
              </Protected>
            }
          />

          <Route
            path="search/:searchTerm"
            element={
              <Protected path="/login">
                <SearchPage key="search page" />
              </Protected>
            }
          />
        </Route>

        <Route
          path="watch/:movieId"
          element={
            <Protected path="/login">
              <DetailedPage key="detailed page" />
            </Protected>
          }
        />

        <Route
          path="splashing"
          element={
            <Protected path="/login">
              <Intro key="Intro page" />
            </Protected>
          }
        />

        <Route
          path="player"
          element={
            <Protected path="/login">
              <PlayAnimationPage key="PlayAnimation page" />
            </Protected>
          }
        />

        <Route
          path="splash"
          element={
            <Protected path="/login">
              <LoginSplash key="LoginSplash page" />
            </Protected>
          }
        />

        <Route
          path="play"
          element={
            <Protected path="/login">
              <PlayPage key="Play page" />
            </Protected>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedLogin path="/profile">
              <GetStartedPage key="getStarted page" />
            </ProtectedLogin>
          }
        />

        <Route
          path="login"
          element={
            <ProtectedLogin path="/splash">
              <LoginPage key="login page" />
            </ProtectedLogin>
          }
        />
        <Route
          path="signup"
          element={
            <ProtectedSignup path="/">
              <SignupPage key="signup page" />
            </ProtectedSignup>
          }
        />
        <Route
          path="profile"
          element={
            <Protected path="/login">
              <ProfileSelectPage key="profile select page" />
            </Protected>
          }
        />

        <Route
          path="edit-profile"
          element={
            <Protected path="/login">
              <ProfilePage key="profile page" />
            </Protected>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
