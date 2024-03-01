import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

import firebaseConfig from "./SupportJSON/plannerFirebase.json"; //firebase credentials. May want to hide later

import { initializeApp } from "firebase/app";

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

const LogOut = async () => {
  return signOut(auth).then(() => {
    return true;
  });
};

export { LogIn, LogOut, auth, app };
