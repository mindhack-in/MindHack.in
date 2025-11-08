import {  url } from "../../utility/js/constants.js";

const gridSize = window.pageConfig?.size ? parseInt(window.pageConfig.size) : 1;


function createPuzzle(size) {
  const wrapper = document.createElement("div");
  wrapper.className = "puzzle-wrapper";

  const puzzle = document.createElement("div");
  puzzle.className = "puzzle";
  puzzle.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  puzzle.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  let count = 1;
  for (let i = 0; i < size * size; i++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    if (i < size * size - 1) {
      tile.textContent = count;
      tile.style.background = colors[i % colors.length];
      count++;
    } else {
      tile.classList.add("empty");
    }
    puzzle.appendChild(tile);
  }
  wrapper.appendChild(puzzle);

  wrapper.onclick = () => {
    window.location.href = url + "games/sliding-puzzle/" + size + 'x' + size;
  };
  return wrapper
}
const colors = [
  "#ff6ec7", // bubblegum pink
  "#8a2be2", // electric violet
  "#00f5d4", // minty aqua
  "#ffb3c6", // soft candy pink
  "#a0c4ff", // pastel blue
  "#bdb2ff", // lilac haze
  "#ffc6ff", // dreamy lavender
  "#ffd6a5", // peachy cream
  "#fdffb6", // pale lemon
  "#9bf6ff", // icy cyan
  "#ffadad", // coral blush
  "#caffbf", // neon mint
  "#b5e48c", // light lime
  "#fcbf49", // golden honey
  "#ff6392", // flamingo pink
  "#7bf1a8"  // fresh jade green
];


const content = document.getElementById("puzzleContent");


if (content !== null) {
  for (let i = 3; i <= 10; i++) {
    if (i === gridSize)
      continue;
    const grid3X3 = createPuzzle(i);
    content.appendChild(grid3X3);
  }
}