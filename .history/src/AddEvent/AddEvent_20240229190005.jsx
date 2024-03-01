var SelectedCategory = "none"; //Category selected for new event
var date = -1; //date selected for new event
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
} from "firebase/firestore";

const plannerApp = initializeApp(plannerConfig);
const plannerDB = getFirestore(plannerApp);
const plannerIDRef = collection(plannerDB, "ID");

const AddEvent = (UserId) => {
  //page used by user to add new events
  //displayed when user is on the "Add Event" tab
  return (
    <>
      <Header />
      <form
        class="FormBackground"
        onSubmit={(e) => {
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
            UpdateDataFunc(!UpdateData); //have file reset data
          } catch (e) {
            console.log(e);
          }
        }}
      >
        <div class="FormElement">
          <label for="Title">Name of Event</label>
          <input
            onChange={UpdateAll}
            name="Title"
            id="Title"
            type="text"
            required
            maxLength="22"
            placeholder="Title.."
          />

          <div class="FormElement">
            <label for="DatePicker">Date</label>

            <input
              type="date"
              onChange={UpdateAll}
              id="DatePicker"
              name="DatePicker"
              required
            />
          </div>

          <div class="FormElement">
            <label for="selectCat">Category: </label>
            <select
              name="selectCat"
              id="selectCat2"
              onChange={UpdateAll}
              required
            >
              {PossibleCategories.map((value, index) => {
                return <option value={index}>{value}</option>;
              })}
            </select>
          </div>

          <div class="btnHolder">
            <input class="resetBtn" type="reset" />
            <input class="submitBtn" type="submit" value="Create New Event" />
          </div>
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
   * newData reprenst json object of new data
   * data is the existing data to add to
   */

  //send data
  await updateDoc(doc(plannerIDRef, UserId.toString()), {
    EventArray: firebase.firestore.FieldValue.arrayUnion(newData),
  });
}
