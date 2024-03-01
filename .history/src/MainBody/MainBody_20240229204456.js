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

import "./MainBody.css"; //css for file

import Cal from "../Calender/Calender.js";
import Header from "../Header/Header.jsx";

import * as React from "react";
import { useState, useEffect } from "react";

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  collection,
  getDoc,
  updateDoc,
  count,
  firebase,
} from "firebase/firestore";

import plannerConfig from "../SupportJSON/plannerFirebase.json";

import { LogOut } from "../data.js";

//initilize the firebase connection
import { app as plannerApp } from "../data.js";
const plannerDB = getFirestore(plannerApp);
const plannerIDRef = collection(plannerDB, "ID");

var UserId; //user's id for database

import PossibleCategories from "../SupportJSON/PossibleCategories.json";
import { useNavigate } from "react-router-dom";
export default function CreateHeader({ IDPass }) {
  console.log(IDPass);
  let nav = useNavigate();

  UserId = IDPass;
  const [data, setData] = useState(null); //data for events

  const [displayPageMain, setPage] = useState(null); //represents the page to display
  const [currentName, setName] = useState("Home"); //tab that is selected

  var head; //header for file

  const [SideBar, DisplaySideBar] = useState(false); //should the sidebar be shown

  const [Filter, UpdateFilter] = useState("0"); //filter values for sidebar

  const [SideBarItems, SetSideBarItems] = useState(null);
  const [SideBarElement, setSideBarElement] = useState(null);

  //creates the add event tab page

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
  }, [currentName]); //recall whenever tab or data is updated

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
            <button
              onClick={() => {
                DisplaySideBar(false);
                SetSideBarDistanceDistance("0px"); //turn sidebar off
                LogOut().then((bool) => {
                  if (bool) {
                    nav("/");
                  }
                });
              }}
              className="buttonSignOut"
            >
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

  head = (
    <body>
      <Header />

      {SideBarElement}
      {outBtn}
      <Cal />
    </body>
  );

  return head;
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
