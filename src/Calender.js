import * as React from 'react';
import { render } from 'react-dom';
import './Calender.css'
import ReactDOM from 'react-dom/client';
import App from './App.js'

const root = ReactDOM.createRoot(document.getElementById('root'));

const CalenderMode = {
    Day: 0,//a single day
    Month: 1,//one month
    Year: 2,//12 months
    Years: 3//9 years
}

var currentMonth = 0;
var currentYear = 0;
var currentDay = 0;

var AllMonths = ["January", "Febuary", "March", "April", "May", "June", "July", "Agust", "September", "October", "November", "December"];
const Row1Months = [0, 1, 2, 3];
const Row2Months = [4, 5, 6, 7];
const Row3Months = [8, 9, 10, 11];

const numOfRows = [0,1, 2, 3, 4, 5];
const numOfColumns = [0,1, 2, 3, 4, 5, 6];

var numAwayFromCurrentMonth=0;
var numAwayFromCurrentYear=0;
var mode = 1;


export default function Calender() {//creates the main calender
   
    var date = new Date();
    
    currentDay = date.getDate();
    currentMonth = (date.getMonth());
    CheckMonth();
    currentMonth += numAwayFromCurrentMonth;
    currentYear = date.getFullYear()+numAwayFromCurrentYear;
   
    var cal;
    if (mode == CalenderMode.Month) {
        cal = (
            <table width="900" id="MainCalender">

                <caption>

                    <div class="Cal-header" id="header">

                        <button class="headerText" onClick={ ZoomToYear} id="Month">{AllMonths[currentMonth]}: {currentYear}</button>
                        <button class="Left" id="GoLeft" onClick={GoLeft}>&#8592;</button>
                        <button class="Right" id="GoRight" onClick={GoRight}>&#8594;</button>
                    </div>


                </caption>

                <tr>
                    {numOfColumns.map(ReturnDayOfWeek)}
                </tr>
                {numOfRows.map(returnDates)}

            </table>

        );
    }
    else if (mode == CalenderMode.Year) {
        cal = (<table id="MonthCalender" class="MonthTable">
            <caption>
                <div class="Cal-header">

                    <button class="Left" id="GoLeft" onClick={GoLeft}>&#8592;</button>
                    <button class="Right" id="GoRight" onClick={GoRight }>&#8594;</button>
                    <button class="headerText" onClick={ZoomToYears} id="YearOfMonth">{ currentYear}</button>
                </div>
            </caption>


            <tr>
                {Row1Months.map(returnMonths) }
            </tr>
            <tr>
                {Row2Months.map(returnMonths)}
            </tr>
            <tr>
                {Row3Months.map(returnMonths)}
            </tr>
        </table>
                );
    }
    
    return (
        cal
        );

}



function returnDates(row) {
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
    if (mode == CalenderMode.Day) {
        currentDay--;
    } else if (mode == CalenderMode.Month) {
        numAwayFromCurrentMonth--;
    } else if (mode == CalenderMode.Year) {
        numAwayFromCurrentYear--;
    } else {
        numAwayFromCurrentYear -= 9;
    }
    root.render(<App />);//this is not great pratice, but it does what i need
    
}
function GoRight() {
    if (mode == CalenderMode.Day) {
        currentDay++;
    } else if (mode == CalenderMode.Month) {
        numAwayFromCurrentMonth++;
    } else if (mode == CalenderMode.Year) {
        numAwayFromCurrentYear++;
    } else {
        numAwayFromCurrentYear += 9;
    }
    
    root.render(<App />);
}

function CheckMonth() {//checks to see if clcikinbg left and right changed the month
    if (currentMonth+numAwayFromCurrentMonth < 0) {
        numAwayFromCurrentMonth = 12 + numAwayFromCurrentMonth;
        
        numAwayFromCurrentYear--;
        
       // root.render(<App />);
    } else if (currentMonth+numAwayFromCurrentMonth > 11) {
        numAwayFromCurrentMonth = numAwayFromCurrentMonth-12;
        numAwayFromCurrentYear++;
        
        //root.render(<App />);
    }
    
}

function returnMonths(index) {
    return (<td class="MonthTd"><button class="monthButton" onClick={ ()=> ZoomToMonth(index)}>{AllMonths[index]}</button></td>)
}

function ReturnDayOfWeek(index) {
    
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wensday", "Thursday", "Friday", "Sunday"];
    return <th width="122"> {daysOfWeek[index] } </th>
}

function ZoomToMonth(month) {
    numAwayFromCurrentMonth += month-currentMonth;
    mode = CalenderMode.Month;
    root.render(<App />);
}
function ZoomToYear() {//zooms calender to year view
    
    mode = CalenderMode.Year;
    root.render(<App />);
}
function ZoomToYears() {
    mode = CalenderMode.Years;
    root.render(<App />);
}