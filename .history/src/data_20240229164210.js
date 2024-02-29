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
  }); //end of Login().then(()=>{});
};

async function Login(GoogleID) {
  //Called from App()
  if (GoogleID === null) {
    return;
  }
  const idQuery = query(idRef, where("id", "==", GoogleID.toString())); //build query for user's id
  const idDoc = await getDocs(idQuery); //get doc found in query. There should only be one

  var foundDoc;
  idDoc.forEach((doc) => {
    //loop through docs
    foundDoc = doc; //get the doc
  });
  if (foundDoc != null) {
    //if there is a doc

    return foundDoc.data().localID; //return the id
  } else {
    //create new user if user is not found

    return CreateUser(GoogleID); //create the login
  }
} //end of Login(id)

export { LogIn, LogOut, auth };
