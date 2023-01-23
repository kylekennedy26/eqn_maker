"use strict";

var userAnswer = null;

function displayEQN () {  //Creates five number cards and an answer card for users 
    const getBox = 45; //parseInt(document.querySelector(".displayBox").value);
    const resultBox = document.querySelector(".endResult");
    const outTable = document.querySelector(".table");
    if(isNaN(getBox)){
        //catch bad input here
        console.log("Bad input");
    }
    else{
        if(outTable.hasChildNodes()){
            //console.log("Table has children");
            outTable.innerHTML = null;
            resultBox.innerHTML = null;
            console.log("Child 0: " + outTable.childNodes[0]);
        }
        var input = [1];
        input[0] = (getBox);
        var currentdate = new Date();
        var seed = hash(currentdate.getDay() + "/" + currentdate.getMonth() + "/" + currentdate.getFullYear() + " @ " + currentdate.getHours());
        console.log(seed + "\n" + currentdate);
        for(var i = 0; i < 5; i++){
            var x = Math.floor(seed % 10) + 1;
            if(x == 10){
                x = 9;
            }
            input.unshift(x);
            seed = seed / 10;
        }
        for(var i = 0; i < input.length; i++){
            //console.log("Index: " + i + " length = " + input.length);
            if(i+1 == input.length){ //Create a non-draggle result element
                var equal = document.createElement("p");
                equal.innerHTML = "=";
                equal.className = "equals";
                equal.draggable = "false";
                resultBox.appendChild(equal);
                
                var number = document.createElement("p");
                number.innerHTML = String(input[i]);
                number.className = "result";
                number.draggable = "false";
                resultBox.appendChild(number);
            }
            else{
                var number = document.createElement("p");
                number.innerHTML = input[i];
                number.className = "draggable";
                number.draggable = "true";
                outTable.appendChild(number);
                addListeners();
            }
        
        }
    }
}

function getUserAnswer() {
    const userTable = document.querySelector(".table");
    const cards = [...userTable.querySelectorAll('.draggable')];
    var userStr = "";
    cards.forEach(card => {
        userStr = userStr + card.innerHTML;
        console.log("Card is: " + card.innerHTML);
    });
    console.log("User answer is: " + userStr);
    return userStr;
}