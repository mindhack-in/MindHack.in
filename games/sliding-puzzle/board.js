const colors = [
  "#ff7f00",
  "#ffff00",
  "#00ff00",
  "#00ffff",
  "#0000ff",
  "#ff00ff",
  "#ff0000",
  "#ffa500",
  "#9400d3",
  "#1e90ff",
  "#32cd32",
  "#ffd700",
  "#00ced1",
  "#ff1493",
  "#8b0000",
  "#20b2aa",
];

const gamePage = document.getElementById("gamePage");
const puzzle = document.getElementById("puzzle");
const moveCountEl = document.getElementById("moveCount");
const messageEl = document.getElementById("message");

let gridSize = 4;
let tiles = [];
let moveCount = 0;
let isShuffling = false;

function sendValue(val) {
  gridSize = val;
  gamePage.classList.add("active");
  init();
}
const size = window.pageConfig?.size ? parseInt(window.pageConfig.size) : 1;
sendValue(size);
function startGame() {
  gridSize = parseInt(document.getElementById("gridSizeSelect").value);
  gamePage.classList.add("active");
  init();
}

function shuffleTiles() {
  saveHistory(moveCount, "Unsolved");
  init();
}
function goBack() {
  if (isShuffling) return;
  gamePage.classList.remove("active");
}

function init() {
  tiles = [];
  for (let i = 1; i < gridSize * gridSize; i++) tiles.push(i);
  tiles.push("");
  moveCount = 0;
  moveCountEl.textContent = moveCount;
  messageEl.textContent = "";

  renderTiles();
  animateShuffleGuaranteed();
}

function renderTiles(highlightValue = null) {
  puzzle.innerHTML = "";
  puzzle.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  puzzle.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

  tiles.forEach((val, idx) => {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.style.background = getTileColor(val);
    if (val === "") {
      tile.classList.add("empty");
    } else {
      tile.textContent = val;
      tile.addEventListener("click", () => {
        if (!isShuffling) moveTile(idx);
      });
    }
    if (highlightValue !== null && val === highlightValue) {
      tile.classList.add("recent-move");
      setTimeout(() => tile.classList.remove("recent-move"), 220);
    }
    puzzle.appendChild(tile);
  });
}

function moveTile(idx) {
  if (isShuffling) return;
  const emptyIdx = tiles.indexOf("");
  const validMoves = [idx - 1, idx + 1, idx - gridSize, idx + gridSize];

  if (
    validMoves.includes(emptyIdx) &&
    !(idx % gridSize === 0 && emptyIdx === idx - 1) &&
    !(idx % gridSize === gridSize - 1 && emptyIdx === idx + 1)
  ) {
    [tiles[idx], tiles[emptyIdx]] = [tiles[emptyIdx], tiles[idx]];
    moveCount++;
    moveCountEl.textContent = moveCount;
    renderTiles();
    const audio = new Audio('../../../utility/sounds/click.mp3');
    audio.play();
    checkWin();
  }
}

async function animateShuffleGuaranteed() {
  isShuffling = true;
  messageEl.textContent = "Shuffling...";
  const N = gridSize * gridSize - 1;
  const harmonicEstimate = Math.log(N > 0 ? N : 1) + 0.5772156649;
  let randomSteps = Math.ceil(N * harmonicEstimate * 1.2);
  randomSteps = Math.max(randomSteps, 60);
  const stepDelay = 1;
  const movedTiles = new Set();

  for (let i = 0; i < randomSteps; i++) {
    const emptyIdx = tiles.indexOf("");
    const neighbors = getNeighbors(emptyIdx);
    const moveIdx = neighbors[Math.floor(Math.random() * neighbors.length)];
    const movedValue = tiles[moveIdx];
    [tiles[emptyIdx], tiles[moveIdx]] = [tiles[moveIdx], tiles[emptyIdx]];
    if (movedValue !== "") movedTiles.add(movedValue);
    renderTiles(movedValue);
    await sleep(stepDelay);
  }

  const allValues = [];
  for (let v = 1; v <= N; v++) allValues.push(v);
  const remaining = allValues.filter((v) => !movedTiles.has(v));

  for (const val of remaining) {
    let tileIdx = tiles.indexOf(val);
    if (tileIdx === -1) continue; // safety

    const neighborsOfTile = getNeighbors(tileIdx);

    const emptyIdx = tiles.indexOf("");
    let bestPath = null;
    for (const nb of neighborsOfTile) {
      const path = bfsPath(emptyIdx, nb, gridSize, tiles.length);
      if (path && (bestPath === null || path.length < bestPath.length)) {
        bestPath = path;
      }
    }

    if (!bestPath) continue;

    for (let k = 1; k < bestPath.length; k++) {
      const from = bestPath[k - 1];
      const to = bestPath[k];
      [tiles[from], tiles[to]] = [tiles[to], tiles[from]];
      const movedValue = tiles[from] === "" ? null : tiles[from];
      if (movedValue !== null) movedTiles.add(movedValue);
      renderTiles(movedValue);
      await sleep(120);
    }

    tileIdx = tiles.indexOf(val);
    const emptyNow = tiles.indexOf("");
    if (
      Math.abs(tileIdx - emptyNow) === 1 ||
      Math.abs(tileIdx - emptyNow) === gridSize
    ) {
      [tiles[emptyNow], tiles[tileIdx]] = [tiles[tileIdx], tiles[emptyNow]];
      movedTiles.add(val);
      renderTiles(val);
      await sleep(160);
    } else {
      const empt = tiles.indexOf("");
      const neigh = getNeighbors(empt);
      const rnd = neigh[Math.floor(Math.random() * neigh.length)];
      const movedValue = tiles[rnd];
      [tiles[empt], tiles[rnd]] = [tiles[rnd], tiles[empt]];
      if (movedValue !== "") movedTiles.add(movedValue);
      renderTiles(movedValue);
      await sleep(120);
    }
  }

  for (let i = 0; i < Math.min(30, Math.ceil(N * 0.5)); i++) {
    const emptyIdx = tiles.indexOf("");
    const neighbors = getNeighbors(emptyIdx);
    const moveIdx = neighbors[Math.floor(Math.random() * neighbors.length)];
    const movedValue = tiles[moveIdx];
    [tiles[emptyIdx], tiles[moveIdx]] = [tiles[moveIdx], tiles[emptyIdx]];
    renderTiles(movedValue);
    await sleep(60);
  }

  isShuffling = false;
  messageEl.textContent = "";
}

function getNeighbors(idx) {
  const res = [];
  if (idx - gridSize >= 0) res.push(idx - gridSize);
  if (idx + gridSize < tiles.length) res.push(idx + gridSize);
  if (idx % gridSize !== 0) res.push(idx - 1);
  if (idx % gridSize !== gridSize - 1) res.push(idx + 1);
  return res;
}

function bfsPath(start, goal, gridSizeLocal = gridSize, total = tiles.length) {
  const q = [];
  const visited = new Array(total).fill(false);
  const parent = new Array(total).fill(-1);
  q.push(start);
  visited[start] = true;

  while (q.length) {
    const node = q.shift();
    if (node === goal) {
      const path = [];
      let cur = goal;
      while (cur !== -1) {
        path.push(cur);
        cur = parent[cur];
      }
      path.reverse();
      return path;
    }
    const neighbors = [];
    if (node - gridSizeLocal >= 0) neighbors.push(node - gridSizeLocal);
    if (node + gridSizeLocal < total) neighbors.push(node + gridSizeLocal);
    if (node % gridSizeLocal !== 0) neighbors.push(node - 1);
    if (node % gridSizeLocal !== gridSizeLocal - 1) neighbors.push(node + 1);

    for (const nb of neighbors) {
      if (!visited[nb]) {
        visited[nb] = true;
        parent[nb] = node;
        q.push(nb);
      }
    }
  }
  return null;
}

function isSolved() {
  for (let i = 0; i < tiles.length - 1; i++) {
    if (tiles[i] !== i + 1) return false;
  }
  return tiles[tiles.length - 1] === "";
}

function loadCongratsScript(callback) {
  const script = document.createElement("script");
  script.src = "../../../utility/js/congratulation.js";
  script.onload = callback; // optional
  document.head.appendChild(script);
}

function checkWin() {
  
  if (isSolved()) {
    // showCongratsAnimation("");
    loadCongratsScript(() => {
      showCongratsAnimation({
        message: "🏆 Puzzle Solved! 🧠"      });
    });
    
    saveHistory(moveCount, "WON!");
    restart();
  }
}

function saveHistory(moves, status) {
  let history = JSON.parse(localStorage.getItem("puzzleHistory")) || [];
  history.push({
    grid: `${gridSize} X ${gridSize}`,
    date: new Date().toLocaleString(),
    moves: moves,
    status: status,
  });

  localStorage.setItem("puzzleHistory", JSON.stringify(history));
}

function getTileColor(val) {
  if (val === "") return "#eee";
  const colors = [
    "#ff0000",
    "#ff7f00",
    "#ffff00",
    "#00ff00",
    "#00ffff",
    "#0000ff",
    "#8b00ff",
  ];
  return colors[val % colors.length];
}

function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

function restart() {
  if (isShuffling) return;
  init();
}

document.addEventListener("DOMContentLoaded", () => {});

const openPopupBtn = document.getElementById("openPopupBtn");
const closePopupBtn = document.getElementById("closePopupBtn");
const popup = document.getElementById("popup");

const itemsPerPage = 5;
let currentPage = 1;

openPopupBtn.addEventListener("click", () => {
  popup.style.display = "flex";
  let history = JSON.parse(localStorage.getItem("puzzleHistory")) || [];

  history = history.reverse();

  renderPage(history, currentPage);
});

function renderPage(history, page) {
  historyBody.innerHTML = "";

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageItems = history.slice(start, end);

  pageItems.forEach((h) => {
    let row = `<tr>
      <td>${h.grid || "4X4"}</td>
      <td>${h.date}</td>
      <td>${h.moves}</td>
      <td>${h.status}</td>
    </tr>`;
    historyBody.innerHTML += row;
  });

  renderPagination(history.length, page);
}

function renderPagination(totalItems, page) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pagination = document.getElementById("pagination");

  pagination.innerHTML = "";

  if (totalPages <= 1) return;

  if (page > 1) {
    const prev = document.createElement("button");
    prev.textContent = "Prev";
    prev.onclick = () => {
      currentPage--;
      let history = JSON.parse(localStorage.getItem("puzzleHistory")) || [];
      history = history.reverse();
      renderPage(history, currentPage);
    };
    pagination.appendChild(prev);
  }

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === page) btn.disabled = true;
    btn.onclick = () => {
      currentPage = i;
      let history = JSON.parse(localStorage.getItem("puzzleHistory")) || [];
      history = history.reverse();
      renderPage(history, currentPage);
    };
    pagination.appendChild(btn);
  }

  if (page < totalPages) {
    const next = document.createElement("button");
    next.textContent = "Next";
    next.onclick = () => {
      currentPage++;
      let history = JSON.parse(localStorage.getItem("puzzleHistory")) || [];
      history = history.reverse();
      renderPage(history, currentPage);
    };
    pagination.appendChild(next);
  }
}

closePopupBtn.addEventListener("click", () => {
  popup.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.style.display = "none";
  }
});
