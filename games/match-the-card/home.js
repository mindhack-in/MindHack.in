import { url } from "../../utility/js/constants.js";

const types = [
  "fruits",
  "animals",
  "birds",
  "vegetables",
  "symbols",
  "transport",
  "sports",
  "faces",
  "sea-creatures",
  "desserts"];


const gameBoard = document.getElementById("home-board");

const cardType = window.pageConfig?.cards ? window.pageConfig.cards : 1;;



types.forEach(game => {
  console.log(game)
  if (game!== cardType) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("game-holder", `game-holder-small`);
    wrapper.id = game + " match the cards";

    const anchor = document.createElement("a");
    anchor.href = url + "games/match-the-card/" + game;

    const img = document.createElement("img");
    img.src = `/dynamic/games/match-the-card/${game}.jpg`;
    img.alt = game.alt;
    img.loading = "lazy";

    anchor.appendChild(img);
    wrapper.appendChild(anchor);
    gameBoard.appendChild(wrapper);
  }
});
