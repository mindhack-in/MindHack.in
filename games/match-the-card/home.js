import {  url } from "../../utility/js/constants.js";
let dynamicUrl = "../../dynamic/";

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

if(types.indexOf(cardType)!=-1)
  dynamicUrl="../"+dynamicUrl;
for (let i = 0; i < types.length; i++) {

  if (types[i] === cardType)
    continue;

  const imageCard = document.createElement("div");
  imageCard.classList.add("image-card");

  const image = document.createElement("img");
  image.src = dynamicUrl + `games/match-the-card/${types[i]}.jpg`;
  image.alt = types[i];
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  overlay.innerText = types[i].charAt(0).toUpperCase() + types[i].slice(1);

  imageCard.appendChild(overlay);
  imageCard.appendChild(image);

  imageCard.onclick = () => {
    window.location.href = url + "games/match-the-card/" + types[i];
  };
  gameBoard.appendChild(imageCard);
}