import Cal from "./Calender/Calender.js";

import { useState } from "react";

import "./MainHome.css";

export default function MainPage({ id }) {
  return (
    <>
      <Cal id={id} />
    </>
  );
}
