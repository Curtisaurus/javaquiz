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
        clue: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        options: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    },
]

// assigning page elements to variables
var startBtn = document.querySelector("#start");
var quizArea = document.querySelector("#quiz-area");
var timerEl = document.querySelector("#timer");
// setting initial values for timer and question index
var timeLeft = 75;
var qIndex = 0;

// clears page, starts timer, and renders questions on start button click
startBtn.addEventListener("click", function() {
    quizArea.innerHTML = "";
    startTimer();
    renderQuiz();
})

// countdown timer function
function startTimer() {
    quizTimer = setInterval(function() {
        timeLeft--;
        timerEl.textContent = "Time: " + timeLeft;

        if (timeLeft <= 0) {
            clearInterval(quizTimer);
        }
    }, 1000)
}

// renders quiz questions based on value of qIndex
function renderQuiz() {
    quizArea.innerHTML = "";
    quizArea.textContent = questions[qIndex].clue;

    // placeholder ul to hold list item answers
    var ulEl = document.createElement('ul');
    quizArea.appendChild(ulEl);

    var options = questions[qIndex].options

    // loops through possible answers in array in object at qIndex
    // these are appended into the ul just below the clue/question as list items
    for (i = 0; i < options.length; i++) {
        var quizOption = document.createElement("li");
        quizOption.textContent = options[i];
        ulEl.appendChild(quizOption);
        quizOption.addEventListener("click", check);
    }
}

// checks if answer is correct
function check(event) {
    var guess = event.target.textContent;
    var answer = questions[qIndex].answer;

    if (guess != answer) {
        timeLeft = timeLeft - 10;
    }

    qIndex++;
    renderQuiz();
}