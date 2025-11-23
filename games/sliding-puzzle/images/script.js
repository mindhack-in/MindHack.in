const puzzleBoard = document.getElementById('puzzle-board');
const imagePreview = document.getElementById('image-preview');

let originalImage = new Image();
let gridSize = window.pageConfig?.size ? parseInt(window.pageConfig.size) : 1;

let tiles = [];
let emptyTileIndex = -1;
let puzzleSolved = false;
let currentImageSrc = '';

const PUZZLE_BOARD_SIZE = 500;
const SHUFFLE_MOVES = 500;



puzzleBoard.addEventListener('click', handleTileClick);
function handleImageUpload(staticFilePath) {
    currentImageSrc = staticFilePath;
    imagePreview.src = currentImageSrc;
    imagePreview.style.display = 'block';
}

async function startLoadingGame(staticFilePath) {


    console.log(staticFilePath)
    handleImageUpload(staticFilePath);

    puzzleSolved = false;

    try {
        await createTiles();
        shuffleTiles();
        renderPuzzle();

    } catch (error) {
        console.error("Error creating puzzle:", error);
    }
}

function createTiles() {
    return new Promise((resolve, reject) => {
        tiles = [];
        puzzleBoard.innerHTML = '';
        puzzleBoard.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
        puzzleBoard.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
        const totalTiles = gridSize * gridSize;
        originalImage.src = currentImageSrc;
        originalImage.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = originalImage.width;
            canvas.height = originalImage.height;
            ctx.drawImage(originalImage, 0, 0, originalImage.width, originalImage.height);

            for (let i = 0; i < totalTiles; i++) {
                const row = Math.floor(i / gridSize);
                const col = i % gridSize;

                const tileDiv = document.createElement('div');
                tileDiv.classList.add('puzzle-tile');
                tileDiv.dataset.originalIndex = i; // Store original position for win check

                if (i === totalTiles - 1) { // Last tile is the empty one
                    tileDiv.classList.add('empty');
                    emptyTileIndex = i;
                } else {
                    // Calculate the crop position and size
                    const sx = col * (originalImage.width / gridSize);
                    const sy = row * (originalImage.height / gridSize);
                    const sWidth = originalImage.width / gridSize;
                    const sHeight = originalImage.height / gridSize;

                    // Create a smaller canvas for each tile's image
                    const tileCanvas = document.createElement('canvas');
                    const tileCtx = tileCanvas.getContext('2d');
                    tileCanvas.width = sWidth;
                    tileCanvas.height = sHeight;
                    tileCtx.drawImage(canvas, sx, sy, sWidth, sHeight, 0, 0, sWidth, sHeight);

                    tileDiv.style.backgroundImage = `url(${tileCanvas.toDataURL()})`;
                    // tileDiv.textContent = i + 1; // Uncomment for debugging tile numbers
                }
                tiles.push(tileDiv);
            }
            resolve(); // Signal that tiles array is ready
        };

        originalImage.onerror = () => {
            reject("Image failed to load.");
        }
    });
}


function renderPuzzle() {
    puzzleBoard.innerHTML = ''; // Clear existing tiles
    tiles.forEach(tile => {
        puzzleBoard.appendChild(tile);
    });
}

function shuffleTiles() {
    for (let i = 0; i < SHUFFLE_MOVES; i++) {
        const adjacent = getAdjacentTiles(emptyTileIndex);
        if (adjacent.length > 0) {
            const randomIndex = Math.floor(Math.random() * adjacent.length);
            const tileToMoveIndex = adjacent[randomIndex];
            swapTiles(tileToMoveIndex, emptyTileIndex);
            emptyTileIndex = tileToMoveIndex;
        }
    }
}

function handleTileClick(event) {
    if (puzzleSolved) return;

    const clickedTile = event.target;
    if (!clickedTile.classList.contains('puzzle-tile') || clickedTile.classList.contains('empty')) {
        return;
    }

    // Get the index of the clicked tile in the currently rendered board (tiles array)
    const clickedIndex = tiles.indexOf(clickedTile);

    // Check if clicked tile is adjacent to the empty tile
    if (isAdjacent(clickedIndex, emptyTileIndex)) {
        swapTiles(clickedIndex, emptyTileIndex);
        emptyTileIndex = clickedIndex;
        renderPuzzle();
        checkWin();
    }
}

// --- Helper: Get Adjacent Tiles ---
function getAdjacentTiles(index) {
    const adjacent = [];
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;

    // Check up
    if (row > 0) adjacent.push(index - gridSize);
    // Check down
    if (row < gridSize - 1) adjacent.push(index + gridSize);
    // Check left
    if (col > 0) adjacent.push(index - 1);
    // Check right
    if (col < gridSize - 1) adjacent.push(index + 1);

    return adjacent;
}

// --- Helper: Check if two tiles are adjacent ---
function isAdjacent(index1, index2) {
    const row1 = Math.floor(index1 / gridSize);
    const col1 = index1 % gridSize;
    const row2 = Math.floor(index2 / gridSize);
    const col2 = index2 % gridSize;

    // Same row, columns are 1 apart OR same column, rows are 1 apart
    return (row1 === row2 && Math.abs(col1 - col2) === 1) ||
        (col1 === col2 && Math.abs(row1 - row2) === 1);
}

// --- Helper: Swap Tile Positions (in the 'tiles' array) ---
function swapTiles(index1, index2) {
    const temp = tiles[index1];
    tiles[index1] = tiles[index2];
    tiles[index2] = temp;
}

// --- Win Condition Check ---
function checkWin() {
    // Check if tiles are in their original sorted order
    for (let i = 0; i < tiles.length - 1; i++) {
        if (parseInt(tiles[i].dataset.originalIndex) !== i) {
            return false;
        }
    }

    // Final Check: Ensure the last tile is the empty one
    if (tiles[tiles.length - 1].classList.contains('empty')) {
        puzzleSolved = true;

        // Remove the 'empty' class to reveal the final tile piece
        tiles[emptyTileIndex].classList.remove('empty');
        renderPuzzle(); // Re-render to show the full image
        console.log("winner winner ")
        return true;
    }
    return false;
}

// --- Initial Setup ---
// Initially disable the start button until an image is loaded
function loadCharacter() {
    const route = window.location.hash.replace("#/", "");

    console.log(route)
    if (route === "doraemon") {
        startLoadingGame("./dynamic/doraemon.jpg");
    } else if (route === "nobita") {
        startLoadingGame("dynamic/nobita.jpg");
    } else if(route==='sinchan')
    {
                startLoadingGame("dynamic/sinchan.png");

    }
    else {
        startLoadingGame("./dynamic/doraemon.jpg");

    }
}

window.addEventListener("hashchange", loadCharacter);
window.addEventListener("load", loadCharacter);
