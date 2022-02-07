import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, login } from "../features/user/userSlice";
import { hasAuth } from "../features/auth/authSlice";
import Nav from "../components/Nav";
import PayPalBtn from "../components/PayPalBtn";
import "./ProfilePage.css";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../services/firebase";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useSnackbar } from "react-simple-snackbar";

const ProfilePage = () => {
  const [isPaypalError, setIsPaypalError] = useState(false);
  const [open, setOpen] = useState(false);
  // const [changeAmount, setChangeAmount] = useState("5");
  const changeAmountRef = useRef(null);
  const dispatch = useDispatch();
  const { user, defaultAvatar } = useSelector((state) => state.user);
  const { isAuth } = useSelector((state) => state.auth);
  const options = {
    position: "top-center",
    style: {
      backgroundColor: isPaypalError ? "red" : "green",
    },
  };
  const [openSnackbar] = useSnackbar(options);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

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
      
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <>
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
                <div className="profilePage__plan__Wrapper">
                  <div className="profilePage__plan">
                    <h2>Default</h2>
                    <button className="profilePage__plan__btn-disabled">
                      SUBSCRIBE
                    </button>
                  </div>
                  <div className="profilePage__plan">
                    <h2>Buy me Coffee</h2>
                    <button
                      className="profilePage__plan__btn"
                      onClick={onOpenModal}
                    >
                      SUBSCRIBE
                    </button>
                  </div>
                </div>
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
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        styles={{ backgroundColor: "#111", borderRadius: "6px" }}
        closeIconId="close__model__IconId"
      >
        <div className="model__wrap">
          <h2>Amount</h2>
          <input
            type="number"
            className="profilePage__amount__field"
            name="amount"
            defaultValue="6"
            ref={changeAmountRef}
          />
          <PayPalBtn
            currency="USD"
            changeAmountRef={changeAmountRef}
            openSnackbar={openSnackbar}
            onCloseModal={onCloseModal}
            setIsPaypalError={setIsPaypalError}
          />
        </div>
      </Modal>
    </>
  );
};

export default ProfilePage;
