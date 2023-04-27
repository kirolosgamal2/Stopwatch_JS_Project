// JS

const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const millisecondsDisplay = document.getElementById("milliseconds");
const totalMinutesDisplay = document.getElementById("total-minutes");
const totalSecondsDisplay = document.getElementById("total-seconds");
const totalMillisecondsDisplay = document.getElementById("total-milliseconds");
const lapsDiv = document.querySelector(".laps");

let startTime;
let elapsedTime = 0;
let totalElapsedTime = 0;
let timerInterval;

function timeToString(time) {
  let minutes = Math.floor(time / 60000);
  let seconds = Math.floor((time % 60000) / 1000);
  let milliseconds = time % 1000;

  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${milliseconds.toString().padStart(3, "0")}`;
}

function start() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    totalElapsedTime = elapsedTime;
    const timeString = timeToString(elapsedTime);
    const totalTimeString = timeToString(totalElapsedTime);
    [minutesDisplay.textContent, secondsDisplay.textContent, millisecondsDisplay.textContent] = timeString.split(":");
    [totalMinutesDisplay.textContent, totalSecondsDisplay.textContent, totalMillisecondsDisplay.textContent] = totalTimeString.split(":");
  }, 10);

  startButton.disabled = true;
  stopButton.disabled = false;
  resetButton.disabled= false;
  lapButton.disabled = false;
  }
  
  function stop() {
  clearInterval(timerInterval);
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = false;
  lapButton.disabled = true;
  }
  
  function reset() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  totalElapsedTime = 0;
  [minutesDisplay.textContent, secondsDisplay.textContent, millisecondsDisplay.textContent] = ["00", "00", "000"];
  [totalMinutesDisplay.textContent, totalSecondsDisplay.textContent, totalMillisecondsDisplay.textContent] = ["00", "00", "000"];
  lapsDiv.innerHTML = "";
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = true;
  lapButton.disabled = true;
  }
  
  function lap() {
  const lapTime = timeToString(elapsedTime);
  const lapElement = document.createElement("div");
  lapElement.textContent = `Lap ${lapsDiv.children.length + 1}: ${lapTime}`;  lapsDiv.insertBefore(lapElement, lapsDiv.firstChild);
  }
  
  startButton.addEventListener("click", start);
  stopButton.addEventListener("click", stop);
  resetButton.addEventListener("click", reset);
  lapButton.addEventListener("click", lap);