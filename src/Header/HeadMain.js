/*
 * EHughes
 *
 * Following proccesses:
 * Create Section Header
 * Decide which screen shoudl render
 * Get data from db
 * Create sidebar
 * Handle item delete
 */

import "./HeaderMain.css"; //css for file
import HomeFiles from "../HomeFiles/MainHome.js"; //next call for file

import * as React from "react";
import { useState, useEffect } from "react";
import profile from "./Assests/DefaultProfilePic.jpg"; //default user profile in case of error
import "./NewEvent.css"; //new event styles

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  collection,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import plannerConfig from "./Firebase/plannerFirebase.json";

import { LogOut } from "../data.js";

//initilize the firebase connection
const plannerApp = initializeApp(plannerConfig);
const plannerDB = getFirestore(plannerApp);
const plannerIDRef = collection(plannerDB, "ID");

const NamesNeeded = ["Home", "Add Event"]; //list of things to have in the header

var SelectedCategory = "none"; //Category selected for new event
var date = -1; //date selected for new event
var eventTitle = ""; //Name of new event

var UserId; //user's id for database

const PossibleCategories = [
  "None",
  "Math",
  "English",
  "Biology",
  "Chemistry",
  "Physics",
  "Global Politics",
  "German",
  "French",
  "Spanish",
  "Economics",
  "Environmental",
  "Psychology",
  "Theory of Knowledge",
  "Design Technology",
  "Engineering",
  "Forensics",
  "Health & Med",
  "Sports Science",
  "Programming",
  "History",
];

export default function CreateHeader({ IDPass }) {
  UserId = IDPass;
  const [data, setData] = useState(null); //data for events
  const [UpdateData, UpdateDataFunc] = useState(false); //used to recall file
  const [displayPageMain, setPage] = useState(null); //represents the page to display
  const [currentName, setName] = useState("Home"); //tab that is selected

  var head; //header for file

  const [ProfileView, setProfileView] = useState(false); //should the profile be shown

  const [SideBar, DisplaySideBar] = useState(false); //should the sidebar be shown

  const [Filter, UpdateFilter] = useState("0"); //filter values for sidebar

  const [SideBarItems, SetSideBarItems] = useState(null);
  const [SideBarElement, setSideBarElement] = useState(null);

  //creates the add event tab page
  const AddEventPage = () => {
    //page used by user to add new events
    //displayed when user is on the "Add Event" tab
    return (
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
            SendData(newData, data); //update user's events in firebase. Data is array of data, newData is data to be added
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
    );
  };

  useEffect(() => {
    /*
     * this effect updates data
     * updates when the user changes tabs on the page
     * or when it is triggered by the update data variable
     */

    try {
      getData(UserId).then((newData) => {
        //getData returns a promise of data

        sessionStorage.setItem("data", JSON.stringify(newData)); //allows data to be accessed anywhere in project
        setData(newData); //refresh page
      });
    } catch (e) {
      console.log(e);
    }
  }, [UpdateData, currentName]); //recall whenever tab or data is updated

  useEffect(() => {
    /*
     * this effect updates all the text objects on the side bar
     * it does so whenever data is updated
     * or when the filter is changed
     */

    if (data !== "[]" && data != null) {
      //if there are elements, create sidebar
      SetSideBarItems(
        data.map((dataValue) => {
          if (Filter == "0" || dataValue.Tag == Filter) {
            var tempData = [];
            /*temp data is a copy of the data array, but not a
						refrence to the same object
						*/

            return (
              <a
                key={dataValue}
                onClick={() => {
                  for (let i = 0; i < data.length; i++) {
                    tempData[i] = data[i];
                  }

                  for (let i = 0; i < data.length; i++) {
                    if (data[i] == dataValue) {
                      tempData.splice(i, 1); //remove data from the array

                      setData(tempData); //Set array data was removed to main array
                      sessionStorage.setItem("data", JSON.stringify(tempData)); //pass to rest of project
                    }
                  }

                  RemoveEvent(tempData); //remove data from firebase
                }}
                class="SideBarElement"
              >
                {dataValue.Title}
              </a>
            );
          }
        })
      );
    } else {
      SetSideBarItems(null); //if there are no events clear sidebar
    }
  }, [data, Filter]);

  useEffect(() => {
    /*
     * creates the body and slide ability for sidebar
     * refreshes when the sidebar elements change
     */

    setSideBarElement(
      <>
        <div class="SideBar">
          <center>
            <button onClick={LogOut} className="LogOutBTN">
              Log Out
            </button>
          </center>
          <div class="Filter">
            <select
              id="selectCat"
              onChange={() => {
                UpdateFilter(document.getElementById("selectCat").value);
              }}
              required
            >
              {PossibleCategories.map((value, index) => {
                return <option value={index}>{value}</option>; //creates the ability to sort by category
              })}
            </select>
          </div>
          <div>{SideBarItems}</div>

          <button
            class="closebtn"
            onClick={() => {
              DisplaySideBar(false);
              SetSideBarDistanceDistance("0px"); //turn sidebar off
            }}
          >
            &#10097;
          </button>
        </div>
      </>
    );
  }, [SideBarItems]);
  var outBtn; //opens sidebar

  if (!SideBar) {
    outBtn = (
      <button
        class="openbtn"
        onClick={() => {
          DisplaySideBar(true);
          SetSideBarDistanceDistance("250px"); //turn sidebar on
        }}
      >
        &#10096;
      </button>
    );
  }

  useEffect(() => {
    /*
     * Decides which page to show
     * currentName is the section name user has selected
     * Refreshes on data
     */
    switch (currentName) {
      case "Home":
        setPage(<HomeFiles />);
        break;
      case "Add Event":
        setPage(AddEventPage);
        break;

      default:
        setPage(null);
        break;
    }
  }, [data]);

  const ProfileViewObject = () => {
    return (
      <div className="ProfileViewHolder">
        <img class="ProfilePhoto" src={GetProfilePic()} alt="" />
      </div>
    );
  };

  head = (
    <body>
      <div class="topnav">
        {NamesNeeded.map((name) => {
          if (name == currentName) {
            return <a class="active">{name}</a>;
          }
          return (
            <a
              class="inactive"
              onClick={() => {
                setName(name);
              }}
            >
              <button class="blankButton">{name}</button>
            </a>
          );
        })}
      </div>
      <ProfileViewObject />

      {SideBarElement}
      {outBtn}
      {displayPageMain}
    </body>
  );

  return head;
}

function GetProfilePic() {
  /*
   * displays the user's image if there is one
   * otherwise returns default image
   * Called from head = ();
   */
  if (window.sessionStorage.getItem("CurrentProfilePhoto") === null) {
    return profile;
  } else {
    return window.sessionStorage.getItem("CurrentProfilePhoto");
  }
}

function SetSideBarDistanceDistance(Distance) {
  /*
   *Sets side of side bar
   * Called from outBtn & <button class="closebtn"></button>
   */
  document.documentElement.style.setProperty("--SideBarDistance", Distance);
}

async function RemoveEvent(dataToDelete) {
  /*
   * removes data from firebase
   * datToDelete contains user data - data that was removed
   * Called from UseEffect(()=>{}, [data, Filter])
   */

  await updateDoc(doc(plannerIDRef, UserId.toString()), {
    EventArray: dataToDelete,
  });
}

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

async function getData(id) {
  /*
   * Gets data from firebase
   * id is the user's id value found in App.js and passed through
   */

  const idDoc = await getDoc(doc(plannerDB, "ID", id.toString())); //get the user's doc
  var data;

  data = idDoc.data(); //return the data

  return data.EventArray; //return array of events
}

async function SendData(newData, data) {
  /*
   * Used to send new data to firebase
   * newData reprenst json object of new data
   * data is the existing data to add to
   */

  var newArray = []; //array of data to add
  for (let i = 0; i < data.length; i++) {
    newArray[i] = data[i]; //set a copy of data array
  }
  newArray[newArray.length] = newData; //insert new data
  //send data
  await updateDoc(doc(plannerIDRef, UserId.toString()), {
    EventArray: newArray,
  });
}
