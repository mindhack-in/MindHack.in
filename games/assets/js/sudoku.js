 const apiResponse = {
    puzzle: [
      [5, 3, null, null, 7, null, null, null, null],
      [6, null, null, 1, 9, 5, null, null, null],
      [null, 9, 8, null, null, null, null, 6, null],
      [8, null, null, null, 6, null, null, null, 3],
      [4, null, null, 8, null, 3, null, null, 1],
      [7, null, null, null, 2, null, null, null, 6],
      [null, 6, null, null, null, null, 2, 8, null],
      [null, null, null, 4, 1, 9, null, null, 5],
      [null, null, null, null, 8, null, null, 7, 9]
    ],
    solution: [
      [5,3,4,6,7,8,9,1,2],
      [6,7,2,1,9,5,3,4,8],
      [1,9,8,3,4,2,5,6,7],
      [8,5,9,7,6,1,4,2,3],
      [4,2,6,8,5,3,7,9,1],
      [7,1,3,9,2,4,8,5,6],
      [9,6,1,5,3,7,2,8,4],
      [2,8,7,4,1,9,6,3,5],
      [3,4,5,2,8,6,1,7,9]
    ]
  };

  const sudokuContainer = document.getElementById('sudoku');
  const puzzle = apiResponse.puzzle;
  const solution = apiResponse.solution;

  function createSudokuGrid() {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.maxLength = 1;
        input.dataset.row = row;
        input.dataset.col = col;

        // Add thick borders for 3x3 grid boxes
        if (col % 3 === 0) input.style.borderLeft = '2px solid black';
        if (row % 3 === 0) input.style.borderTop = '2px solid black';
        if (col === 8) input.style.borderRight = '2px solid black';
        if (row === 8) input.style.borderBottom = '2px solid black';

        const value = puzzle[row][col];
        if (value !== null) {
          input.value = value;
          input.readOnly = true;
        } else {
          input.addEventListener('input', (e) => {
            const val = e.target.value;
            if (!/^[1-9]?$/.test(val)) {
              e.target.value = '';
            }
          });
        }

        sudokuContainer.appendChild(input);
      }
    }
  }

  function checkSudoku() {
    let allCorrect = true;
    const inputs = sudokuContainer.querySelectorAll('input');

    inputs.forEach(input => {
      const row = parseInt(input.dataset.row);
      const col = parseInt(input.dataset.col);
      const expected = solution[row][col];
      const actual = parseInt(input.value);

      if (puzzle[row][col] === null) {
        if (actual !== expected) {
          input.style.backgroundColor = '#ffcccc'; // incorrect
          allCorrect = false;
        } else {
          input.style.backgroundColor = '#ccffcc'; // correct
        }
      }
    });

    const resultText = document.getElementById('result');
    resultText.textContent = allCorrect ? "🎉 Correct! Puzzle solved!" : "❌ Some entries are incorrect.";
  }

  createSudokuGrid();