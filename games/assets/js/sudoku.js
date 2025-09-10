const sudokuContainer = document.getElementById("sudoku");
const tracker = document.getElementById("numberTracker");

var solution;
var puzzle;
async function createSudokuGrid(difficulty = "easy") {
  const response = await fetch(
    "https://sudoku-api.vercel.app/api/dosuku?difficulty=easy",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        difficulty,
        solution: true,
        array: true,
      }),
    }
  );
  const apiResponse = await response.json();


  
  solution = apiResponse.newboard.grids[0].solution;
  puzzle = apiResponse.newboard.grids[0].value;

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const input = document.createElement("input");
      input.type = "text";
      input.maxLength = 1;
      input.dataset.row = row;
      input.dataset.col = col;

      // Add thick borders for 3x3 grid boxes
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
          }
           updateTracker();
        });
        input.addEventListener("focus", () => {
          selectedInput = input;
          console.log("hig");
          highlightRowCol(input); // 🔥 highlight row + column
        });
      }

      sudokuContainer.appendChild(input);
    }
  }
    updateTracker();
}

      // Add thick borders for 3x3 grid boxes

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
        input.style.backgroundColor = "#ffcccc"; // incorrect
        allCorrect = false;
      } else {
        input.style.backgroundColor = "#ccffcc"; // correct
      }
    }
  });

  const resultText = document.getElementById("result");
  resultText.textContent = allCorrect
    ? "🎉 Correct! Puzzle solved!"
    : "❌ Some entries are incorrect.";
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
       console.log(input);

  sudokuContainer.querySelectorAll("input").forEach((cell) => {
      console.log(cell.value);
    if (parseInt(cell.value) === input ) {
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
