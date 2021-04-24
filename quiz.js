// Questions and answers for quiz
var questions = [
    {
        clue: "The method to convert an object into a string is JSON.____",
        options: ["string()", "stringify()", "parse()", "value()"],
        answer: "stringify()"
    },
    {
        clue: "If / else statements require a ____ statement which must be a boolean expression.",
        options: ["comparison", "equality", "conditional", "strict"],
        answer: "conditional"
    },
    {
        clue: "Arrays in Javascript can be used to store ____.",
        options: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        clue: "String values must be enclosed within ____ when being assigned to variables.",
        options: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        clue: "A very useful tool used during development and debugging for printing content to the debugger is:",
        options: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    },
]

// assigning page elements to variables
var startBtn = document.querySelector("#start");
var quizArea = document.querySelector("#quiz-area");
var timerEl = document.querySelector("#timer");
var resultArea = document.querySelector("#result-area");
// setting initial values for timer and question index
var timeLeft = 75;
var qIndex = 0;
// declaring setInterval variable as global to clear anywhere
var quizTimer;
// declaring result area variable to be cleared upon question selection
var result;

// clears page, starts timer, and renders questions on start button click
startBtn.addEventListener("click", function() {
    quizArea.innerHTML = "";
    renderQuiz();
    startTimer();
})

// countdown timer function
function startTimer() {
    quizTimer = setInterval(function() {
        timeLeft--;
        timerEl.textContent = "Time: " + timeLeft;

        if (timeLeft <= 0) {
            clearInterval(quizTimer);
            endQuiz();
        }
    }, 1000)
}

// renders quiz questions based on value of qIndex
function renderQuiz() {
    quizArea.innerHTML = "";

    var questionText = document.createElement("h2");
    questionText.textContent = questions[qIndex].clue;
    quizArea.appendChild(questionText);

    // assigns possible quiz options to variable
    var options = questions[qIndex].options

    // loops through possible answers in array in object at qIndex
    // these are appended into the quiz area just below the clue/question as buttons
    for (i = 0; i < options.length; i++) {
        var quizOption = document.createElement("button");
        quizOption.textContent = options[i];
        quizArea.appendChild(quizOption);
        quizOption.addEventListener("click", check);
    }
}

// checks if answer is correct
function check(event) {
     
    // removes result display from last question
    if (result) {
        result.remove();
    }

    // declares variables for user selection and answer for question
    var guess = event.target.textContent;
    var answer = questions[qIndex].answer;

    // creates a div to display result outside of quizArea (quizArea cleared on question render)
    result = document.createElement("div")
    result.setAttribute("id", "result");

    // compares answer and user selection, changing content of result div to reflect
    if (guess != answer) {
        timeLeft = timeLeft - 15;
        result.textContent = "Incorrect";
    } else {
        result.textContent = "Correct!"
    }

    // advances index for questions array - loads next question
    qIndex++;

    // runs quiz if there are questions left, else stops timer runs end-of-quiz function
    if (qIndex < questions.length) {
        renderQuiz();
    } else {
        endQuiz();
        clearInterval(quizTimer);
    }

    // show whether question was right or wrong for 1 second
    resultArea.appendChild(result)
    setTimeout(function() {
        result.remove();
    }, 1000);
}

function endQuiz() {
    quizArea.innerHTML = "";
    timerEl.textContent = "";

    // creates "game over" text
    var endText = document.createElement("h1");
    endText.textContent = "Game Over";
    quizArea.appendChild(endText);

    // creates and displays final score
    var scoreText = document.createElement("p");
    scoreText.textContent = "Your final score was: " + timeLeft;
    quizArea.appendChild(scoreText);

    // creates area for submit form, button, and label to be displayed in a row
    var submitEl = document.createElement("div");
    submitEl.setAttribute("id", "sumbit-area");
    quizArea. appendChild(submitEl);

    // creates label for input textbox
    var inputLabel = document.createElement("label");
    inputLabel.textContent = "Enter your initials:";
    submitEl.appendChild(inputLabel);

    // creates input textbox for initials
    var initialBox = document.createElement("input");
    submitEl.appendChild(initialBox);

    // button to submit initials
    var initialSubmit = document.createElement("button");
    initialSubmit.setAttribute("type", "submit");
    initialSubmit.textContent = "Submit";
    submitEl.appendChild(initialSubmit);

    // on clicking the submit button...
    initialSubmit.addEventListener("click", function() {
        // ...input box value is stored in variable...
        var initials = initialBox.value;

        // ...initials and score are assigned to an object...
        var scoreboard = {
            initials: initials,
            score: timeLeft
        }

        // ...and high scores are retrieved from local
        var highScores = localStorage.getItem("highScores");

        // if high score array doesn't exist, start empty score array...
        if (!highScores) {
            highScores = [];
        // ...otherwise parse string to array
        } else {
            highScores = JSON.parse(highScores);
        }

        // adds new initial + score object to score arry
        highScores.push(scoreboard);
        // stores locally
        var scoresString = JSON.stringify(highScores);
        localStorage.setItem("highScores", scoresString);
        // load high scores page
        window.location.replace("highscores.html");
    })
}