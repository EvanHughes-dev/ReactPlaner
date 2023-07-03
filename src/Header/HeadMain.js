import './HeaderMain.css'
import HomeFiles from '../HomeFiles/MainHome.js'
import * as React from 'react';
import { useState } from "react";
const NamesNeeded = ["Home","Links", "Add Event", "All Events"]//list of things to have in the header




export default function CreateHeader() {
	var head;
	const [currentName, setName] = useState("Home");
	
	
	head = (
		<body>
			{/*Could insert teh profile picture/area on teh right side of the head bar*/ }
			<div class="topnav">
				{NamesNeeded.map((name) => {

					if (name == currentName) {
						return <a class="active">{name}</a>
					} return <a onClick={() => { setName(name) }}><button class="blankButton">{name}</button></a>
				})}
			</div>


			{ReturnNeededPage(currentName) }
		</body>
		);

	return head;
}

function ReturnNeededPage(name) {

	if (name == "Home") {
		return <HomeFiles />
	}
}

