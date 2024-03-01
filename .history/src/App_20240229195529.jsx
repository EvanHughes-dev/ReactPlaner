/*
 * EHughes
 *
 * Following processes:
 * Check login
 * Check user in DB
 * Create user in DB
 * Pass ID to rest of project
 */

import React from "react";
import Head from "./MainBody/MainBody.js"; //HeadMain.js is the next file to be called
import { useState } from "react";
import WelcomeScreen from "./LoginPage/Welcome.jsx";

import "./App.css";

import { auth } from "./data.js";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { AddEvent } from "./AddEvent/AddEvent.jsx";

export default function App() {
  //called from index.js
  //#region Login

  const [user, setUser] = useState(null);

  if (user) {
    user.localID = sessionStorage.getItem("CurrentUserID");
  }
  auth.onAuthStateChanged((newUser) => {
    setUser(newUser);
  });

  return (
    <Router>
      <Routes>
        {!user ? (
          <Route path={"*"} element={<WelcomeScreen />} />
        ) : (
          <Route>
            <Route
              path={"/Calender"}
              element={<Head IDPass={user.localID} />}
            />
            <Route
              path={"/AddEvent"}
              element={<AddEvent UserId={user.localID} />}
            />
          <Route path={"*"}/>
        )}
      </Routes>
    </Router>
  );
}
