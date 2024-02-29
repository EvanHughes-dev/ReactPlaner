import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  getDoc,
} from "firebase/firestore";

import firebaseConfig from "./Header/Firebase/plannerFirebase.json"; //firebase credentials. May want to hide later

import { initializeApp } from "firebase/app";

import { useNavigate } from "react-router-dom";

const app = initializeApp(firebaseConfig); //get connection to app
const db = getFirestore(app); //connect to DB

const idRef = collection(db, "ID"); //find collection

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

export { LogIn, LogOut, auth };
