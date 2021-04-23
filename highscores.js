// retrieves scores from local storage and converts back to array
var highScores = JSON.parse(localStorage.getItem("highScores"));

// assigns page elements to variables
var scoreboard = document.querySelector("#scoreboard")
var backBtn = document.querySelector("#back");
var clearBtn = document.querySelector("#clear");

renderScores();

// goes back to quiz page
backBtn.addEventListener("click", function() {
    window.location.replace("index.html");
})

// clears score array and adds it to local storage
clearBtn.addEventListener("click", function() {
    localStorage.clear();
    scoreboard.innerHTML = ""
})

// loops through score array and creates list item for each initial-score pair
function renderScores() {
    for (i = 0; i < highScores.length; i++) {
        var atScore = highScores[i];
    
        var entry = document.createElement("li");
        entry.textContent = atScore.initials + " - " + atScore.score;
        scoreboard.appendChild(entry);
    }    
}