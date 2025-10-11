import { dynamicUrl,url } from "../../utility/js/constants.js";


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
              window.location.href =url+"games/sliding-puzzle/"+size+'x'+size;
            };
  return wrapper
}
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

const content=document.getElementById("puzzleContent");


if(content!==null){
for(let i=3;i<=10;i++){
    const grid3X3 = createPuzzle(i);
  content.appendChild(grid3X3);
}
}