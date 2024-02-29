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
import WelcomeScreen from "./LoginPage/Welcome.jsx";
("./LoginPage/Welcome.jsx");

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
  let nav = useNavigate();
  const [user, setUser] = useState(null);
  console.log(sessionStorage.getItem("CurrentUserID"));
  if (user) {
    user.localID = sessionStorage.getItem("CurrentUserID");
  }
  auth.onAuthStateChanged((newUser) => {
    if (newUser) {
      setUser(newUser);
      nav("/Head");
    } else {
      nav("/Login");
    }
  });

  console.log("false");
  return (
    <Router>
      <Routes>
        {!user ? (
          <Route path={"/"} element={<WelcomeScreen />} />
        ) : (
          <Route path={"/Head"} element={<Head IDPass={user.localID} />} />
        )}
      </Routes>
    </Router>
  );
}
