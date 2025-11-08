const dynamicUrl = "../../dynamic/";

const sudokuContainer = document.getElementById("sudoku");
const tracker = document.getElementById("numberTracker");
const mistakesP = document.getElementById("mistakes");
var solution;
var puzzle;
let mistakes = 3;

async function createSudokuGrid(difficulty = "easy") {
  mistakes = 3;
  const response =

    fetch(dynamicUrl + "/games/sudoku/1.json")
      .then(response => response.json())
      .then(data => {
        const length = data.length;
        let index = Math.floor(Math.random() * length)
        return data[index];
      })
      .catch(error => {
      });

  const apiResponse = await response;

  solution = apiResponse.solution;
  puzzle = apiResponse.value;

  sudokuContainer.innerHTML = '';
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const input = document.createElement("input");
      input.type = "text";
      input.maxLength = 1;
      input.dataset.row = row;
      input.dataset.col = col;

      if (col % 3 === 0) input.style.borderLeft = "2px solid black";
      if (row % 3 === 0) input.style.borderTop = "2px solid black";
      if (col === 8) input.style.borderRight = "2px solid black";
      if (row === 8) input.style.borderBottom = "2px solid black";

      const value = puzzle[row][col];
      if (value !== 0) {
        input.value = value;
        input.readOnly = true;
      } else {
        input.addEventListener("input", (e) => {

          const val = e.target.value;
          if (!/^[1-9]?$/.test(val)) {
            e.target.value = "";
          } else if (val !== "" && !Number.isNaN(Number(val))) {
            const expected = solution[row][col];
            const actual = parseInt(input.value);
            input.style.backgroundColor = "";

            console.log(actual)

            if (value === 0) {
              if (actual !== expected) {
                input.style.backgroundColor = "#ffcccc";
                mistakes--;
                mistakesP.innerHTML = mistakes + ' Mistakes left! Play carefully'
                if (mistakes <= 0) alert("Game Over Play again");
              }
            }
            updateTracker();
          }
        });
        input.addEventListener("focus", () => {
          highlightRowCol(input);
        });
      }

      sudokuContainer.appendChild(input);
    }
  }
  updateTracker();
}

const difficultyDropdown = document.getElementById("difficultyDropdown")
difficultyDropdown.addEventListener("change", handleDropdownChange);
function handleDropdownChange(event) {
  const selectedValue = event.target.value;
  createSudokuGrid(selectedValue);
}

const checkSudokuButton = document.getElementById("checkSudoku");
checkSudokuButton.onclick = () => {
  checkSudoku();
}

function loadCongratsScript(callback) {
  const script = document.createElement("script");
  script.src = "../../../utility/js/congratulation.js";
  script.onload = callback;  
  document.head.appendChild(script);
}
function checkSudoku() {
  let allCorrect = true;
  const inputs = sudokuContainer.querySelectorAll("input");

  inputs.forEach((input) => {
    const row = parseInt(input.dataset.row);
    const col = parseInt(input.dataset.col);
    const expected = solution[row][col];
    const actual = parseInt(input.value);

    if (puzzle[row][col] === 0) {
      if (actual !== expected) {
        input.style.backgroundColor = "#ffcccc"; 
        allCorrect = false;
      } else {
        input.style.backgroundColor = "#ccffcc"; 
      }
    }
  });

  const resultText = document.getElementById("result");
  resultText.textContent = allCorrect
    ? "🎉 Correct! Puzzle solved!"
    : "❌ Some entries are incorrect.";

  if (allCorrect) {
    loadCongratsScript(() => {
      showCongratsAnimation({
        message: "Sudoku Solved! 🧠"
      });
    });
  }
}


function updateTracker() {
  const counts = Array(10).fill(0);
  const inputs = sudokuContainer.querySelectorAll("input");
  inputs.forEach((input) => {
    if (input.value) {
      counts[parseInt(input.value)]++;
    }
  });

  tracker.innerHTML = "";
  for (let n = 1; n <= 9; n++) {
    const div = document.createElement("div");
    div.textContent = `${n} (${counts[n]}/9)`;
    if (counts[n] === 9) div.classList.add("disabled");
    div.addEventListener("click", (e) => {
      highlightGrid(n);
    });
    tracker.appendChild(div);
  }
}


function highlightGrid(input) {
  // Clear old highlights
  sudokuContainer.querySelectorAll("input").forEach((cell) => {
    cell.classList.remove("highlight");
  });

  sudokuContainer.querySelectorAll("input").forEach((cell) => {
    if (parseInt(cell.value) === input) {
      // if (!cell.readOnly) {
      cell.classList.add("highlight");
      // }
    }
  });
}


function highlightRowCol(input) {
  // Clear old highlights
  sudokuContainer.querySelectorAll("input").forEach((cell) => {
    cell.classList.remove("highlight");
  });

  const row = parseInt(input.dataset.row);
  const col = parseInt(input.dataset.col);

  sudokuContainer.querySelectorAll("input").forEach((cell) => {
    if (
      parseInt(cell.dataset.row) === row ||
      parseInt(cell.dataset.col) === col
    ) {
      if (!cell.readOnly) {
        // don't override given cells
        cell.classList.add("highlight");
      }
    }
  });
}


createSudokuGrid();
