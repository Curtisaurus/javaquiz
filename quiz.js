var startBtn = document.querySelector("#start");
var quizArea = document.querySelector("#quiz-area");
var timerEl = document.querySelector("#timer");
var timeLeft = 75;

startBtn.addEventListener("click", function() {
    quizArea.innerHTML = "";
    startTimer();
})


function startTimer() {
    quizTimer = setInterval(function() {
        timeLeft--;
        timerEl.textContent = "Time: " + timeLeft;

        if (timeLeft <= 0) {
            clearInterval(quizTimer);
        }
    }, 1000)
}