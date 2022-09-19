//Set date to display under jumbotron
var currentDay = moment().format('dddd, MMM Do');
//var currentTime = moment().format('[Current Time: ]HH:mm')

//Append to currentDay class
$("#currentDay").append(currentDay);
//$("#currentDay").after(currentTime);

//Dynamically update time with moment
function updateTime() {
    var currentTime = moment(new Date())

    $("#updateTime").html(currentTime.format('[Current Time: ]HH:mm'));
}

var saveBtn = $(".saveBtn");
var hour = $(".hour");
var description = $(".description");
var timeBlock = $(".time-block");

//Gets the current hour, compares the current hour to the time-blocks
//Adds classes related to what era in time the current hour is relative to the rest
function setEra() {

    //Grabs current hour as an integer using moment
    var currentHour = moment().hour();
    //console.log(currentHour);

    timeBlock.each(function() {

        var timeID = parseInt($(this).attr("id").slice(4));
        //console.log(timeID);

        if (timeID === currentHour) {
            $(this).addClass("present");
        } else if (timeID > currentHour) {
            $(this).addClass("future");
        } else {
            $(this).addClass("past");
        }
    })
}

//When clicking the save button, save items in local storage
saveBtn.on("click", function() {

    //Grab siblings from saveBtn class and store their values in storage
    var textArea = $(this).siblings(".description").val();
    //console.log(textArea);

    var time = $(this).siblings(".hour").text();
    //console.log(time);

    localStorage.setItem(time, textArea);
})

//Allow for keydown event of shiftkey+enter to save textarea content
description.keydown(function(event) {
    
    if (event.keyCode === 13 && event.shiftKey) {
        event.preventDefault();
        saveBtn.click();
    }
})

//Function to grab storage and keep it displayed on refresh
function getStorage() {

    //loop through hours and set items from local storage on refresh
    hour.each(function() {

        var savedText = $(this).text();
        //console.log(savedText);
        
        //Grabs stored text and sets it to sibling description
        $(this).siblings(".description").val(localStorage.getItem(savedText));
    })
}

//getStorage();
//setEra();
$(document).ready(function() {
    updateTime();
    getStorage();
    setEra();
    
    setInterval(updateTime, 1000);
    setInterval(setEra, 1000);
})