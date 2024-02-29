import "react";
import "./Welcome.css";

import { LogIn, auth } from "../data.js";
import { useNavigate } from "react-router-dom";

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
import { initializeApp } from "firebase/app";
import firebaseConfig from "../Header/Firebase/plannerFirebase.json"; //firebase credentials. May want to hide later
const app = initializeApp(firebaseConfig); //get connection to app
const db = getFirestore(app); //connect to DB

const idRef = collection(db, "ID"); //find collection

const WelcomeScreen = () => {
  const ClickToLogin = () => {
    var value = LogIn();

    value.then((data) => {
      if (data.uid !== null) {
        LoggedIn(data);
      }
    });
    useNavigate("/Head");
  };

  return (
    <div>
      <center>
        <h2>Welcome to STEM Tempest</h2>

        <br />
        <button className="GoogleLoginButton" onClick={ClickToLogin}>
          Google Login
        </button>
        <br />
      </center>
    </div>
  );
};

const LoggedIn = (userData) => {
  window.sessionStorage.setItem("CurrentProfilePhoto", userData.photoURL);
  Login(userData.uid).then((localID) => {
    //Login returns a promise with the local id for the database
    sessionStorage.setItem("CurrentUserID", localID); //set for refresh
  }); //end of Login().then(()=>{});
};

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
    console.log(foundDoc.data().localID);
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

 export default { WelcomeScreen as Welcome };
