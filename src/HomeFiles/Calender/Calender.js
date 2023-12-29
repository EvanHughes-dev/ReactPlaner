import * as React from 'react';

import './Calender.css'
import { useState, useEffect } from "react";

//color conststatns
const NotInCurrentMonthClr = "#808080";
const InCurrentMonthClr = "#74C2E1";
const currentDayClr = "#0191C8"
//end of color conststants

const CalenderMode = {
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

var AllMonths = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const Row1Months = [0, 1, 2, 3];
const Row2Months = [4, 5, 6, 7];
const Row3Months = [8, 9, 10, 11];

const row1Years = [0, 1, 2];
const row2Years = [ 3, 4, 5, ];
const row3Years = [6, 7, 8];

const allRows = [row1Years, row2Years, row3Years];

const numOfRows = [0,1, 2, 3, 4, 5];
const numOfColumns = [0,1, 2, 3, 4, 5, 6];






export default function Calender() {//creates the main calender
  
   /* const [data, setData] = useState(null);*/
    var data;
    

    if (sessionStorage.getItem("data") != null) {
        if (JSON.parse(sessionStorage.getItem("data")) != data) {
            data = JSON.parse(sessionStorage.getItem("data"))
        }

    } else {
        data = null;
    }

    var date = new Date();
    const [MonthDistance, setMonth] = useState(0);
    const [YearDistance, setYear] = useState(0);
    const [mode, setMode] = useState(1);
    
    currentDay = date.getDate();
    currentMonth = date.getMonth();
    

    if (currentMonth + MonthDistance < 0) {
        setMonth(  12 + MonthDistance);

        setYear(YearDistance-1);

        // root.render(<App />);
    } else if (currentMonth +MonthDistance > 11) {
        setMonth( MonthDistance-12);
        console.log(MonthDistance-12);
        setYear(YearDistance + 1);

        //root.render(<App />);
    }

    currentMonthSelected = currentMonth + MonthDistance;
    currentYear = date.getFullYear();
    currentYearSelected = currentYear + YearDistance;
  
   
    var cal;
    //this section creates the calender based on the current mode the calender is in
    if (mode == CalenderMode.Day) {

    }
    else if (mode == CalenderMode.Month) {
        cal = (
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
                    {numOfColumns.map(ReturnDayOfWeek)}
                    {/*Creates the sunday - monday*/ }
                    </tr>

                {numOfRows.map((index)=>returnDates(index, data))}
                {/*Creates the days*/}
                </table>
        );
    }
    else if (mode == CalenderMode.Year) {
        cal = (
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


                <tr>
                    
                    {Row1Months.map((index) => {
                        var color = InCurrentMonthClr;
                        if (CurrentDay(currentDay, index, currentYearSelected)) {
                            color = currentDayClr;
                        }

                        return (<td class="MonthTd" style={{ background: color }}>  <button class="monthButton" onClick={() => {
                            var sum = index - currentMonth;
                            
                            setMonth(sum);
                            setMode(1);
                        }}>{AllMonths[index]}</button></td>)
                    })}{ /*First row of months*/}
                    </tr>
                    <tr>
                    {Row2Months.map((index) => {
                        var color = InCurrentMonthClr;
                        if (CurrentDay(currentDay, index, currentYearSelected)) {
                            color = currentDayClr;
                        }

                        return (<td class="MonthTd" style={{ background: color }}>  <button class="monthButton" onClick={() => {
                            var sum = index - currentMonth;

                            setMonth(sum);
                            setMode(1);
                        }}>{AllMonths[index]}</button></td>)
                    })}{ /*Second row of months*/}
                    </tr>
                    <tr>
                    {Row3Months.map((index) => {
                        var color = InCurrentMonthClr;
                        if (CurrentDay(currentDay, index, currentYearSelected)) {
                            color = currentDayClr;
                        }

                        return (<td class="MonthTd" style={{ background: color }}>  <button class="monthButton" onClick={() => {
                            var sum = index - currentMonth;

                            setMonth(sum);
                            setMode(1);
                        }}>{AllMonths[index]}</button></td>)
                    })}{ /*Third row of months*/}
                    </tr>
                </table>
        );
    }
    else if (mode == CalenderMode.Years) {
        cal = (
            
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
               
                    {allRows.map((items) => {
                        {/*creates the 9 year view*/ }
                        return (
                            <tr>
                                {
                                    items.map((item) => {
                                        var year = item + currentYearSelected - 4;
                                        var color = InCurrentMonthClr;
                                        if (year == currentYear) {
                                            color = currentDayClr;
                                        }
                                        return (<td class="YearTD" style={{ background: color }}><button class="monthButton" onClick={() => {
                                            setYear(YearDistance + item - 4);//sets teh year. -4 because the cener year is the selected year
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
            {cal}
        </center>
     
        );

}


// #region Day Assign
function returnDates(row, data) {
    const posInTable = [1 + (row * 7), 2 + (row * 7), 3 + (row * 7), 4 + (row * 7), 5 + (row * 7), 6 + (row * 7), 7 + (row * 7)];

    //data is all the events
    //handle setting the values here
    return (
        <tr>
            {posInTable.map((index)=>returnDay(index, data)) }
        </tr>
        );
}

function returnDay(CurrentBlock, data) {//logic for assigning day values
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




function ReturnDayOfWeek(index) {
    
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wensday", "Thursday", "Friday", "Saturday"];
    return <th width="122"> {daysOfWeek[index] } </th>
}


function CurrentDay(day, month, year) {
    if (day == currentDay && month == currentMonth && year == currentYear) {
        return true;
    }
    return false;
}


function ReturnYearHeader() {


    return (<div>{currentYearSelected - 4}-{ currentYearSelected+4}</div>)

}

