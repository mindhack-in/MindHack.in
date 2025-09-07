const blueBoard = document.getElementById("blueBoard");
const yellowBoard = document.getElementById("yellowBoard");
const redBoard = document.getElementById("redBoard");
const greenBoard = document.getElementById("greenBoard");

const rollDiceButton = document.getElementById("rollDiceButton");

let playerTurn = [];
let currentPlayerTurnIndex = 0;
let currentPlayerTurnStatus = true;
let teamHasBonus = false;
let diceResult;
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let green = [
  "g1",
  "g2",
  "g3",
  "g4",
  "g5",
  "g6",
  "g7",
  "g8",
  "g9",
  "g10",
  "g11",
  "g12",
  "g13",
];

let red = [
  "r1",
  "r2",
  "r3",
  "r4",
  "r5",
  "r6",
  "r7",
  "r8",
  "r9",
  "r10",
  "r11",
  "r12",
  "r13",
];

let blue = [
  "b1",
  "b2",
  "b3",
  "b4",
  "b5",
  "b6",
  "b7",
  "b8",
  "b9",
  "b10",
  "b11",
  "b12",
  "b13",
];

let yellow = [
  "y1",
  "y2",
  "y3",
  "y4",
  "y5",
  "y6",
  "y7",
  "y8",
  "y9",
  "y10",
  "y11",
  "y12",
  "y13",
];

let homePathEntrys = {
  blue: ["bh1", "bh2", "bh3", "bh4", "bh5", "winZone"],
  yellow: ["yh1", "yh2", "yh3", "yh4", "yh5", "winZone"],
  red: ["rh1", "rh2", "rh3", "rh4", "rh5", "winZone"],
  green: ["gh1", "gh2", "gh3", "gh4", "gh5", "winZone"],
};

let pathArrayMap = {
  blue: [
    ...blue,
    ...red,
    ...green,
    ...yellow.slice(0, -1),
    ...homePathEntrys.blue,
  ],
  yellow: [
    ...yellow,
    ...blue,
    ...red,
    ...green.slice(0, -1),
    ...homePathEntrys.yellow,
  ],
  red: [
    ...red,
    ...green,
    ...yellow,
    ...blue.slice(0, -1),
    ...homePathEntrys.red,
  ],
  green: [
    ...green,
    ...yellow,
    ...blue,
    ...red.slice(0, -1),
    ...homePathEntrys.green,
  ],
};

let pieceCurrentPositions = new Map();
let safePaths = [
  "r1",
  "r9",
  "b1",
  "b9",
  "y1",
  "y9",
  "g1",
  "g9",
  ...homePathEntrys.blue,
  ...homePathEntrys.yellow,
  ...homePathEntrys.red,
  ...homePathEntrys.green,
];

let homePathArray = [
  ...homePathEntrys.blue,
  ...homePathEntrys.yellow,
  ...homePathEntrys.red,
  ...homePathEntrys.green,
];

class PlayerPiece {
  constructor(team, position, score, homePathEntry, playerId, gameEntry) {
    this.team = team;
    this.position = position;
    this.score = score;
    this.homePathEntry = homePathEntry;
    this.playerId = playerId;
    this.gameEntry = gameEntry;
    this.status = 0;
    this.initialPosition = position;
    this.won = 0;
  }

  unlockPiece() {
    this.status = 1;
    this.position = this.gameEntry;
    let element = document.querySelector(`[piceId="${this.playerId}`);
    let gameStart = document.getElementById(this.gameEntry);
    gameStart.appendChild(element);
  }

  async movePiece(diceResult) {
    if (this.won == 1) return;
    if (this.status == 0) this.unlockPiece();
    // else if(this.homePathEntry==)
    else {
      let pathArray = pathArrayMap[this.team];
      let currentIndex = pathArray.includes(this.position)
        ? pathArray.indexOf(this.position)
        : 0;
      let pos = homePathEntrys[this.team][this.position];
      for (let i = 1; i <= diceResult; i++) {
        await delay(500);

        let position = pathArray[i + currentIndex];
        this.position = position;
        let element = document.querySelector(`[piceId="${this.playerId}`);
        let gameStart = document.getElementById(position);
        gameStart.appendChild(element);

        if (this.position === "winZone") {
          this.won = 1;
          this.status = 0;
          break;
        }
      }
      if (safePaths.indexOf(this.position === -1))
        this.checkOthers(this.position);
      pieceCurrentPositions.set(this.position, this);
    }
  }

  sentMeToBoard() {
    this.position = this.initialPosition;
    let element = document.querySelector(`[piceId="${this.playerId}`);
    let gameStart = document.getElementById(this.position);
    gameStart.appendChild(element);
  }

  checkOthers(position) {
    let otherPiece = pieceCurrentPositions.get(position);
    if (
      otherPiece != null &&
      otherPiece.team != this.team &&
      otherPiece.won == 0 &&
      otherPiece.position === position
    ) {
      otherPiece.sentMeToBoard();
    }
  }
}

let playerPieces = [];

let boardDetails = [
  { boardColor: "blue", board: blueBoard, homeEntry: "y12", gameEntry: "b1" },
  { boardColor: "green", board: greenBoard, homeEntry: "r12", gameEntry: "g1" },
  { boardColor: "red", board: redBoard, homeEntry: "b12", gameEntry: "r1" },
  {
    boardColor: "yellow",
    board: yellowBoard,
    homeEntry: "g12",
    gameEntry: "y1",
  },
];
let numPvP = 4;

let playerPiecesMap = new Map();
for (let i = 0; i < numPvP; i++) {
  let boardColor = boardDetails[i].boardColor;
  let homeEntry = boardDetails[i].homeEntry;
  let gameEntry = boardDetails[i].gameEntry;

  const parentDiv = document.createElement("div");
  parentDiv.id = boardColor + "_home";
  let localPieces = [];
  for (let i = 0; i < 4; i++) {
    const span = document.createElement("span");
    const icon = document.createElement("i");
    icon.classList.add(
      "fa-solid",
      "fa-location-pin",
      "piece",
      `${boardColor}Piece`
    );
    icon.addEventListener("click", (e) => {});

    let pieceId = `${boardColor}${i}`;
    let position = `${i}_${boardColor}`;
    icon.id = pieceId;

    const player = new PlayerPiece(
      boardColor,
      position,
      0,
      homeEntry,
      pieceId,
      gameEntry
    );
    span.setAttribute("id", position);
    icon.setAttribute("piceId", pieceId);

    // if (pieceId === "blue1") {
    //   player.status = 1;
    //   console.log(player);
    //   player.position = "bh3";
    // }

    // if (pieceId === "red1") {
    //   player.status = 1;
    //   console.log(player);
    //   player.position = "rh3";
    // }

    // if (pieceId === "green1") {
    //   player.status = 1;
    //   console.log(player);
    //   player.position = "gh3";
    // }

    // if (pieceId === "yellow1") {
    //   player.status = 1;
    //   console.log(player);
    //   player.position = "yh3";
    // }

    playerPieces.push(player);
    span.append(icon);
    parentDiv.append(span);
    localPieces.push(player);
  }
  playerPiecesMap.set(boardColor, localPieces);
  boardDetails[i].board.append(parentDiv);
}

// let element = document.querySelector(`[piceid="yellow1"]`);
// let gameStart = document.getElementById("yh3");
// gameStart.appendChild(element);

// element = document.querySelector(`[piceid="green1"]`);
// gameStart = document.getElementById("gh3");
// gameStart.appendChild(element);

// element = document.querySelector(`[piceid="red1"]`);
// gameStart = document.getElementById("rh3");
// gameStart.appendChild(element);

// element = document.querySelector(`[piceid="blue1"]`);
// gameStart = document.getElementById("bh3");
// gameStart.appendChild(element);

if (numPvP === 2) {
  playerTurn = ["blue", "green"];
} else if (numPvP === 3) {
  playerTurn = ["blue", "red", "green"];
} else if (numPvP === 4) {
  playerTurn = ["blue", "red", "green", "yellow"];
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let autoPlayMode;
let timePlay = 100000;


async function rollDiceAnimation() {
  const dice = document.getElementById("dice");
  const resultText = document.getElementById("result");
  diceResult = Math.floor(Math.random() * 6) + 1;

  let x = 0,
    y = 0;
  if (diceResult === 1) {
    x = 0;
    y = 0;
  }
  if (diceResult === 2) {
    x = 0;
    y = -90;
  }
  if (diceResult === 3) {
    x = 0;
    y = 180;
  }
  if (diceResult === 4) {
    x = 0;
    y = 90;
  }
  if (diceResult === 5) {
    x = -90;
    y = 0;
  }
  if (diceResult === 6) {
    x = 90;
    y = 0;
  }

  x += (Math.floor(Math.random() * 4) + 1) * 360;
  y += (Math.floor(Math.random() * 4) + 1) * 360;

  dice.style.transform = `rotateX(${x}deg) rotateY(${y}deg)`;
  resultText.textContent = "Result: " + diceResult;
}

// let autoPlayMode ;

async function playDice() {
  console.log("Dice is working");
  rollDiceButton.disabled = true;
  clearTimeout(autoPlayMode);
  await rollDiceAnimation();

  await sleep(1000);
  let currentTeamTurn = playerTurn[currentPlayerTurnIndex];

  if (!currentPlayerTurnStatus) return;

  await unsetPlayerTurn(currentPlayerTurnIndex);
  await glowMyPices(currentTeamTurn, diceResult);

  // await  nextTeamTurn();
  // autoPlayMode = setTimeout(() => {
  //   playAnyPiece(currentTeamTurn, diceResult);
  // }, timePlay);
}

rollDiceButton.addEventListener("click", playDice);

const setPlayerTurn = async (playerTurnIndex) => {
  await sleep(1000);

  let currentTeamTurn = playerTurn[playerTurnIndex];
  let boardDetailsObject = boardDetails.filter(
    (obj) => obj.boardColor === currentTeamTurn
  );
  boardDetailsObject[0].board.classList.add("active");

  const elements = document.querySelectorAll(".side");
  elements.forEach((el) => {
    el.style.background = currentTeamTurn;
  });

  autoPlayMode = setTimeout(() => {
    rollDiceButton.click();
  }, timePlay);
};

const unsetPlayerTurn = async (playerTurnIndex) => {
  await sleep(1000);
  let currentTeamTurn = playerTurn[playerTurnIndex];
  let boardDetailsObject = boardDetails.filter(
    (obj) => obj.boardColor === currentTeamTurn
  );
  boardDetailsObject[0].board.classList.remove("active");
};

setPlayerTurn(0);

const nextTeamTurn = async () => {
  await sleep(1000);

  if (currentPlayerTurnIndex == playerTurn.length - 1) {
    currentPlayerTurnIndex = 0;
  } else {
    currentPlayerTurnIndex += 1;
  }

  await setPlayerTurn(currentPlayerTurnIndex);
  rollDiceButton.disabled = false;

  // autoPlayMode = setTimeout(() => {
  //   rollDiceButton.click();
  // }, timePlay);
};

async function glowMyPices(player, diceResult) {
  let localPieces = playerPieces.filter((obj) => obj.team === player);
  let playerAllowed = false;

  let allowedPieces = [];
  for (let i = 0; i < localPieces.length; i++) {
    let shouldGlow = false;

    let totalUnlockedPiece1s = localPieces[i];
    if (totalUnlockedPiece1s.status === 1) {
      shouldGlow = true;
    }
    if (diceResult === 6) {
      shouldGlow = true;
    }
    const span = document.getElementById(localPieces[i].playerId);

    if (shouldGlow == true) {
      allowedPieces.push(span);
      span.classList.toggle("active");
      playerAllowed = true;
      span.onclick = async function () {
        await unactivePieces(localPieces, diceResult);
        let totalUnlockedPiece1s = localPieces[i];
        await totalUnlockedPiece1s.movePiece(diceResult);
        if (diceResult === 6) {
          rollDiceButton.disabled = false;
          console.log("player resturn");
          setPlayerTurn(currentPlayerTurnIndex);
        } else {
          await nextTeamTurn();
        }
      };
    } else {
      span.onclick = function () {};
    }
  }

  if (playerAllowed == false) {
    nextTeamTurn();
  } else {
    autoPlayMode = setTimeout(() => {
     playAnyPiece(allowedPieces);
    }, timePlay);
  }
}

async function playAnyPiece(allPieces) {
  if (allPieces.length !== 0) {
    console.log(allPieces);
    let i = Math.floor(Math.random() * allPieces.length);
    console.log(i);

    totalUnlockedPiece1s = allPieces[i];
    totalUnlockedPiece1s.click();
    // await totalUnlockedPiece1s.movePiece(diceResult);
  }
}

async function unactivePieces(localPieces, diceResult) {
  clearTimeout(autoPlayMode);
  for (let j = 0; j < localPieces.length; j++) {
    let totalUnlockedPiece1s = localPieces[j];
    if (diceResult === 6 || totalUnlockedPiece1s.status === 1) {
      const s1 = document.getElementById(localPieces[j].playerId);
      s1.classList.toggle("active");
      console.log("un active");

      s1.onclick = function () {};
    }
  }
}
