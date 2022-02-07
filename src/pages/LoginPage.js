import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../components/HomeLayout";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../services/firebase";
import "./LoginPage.css";
import { useDispatch } from "react-redux";
import { login } from "../features/user/userSlice";
import { hasAuth } from "../features/auth/authSlice";
import { collection, getDocs } from "firebase/firestore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signin = async (e) => {
    e.preventDefault();
    try {
      if (email && password) {
        await signInWithEmailAndPassword(auth, email, password);
        setEmail("");
        setPassword("");
        dispatch(hasAuth(true));
        navigate("/splash");
      }
    } catch (err) {
      setEmail("");
      setPassword("");

      console.log(err.message);
    }
  };

  const sigInWithGoogle = async () => {
    try {
      const googleprovider = new GoogleAuthProvider();
      await signInWithPopup(auth, googleprovider);
      dispatch(hasAuth(true));
      navigate("/splash");
    } catch (err) {
      console.log(err.message);
    }
  };

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
     
    });

    return unsubscribe;
  }, [dispatch]);
  return (
    <div className="loginPage">
      <HomeLayout loginPage>
        <div className="loginPage__form">
          <form>
            <h1>Sign In</h1>
            <input
              type="email"
              placeholder="Email or Phone Number"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" onClick={(e) => signin(e)}>
              Sign In
            </button>
            <div className="loginPage__google__signin">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt=""
              />
              <p className="loginPage__grey" onClick={sigInWithGoogle}>
                {"  "}Sign In with Google
              </p>
            </div>
            <h4>
              <span className="loginPage__grey">New to Netflix?</span>{" "}
              <Link to="/" className="loginPage__signup__link">
                Sign up now.
              </Link>
            </h4>
          </form>
        </div>
      </HomeLayout>
    </div>
  );
};

export default LoginPage;
