import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import { hasAuth } from "../features/auth/authSlice";
import { login } from "../features/user/userSlice";
import { auth, db } from "../services/firebase";
import "./ProfileSelectPage.css";

const ProfileSelectPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, defaultAvatar } = useSelector((state) => state.user);
  const { isAuth } = useSelector((state) => state.auth);
  console.log(user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const collectionUserRef = collection(db, "users");
        const dbUsers = await getDocs(collectionUserRef);

        const dbUserList = dbUsers.docs.map((doc) => doc.data());
        const dbUser = dbUserList.find((data) => data?.uid === user?.uid);
        console.log(dbUser);
        dispatch(login({ ...dbUser, uid: user.uid, email: user.email }));
        dispatch(hasAuth(true));
      } else {
        dispatch(hasAuth(false));
      }
      console.log(user);
    });

    return unsubscribe;
  }, [dispatch]);
  return (
    <>
      <Nav profileSelect />
      <div className="profileSelect">
        <div className="profileSelect__body">
          <h1 className="profileSelect__whos_watching">Who's Watching?</h1>
          <div className="profileSelect__content">
            <div
              className="profileSelect__profile"
              onClick={() => navigate("/browse", { replace: true })}
            >
              <div className="profileSelect__profile__img">
                <img
                  src={
                    isAuth
                      ? user?.avatar
                        ? user?.avatar
                        : defaultAvatar
                      : defaultAvatar
                  }
                  alt={user?.firstName}
                />
              </div>

              <h4>{user?.firstName}</h4>
            </div>
          </div>
          <div className="profileSelect__manage__porofile">
            <button
              onClick={() => navigate("/edit-profile", { replace: true })}
            >
              Manage Profiles
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSelectPage;
