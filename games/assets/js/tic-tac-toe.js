const cells = document.querySelectorAll('[data-cell]');
const statusMessage = document.getElementById('statusMessage');
const restartBtn = document.getElementById('restartBtn');
let currentPlayer = 'X';
let board = Array(9).fill('');

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function handleClick(e) {
  const index = [...cells].indexOf(e.target);
  if (board[index] !== '') return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add(currentPlayer === 'X' ? 'x' : 'o');

  if (checkWin(currentPlayer)) {
    statusMessage.textContent = `${currentPlayer} Wins! 🎉`;
    disableBoard();
  } else if (board.every(cell => cell !== '')) {
    statusMessage.textContent = `It's a Draw!`;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusMessage.textContent = `${currentPlayer}'s Turn`;
  }
}

function checkWin(player) {
  return winPatterns.some(pattern =>
    pattern.every(index => board[index] === player)
  );
}

function disableBoard() {
  cells.forEach(cell => cell.removeEventListener('click', handleClick));
}

function restartGame() {
  board.fill('');
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o');
    cell.addEventListener('click', handleClick, { once: true });
  });
  currentPlayer = 'X';
  statusMessage.textContent = `X's Turn`;
}

restartBtn.addEventListener('click', restartGame);
restartGame();
