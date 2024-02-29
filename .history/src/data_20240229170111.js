import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

import firebaseConfig from "./Header/Firebase/plannerFirebase.json"; //firebase credentials. May want to hide later

import { useNavigate } from "react-router-dom";

initializeApp(firebaseConfig); //get connection to app

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
