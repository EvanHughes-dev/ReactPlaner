var SelectedCategory = "none"; //Category selected  new event
var date = -1; //date selected  new event
var eventTitle = ""; //Name of new event

import "./NewEvent.css";
import PossibleCategories from "../SupportJSON/PossibleCategories.json";
import firebaseConfig from "../SupportJSON/PossibleCategories.json";
import Header from "../Header/Header.jsx";

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  collection,
  getDoc,
  updateDoc,
  FieldValue,
  arrayUnion,
} from "firebase/firestore";

import { app as plannerApp } from "../data.js";
const plannerDB = getFirestore(plannerApp);
const plannerIDRef = collection(plannerDB, "ID");
const AddEvent = (UserId) => {
  //page used by user to add new events
  //displayed when user is on the "Add Event" tab

  return (
    <>
      <Header />
      <form
        className="FormBackground"
        onSubmit={(e) => {
          console.log(e);
          var day = date.getDate() + 1;
          var month = date.getMonth() + 1;
          var year = date.getFullYear();
          HandleSubmit(e); //stops submit from deleting data. This is handedled in SendData();
          //format data in the form shown below
          const newData = {
            Title: eventTitle,
            Tag: SelectedCategory,
            Day: day,
            Month: month,
            Year: year,
          };

          try {
            SendData(newData, UserId); //update user's events in firebase. Data is array of data, newData is data to be added
          } catch (e) {
            console.log(e);
          }
        }}
      >
        <div className="FormElement">
          <label htmlFor="Title">Name of Event:</label>
          <input
            onChange={UpdateAll}
            name="Title"
            id="Title"
            type="text"
            required
            maxLength="22"
            placeholder="Title.."
          />
        </div>
        <div className="FormElement">
          <label htmlFor="DatePicker">Date:</label>

          <input
            type="date"
            onChange={UpdateAll}
            id="DatePicker"
            name="DatePicker"
            required
          />
        </div>

        <div className="FormElement">
          <label htmlFor="selectCat2">Category: </label>
          <select
            name="selectCat"
            id="selectCat2"
            onChange={UpdateAll}
            required
          >
            {PossibleCategories.map((value, index) => {
              return (
                <option key={value} value={index}>
                  {value}
                </option>
              );
            })}
          </select>
        </div>

        <div className="btnHolder">
          <input className="submitBtn" type="submit" value="Create New Event" />
        </div>
      </form>
    </>
  );
};

export { AddEvent };

function HandleSubmit(e) {
  //stops the form from refeshing page

  e.preventDefault();
  document.getElementById("selectCat2").value = "none";
  document.getElementById("Title").value = "";
  document.getElementById("DatePicker").value = null;
}

function UpdateAll() {
  SelectedCategory = document.getElementById("selectCat2").value;
  eventTitle = document.getElementById("Title").value;
  date = new Date(document.getElementById("DatePicker").value);
}

async function SendData(newData, UserId) {
  /*
   * Used to send new data to firebase
   * newData is a json object of new data
   */

  //send data
  console.log(UserId.toString());
  await updateDoc(doc(plannerIDRef, UserId.UserId.toString()), {
    EventArray: arrayUnion(newData),
  });
}
