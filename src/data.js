import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

import { initializeApp } from "firebase/app";
import firebaseConfig from "./Header/Firebase/plannerFirebase.json"

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

export { LogIn, LogOut, auth };
