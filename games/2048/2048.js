const boardSize = 4;
let board = [];
let score = 0;
let gameIsOver = false;
const gameContainer = document.getElementById("game-container");
const scoreDisplay = document.getElementById("score");
const restartButton = document.getElementById("restart-btn");
const exitButton = document.getElementById("exit"); 

function initBoard() {
    board = Array(boardSize).fill().map(() => Array(boardSize).fill(0));
    score = 0;
    gameIsOver = false;
    addRandomTile();
    addRandomTile();
    updateBoard();
    restartButton.innerHTML = 'Restart Game';
    if (exitButton) exitButton.style.opacity = 1;
    document.body.style.overflow = 'hidden';
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
    for (let r = 0; r < boardSize; r++) {
        board[r] = slide(board[r]);
    }
}

function moveRight() {
    for (let r = 0; r < boardSize; r++) {
        board[r].reverse();
        board[r] = slide(board[r]);
        board[r].reverse();
    }
}

function moveDown() {
    rotateBoard();
    moveLeft();
    rotateBoard();
    rotateBoard();
    rotateBoard();
}

function moveUp() {
    rotateBoard();
    moveRight();
    rotateBoard();
    rotateBoard();
    rotateBoard();
}

function isBoardFull() {
    for (let r = 0; r < boardSize; r++) {
        for (let c = 0; c < boardSize; c++) {
            if (board[r][c] === 0) return false;
        }
    }
    return true;
}

function hasPossibleMoves() {
    for (let r = 0; r < boardSize; r++) {
        for (let c = 0; c < boardSize; c++) {
            const val = board[r][c];
            if (c < boardSize - 1 && val === board[r][c + 1]) return true;
            if (r < boardSize - 1 && val === board[r + 1][c]) return true;
        }
    }
    return false;
}

function checkGameOver() {
    if (isBoardFull() && !hasPossibleMoves()) {
        gameIsOver = true;
        alert("Game Over! Final Score: " + score);
    }
    for (let r = 0; r < boardSize; r++) {
        for (let c = 0; c < boardSize; c++) {
            if (board[r][c] === 2048) {
            }
        }
    }
}

function arraysEqual2D(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
}

function handleMove(moveFunction) {
    if (gameIsOver) return;
    const oldBoard = JSON.parse(JSON.stringify(board)); 
    moveFunction();
    if (!arraysEqual2D(oldBoard, board)) {
        addRandomTile();
        checkGameOver();
    }
    updateBoard();
}
document.addEventListener("keydown", e => {
    switch (e.key) {
        case "ArrowLeft": handleMove(moveLeft); break;
        case "ArrowRight": handleMove(moveRight); break;
        case "ArrowUp": handleMove(moveUp); break;
        case "ArrowDown": handleMove(moveDown); break;
        default: return;
    }
    e.preventDefault(); 
});


restartButton.addEventListener("click", () => {
    initBoard();
});

exitButton.addEventListener("click", () => {
    document.body.style.overflow = 'auto'; 
});
let touchX, touchY;
let touchMoved = false;
window.addEventListener("touchstart", (e) => {
    if (gameIsOver) return;
    touchY = e.changedTouches[0].pageY;
    touchX = e.changedTouches[0].pageX;
    touchMoved = false;
});

window.addEventListener("touchmove", (e) => {
    touchMoved = true;
    e.preventDefault(); 
});

window.addEventListener("touchend", (e) => {
    if (!touchMoved || gameIsOver) return;
    const finalY = e.changedTouches[0].pageY;
    const finalX = e.changedTouches[0].pageX;
    const swipeY = finalY - touchY;
    const swipeX = finalX - touchX;
    const absSwipeY = Math.abs(swipeY);
    const absSwipeX = Math.abs(swipeX);
    const SWIPE_THRESHOLD = 30; 
    if (absSwipeX > SWIPE_THRESHOLD || absSwipeY > SWIPE_THRESHOLD) {
        if (absSwipeX > absSwipeY) {
            if (swipeX > 0) handleMove(moveRight);
            else handleMove(moveLeft);
        } else {
            if (swipeY > 0) handleMove(moveDown);
            else handleMove(moveUp);
        }
    }
    touchMoved = false; 
});