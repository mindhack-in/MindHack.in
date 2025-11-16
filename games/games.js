// import { url } from "../utility/js/constants.js";

// const dynamicUrl = "../dynamic/";

// fetch(dynamicUrl + "games/games.json")
//   .then((response) => response.json())
//   .then((data) => gamePopulate(data));


// const container = document.getElementById("gameHolder");

// function gamePopulate(data) {
//   data.forEach((key) => {

//     const gameCard = document.createElement("div");
//     gameCard.classList.add("game-holder");
//     gameCard.classList.add(key.type);

//     const img = document.createElement("img");
//     img.src = key.image;
//     img.onclick = () => {
//       window.location.href = url + "games/" + key.gameLink;
//     };
//     gameCard.appendChild(img);
//     container.appendChild(gameCard);
//   });
// }
