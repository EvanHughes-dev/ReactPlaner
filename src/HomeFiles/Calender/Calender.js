/*
 *EHughes 
 * This file contains the following features
 * Create the user's calender
 * display user's events on the proper day
 * Allow the user to switch between calender views
 * Mark current day/month/year in seperate color then rest 
 */

import * as React from 'react';

import './Calender.css'
import { useState } from "react";

//color conststatns
const NotInCurrentMonthClr = "#808080";
const InCurrentMonthClr = "#74C2E1";
const currentDayClr = "#0191C8"
//end of color conststants

const CalenderMode = {//used to decide what mode the calender should display
    Day: 0,//a single day
    Month: 1,//one month
    Year: 2,//12 months
    Years: 3//9 years
}
var currentMonthSelected = 0;//current month user is on
var currentYearSelected = 0;//current year user is on


var currentMonth = 0;//actual currentMonth
var currentYear = 0;//actual currentYear
var currentDay = 0;//actual currentDay

var AllMonths = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];//list of all months

const allRowsForMonths = [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11]];//an array of arrays refrencing the 12 month view, number refrence the month
const allRowsForYears = [[-4, -3, -2], [-1, 0, 1], [2, 3, 4]];//an array of arrays refrencing the 9 year view, number refrence the distance from center

const numOfRowsMainCal = [0,1, 2, 3, 4, 5];//number of rows to display in mode 1
const CalenderHeaderGenerator = [0,1, 2, 3, 4, 5, 6];//number of columns in mode 1

export default function Calender() {//creates the main calender
  
    var UserEvents;//represnets the array of user data
    

    if (sessionStorage.getItem("data") != null) {//if there is data stored
        if (JSON.parse(sessionStorage.getItem("data")) != UserEvents) {//if the data is diffrent
            UserEvents = JSON.parse(sessionStorage.getItem("data"));//assign it
        }
    } else {
        UserEvents = null;//if there is no data, set to null in case there was previous data
    }

    var date = new Date();//get the current date
    const [MonthDistance, setMonth] = useState(0);//disatnce from current month
    const [YearDistance, setYear] = useState(0);//disatnce from current year
    const [mode, setMode] = useState(1);//current mode of calender
    
    currentDay = date.getDate();//current day
    currentMonth = date.getMonth();//current month
    currentYear = date.getFullYear();//get the current year

    if (currentMonth + MonthDistance < 0) {//if user has gone below 0 months (january)
        setMonth(  12 + MonthDistance);//circle around to december

        setYear(YearDistance-1);//of the year before

    }
    else if (currentMonth + MonthDistance > 11) {//if the user has gone past month 11 (december)
        setMonth( MonthDistance-12);//set month to january
        setYear(YearDistance + 1);//of the next year

    }

    currentMonthSelected = currentMonth + MonthDistance;//represents the interger from 0-11 of current month
    currentYearSelected = currentYear + YearDistance;//represents the integer for the current selected year
  
   
    var Calender;
    //this section creates the calender based on the current mode the calender is in

    /*
     *all calenders consist of a table
     * the CalenderMode.Day section is empty so far
     * Plan to have it display an enlarged view of a single day 
     */
    if (mode == CalenderMode.Day) {

    }
    else if (mode == CalenderMode.Month) {
        /*
         * Creates the single month
         * always displays in a 6x7 grid
         * Arrows allow user to change months
         * Also displays events for each day 
         */
        Calender = (
                <table width="900">
                    <caption>

                        <div class="Cal-header">

                        <button class="headerText" onClick={() => { setMode(2) }}>{AllMonths[currentMonthSelected]}: {currentYearSelected}</button>
                        <button class="Left" onClick={() => { setMonth(MonthDistance - 1) }}>

                            <div class = "Left1">
                                &lt;
                            </div>
                            <div class="Left2">
                                &lt;
                            </div>
                                </button>
                        <button class="Right" onClick={() => { setMonth(MonthDistance + 1) }}>
                            <div class="Right1">
                                &gt;
                            </div>
                            <div class="Right2">
                                &gt;
                            </div>
                        </button>
                        </div>

                    </caption>

                    <tr>
                    {CalenderHeaderGenerator.map(ReturnDayOfWeek)}
                    {/*Creates the day header sunday - monday
                     * Returns a table header for each
                     */ }
                    </tr>

                {numOfRowsMainCal.map((index)=>returnDates(index, UserEvents))}
                {/*Creates the days for the previous, current, and next months
                 * Does one row at a time
                 */}
                </table>
        );
    }
    else if (mode == CalenderMode.Year) {
        /*
         *This part creates a 12 month view
         * Clicking on a month zooms the user into that month's view
         * Arrows allow user to move from one year to another
         */
        Calender = (
                <table class="MonthTable">
                    <caption>
                        <div class="Cal-header">

                        <button class="Left" onClick={() => { setYear(YearDistance - 1) }}><div class="Left1">
                            &lt;
                        </div>
                            <div class="Left2">
                                &lt;
                            </div></button>
                        <button class="Right" onClick={() => { setYear(YearDistance + 1) }}>
                            <div class="Right1">
                                &gt;
                            </div>
                            <div class="Right2">
                                &gt;
                            </div>
                        </button>
                        <button class="headerText" onClick={() => { setMode(3) }} >{currentYearSelected}</button>
                        </div>
                    </caption>
                    {allRowsForMonths.map((RowOfMonths) => {
                        return (
                            <tr>
                                {
                                 /*
                                 * returns the whole row of months
                                 * RowOfMonths is the array of months for that row
                                 * CurrentMonth is the month for that cell
                                 */
                                    RowOfMonths.map((CurrentMonth) => {
                                        var color = InCurrentMonthClr;
                                        if (CurrentDay(currentDay, CurrentMonth, currentYearSelected)) {
                                            color = currentDayClr;
                                        }

                                        return (<td class="MonthTd" style={{ background: color }}>  <button class="monthButton" onClick={() => {
                                            var sum = CurrentMonth - currentMonth;

                                            setMonth(sum);
                                            setMode(1);
                                        }}>{AllMonths[CurrentMonth]}</button></td>)
                                    })
                                }
                            </tr>
                            )
                       
                    })}{ /*First row of months*/}
                   
                    
                </table>
        );
    }
    else if (mode == CalenderMode.Years) {
        /*
         * Dispalys 9 years at a time 
         * Arrows all user to move nine years up or down
         * On click zoom into the the year's month view
         */
        Calender = (
            
            <table class="YearCalender">
                <caption>
                    <div class="Cal-header">

                        <button class="Left" onClick={() => { setYear(YearDistance - 9) }}><div class="Left1">
                            &lt;
                        </div>
                            <div class="Left2">
                                &lt;
                            </div></button>
                        <button class="Right" onClick={() => { setYear(YearDistance + 9) }}>
                            <div class="Right1">
                                &gt;
                            </div>
                            <div class="Right2">
                                &gt;
                            </div>
                        </button>
                        <button class="headerText" >{ReturnYearHeader() }</button>
                    </div>
                </caption>
                      {/*
                      * returns each row in the years table
                      * allRowsForYears contains three array of an array of numbers
                      * each number indicates a position away from the center
                      */}
                    {allRowsForYears.map((items) => {
                       
                        return (
                        
                            <tr>
                                {
                                    items.map((item) => {
                                        var year = item + currentYearSelected;
                                        var color = InCurrentMonthClr;
                                        if (year == currentYear) {
                                            color = currentDayClr;
                                        }
                                        return (<td class="YearTD" style={{ background: color }}><button class="monthButton" onClick={() => {
                                            setYear(YearDistance + item);//sets the year the user clicked on  to the year to zoom to
                                            setMode(2);//set the mode
                                        }}>{year}</button></td>);


                                    })
                                }
                        </tr>
                        )
                    }
                    ) }
               

                </table>

            );
    }
   
    return (
        <center>
            {Calender}
        </center>
     
        );

}


// #region Day Assign
function returnDates(row, data) {//beginning of assigning days: Called from numOfRowsMainCal.map((index)=>returnDates(index, UserEvents))
    const posInTable = [1 + (row * 7), 2 + (row * 7), 3 + (row * 7), 4 + (row * 7), 5 + (row * 7), 6 + (row * 7), 7 + (row * 7)];
    /*
     *row*7 used to offset the number of rows down it is
     * data contains all the user events
     * Cycle threw each value in above array and generate the day for it
     */
 
    return (
        <tr>
            {posInTable.map((index)=>returnDay(index, data)) }
        </tr>
        );
}

function returnDay(CurrentBlock, data) {//logic for assigning day values: Called from returnDates(row, data)
    //data are all the events
  
    var day = 0;
    var DaysInMonth = new Date(currentYearSelected, currentMonthSelected + 1, 0).getDate();
    //plus one for month beacuse the returned month is a num from 0 to 11 while the new date takes a num from 1 to 12
    var MonthBefore = new Date(currentYearSelected, currentMonthSelected, 0);//finds number of days in last month
    
    var MonthBeforeDays = MonthBefore.getDate();//finds number of days in last month
    
    var DayOfWeek = new Date(currentYearSelected, currentMonthSelected, 1).getDay(); // gets days used by the month before in first week
    //this figures out which dates to display
    var color = InCurrentMonthClr;//default color 

    var BoxMonth=currentMonthSelected+1;//the month the box is
    var BoxYear=currentYearSelected;//the month the box is

    if (CurrentBlock <= DayOfWeek) {//days before current Month
        if (currentMonthSelected == 0) {//if the month is january, box month hsould be january
            BoxMonth = 12;
            BoxYear -= 1;
        } else {
            BoxMonth -= 1;
        }
        day = MonthBeforeDays - (DayOfWeek - CurrentBlock);

        var tempYearBefore = 0;
        var tempMonthBefore = 0;

        if (currentMonthSelected - 1 < 0) {

            tempMonthBefore = 11;
            tempYearBefore = currentYearSelected - 1;

        } else {
            tempMonthBefore = currentMonthSelected - 1;
            tempYearBefore = currentYearSelected ;
        }
        if (CurrentDay(day, tempMonthBefore, tempYearBefore)) {
            color = currentDayClr;
            
        } else {
            color = NotInCurrentMonthClr;
        }

    } else if (CurrentBlock > DaysInMonth + DayOfWeek) {//dates after current month
        if (currentMonthSelected == 11) {
            //if the month is december, box month should be january
            BoxMonth = 1;
            BoxYear += 1;
        } else {
            BoxMonth += 1;
        }
        day = CurrentBlock - (DaysInMonth + DayOfWeek);

        var tempYearBefore = 0;
        var tempMonthBefore = 0;

        if (currentMonthSelected + 1 > 11) {
            tempMonthBefore = 0;
            tempYearBefore = currentYearSelected + 1;
        } else {
            tempMonthBefore = currentMonthSelected +  1;
            tempYearBefore = currentYearSelected;
        }
        if (CurrentDay(day, tempMonthBefore, tempYearBefore)) {
            color = currentDayClr;
        } else {
            color = NotInCurrentMonthClr;
        }

    } else {//dates in current month
        
        day = CurrentBlock - DayOfWeek;

        if (CurrentDay(day, currentMonthSelected, currentYearSelected)) {
            color = currentDayClr;
        }

    }
    var TextValue = [];
   
    if (data != null) {
     
       
        for (var i = 0; i < data.length; i++) {
            console.log(data[i].Month);
            if (data[i].Month == BoxMonth && data[i].Year == BoxYear && day == data[i].Day) {
                
                if (TextValue == null) {
                    TextValue[0] =  data[i].Title;
                } else {
                    TextValue[TextValue.length] = data[i].Title;
                }
               
            }
        }
    } 

    return (//handle the due box things here
        <td style={{ background:  color  }} class="CalenderTD">
            <p class="textArea"> {day}</p>
            <div class="DueBox"> {
                TextValue.map((title)=>{
                    return (
                        
                        <p class="TextObject">{title}</p>
                        
                            );
                })
            }</div>

        </td>
        );
}
//#endregion




function ReturnDayOfWeek(index) {//returns the day of week header
    
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wensday", "Thursday", "Friday", "Saturday"];
    return <th width="122"> {daysOfWeek[index] } </th>
}


function CurrentDay(day, month, year) {//Checks to see if the passed year is the current year
    if (day == currentDay && month == currentMonth && year == currentYear) {
        return true;
    }
    return false;
}


function ReturnYearHeader() {//displays the year range for mode 3

    return (<div>{currentYearSelected - 4}-{ currentYearSelected+4}</div>)
}

