const emojis = [
  "🍎",
  "🍌",
  "🍇",
  "🍓",
  "🍒",
  "🍉",
  "🥝",
  "🍍",
  "🍉",
  "🍎",
  "🍌",
  "🍇",
  "🍓",
  "🍒",
  "🍉",
  "🥝",
];
let cards = [...emojis, ...emojis]; // 8 pairs = 16 cards
let flippedCards = [];
let matchedCount = 0;

const gameBoard = document.getElementById("game-board");
const status = document.getElementById("status");

// Shuffle array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createBoard() {
  shuffle(cards);
  gameBoard.innerHTML = "";

  cards.forEach((emoji, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.emoji = emoji;
    card.dataset.index = index;

    const cardInner = document.createElement("div");
    cardInner.classList.add("card-inner");

    const cardFront = document.createElement("div");
    cardFront.classList.add("card-front");
    cardFront.textContent = emoji;

    const cardBack = document.createElement("div");
    cardBack.classList.add("card-back");
    cardBack.textContent = "❓";

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
    gameBoard.appendChild(card);
    card.classList.add("flip");
    card.classList.remove("flip");

    card.addEventListener("click", () => handleFlip(card));
  });

let allCards = document.getElementsByClassName('card');
console.log(allCards);
Array.from(allCards).forEach(card => {
  card.classList.add('flip');
});

setTimeout(() => {
Array.from(allCards).forEach(card => {
  card.classList.remove('flip');
});}, 2000);
}

function handleFlip(card) {
  if (
    flippedCards.length === 2 ||
    card.classList.contains("matched") ||
    card.classList.contains("flip")
  ) {
    return;
  }

  card.classList.add("flip");
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  const isMatch = card1.dataset.emoji === card2.dataset.emoji;

  if (isMatch) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    matchedCount += 2;
    flippedCards = [];

    if (matchedCount === cards.length) {
      status.textContent = "🎉 You matched all cards!";
 
    }
  } else {
    setTimeout(() => {
      card1.classList.remove("flip");
      card2.classList.remove("flip");
      flippedCards = [];
    }, 800);
  }
}

createBoard();
