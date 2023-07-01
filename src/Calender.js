import * as React from 'react';
import { render } from 'react-dom';
import './Calender.css'
import ReactDOM from 'react-dom/client';
import App from './App.js'

const root = ReactDOM.createRoot(document.getElementById('root'));


var currentMonth = 0;
var currentYear = 0;
var currentDay = 0;

var AllMonths = ["January", "Febuary", "March", "April", "May", "June", "July", "Agust", "September", "October", "November", "December"];
const numOfRows = [0,1, 2, 3, 4, 5];
const numOfColumns = [0,1, 2, 3, 4, 5, 6];

var numAwayFromCurrentMonth=0;

export default function Calender() {//creates the main calender
   
    var date = new Date();
    currentDay = date.getDate();
    currentMonth = (date.getMonth()) + numAwayFromCurrentMonth;
    
    currentYear = date.getFullYear();
    CheckMonth();
    const cal = (
        <table width="900" id="MainCalender">

            <caption>

                <div class="Cal-header" id="header">

                    <button class="headerText" onclick="ZoomToMonthView()" id="Month">{AllMonths[currentMonth] }: { currentYear}</button>
                    <button class="Left" id="GoLeft" onClick={GoLeft}>&#8592;</button>
                    <button class="Right" id="GoRight" onClick={GoRight}>&#8594;</button>
                </div>


            </caption>

            <tr>
                {numOfColumns.map(ReturnDayOfWeek)}
            </tr>
            { numOfRows.map(returnDates)}
            <div>test</div>
        </table>
       
        );

    return (
        cal
        );

}


function returnDates(row) {
    var day1 = currentDay;

    const posInTable = [1 + (row * 7), 2 + (row * 7), 3 + (row * 7), 4 + (row * 7), 5 + (row * 7), 6 + (row * 7), 7 + (row * 7)];

    
    //handle setting the values here
    return (
        <tr>
            {posInTable.map(returnDay) }
        </tr>
        );
}

function returnDay(CurrentBlock) {
    var day = 0;
    var DaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    //plus one for month beacuse the returned month is a num from 0 to 11 while the new date takes a num from 1 to 12
    var MonthBefore = new Date(currentYear, currentMonth, 0).getDate();//finds number of days in last month
    var DayOfWeek = new Date(currentYear, currentMonth, 1).getDay(); // gets days used by the month before in first week
    //this figures out which dates to display
    if (CurrentBlock <= DayOfWeek) {//days before current Month
        day = MonthBefore - (DayOfWeek - CurrentBlock);
    } else if (CurrentBlock > DaysInMonth + DayOfWeek) {//dates after current month
        day = CurrentBlock-(DaysInMonth+DayOfWeek);
    } else {//dates in current month
       day = CurrentBlock-DayOfWeek ;
    }

    return (//handle the due box things here
        <td class="CalenderTD">
            <p class="textArea"> {day}</p>
            <div class="DueBox"> </div>

        </td>
        );
}

function GoLeft() {
    numAwayFromCurrentMonth--;
    root.render(<App />);//this is not great pratice, but it does what i need
    
}
function GoRight() {
    numAwayFromCurrentMonth++;
    root.render(<App />);
}

function CheckMonth() {
    if (currentMonth < 0) {
        currentMonth = 11 + currentMonth;
        currentYear-=1;
        CheckMonth();
        
    } else if (currentMonth > 11) {
        currentMonth = currentMonth-11;
        currentYear += 1;
        CheckMonth();

    }
}

function ReturnDayOfWeek(index) {
    
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wensday", "Thursday", "Friday", "Sunday"];
    return <th width="122"> {daysOfWeek[index] } </th>
}