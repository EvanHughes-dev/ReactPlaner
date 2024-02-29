import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

import { initializeApp } from "firebase/app";
import firebaseConfig from "./Header/Firebase/plannerFirebase.json";

const app = initializeApp(firebaseConfig); //get connection to app

const auth = getAuth();
const provider = new GoogleAuthProvider();

async function LogIn() {
  return signInWithPopup(auth, provider)
    .then((data) => {
      return data.user;
    })
    .catch((e) => {
      return e;
    });
}

const LogOut = () => {
  signOut(auth).then(() => {});
};

const LoggedIn = (userData) => {
  window.sessionStorage.setItem("CurrentProfilePhoto", userData.photoURL);
  Login(userData.uid).then((localID) => {
    //Login returns a promise with the local id for the database

    sessionStorage.setItem("CurrentUserID", localID); //set for refresh

    setID(localID); //set to recall App
    setLogin(true); //set to ensure it will be recalled
  }); //end of Login().then(()=>{});
};

export { LogIn, LogOut, auth };
