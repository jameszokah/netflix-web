import React, { useRef, useState, useEffect } from "react";
import HomeLayout from "../components/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./SignupPage.css";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../services/firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { hasAuth, passwordError } from "../features/auth/authSlice";
import { login } from "../features/user/userSlice";
import useSetAvatar from "../hooks/useSetAvatar";

const SignupPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const passwordRef1 = useRef(null);
  const passwordRef2 = useRef(null);
  const { email, errorMessage, isError } = useSelector((state) => state.auth);
  const collectionUserRef = collection(db, "users");
  const dispatch = useDispatch();
  const [avatar] = useSetAvatar();

  const signup = async (e) => {
    e.preventDefault();
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const password1 = passwordRef1.current.value;
    const password2 = passwordRef2.current.value;
    try {
      if (
        firstName &&
        lastName &&
        email &&
        password1 &&
        password2 &&
        password1 === password2
      ) {
        const user = await createUserWithEmailAndPassword(
          auth,
          email,
          password1
        );
        await addDoc(collectionUserRef, {
          firstName,
          lastName,
          email,
          avatar: avatar.toString(),
          uid: user.user.uid,
        });
        dispatch(hasAuth(true));
        navigate("/splashing");
      }
    } catch (err) {
      dispatch(passwordError(err.message));
      console.log(err.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
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
  }, [dispatch, collectionUserRef]);

  return (
    <div className="signupPage">
      <HomeLayout>
        <div className="signupPage__form">
          <form>
            <h3>Create Account</h3>
            <h1>{email}</h1>
            <input type="text" placeholder="First Name" ref={firstNameRef} />
            <input type="text" placeholder="Last Name" ref={lastNameRef} />
            <div className="signupPage__show">
              <input
                type={showPassword ? "text" : "password"}
                ref={passwordRef1}
                placeholder="New Password"
              />
              <p onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "Hide" : "Show"}
              </p>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              ref={passwordRef2}
              placeholder="New Password"
            />
            <p className="password__error">
              {isError ? errorMessage.replace("Firebase: ", "") : ""}
            </p>
            <button type="submit" onClick={(e) => signup(e)}>
              Sign up
            </button>

            <h4>
              <span className="signupPage__grey">Already on Netflix?</span>{" "}
              <Link to="/login" className="signupPage__signup__link">
                Sign in now.
              </Link>
            </h4>
          </form>
        </div>
      </HomeLayout>
    </div>
  );
};

export default SignupPage;
