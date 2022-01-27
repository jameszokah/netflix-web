import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomeLayout from "../components/HomeLayout";
import { authEmail, hasAuth } from "../features/auth/authSlice";
import { MdArrowForwardIos } from "react-icons/md";
import "./GetStartedPage.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../services/firebase";
import { login } from "../features/user/userSlice";
import { collection, getDocs } from "firebase/firestore";

const GetStartedPage = () => {
  const registerEmailRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerEmail = (e) => {
    e.preventDefault();
    const email = registerEmailRef.current.value;
    if (email && validateEmail(email)) {
      dispatch(authEmail(email));
      navigate("/signup");
      console.log(email);
    }
  };

  function validateEmail(email) {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(regexEmail)) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const collectionUserRef = collection(db, "users");

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
  }, [dispatch]);

  return (
    <div className="getstarted">
      <HomeLayout>
        <div className="getstarted__center">
          <h1>Unlimited movies, TV shows, and more.</h1>
          <h2>Watch anywhere. Cancel anytime.</h2>
          <h3>
            Ready to watch? Enter your email to create or restart your
            membership.
          </h3>
          <form className="floating-form">
            <div className="floating-label">
              <input
                className="floating-input"
                type="email"
                placeholder="  "
                ref={registerEmailRef}
              />

              <label>Email Address</label>
            </div>
            <button className="getstarted_btn" onClick={registerEmail}>
              Get Started{" "}
              <span>
                <MdArrowForwardIos />{" "}
              </span>
            </button>
          </form>
        </div>
      </HomeLayout>
    </div>
  );
};

export default GetStartedPage;
