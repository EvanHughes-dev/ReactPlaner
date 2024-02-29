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
import { onAuthStateChanged } from "firebase/auth";
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

  auth.onAuthStateChanged(auth, (newUser) => {
    console.log(user);
    if (user) {
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
          <Route path={"/Head"} element={<Head IDPass={user.uid} />} />
        )}
      </Routes>
    </Router>
  );
}
