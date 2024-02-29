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

import { auth } from "./data.js";

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

  auth.onAuthStateChanged((newUser) => {
    setUser(newUser);
  });

  console.log("false");
  return (
    <Router>
      <Routes>
        {!user ? (
          <Route path={"/"} element={<Welcome />} />
        ) : (
          <Route path={"/Head"} element={<Head IDPass={user.uid} />} />
        )}
      </Routes>
    </Router>
  );
}
