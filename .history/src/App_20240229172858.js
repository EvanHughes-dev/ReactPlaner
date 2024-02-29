/*
 * EHughes
 *
 * Following proccesses:
 * Check login
 * Check user in DB
 * Create user in DB
 * Pass ID to rest of project
 *
 */

import React from "react";
import Head from "./Header/HeadMain.js"; //HeadMain.js is the next file to be called
import { useState } from "react";
import { Welcome } from "./LoginPage/Welcome.jsx";

import "./App.css";

import { auth } from "./data.js";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useNavigate,
} from "react-router-dom";

export default function App() {
  //called from index.js
  //#region Login

  const [user, setUser] = useState(null);
  console.log(localStorage.getItem("LocalID"));
  if (user) {
    user.localID = localStorage.getItem("LocalID");
  }
  auth.onAuthStateChanged((newUser) => {
    if (newUser) {
      setUser(newUser);
    }
  });

  console.log("false");
  return (
    <Router>
      <Routes>
        {!user ? (
          <Route path={"/"} element={<Welcome />} />
        ) : (
          <Route path={"/Head"} element={<Head IDPass={user.localID} />} />
        )}
      </Routes>
    </Router>
  );
}

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
    console.log(foundDoc.data().localID);
    return foundDoc.data().localID; //return the id
  } else {
    //create new user if user is not found

    return CreateUser(GoogleID); //create the login
  }
} //end of Login(id)

async function CreateUser(GoogleID) {
  //this function creates a new user of none was existed: Called from Login(id)

  const idDoc = await getDoc(doc(idRef, "High")); //get document containing the highest id

  const HighestID = idDoc.data().HighestID; //get the highest ID

  const EmptyArray = []; //empt array used as a place holder

  await setDoc(doc(idRef, HighestID.toString()), {
    //create a new doc for user

    id: GoogleID.toString(), //match google id
    localID: HighestID, //to local id
    EventArray: EmptyArray, //creates an empty array that will hold all events
  }); //end of setDoc

  setDoc(doc(idRef, "High"), {
    //incremen highest id by one

    HighestID: HighestID + 1,
  });

  return HighestID;
} //end of CreateUser(id)
