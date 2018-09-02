
/* when the start button is clicked, a div is made with appropriate 
   number of images of the dessert on the left side, and choices, on the
   right side. JS sees if choice picked is correct, and proceeds accordingly! 
*/

let round = 0; // up to 4
const sounds = ["audio/goodjob.mp3", "audio/ta-da.mp3", "audio/yay.mp3", "audio/andonemoremakes.mp3",
                "audio/keepTrying.mp3", "audio/TryAgain.wav", "audio/TryAgain2.wav", "audio/tryAgainSong.mp3"];
const pics = ["art/chocolate.jpg", "art/cookie.jpg", "art/cupcake.jpg", "art/icecream.jpg",
              "art/lollipop.jpg"];
const altVals = ["chocolate", "cookie", "cupcake", "icecream", "lollipop"];

// DOM elements
const instructionsPage = document.getElementById("game-page");
const startbtn = document.getElementById("start-game");
const game = document.getElementById("main-game");


// choice buttons ==============================================
var buttons = document.querySelectorAll("div.choices button");
// =============================================================

const firstdessert = document.getElementById("first-dessert");
const seconddessert = document.getElementById("second-dessert");

// dessert pictures, defined in beginGame()
// =================================================================
var firstPics; 
var secondPics;
// =================================================================

const rounddisplay = document.getElementById("round");

// GLOBAL VARS BELOW ================================================
var num1;
var num2;
var correct;

function getRandPics() {
    return Math.floor(Math.random() * 5 + 1); 
}

num1 = getRandPics(); // firstdessert
num2 = getRandPics(); // seconddessert
correct = num1 + num2;

// ======================================================================

// ================================== REMANING LOGIC OG GAME ===============================================================
// =========================================================================================================================


// event listeners
startbtn.addEventListener("click", beginGame);

function beginGame() {
    // resetting the buttons to be clickable
    for (let i = 0; i < buttons.length; i++) 
                buttons[i].disabled = false;


    instructionsPage.style.display = "none"; // hide the opening page
    game.style.visibility = "visible"; // show and start the game
    produceImages();
    firstPics = document.querySelectorAll("div.first-dessert img");
    secondPics = document.querySelectorAll("div.second-dessert img");
    rounddisplay.innerHTML = "Round: " + (round + 1);
    setBtns(correct);
    round++;
}

function produceImages() {
    // first dessert
    for (let i = 0; i < num1; i++) {
        let img = document.createElement("IMG");
        img.setAttribute("src", pics[round]);
        img.setAttribute("alt", altVals[round]);
        img.setAttribute("id", "pic" + i);
        firstdessert.appendChild(img);
    }

    // second dessert
    for (let i = 0; i < num2; i++) {
        let img = document.createElement("IMG");
        img.setAttribute("src", pics[round]);
        img.setAttribute("alt", altVals[round]);
        img.setAttribute("id", "pic" + i);
        seconddessert.appendChild(img);
    }
}

function removeCurrentPics() {
    // removing firstdessert img
    for (let i = 0; i < num1; i++) 
        firstdessert.removeChild(firstPics[i]);

    // removing seconddessert img
    for (let i = 0; i < num2; i++) 
        seconddessert.removeChild(secondPics[i]);
}

function setBtns(correct) {
    let choicesmade = makeRandomDigits(correct);
    for (let i = 0; i < choicesmade.length; i++) {
        buttons[i].innerHTML = choicesmade[i];
        buttons[i].style.color = "rgb(20, 33, 224)";
    }
}

// defining an insert function for array
Array.prototype.insert = function ( index, item ) {
    this.splice( index, 0, item );
};

// function to make a random list of choices but one correct one passed in the parameter
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

var numClicked = 0; // counting number of times answer attempted

function clicked(num) {
    let goodjob = new Audio(sounds[Math.floor(Math.random() * 3)]);
    let tryOnceMore = new Audio(sounds[Math.floor(Math.random() * 4) + 4]);

    let currentBtn = buttons[num - 1];
    let choicePicked = Number(currentBtn.innerHTML);

    if (numClicked <= 2) {
        if (choicePicked == correct) {
            currentBtn.style.color = "green";
            
            goodjob.play();
            goodjob.loop = false;

            // disabling the buttons so no more audio 
            for (let i = 0; i < buttons.length; i++) 
                buttons[i].disabled = true;
            
            // since beingGame() is to be called after, timeout function calls that in 2 seconds
            setTimeout(beginGame, 2000);

            removeCurrentPics();

            // resetting the img numbers
            num1 = getRandPics(); // firstdessert
            num2 = getRandPics(); // seconddessert
            correct = num1 + num2;

            return;
        }
        else {
            currentBtn.style.color = "red";
            tryOnceMore.play();
            tryOnceMore.loop = false;
            numClicked++;
            return;
        }
    }
    currentBtn.style.color = "green";
    setTimeout(beginGame, 2000);
    removeCurrentPics();
}

