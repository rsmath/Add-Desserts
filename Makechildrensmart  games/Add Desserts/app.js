
/* when the start button is clicked, a div is made with appropriate 
   number of images of the dessert on the left side, and choices, on the
   right side. JS sees if choice picked is correct, and proceeds accordingly
*/

const round = 0; // up to 4
const sounds = ["audio/goodjob.mp3", "audio/ta-da.mp3", "audio/yay.mp3"];
const pics = ["art/chocolate.jpg", "art/cookie.jpg", "art/cupcake.jpg", "art/icecream.jpg",
              "art/lollipop.jpg"];
const altVals = ["chocolate", "cookie", "cupcake", "icecream", "lollipop"];

// DOM elements
const instructionsPage = document.getElementById("game-page");
const startbtn = document.getElementById("start-game");
const game = document.getElementById("main-game");
// choice buttons ==============================================
const buttons = document.querySelectorAll("div.choices button");
const btn1 = document.getElementById("choice1");
const btn2 = document.getElementById("choice2");
const btn3 = document.getElementById("choice3");
const btn4 = document.getElementById("choice4");
// =============================================================
const firstdessert = document.getElementById("first-dessert");
const seconddessert = document.getElementById("second-dessert");
const rounddisplay = document.getElementById("round");

// event listeners
startbtn.addEventListener("click", beginGame);

function beginGame() {
    instructionsPage.style.display = "none"; // hide the opening page
    game.style.visibility = "visible"; // show and start the game
    produceImages();
    rounddisplay.innerHTML = "Round: " + (round + 1);
    setBtns();
}


let num1 = Math.floor(Math.random() * 5 + 1) // first dessert
let num2 = Math.floor(Math.random() * 5 + 1) // second dessert

let correct = num1 + num2;


function produceImages() {
    // first dessert
    for (let i = 0; i < num1; i++) {
        let img = document.createElement("IMG");
        img.setAttribute("src", pics[round]);
        img.setAttribute("alt", altVals[round]);
        firstdessert.appendChild(img);
    }

    // second dessert
    for (let i = 0; i < num2; i++) {
        let img = document.createElement("IMG");
        img.setAttribute("src", pics[round]);
        img.setAttribute("alt", altVals[round]);
        seconddessert.appendChild(img);
    }
}

function setBtns() {
    let choicesmade = makeRandomDigits(correct);
    for (let i = 0; i < choicesmade.length; i++) {
        buttons[i].innerHTML = choicesmade[i];
    }
}

// defining an insert function for array
Array.prototype.insert = function ( index, item ) {
    this.splice( index, 0, item );
};

// function to make a random list of choices but on correct one passed in the parameter
function makeRandomDigits(num) {
    var arr = []
    while(arr.length < 3){
    var randomnumber = Math.floor(Math.random() * 10 + 1); // random digits from 1 to 10 inclusive
    if(arr.indexOf(randomnumber) > -1 || randomnumber == num) continue;
    arr[arr.length] = randomnumber;
    }
    place = Math.floor(Math.random() * arr.length);
    arr.insert(place, num);
    arr = shuffle(arr);
    return arr; // the 4 random but containing 1 correct answer choices
}

// implemented function to shuffle the array with Fisher-Yates shuffle
function shuffle(array) {
    let counter = array.length;

    // while there are elements
    while (counter > 0) {
        // random index
        let index = Math.floor(Math.random() * counter);

        counter--;

        // swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

function clicked(num) {
    let goodjob = new Audio(sounds[Math.floor(Math.random() * 3)]);
    let currentBtn = buttons[num - 1];
    let choicePicked = Number(currentBtn.innerHTML);
    if (choicePicked == correct) {
        currentBtn.style.color = "green";
        goodjob.play();
        goodjob.loop = false;
        return;
    }
    else {
        currentBtn.style.color = "red";
    }
}