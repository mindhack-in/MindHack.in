const colors = [
        "#ff7f00", "#ffff00", "#00ff00", "#00ffff",
        "#0000ff", "#ff00ff", "#ff0000", "#ffa500",
        "#9400d3", "#1e90ff", "#32cd32", "#ffd700",
        "#00ced1", "#ff1493", "#8b0000", "#20b2aa"
    ];


    const puzzleContent = {
        "3": `<div class="puzzle-section" id="puzzle-3x3">
  <h1>3x3 Sliding Puzzle</h1>
  <p>
    The 3x3 sliding puzzle, often known as the "15 Puzzle’s little cousin," is the most basic and beginner-friendly version of sliding puzzles. 
    It consists of a grid with 9 tiles, where one space is left empty to allow the other tiles to move. The objective is simple: 
    shuffle the tiles and then rearrange them back into their correct order. While the concept may seem straightforward, the 3x3 sliding puzzle 
    still requires logical thinking, patience, and the ability to visualize moves in advance.
  </p>
  <p>
    What makes the 3x3 puzzle a great starting point is its balance between simplicity and challenge. It introduces players to the 
    mechanics of sliding puzzles without overwhelming them with too many possibilities. The smaller grid helps beginners understand 
    important concepts such as corner placement, edge alignment, and the role of the empty space. For younger players, it also works as a 
    fun tool to sharpen memory, concentration, and problem-solving skills.
  </p>
  <p>
    Another interesting aspect of the 3x3 sliding puzzle is that it can be customized in different ways. Some versions use plain numbered 
    tiles, while others include pictures that must be reassembled, almost like a jigsaw puzzle. You can even find themed puzzles featuring 
    animals, landscapes, or famous artworks. Whether you are solving it digitally on a screen or physically with small plastic tiles, the 
    satisfaction of sliding the last piece into its place is always rewarding.
  </p>
  <p>
    Overall, the 3x3 sliding puzzle is an excellent introduction to the world of sliding games. It is easy enough for beginners to pick up 
    yet engaging enough to keep them entertained. If you are new to sliding puzzles, starting with the 3x3 grid is the best way to build 
    confidence before moving on to larger, more challenging versions like the 4x4 or 5x5.
  </p>
  <div class="puzzle-grid" data-size="3"></div>
</div>
`,
        "4": `
    <div class="puzzle-section" id="puzzle-4x4">
  <h1>4x4 Sliding Puzzle</h1>
  <p>
    The 4x4 sliding puzzle, also known as the "15 Puzzle," is one of the most popular and classic versions of sliding puzzles. 
    Unlike the 3x3 beginner-friendly grid, the 4x4 version introduces a whole new level of challenge. It consists of 16 spaces 
    with 15 numbered tiles and one empty space that allows movement. The objective is to shuffle the tiles and then arrange them 
    back in order, either numerically or by reconstructing a picture if the puzzle uses images instead of numbers.
  </p>
  <p>
    What makes the 4x4 sliding puzzle fascinating is the way it forces players to think ahead. Every move affects the position of 
    multiple tiles, which means planning is essential. Unlike the 3x3, where trial and error often works, the 4x4 requires 
    strategies such as solving row by row or corner by corner. Players quickly learn the importance of the empty space and how it 
    can be used to maneuver tiles into their correct spots without disturbing already solved sections.
  </p>
  <p>
    Beyond entertainment, the 4x4 sliding puzzle is also a fantastic brain-training activity. It develops spatial awareness, 
    logical reasoning, and patience. Many educators and parents use it as a teaching tool to help children improve focus and 
    persistence. Adults, too, find it to be a fun yet stimulating way to pass the time while keeping their minds sharp.
  </p>
  <p>
    The 4x4 puzzle has also inspired mathematicians and puzzle enthusiasts for over a century. It has been studied in the fields 
    of algorithms and artificial intelligence because of the number of possible tile arrangements, which exceeds 10 trillion! 
    Despite its complexity, the 4x4 sliding puzzle remains a timeless classic that continues to entertain and challenge players 
    across generations.
  </p>
  <div class="puzzle-grid" data-size="4"></div>
</div>
  `,
        "5": `
  <div class="puzzle-section" id="puzzle-5x5">
  <h1>5x5 Sliding Puzzle</h1>
  <p>
    The 5x5 sliding puzzle, often called the "24 Puzzle," is a larger and more challenging version of the classic sliding tile game. 
    It contains 25 spaces with 24 tiles and one empty space that allows movement. While the rules remain the same—shuffle and then 
    reorder the tiles in sequence—the increase in grid size dramatically raises the level of difficulty compared to the 3x3 or 4x4 versions.
  </p>
  <p>
    What makes the 5x5 puzzle unique is the complexity of its moves. With more tiles to manage, each decision impacts a wider 
    section of the board. Solvers often find themselves needing to think several steps ahead, as moving one tile into place may 
    disrupt the arrangement of many others. This requires a blend of strategy, patience, and careful planning.
  </p>
  <p>
    The 5x5 sliding puzzle is not just a fun pastime—it’s also an excellent mental workout. It sharpens problem-solving skills, 
    improves memory, and enhances logical reasoning. Students who regularly engage with puzzles like the 5x5 often show stronger 
    focus and persistence in academic tasks. Adults enjoy it as a way to unwind while still keeping their minds sharp and active.
  </p>
  <p>
    With more than <strong>10^25 possible arrangements</strong>, the 5x5 sliding puzzle has fascinated mathematicians and 
    computer scientists alike. It has been studied in the context of algorithms and artificial intelligence, as finding efficient 
    solving methods is a non-trivial task. Yet despite its daunting complexity, the 5x5 sliding puzzle remains approachable and 
    enjoyable for casual players who simply want to challenge themselves. Whether solved for leisure, competition, or brain training, 
    the 5x5 is a rewarding experience that continues to test and delight puzzle lovers worldwide.
  </p>
  <div class="puzzle-grid" data-size="5"></div>
</div>
  `,
        "6": `
        <div class="puzzle-section" id="puzzle-6x6">
  <h1>6x6 Sliding Puzzle</h1>
  <p>
    The 6x6 sliding puzzle, also known as the "35 Puzzle," takes the classic sliding tile game to an even higher level of 
    complexity. With 36 spaces, 35 tiles, and a single empty slot, the puzzle challenges players to arrange the tiles in 
    numerical or image-based order. Compared to the 5x5 puzzle, this version significantly expands the difficulty by adding 
    an extra row and column, which means far more possible tile configurations and much longer solving times.
  </p>
  <p>
    Solving a 6x6 sliding puzzle requires more than just quick thinking. It demands patience, persistence, and advanced 
    planning. Each tile movement not only shifts a single piece but also influences multiple others, making it critical 
    for solvers to anticipate the impact of every decision. Many players use techniques such as solving row by row or 
    corner by corner, gradually reducing the complexity until only a few tiles remain misplaced.
  </p>
  <p>
    Beyond being a fun and interactive challenge, the 6x6 sliding puzzle provides valuable mental benefits. It enhances 
    spatial reasoning, improves problem-solving abilities, and strengthens memory retention. For students, this puzzle 
    serves as an excellent brain-training activity that builds focus and determination. For adults, it offers an engaging 
    way to unwind while keeping cognitive skills sharp.
  </p>
  <p>
    Mathematically, the 6x6 puzzle has an astronomical number of possible arrangements, making brute-force solving methods 
    impractical. This has drawn the attention of researchers in the fields of artificial intelligence and computer science, 
    where sliding puzzles are often used as test cases for search algorithms. Despite its daunting nature, the 6x6 sliding 
    puzzle remains a rewarding and enjoyable game, providing a true test of logic, strategy, and perseverance.
  </p>
  <div class="puzzle-grid" data-size="6"></div>
</div>
`,
        "7": `
        <div class="puzzle-section" id="puzzle-7x7">
  <h1>7x7 Sliding Puzzle</h1>
  <p>
    The 7x7 sliding puzzle is often seen as the point where the challenge transitions from being just a game into a 
    test of advanced strategy and mental endurance. With 49 slots, 48 numbered tiles, and a single empty space, this 
    version dramatically expands the complexity compared to its smaller counterparts. Each move has a ripple effect, 
    making it increasingly difficult to keep the puzzle organized as you progress toward the solution.
  </p>
  <p>
    Players typically approach the 7x7 puzzle by solving it layer by layer, starting with one row or column before 
    working systematically across the board. This method requires foresight and planning, since it’s easy to undo 
    previous progress while fixing misplaced tiles. For many enthusiasts, solving this puzzle without guidance feels 
    like tackling a marathon of logic.
  </p>
  <p>
    The 7x7 puzzle doesn’t just build patience; it also sharpens logical reasoning, memory, and problem-solving skills. 
    Its difficulty makes it appealing to puzzle solvers who enjoy long, strategic challenges that test their persistence. 
    With its immense number of possible tile arrangements, it has also been studied in mathematics and computer science 
    as an example of a state-space problem.
  </p>
  <p>
    Whether used as a mental workout, a competitive challenge, or simply a pastime, the 7x7 sliding puzzle continues to 
    fascinate both casual players and serious puzzlers. Its scale ensures that every attempt feels unique, and every 
    solution achieved brings immense satisfaction.
  </p>
  <div class="puzzle-grid" data-size="7"></div>
</div>
`, "8": `
<div class="puzzle-section" id="puzzle-8x8">
  <h1>8x8 Sliding Puzzle</h1>
  <p>
    The 8x8 sliding puzzle, featuring 64 slots and 63 movable tiles, is an enormous leap in difficulty that demands 
    precision, focus, and long-term strategy. The sheer size of the grid means that even small mistakes can require 
    dozens of corrective moves, adding to the complexity and time required to solve it.
  </p>
  <p>
    To approach an 8x8 puzzle, players often rely on structured solving methods, such as finishing entire rows or 
    sections before moving to the next. However, as the grid grows, so does the difficulty of keeping everything in 
    place while working on new areas. Solvers must anticipate how each move will influence not just one tile but an 
    entire cluster of tiles spread across the board.
  </p>
  <p>
    The 8x8 sliding puzzle pushes the limits of mental endurance. It requires strong spatial awareness, pattern 
    recognition, and patience. Unlike smaller puzzles, it’s rare to solve this one quickly, and many players enjoy 
    the challenge of slowly and carefully bringing order to the chaos.
  </p>
  <p>
    With its vast number of possible states, the 8x8 sliding puzzle is also an interesting case study in artificial 
    intelligence research. Algorithms designed to solve it efficiently must deal with a state space so large that 
    brute-force approaches become impractical. For human players, though, the challenge is less about speed and more 
    about persistence, creativity, and strategic problem-solving.
  </p>
  <div class="puzzle-grid" data-size="8"></div>
</div>
`, "9": `
<div class="puzzle-section" id="puzzle-9x9">
  <h1>9x9 Sliding Puzzle</h1>
  <p>
    The 9x9 sliding puzzle is one of the most daunting versions of this classic game. With 81 slots, 80 movable tiles, 
    and one empty space, it offers a challenge that can take hours—or even days—to solve. Every move requires deep 
    thought, as the grid’s size makes it easy to lose track of progress or accidentally scramble previously solved sections.
  </p>
  <p>
    The standard method for solving a 9x9 puzzle involves breaking it down into smaller, manageable tasks: solving 
    row by row, or corner by corner, before piecing the sections together. This approach mirrors how professionals 
    tackle extremely large puzzles, focusing on reducing the problem into logical steps.
  </p>
  <p>
    Playing the 9x9 sliding puzzle provides immense cognitive benefits. It strengthens memory, improves logical 
    thinking, and helps develop perseverance in problem-solving. The level of concentration required ensures players 
    stay fully engaged throughout the process.
  </p>
  <p>
    From a computational perspective, the 9x9 sliding puzzle belongs to a class of problems with nearly uncountable 
    possible configurations. This has made it a valuable example in mathematics and computer science, especially in 
    testing search algorithms. For puzzle lovers, though, the true value lies in the satisfaction of mastering one 
    of the most complex variations of the sliding puzzle family.
  </p>
  <div class="puzzle-grid" data-size="9"></div>
</div>
`, "10": `
<div class="puzzle-section" id="puzzle-10x10">
  <h1>10x10 Sliding Puzzle</h1>
  <p>
    The 10x10 sliding puzzle represents the ultimate challenge in the family of sliding tile puzzles. With 100 slots, 
    99 movable tiles, and a single empty space, it stands as the largest commonly recognized version of the puzzle. 
    Solving it is not just about logical moves; it requires immense patience, foresight, and strategy.
  </p>
  <p>
    Approaching the 10x10 puzzle often involves a systematic strategy, solving smaller portions of the grid step by step. 
    However, given its size, even completing one section can feel like an achievement. Players must constantly think ahead, 
    planning sequences of moves that may involve shifting dozens of tiles just to position one correctly.
  </p>
  <p>
    The cognitive benefits of attempting a 10x10 puzzle are significant. It trains the brain in long-term focus, 
    adaptability, and advanced problem-solving. Each session feels less like a casual puzzle and more like a full 
    mental workout, testing the limits of persistence and determination.
  </p>
  <p>
    In computer science, the 10x10 sliding puzzle is used as an extreme example of combinatorial explosion, where the 
    number of possible states grows so vast that brute-force methods are impossible. For humans, however, the appeal 
    lies in the sheer challenge. Successfully solving the 10x10 puzzle is a rare achievement and a true testament to 
    skill, patience, and perseverance.
  </p>
  <div class="puzzle-grid" data-size="10"></div>
</div>
`,
    };

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

        const label = document.createElement("div");
        label.className = "label";
        label.textContent = `${size}X${size}`;

        // wrapper.appendChild(label);

        wrapper.appendChild(puzzle);
        wrapper.appendChild(puzzle);

        let div = document.createElement('div');
        div.innerHTML = puzzleContent[size];
        div.classList.add('content')

        // let button =document.createElement('button');
        // button.innerHTML='PlayNow';
        const button = document.createElement('button');
        button.classList.add('btn');
        button.onclick = () => sendValue(size);
        button.innerHTML = 'PLAY NOW'
        div.appendChild(button);

        wrapper.appendChild(div);


        // <button class='btn'>Play Now</button>

        return wrapper;
    }

    const container = document.getElementById("puzzleContainer");
    // Add alternating 3x3 and 4x4 puzzles
    for (let i = 3; i <= 10; i++) {
        // const size = i % 2 === 0 ? 3 : 4;
        container.appendChild(createPuzzle(i));
    }



    const menuPage = document.getElementById("parent");
    const gamePage = document.getElementById("gamePage");
    const puzzle = document.getElementById("puzzle");
    const moveCountEl = document.getElementById("moveCount");
    const messageEl = document.getElementById("message");

    let gridSize = 4;
    let tiles = [];
    let moveCount = 0;
    let isShuffling = false;

    // let slidingPuzzle3X3=document.getElementById("3X3SlidingPuzzle");
    // slidingPuzzle3X3.addEventListener('click', () => {
    //   sendValue(4);
    // });


    function sendValue(val) {
        // console.log(menuPage)
        gridSize = val;
        menuPage.classList.remove("active");
        gamePage.classList.add("active");
        init();
    }
    function startGame() {
        gridSize = parseInt(document.getElementById("gridSizeSelect").value);
        menuPage.classList.remove("active");
        gamePage.classList.add("active");
        init();
    }

    function goBack() {
        if (isShuffling) return; // prevent leaving while shuffle
        gamePage.classList.remove("active");
        menuPage.classList.add("active");
    }

    function init() {
        // build solved board
        tiles = [];
        for (let i = 1; i < gridSize * gridSize; i++) tiles.push(i);
        tiles.push(""); // empty
        moveCount = 0;
        moveCountEl.textContent = moveCount;
        messageEl.textContent = "";

        renderTiles();
        // start animated shuffle that guarantees every tile moves at least once
        animateShuffleGuaranteed();
    }

    function renderTiles(highlightValue = null) {
        puzzle.innerHTML = "";
        puzzle.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
        puzzle.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

        tiles.forEach((val, idx) => {
            const tile = document.createElement("div");
            tile.className = "tile";
            tile.style.background = getTileColor(val);
            if (val === "") {
                tile.classList.add("empty");
            } else {
                tile.textContent = val;
                // clicking allowed only when not shuffling
                tile.addEventListener("click", () => {
                    if (!isShuffling) moveTile(idx);
                });
            }
            if (highlightValue !== null && val === highlightValue) {
                tile.classList.add("recent-move");
                // remove highlight after short time
                setTimeout(() => tile.classList.remove("recent-move"), 220);
            }
            puzzle.appendChild(tile);
        });
    }

    function moveTile(idx) {
        // ignore user attempts while shuffling
        if (isShuffling) return;

        const emptyIdx = tiles.indexOf("");
        const validMoves = [idx - 1, idx + 1, idx - gridSize, idx + gridSize];

        if (
            validMoves.includes(emptyIdx) &&
            !(idx % gridSize === 0 && emptyIdx === idx - 1) &&
            !(idx % gridSize === gridSize - 1 && emptyIdx === idx + 1)
        ) {
            [tiles[idx], tiles[emptyIdx]] = [tiles[emptyIdx], tiles[idx]];
            moveCount++;
            moveCountEl.textContent = moveCount;
            renderTiles();
            checkWin();
        }
    }

    async function animateShuffleGuaranteed() {
        isShuffling = true;
        messageEl.textContent = "Shuffling...";
        const N = gridSize * gridSize - 1; // number of tiles (excluding empty)

        // Phase 1: random valid moves (do about ~N log N moves)
        const harmonicEstimate = Math.log(N > 0 ? N : 1) + 0.5772156649;
        let randomSteps = Math.ceil(N * harmonicEstimate * 1.2); // multiplier for safety
        randomSteps = Math.max(randomSteps, 60); // minimum steps
        const stepDelay = Math.max(40, Math.floor(3000 / randomSteps)); // spread over ~3s-ish

        const movedTiles = new Set();

        // perform random moves and record which tile values moved
        for (let i = 0; i < randomSteps; i++) {
            const emptyIdx = tiles.indexOf("");
            const neighbors = getNeighbors(emptyIdx);
            const moveIdx = neighbors[Math.floor(Math.random() * neighbors.length)];
            const movedValue = tiles[moveIdx];
            // swap
            [tiles[emptyIdx], tiles[moveIdx]] = [tiles[moveIdx], tiles[emptyIdx]];
            if (movedValue !== "") movedTiles.add(movedValue);
            renderTiles(movedValue);
            await sleep(stepDelay);
        }

        // Phase 2: ensure every tile moved at least once
        const allValues = [];
        for (let v = 1; v <= N; v++) allValues.push(v);

        const remaining = allValues.filter((v) => !movedTiles.has(v));

        // For each remaining tile, move it explicitly by moving the empty to a neighbor
        for (const val of remaining) {
            // find the current index of this tile
            let tileIdx = tiles.indexOf(val);
            if (tileIdx === -1) continue; // safety

            // get neighbors of the tile (positions we can move empty to so swapping will move the tile)
            const neighborsOfTile = getNeighbors(tileIdx);

            // pick the neighbor with the shortest path from current empty position
            const emptyIdx = tiles.indexOf("");
            let bestPath = null;
            for (const nb of neighborsOfTile) {
                const path = bfsPath(emptyIdx, nb, gridSize, tiles.length);
                if (path && (bestPath === null || path.length < bestPath.length)) {
                    bestPath = path;
                }
            }

            // if we couldn't find a path (shouldn't happen), skip
            if (!bestPath) continue;

            // move empty along path step-by-step
            for (let k = 1; k < bestPath.length; k++) {
                const from = bestPath[k - 1];
                const to = bestPath[k];
                // swap empty and the tile at 'to'
                [tiles[from], tiles[to]] = [tiles[to], tiles[from]];
                // the tile that moved into 'from' is tiles[from] (except empty)
                const movedValue = tiles[from] === "" ? null : tiles[from];
                if (movedValue !== null) movedTiles.add(movedValue);
                renderTiles(movedValue);
                await sleep(120);
            }

            // now empty is adjacent to tileIdx (tile may have moved if path crossed it; recompute)
            tileIdx = tiles.indexOf(val);
            const emptyNow = tiles.indexOf("");
            // ensure they are adjacent; if not, skip (shouldn't happen)
            if (Math.abs(tileIdx - emptyNow) === 1 || Math.abs(tileIdx - emptyNow) === gridSize) {
                // swap to move the tile
                [tiles[emptyNow], tiles[tileIdx]] = [tiles[tileIdx], tiles[emptyNow]];
                movedTiles.add(val);
                renderTiles(val);
                await sleep(160);
            } else {
                // fallback: perform a single random move to continue mixing
                const empt = tiles.indexOf("");
                const neigh = getNeighbors(empt);
                const rnd = neigh[Math.floor(Math.random() * neigh.length)];
                const movedValue = tiles[rnd];
                [tiles[empt], tiles[rnd]] = [tiles[rnd], tiles[empt]];
                if (movedValue !== "") movedTiles.add(movedValue);
                renderTiles(movedValue);
                await sleep(120);
            }
        }

        // optional small extra randomization after ensuring all tiles moved
        for (let i = 0; i < Math.min(30, Math.ceil(N * 0.5)); i++) {
            const emptyIdx = tiles.indexOf("");
            const neighbors = getNeighbors(emptyIdx);
            const moveIdx = neighbors[Math.floor(Math.random() * neighbors.length)];
            const movedValue = tiles[moveIdx];
            [tiles[emptyIdx], tiles[moveIdx]] = [tiles[moveIdx], tiles[emptyIdx]];
            renderTiles(movedValue);
            await sleep(60);
        }

        isShuffling = false;
        messageEl.textContent = "";
    }

    // helper: return neighbor indices (no wrap-around)
    function getNeighbors(idx) {
        const res = [];
        // up
        if (idx - gridSize >= 0) res.push(idx - gridSize);
        // down
        if (idx + gridSize < tiles.length) res.push(idx + gridSize);
        // left
        if (idx % gridSize !== 0) res.push(idx - 1);
        // right
        if (idx % gridSize !== gridSize - 1) res.push(idx + 1);
        return res;
    }

    // BFS to find shortest path of indices from start to goal
    function bfsPath(start, goal, gridSizeLocal = gridSize, total = tiles.length) {
        const q = [];
        const visited = new Array(total).fill(false);
        const parent = new Array(total).fill(-1);
        q.push(start);
        visited[start] = true;

        while (q.length) {
            const node = q.shift();
            if (node === goal) {
                // reconstruct path
                const path = [];
                let cur = goal;
                while (cur !== -1) {
                    path.push(cur);
                    cur = parent[cur];
                }
                path.reverse();
                return path;
            }
            const neighbors = [];
            if (node - gridSizeLocal >= 0) neighbors.push(node - gridSizeLocal);
            if (node + gridSizeLocal < total) neighbors.push(node + gridSizeLocal);
            if (node % gridSizeLocal !== 0) neighbors.push(node - 1);
            if (node % gridSizeLocal !== gridSizeLocal - 1) neighbors.push(node + 1);

            for (const nb of neighbors) {
                if (!visited[nb]) {
                    visited[nb] = true;
                    parent[nb] = node;
                    q.push(nb);
                }
            }
        }
        return null;
    }

    function isSolved() {
        for (let i = 0; i < tiles.length - 1; i++) {
            if (tiles[i] !== i + 1) return false;
        }
        return tiles[tiles.length - 1] === "";
    }

    function checkWin() {
        if (isSolved()) {
            messageEl.textContent = "🎉 You Win!";
            saveHistory(moveCount,"WON!");
        }
    }

      function saveHistory(moves, status) {
            let history = JSON.parse(localStorage.getItem("puzzleHistory")) || [];
            history.push({
                grid: `${gridSize} X ${gridSize}`,
                date: new Date().toLocaleString(),
                moves: moves,
                status: status
            });
           
            localStorage.setItem("puzzleHistory", JSON.stringify(history));
        }
    // color helper (keeps your previous logic)
    function getTileColor(val) {
        if (val === "") return "#eee";
        const colors = ["#ff0000", "#ff7f00", "#ffff00", "#00ff00", "#00ffff", "#0000ff", "#8b00ff"];
        return colors[val % colors.length];
    }

    // small sleep helper
    function sleep(ms) {
        return new Promise((res) => setTimeout(res, ms));
    }

    // Expose a public restart for buttons if you want
    function restart() {
        if (isShuffling) return;
        init();
    }

    // initialize with default (only if you want auto-run on load)
    document.addEventListener("DOMContentLoaded", () => {
        // Do NOT auto-start if you prefer waiting for Start button
        // If you want auto start with default gridSize:
        // init();
    });



      const openPopupBtn = document.getElementById("openPopupBtn");
    const closePopupBtn = document.getElementById("closePopupBtn");
    const popup = document.getElementById("popup");



    openPopupBtn.addEventListener("click", () => {
      popup.style.display = "flex"; // show popup
            let history = JSON.parse(localStorage.getItem("puzzleHistory")) || [];
        console.log(history)
        historyBody.innerHTML = "";
        history.forEach((h) => {
            let row = `<tr>
  <td>${h.grid || "4X4"}</td>
          <td>${h.date}</td>
          <td>${h.moves}</td>
          <td>${h.status}</td>
        </tr>`;
            historyBody.innerHTML += row;
        });
    });

   closePopupBtn.addEventListener("click", () => {
      popup.style.display = "none"; // hide popup
    });

    window.addEventListener("click", (e) => {
      if (e.target === popup) {
        popup.style.display = "none";
      }
    });