

import './HeaderMain.css'
import HomeFiles from '../HomeFiles/MainHome.js'

import * as React from 'react'
import { useState, useEffect } from "react"
import profile from "./Assests/DefaultProfilePic.jpg"
import '../NewEvent/NewEvent.css'
import '../Schedule/Schedule.css'

//import { SchoologyAPI } from 'schoology-api';//https://github.com/hieyou1/schoology-api
//const client_key = "db49cdf48e3fc60c7765e793f77ae628064e901c9";
//const secret = "0c9ce84ea95389981f5301a9bcf2b6b5";
//const client = new SchoologyAPI(client_key, secret, "https://schoology.dasd.org");

const NamesNeeded = ["Home", "Links", "Add Event", "All Events", "Schedule"]//list of things to have in the header
const BaseUrl = 'http://69.242.41.167:8082';



var cat = "none";
var date = -1;

var title = "";
var id;

export default function CreateHeader({ id2 }) {
	id=id
	const [data, setData] = useState(null);
    const [UpdateData, UpdateDataFunc]=useState(false);
	const [page, setPage] = useState(null);
	const [currentName, setName] = useState("Home");
	
	const Form = () => {

		return (
			<div class="FormHolder">
				<form class="FormBackground" onSubmit={(e) => {
					var day = date.getDate() + 1;
					var month = date.getMonth() + 1;
					var year = date.getFullYear();
					var id = sessionStorage.getItem("CurrentUserID");
					HandleSubmit(e);
					const data={
						Title: title,
						Tag: cat,
						Day: day,
						Month: month,
						Year: year
                    }
					
					try {
						fetch(BaseUrl + "/api/eventreader/" + id , {
							method: "POST",
							headers: {
								
								'Content-Type': 'application/json'
							},
							body: JSON.stringify(data)
								
                            

						}).then(() => {
							
							UpdateDataFunc(!UpdateData);//update data 
						})

					}
					catch (e) {
						console.log(e);
					}
				}
				}>
					<label for="Title">Name of Event</label>
					<input onChange={UpdateAll} name="Title" id="Title" type="text" required maxLength="22"  placeholder="Title.." />
					<br />
					<label for="DatePicker" >Date</label>

					<input type="date" onChange={UpdateAll} id="DatePicker" name="DatePicker" required />

					<br />
					<label for="selectCat">Category: </label>
					<select name="selectCat" id="selectCat2" onChange={UpdateAll} required>

						<option value="none">None</option>
						<option value="math">Math</option>
						<option value="lit">English</option>
						<option value="bio">Biology</option>
						<option value="chem">Chemistry</option>
						<option value="physics">Physics</option>
						<option value="glopo">Global Polotics</option>
						<option value="german">German</option>
						<option value="french">French</option>
						<option value="spanish">Spanish</option>
						<option value="econ">Economics</option>
						<option value="enviro">Enviromental</option>
						<option value="psych">Psychology</option>
						<option value="tok">Theory of Knowledge</option>
						<option value="designTech">Design Technology</option>
						<option value="engi">Engineering</option>
						<option value="foren">Forensics</option>
						<option value="health&med">Health & Med</option>
						<option value="sportSci">Sports Science</option>
						<option value="prog">Programming</option>
						<option value="his">History</option>

					</select>


					<div class="btnHolder">
						<input class="resetBtn" type="reset" />
						<input class="submitBtn" type="submit" value="Create New Event" />
					</div>
				</form>
			</div>
		);


	}


	useEffect(() => {

		/*
		 * this effect updates data
		 * updates when the user changes tabs on the page
		 * or when it is triggered by the update data variable
		 */
		
		try {
			
			fetch(BaseUrl + "/api/eventreader/" + id, {
				method: "GET",
				headers: {
					Accept: "application/json",
				},
			})
				.then((response) => response.json())
				.then((json) => {
					setData(json);
					sessionStorage.setItem("data", JSON.stringify(json));
					//console.log(json);
				})
				.catch(error => {
					console.error(error);
				});
		}
		catch(e) {
			console.log(e);
		}
	}, [UpdateData, currentName]);

	var head;

	
	const [ProfileView, setProfileView] = useState(false);//should the profile be shown

	const [SideBar, DisplaySideBar] = useState(false);//should the sidebar be shown

	const [Filter, UpdateFilter] = useState("none")

	const [SideBarItems, SetSideBarItems] = useState(null);
	const [SideBarElement, setSideBarElement] = useState(null);


	

	useEffect(() => {
		/*
		 * this effect updates all the text objects on the side bar
		 * it does so whenever data is updated
		 * or when the filter is changed
		*/
		if (JSON.stringify(data) !== '[]' && data != null) {
			
			SetSideBarItems(data.map((dataValue) => {

				if (Filter == "none" || dataValue.tag == Filter) {
					var tempData = [];
					/*temp data is a copy of the data array, but not a
					refrence to the same object
					*/
					return (<a onClick={() => {
						for (let i = 0; i < data.length; i++) {
							tempData[i] = data[i];

						}
						
						for (let i = 0; i < data.length; i++) {
							if (data[i].id == dataValue.id) {
							
								tempData.splice(i, 1);

								setData(tempData);
								sessionStorage.setItem("data", JSON.stringify(tempData));
							}
						}
					
						RemoveEvent(dataValue.id, id);
					}} class="SideBarElement">{dataValue.title}</a>);
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

						<option value="none">None</option>
						<option value="math">Math</option>
						<option value="lit">English</option>
						<option value="bio">Biology</option>
						<option value="chem">Chemistry</option>
						<option value="physics">Physics</option>
						<option value="glopo">Global Polotics</option>
						<option value="german">German</option>
						<option value="french">French</option>
						<option value="spanish">Spanish</option>
						<option value="econ">Economics</option>
						<option value="enviro">Enviromental</option>
						<option value="psych">Psychology</option>
						<option value="tok">Theory of Knowledge</option>
						<option value="designTech">Design Technology</option>
						<option value="engi">Engineering</option>
						<option value="foren">Forensics</option>
						<option value="health&med">Health & Med</option>
						<option value="sportSci">Sports Science</option>
						<option value="prog">Programming</option>
						<option value="his">History</option>

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
			setPage(Form);
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
			<img class="ProfilePhoto" src={GetProfilePic()} onClick={() => { setProfileView(!ProfileView)} } alt="Profile"/>
				
				
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

function RemoveEvent(idData, id) {
	try {
		fetch(BaseUrl + "/api/eventreader/" + id + "/" + idData, {
			method: "DELETE",

		})
		
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
	cat = document.getElementById('selectCat2').value;
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
			//console.log(json);
		})
		.catch(error => {
			console.error(error);
		});

		


	return (<div class="ScheduleMain">{schedule.map((thing)=>{
		return (<div>
			{

				() => {
					var ScheduleObject;
					if (thing.First!=null) {

                    }
            }
			}

		</div>);

	}) }</div>);
}

	function GetDayInfo() {


	}

	


/*
const uuid_1 = require("uuid");

function getUnsignedAuthHeader() {
	const REALM_PARAM = { 'OAuth realm': 'Schoology API' };
	console.log(headerFormat(Object.assign(Object.assign(Object.assign({}, REALM_PARAM), getAuthHeaderComponents()), { oauth_signature: secret + '%26' })));
	return headerFormat(Object.assign(Object.assign(Object.assign({}, REALM_PARAM), getAuthHeaderComponents()), { oauth_signature: secret + '%26' }));
}

function headerFormat(components) {
	const parts = [];
	Object.keys(components).forEach(key => parts.push(key + '="' + components[key] + '"'));
	return parts.join(',');
}

function getAuthHeaderComponents(signatureMethod = 'PLAINTEXT', token = '') {
	const nonce = (0, uuid_1.v4)();
	const timestamp = Math.round(Date.now() / 1000);
	return {
		oauth_consumer_key: client_key,
		oauth_nonce: nonce,
		oauth_signature_method: signatureMethod,
		oauth_timestamp: timestamp,
		oauth_token: token,
		oauth_version: '1.0',
	};
}
*/