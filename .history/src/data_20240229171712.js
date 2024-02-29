import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

import firebaseConfig from "./Header/Firebase/plannerFirebase.json"; //firebase credentials. May want to hide later

import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import firebase from "firebase";

const app = firebase.initializeApp(firebaseConfig); //get the FB app
const auth = app.auth(); //get auth settings
const googleProvider = new firebase.auth.GoogleAuthProvider(); //get the google provider from FB

async function LogIn() {
  return signInWithPopup(googleProvider)
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

export { LogIn, LogOut, auth };
