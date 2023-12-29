/*
 * EHughes
 * 
 * Following proccesses:
 * Create Section Header
 * Decide which screen shoudl render
 * Get data from db
 * Create sidebar
 *	Handle item delete
 */

import './HeaderMain.css'
import HomeFiles from '../HomeFiles/MainHome.js'

import * as React from 'react'
import { useState, useEffect } from "react"
import profile from "./Assests/DefaultProfilePic.jpg"
import './NewEvent.css'
import '../Schedule/Schedule.css'
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, collection, query, where, getDocs, getDoc, updateDoc } from "firebase/firestore";
const firebaseConfig = {
	apiKey: "AIzaSyAYGEZ3ZAIu0w4tVthOvOu5YoAr2YZ-Pao",
	authDomain: "planner-cffb8.firebaseapp.com",
	projectId: "planner-cffb8",
	storageBucket: "planner-cffb8.appspot.com",
	messagingSenderId: "482765229023",
	appId: "1:482765229023:web:dc47d16e7dd5a32a1f526a",
	measurementId: "G-X0E8EZWHLE"
};//firebaseinfo

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const idRef = collection(db, "ID");


const NamesNeeded = ["Home", "Links", "Add Event", "Schedule"]//list of things to have in the header
const BaseUrl = 'http://69.242.41.167:8082';
const site_Base = 'https://schoology.dasd.org';


var SelectedCategory = "none";
var date = -1;

var title = "";
var id;

const PossibleCategories = ["None", "Math", "English", "Biology", "Chemistry", "Physics", "Gobal Polotics", "German", "French", "Spanish", "Economics", "Enviromental", "Psychology", "Theory of Knowledge", "Design Technology", "Engineering", "Forensics", "Health & Med", "Sports Science", "Programming", "History"];


export default function CreateHeader({ IDPass }) {
	
	id=IDPass
	const [data, setData] = useState(null);
    const [UpdateData, UpdateDataFunc]=useState(false);
	const [page, setPage] = useState(null);
	const [currentName, setName] = useState("Home");

	//creates the add event tab page
	const AddEventPage = () => {

		return (
			
				<form class="FormBackground" onSubmit={(e) => {
					var day = date.getDate() + 1;
					var month = date.getMonth() + 1;
					var year = date.getFullYear();
					HandleSubmit(e);
					const newData={
						Title: title,
						Tag: SelectedCategory,
						Day: day,
						Month: month,
						Year: year
                    }
					
				try {
					SendData(newData, data);
					UpdateDataFunc(!UpdateData)
					}
					catch (e) {
						console.log(e);
					}
				}
				}>
				<div class="FormElement">
					<label for="Title">Name of Event</label>
					<input onChange={UpdateAll} name="Title" id="Title" type="text" required maxLength="22"  placeholder="Title.." />
				
				<div class="FormElement">
					<label for="DatePicker" >Date</label>

					<input type="date" onChange={UpdateAll} id="DatePicker" name="DatePicker" required />
				</div>

				<div class="FormElement">
					<label for="selectCat">Category: </label>
					<select name="selectCat" id="selectCat2" onChange={UpdateAll} required>

						{PossibleCategories.map((value, index) => {
							return (<option value={index }>{value}</option>);
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


	}

	useEffect(() => {

		/*
		 * this effect updates data
		 * updates when the user changes tabs on the page
		 * or when it is triggered by the update data variable
		 */
		
		try {
			
			
			getData(id).then((newData) => {
				
				sessionStorage.setItem("data", JSON.stringify(newData))
				setData(newData)
			})

			
			
		}
		catch(e) {
			console.log(e);
		}
	}, [UpdateData, currentName]);

	var head;

	
	const [ProfileView, setProfileView] = useState(false);//should the profile be shown

	const [SideBar, DisplaySideBar] = useState(false);//should the sidebar be shown

	const [Filter, UpdateFilter] = useState("0");//filter values for sidebar

	const [SideBarItems, SetSideBarItems] = useState(null);
	const [SideBarElement, setSideBarElement] = useState(null);


	
	
		useEffect(() => {
			/*
			 * this effect updates all the text objects on the side bar
			 * it does so whenever data is updated
			 * or when the filter is changed
			*/


			if (data !== '[]' && data != null )  {
				SetSideBarItems(data.map((dataValue) => {
					console.log(Filter)
					if (Filter == "0" || dataValue.Tag == Filter) {
						var tempData = [];
						/*temp data is a copy of the data array, but not a
						refrence to the same object
						*/
						
						return (<a onClick={
							() => {
							for (let i = 0; i < data.length; i++) {
								tempData[i] = data[i];
							}

							for (let i = 0; i < data.length; i++) {
								if (data[i] == dataValue) {

									tempData.splice(i, 1);

									setData(tempData);
									sessionStorage.setItem("data", JSON.stringify(tempData));
								}
							}

							RemoveEvent( tempData);
						}} class="SideBarElement">{dataValue.Title}</a>);
					}

				}));
			} else {

				SetSideBarItems(null);

			}


		}, [data, Filter])
	
	useEffect(() => {
		
		setSideBarElement(<>
			<div class="SideBar">
				<div class="Filter">
					<select id="selectCat" onChange={
						() => {
							UpdateFilter(document.getElementById('selectCat').value)
						}
					} required>

						{PossibleCategories.map((value, index) => {
							return (<option value={index}>{value}</option>);
						})}

					</select>
				</div>

				{SideBarItems}
				
				<button class="closebtn" onClick={() => {
					DisplaySideBar(false);
					SetSideBarDistanceDistance("0px");
				}}>&#10097;</button>
			</div>


		</>);

	}, [SideBarItems])
	var outBtn;
	
	if (!SideBar) {
		outBtn = (<button class="openbtn" onClick={() => {
			DisplaySideBar(true);
			SetSideBarDistanceDistance("250px");
		}}>&#10096;</button>);
	} 
    
	
	useEffect(() => {

		if (currentName == "Home") {
			setPage(<HomeFiles />)
		} else if (currentName == "Add Event") {
			setPage(AddEventPage);
		} else if (currentName == "Schedule") {
		
				setPage(Schedule());
		}
		else {
			setPage(null);
	}
	},[data])

	head = (
		<body>
			
			<div class="topnav">
				{NamesNeeded.map((name) => {

					if (name == currentName) {
						return <a class="active">{name}</a>
					} return <a class="inactive" onClick={() => { setName(name); }}><button class="blankButton">{name}</button></a>
				})}
			</div>
			<img class="ProfilePhoto" src={GetProfilePic()} onClick={() => { setProfileView(!ProfileView)} } alt=""/>
				
				
			{() => {
				if (ProfileView) {

                }

			}}

			
			{SideBarElement}
			{outBtn}
			{page}
		</body>
		);
	
	return head;
}



function GetProfilePic() {
	
	
	if (window.sessionStorage.getItem("CurrentProfilePhoto") == null) {
		return { profile }
	} else {
		
		return window.sessionStorage.getItem("CurrentProfilePhoto");
	}
}

function GetProfileView(){

}

function SetSideBarDistanceDistance(Distance) {
	document.documentElement.style.setProperty('--SideBarDistance', Distance);
}

async function RemoveEvent(dataToDelete) {
	try {
		await updateDoc(doc(idRef, id.toString()), {
			EventArray: dataToDelete
		});
		
	}
	catch (e) {
		console.log(e);
	}
}



function HandleSubmit(e) {//stops the form from refeshing page
	
	e.preventDefault();
	document.getElementById('selectCat2').value = "none";
	document.getElementById('Title').value = "";
	document.getElementById('DatePicker').value = null;
	

}

function UpdateAll() {
	SelectedCategory = document.getElementById('selectCat2').value;
	title = document.getElementById('Title').value;
	date = new Date(document.getElementById('DatePicker').value);

}


//Schedule Section


function Schedule() {
	var schedule;
	fetch(BaseUrl + "/api/Schedule", {
		method: "GET",
		headers: {
			Accept: "application/json",
		},
	})
		.then((response) => response.json())
		.then((json) => {
			schedule = json;
			
		})
		.catch(error => {
			console.error(error);
		});

		
	if (schedule != null) {



		return (<div class="ScheduleMain">{schedule.map((thing) => {
			return (<div>
				{

					() => {
						var ScheduleObject;
						if (thing.First != null) {

						}
					}
				}

			</div>);

		})}</div>);
	}
}

	function GetDayInfo() {


	}

	

async function getData(id) {
	
	
	const idDoc = await getDoc(doc(db, "ID", id.toString()));
	var data;

	

		data = idDoc.data();//return the local id
	

		const events = data.EventArray;
		return events;
	
}

async function SendData(newData, data) {
	var newArray = [];
	for (let i = 0; i < data.length; i++) {
		newArray[i] = data[i];
	}
	newArray[newArray.length] =newData;
	await updateDoc(doc(idRef, id.toString()), {
		EventArray: newArray
	});
}

