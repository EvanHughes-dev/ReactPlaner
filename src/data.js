import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAYGEZ3ZAIu0w4tVthOvOu5YoAr2YZ-Pao",
  authDomain: "planner-cffb8.firebaseapp.com",
  projectId: "planner-cffb8",
  storageBucket: "planner-cffb8.appspot.com",
  messagingSenderId: "482765229023",
  appId: "1:482765229023:web:dc47d16e7dd5a32a1f526a",
  measurementId: "G-X0E8EZWHLE",
}; //firebase credentials. May want to hide later

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
