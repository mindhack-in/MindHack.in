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
  "#ff6ec7", 
  "#8a2be2", 
  "#00f5d4", 
  "#ffb3c6", 
  "#a0c4ff", 
  "#bdb2ff", 
  "#ffc6ff", 
  "#ffd6a5", 
  "#fdffb6", 
  "#9bf6ff", 
  "#ffadad", 
  "#caffbf", 
  "#b5e48c", 
  "#fcbf49", 
  "#ff6392", 
  "#7bf1a8"  
];
