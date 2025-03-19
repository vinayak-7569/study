let timeLeft = 0;  // Start with no time
let timerInterval;
let isRunning = false;

function startTimer() {
    // If the timer isn't running, we set the timer to the input time
    if (!isRunning) {
        const inputTime = parseInt(document.getElementById("timeInput").value);
        
        // If input is invalid, show an error
        if (!inputTime || inputTime < 1) {
            alert("Please enter a valid time in minutes.");
            return;
        }

        timeLeft = inputTime * 60;  // Convert minutes to seconds
    }

    isRunning = true;

    // Start or resume the timer
    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Time's up! Take a break!");
            resetTimer();  // Reset timer when time is up
        } else {
            timeLeft--;  // Decrement the time
            updateTimerDisplay();  // Update the display
        }
    }, 1000);

    // Disable Start button and enable Pause button
    document.getElementById("startButton").disabled = true;
    document.getElementById("pauseButton").disabled = false;
}

function pauseTimer() {
    // Pause the timer and save the current time
    clearInterval(timerInterval);
    isRunning = false;

    // Disable Pause button and enable Start button
    document.getElementById("startButton").disabled = false;
    document.getElementById("pauseButton").disabled = true;
}

function resetTimer() {
    // Reset the timer and input
    clearInterval(timerInterval);
    timeLeft = 0;
    isRunning = false;
    updateTimerDisplay();  // Reset the display

    // Enable Start button and disable Pause button
    document.getElementById("startButton").disabled = false;
    document.getElementById("pauseButton").disabled = true;
}

function updateTimerDisplay() {
    let minutes = Math.floor(timeLeft / 60);  // Get minutes
    let seconds = timeLeft % 60;  // Get seconds
    let timerElement = document.getElementById("timer");

    // Format the timer as MM:SS (with leading zero if necessary)
    timerElement.innerText = `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}

// Event listeners for the buttons
document.getElementById("startButton").addEventListener("click", startTimer);
document.getElementById("pauseButton").addEventListener("click", pauseTimer);
document.getElementById("resetButton").addEventListener("click", resetTimer);
