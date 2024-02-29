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
import { GoogleLogin } from "@react-oauth/google"; //Google authentication
import { Welcome } from "./LoginPage/Welcome.jsx";
import { initializeApp } from "firebase/app";
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

import "./App.css";

import { LogIn, auth } from "./data.js";

import firebaseConfig from "./Header/Firebase/plannerFirebase.json"; //firebase credentials. May want to hide later

import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

const app = initializeApp(firebaseConfig); //get connection to app
const db = getFirestore(app); //connect to DB

const idRef = collection(db, "ID"); //find collection

export default function App() {
  //called from index.js
  //#region Login
  const [userID, setID] = useState(null); //represents user local id
  const [loggedIn, setLogin] = useState(false); //bool if (loggedIn) { for showing if the user is logged in
  const [user, setUser] = useState(null);
  auth.onAuthStateChanged((user) => {
    if (user) {
    } else {
      sessionStorage.removeItem("CurrentUserID");
      setID(null);
      setLogin(false);
    }
  });

  if (sessionStorage.getItem("CurrentUserID") != null && userID == null) {
    //if there is an id stored
    setID(parseInt(sessionStorage.getItem("CurrentUserID"))); //assign it
  }

  if (userID != null && !loggedIn) {
    //if there is an id and not logged in

    setLogin(true); // logged in
  }
  return (
    <Router>
      <Routes>
        <div className="App">
          {!user ? (
            <Route path={["/Dashboard", "/"]}>
              <Welcome />
            </Route>
          ) : (
            <Switch>
              <Route exact path={["/", "/Dashboard"]}>
                {console.log("User: " + user.displayName + " is defined")}
                <Dashboard user={user} />
              </Route>
              {/*
                <Route path="/checkin/:roomNum">
                  <Checkin user={user} />
              </Route>
              May include a more detailed view of rooms later
              */}
              <Route exact path="/About">
                <About user={user} />
              </Route>

              <Route exact path="/Contact">
                <Contact user={user} />
              </Route>

              <Route exact path="/floor/:floorNum">
                <Floor user={user} />
              </Route>

              <Route path="/Settings">
                <Settings />
              </Route>

              <Route path="*">
                <PageNotFound />
              </Route>
            </Switch>
          )}
        </div>
      </Routes>
    </Router>
  );
  if (!loggedIn) {
    //if the user is not logged in
    //render google login page

    const LoggedIn = (userData) => {
      window.sessionStorage.setItem("CurrentProfilePhoto", userData.photoURL);
      Login(userData.uid).then((localID) => {
        //Login returns a promise with the local id for the database

        sessionStorage.setItem("CurrentUserID", localID); //set for refresh

        setID(localID); //set to recall App
        setLogin(true); //set to ensure it will be recalled
      }); //end of Login().then(()=>{});
    };
  } else {
    //if user is logged in
    //display rest of planner
    return (
      <>
        <Head IDPass={userID} />
      </>
    );
  }
}

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
