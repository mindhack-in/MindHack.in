const boardSize = 4;
let board = [];
let score = 0;

const gameContainer = document.getElementById("game-container");
const scoreDisplay = document.getElementById("score");

function initBoard() {
    board = Array(boardSize).fill().map(() => Array(boardSize).fill(0));
    score = 0;
    addRandomTile();
    addRandomTile();
    updateBoard();
}

function addRandomTile() {
    const emptyCells = [];
    for (let r = 0; r < boardSize; r++) {
        for (let c = 0; c < boardSize; c++) {
            if (board[r][c] === 0) emptyCells.push({ r, c });
        }
    }
    if (emptyCells.length > 0) {
        const { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[r][c] = Math.random() < 0.9 ? 2 : 4;
    }
}

function updateBoard() {
    gameContainer.innerHTML = "";
    for (let r = 0; r < boardSize; r++) {
        for (let c = 0; c < boardSize; c++) {
            const tile = document.createElement("div");
            tile.className = "tile";
            const value = board[r][c];
            if (value) {
                tile.textContent = value;
                tile.dataset.value = value;
            }
            gameContainer.appendChild(tile);
        }
    }
    scoreDisplay.textContent = "Score: " + score;
}

function slide(row) {
    let arr = row.filter(v => v);
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] === arr[i + 1]) {
            arr[i] *= 2;
            score += arr[i];
            arr[i + 1] = 0;
        }
    }
    arr = arr.filter(v => v);
    while (arr.length < boardSize) arr.push(0);
    return arr;
}

function rotateBoard() {
    const newBoard = Array(boardSize).fill().map(() => Array(boardSize).fill(0));
    for (let r = 0; r < boardSize; r++) {
        for (let c = 0; c < boardSize; c++) {
            newBoard[c][boardSize - 1 - r] = board[r][c];
        }
    }
    board = newBoard;
}

function moveLeft() {
    let oldBoard = JSON.stringify(board);
    for (let r = 0; r < boardSize; r++) {
        board[r] = slide(board[r]);
    }
    if (oldBoard !== JSON.stringify(board)) {
        addRandomTile();
    }
    updateBoard();
}

function moveRight() {
    let oldBoard = JSON.stringify(board);
    for (let r = 0; r < boardSize; r++) {
        board[r] = board[r].reverse();
        board[r] = slide(board[r]);
        board[r] = board[r].reverse();
    }
    if (oldBoard !== JSON.stringify(board)) {
        addRandomTile();
    }
    updateBoard();
}

function moveUp() {
    let oldBoard = JSON.stringify(board);
    rotateBoard();
    moveLeft();
    rotateBoard();
    rotateBoard();
    rotateBoard();
    if (oldBoard !== JSON.stringify(board)) updateBoard();
}

function moveDown() {
    let oldBoard = JSON.stringify(board);
    rotateBoard();
    moveRight();
    rotateBoard();
    rotateBoard();
    rotateBoard();
    if (oldBoard !== JSON.stringify(board)) updateBoard();
}

document.addEventListener("keydown", e => {
    switch (e.key) {
        case "ArrowLeft": moveLeft(); break;
        case "ArrowRight": moveRight(); break;
        case "ArrowUp": moveUp(); break;
        case "ArrowDown": moveDown(); break;
    }
});

const restartButton = document.getElementById("restart-btn");
const exit = document.getElementById("exit");

restartButton.addEventListener("click", e => {
    initBoard();
    document.body.style.overflow = 'hidden';

    restartButton.innerHTML = 'Restart Game';
    exit.style.opacity = 1;

});

exit.addEventListener("click", e => {
    document.body.style.overflow = 'auto';
});

let touchX, touchY;
window.addEventListener("touchstart", (e) => {
    touchY = e.changedTouches[0].pageY;
    touchX = e.changedTouches[0].pageX;

});

window.addEventListener("touchmove", (e) => {
    const currentY = e.changedTouches[0].pageY;
    const currentX = e.changedTouches[0].pageX;
    const swipeY = currentY - touchY;
    const swipeX = currentX - touchX;
    if (swipeX < 0) {
        moveLeft();
    } else if (swipeX > 0) {
        moveRight();
    }
    else if (swipeY > 0)
        moveUp();
    else if (swipeY < 0)
        moveDown();
});