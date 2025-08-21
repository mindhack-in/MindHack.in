const puzzle = document.getElementById("puzzle");
const moveCountEl = document.getElementById("moveCount");
const messageEl = document.getElementById("message");
const historyBody = document.getElementById("historyBody");
let tiles = [];
let moveCount = 0;

function init() {
  tiles = [];
  for (let i = 1; i <= 15; i++) {
    tiles.push(i);
  }
  tiles.push(""); // empty tile
  renderTiles();
  loadHistory();
  shuffleTiles();
}

function renderTiles() {
  puzzle.innerHTML = "";
  tiles.forEach((val, idx) => {
    const tile = document.createElement("div");
    tile.className = "tile";
    if (val === "") {
      tile.classList.add("empty");
    } else {
      tile.textContent = val;
      tile.addEventListener("click", () => moveTile(idx));
    }
    puzzle.appendChild(tile);
  });
}

function moveTile(idx) {
  const emptyIdx = tiles.indexOf("");
  const validMoves = [idx - 1, idx + 1, idx - 4, idx + 4];

  if (
    validMoves.includes(emptyIdx) &&
    !(idx % 4 === 0 && emptyIdx === idx - 1) &&
    !(idx % 4 === 3 && emptyIdx === idx + 1)
  ) {
    [tiles[idx], tiles[emptyIdx]] = [tiles[emptyIdx], tiles[idx]];
    moveCount++;
    moveCountEl.textContent = moveCount;
    renderTiles();
    checkWin();
  }
}

function shuffleTiles() {
  let currentIndex = tiles.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [tiles[currentIndex], tiles[randomIndex]] = [
      tiles[randomIndex],
      tiles[currentIndex],
    ];
  }

  if (!isSolvable(tiles) || isSolved()) {
    shuffleTiles();
    return;
  }

  moveCount = 0;
  moveCountEl.textContent = moveCount;
  messageEl.textContent = "";
  renderTiles();
}

function isSolvable(array) {
  let invCount = 0;
  let emptyRow = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] === "") {
      emptyRow = Math.floor(i / 4);
      continue;
    }
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] !== "" && array[i] > array[j]) invCount++;
    }
  }
  return (invCount + emptyRow) % 2 === 0;
}

function isSolved() {
  for (let i = 0; i < 15; i++) {
    if (tiles[i] !== i + 1) return false;
  }
  return tiles[15] === "";
}

function checkWin() {
  if (isSolved()) {
    messageEl.textContent = "🎉 You Win!";
    saveHistory(moveCount, "Win");
    loadHistory();
  }
}

function saveHistory(moves, status) {
  let history = JSON.parse(localStorage.getItem("puzzleHistory")) || [];
  history.push({
    date: new Date().toLocaleString(),
    moves: moves,
    status: status,
  });
  localStorage.setItem("puzzleHistory", JSON.stringify(history));
}

function loadHistory() {
  let history = JSON.parse(localStorage.getItem("puzzleHistory")) || [];
  historyBody.innerHTML = "";
  history.forEach((h) => {
    let row = `<tr>
          <td>${h.date}</td>
          <td>${h.moves}</td>
          <td>${h.status}</td>
        </tr>`;
    historyBody.innerHTML += row;
  });
}
function shuffleTiles() {
  let currentIndex = tiles.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [tiles[currentIndex], tiles[randomIndex]] = [
      tiles[randomIndex],
      tiles[currentIndex],
    ];
  }

  if (!isSolvable(tiles) || isSolved()) {
    shuffleTiles();
    return;
  }

  // Save previous game as unsolved before starting a new one
  if (moveCount > 0 || messageEl.textContent !== "") {
    saveHistory(moveCount, "Unsolved");
    loadHistory();
  }

  moveCount = 0;
  moveCountEl.textContent = moveCount;
  messageEl.textContent = "";
  renderTiles();
}

init();
