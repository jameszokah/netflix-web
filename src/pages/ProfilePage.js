import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, login } from "../features/user/userSlice";
import { hasAuth } from "../features/auth/authSlice";
import Nav from "../components/Nav";
import "./ProfilePage.css";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../services/firebase";
const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, defaultAvatar } = useSelector((state) => state.user);
  const { isAuth } = useSelector((state) => state.auth);

  const signout = async () => {
    await signOut(auth);
    dispatch(logout());
    dispatch(hasAuth(false));
  };

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
    <div className="profilePage">
      <Nav profile />
      <div className="profilePage__body">
        <h1>Edit Profile</h1>
        <div className="profilePage__info">
          <img
            src={
              isAuth
                ? user?.avatar
                  ? user?.avatar
                  : defaultAvatar
                : defaultAvatar
            }
            alt="profile-icon"
          />
          <div className="profilePage__details">
            <h2>{user?.email}</h2>
            <div className="profilePage__plans">
              <h3>Plans</h3>
              <button
                className="profilePage__signgout__btn"
                onClick={() => signout()}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
