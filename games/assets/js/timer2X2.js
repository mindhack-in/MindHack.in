let startTime,
  interval,
  isRunning = false;
let times = JSON.parse(localStorage.getItem("solves2X2")) || [];
let solves = JSON.parse(localStorage.getItem("solveData2X2")) || [];

const scrambleMoves = [
  "R",
  "R'",
  "R2",
  "U",
  "U'",
  "U2",
  "L",
  "L'",
  "L2",
  "F",
  "F'",
  "F2",
  "D",
  "D'",
  "D2",
  "B",
  "B'",
  "B2",
];

function formatTime(ms) {
  return (ms / 1000).toFixed(2);
}

function updateTimer() {
  const elapsed = Date.now() - startTime;
  document.getElementById("timer").textContent = formatTime(elapsed);
}

function startTimer() {
  if (isRunning) return;
  const hideTime = document.getElementById("hideTime").checked;
  if (hideTime) document.getElementById("timer").style.visibility = "hidden";

  const inspection = parseInt(document.getElementById("inspection").value);
  if (inspection > 0) {
    let count = inspection;
    document.getElementById("timer").textContent = `Inspection: ${count}`;
    const countdown = setInterval(() => {
      count--;
      document.getElementById("timer").textContent = `Inspection: ${count}`;
      if (count <= 0) {
        clearInterval(countdown);
        actuallyStart();
      }
    }, 1000);
  } else {
    actuallyStart();
  }
}

function actuallyStart() {
  startTime = Date.now();
  interval = setInterval(updateTimer, 10);
  isRunning = true;
  document.getElementById("timer").style.visibility = "visible";
}

function stopTimer() {
  if (!isRunning) return;
  clearInterval(interval);
  isRunning = false;
  const elapsed = Date.now() - startTime;
  const time = formatTime(elapsed);
  const scramble = document.getElementById("scramble").textContent;
  const date = new Date().toLocaleDateString("en-IN");
  document.getElementById("timer").textContent = time;
  saveToHistory(time, scramble, date);
  generateScramble();
}

function resetTimer() {
  clearInterval(interval);
  isRunning = false;
  document.getElementById("timer").textContent = "00.00";
}

function generateScramble() {
  let scramble = "",
    last = "";
  for (let i = 0; i < 7; i++) {
    let move;
    do {
      move = scrambleMoves[Math.floor(Math.random() * scrambleMoves.length)];
    } while (move[0] === last);
    scramble += move + " ";
    last = move[0];
  }
  document.getElementById("scramble").textContent = scramble.trim();
}

function saveToHistory(time, scramble, date) {
  times.push(parseFloat(time));
  solves.push({ time, scramble, date });
  localStorage.setItem("solves2X2", JSON.stringify(times));
  localStorage.setItem("solveData2X2", JSON.stringify(solves));
  renderHistory();
  updateAverages();
}
let currentPage = 1;
const resultsPerPage = 12;

function renderHistory() {
  const table = document.getElementById("historyTable");
  table.innerHTML = "";
  
  const start = (currentPage - 1) * resultsPerPage;
  const end = start + resultsPerPage;
  
  const paginatedResults = solves.slice().reverse().slice(start, end);

  paginatedResults.forEach((entry) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${entry.time}</td><td>${entry.scramble}</td><td>${entry.date}</td>`;
    table.appendChild(row);
  });

  renderPagination();
}

function renderPagination() {
  const paginationContainer = document.getElementById("pagination");
  const totalPages = Math.ceil(solves.length / resultsPerPage);
  
  paginationContainer.innerHTML = "";  // Clear previous pagination links

  if (currentPage > 1) {
    const prevButton = document.createElement("button");
    prevButton.innerText = "Previous";
    prevButton.onclick = () => {
      currentPage--;
      renderHistory();
    };
    paginationContainer.appendChild(prevButton);
  }

  for (let page = 1; page <= totalPages; page++) {
    const pageButton = document.createElement("button");
    pageButton.innerText = page;
    pageButton.onclick = () => {
      currentPage = page;
      renderHistory();
    };
    if (page === currentPage) {
      pageButton.disabled = true;
    }
    paginationContainer.appendChild(pageButton);
  }

  if (currentPage < totalPages) {
    const nextButton = document.createElement("button");
    nextButton.innerText = "Next";
    nextButton.onclick = () => {
      currentPage++;
      renderHistory();
    };
    paginationContainer.appendChild(nextButton);
  }
}


function calculateAverage(n) {
  const validTimes = times.filter((t) => typeof t === "number");
  if (validTimes.length < n) return "-";
  const recent = validTimes.slice(-n);
  const sum = recent.reduce((a, b) => a + b, 0);
  return (sum / n).toFixed(2);
}

function updateAverages() {
  document.getElementById("avg5").textContent = calculateAverage(5);
  document.getElementById("avg12").textContent = calculateAverage(12);
}

function exportToCSV() {
  let csv = "Time,Scramble,Date\n";
  solves.forEach((entry) => {
    csv += `"${entry.time}","${entry.scramble}","${entry.date}"\n`;
  });
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "rubik_timer_solves.csv";
  a.click();
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    isRunning ? stopTimer() : startTimer();
  }
});

window.onload = () => {
  generateScramble();
  renderHistory();
  updateAverages();

  document.getElementById("showScramble").onchange = (e) => {
    document.getElementById("scrambleSection").style.display = e.target.checked
      ? "flex"
      : "none";
  };

  document.getElementById("hideTime").onchange = (e) => {
    if (!isRunning) {
      document.getElementById("timer").style.visibility = e.target.checked
        ? "hidden"
        : "visible";
    }
  };
};

function startStopTimer(){
  if(isRunning)
    stopTimer();
  else 
    startTimer();
}