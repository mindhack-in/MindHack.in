import { url } from "../../utility/js/constants.js";
import { iframeLink } from "../../utility/js/constants.js";
import { dynamicResource } from "../../utility/js/constants.js";

const gamesGrid = document.querySelector("#inner-games-grid");
const imageLink = dynamicResource+"/games/match-the-card/"
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



for (let i = 0; i < types.length; i++) {
    const game = types[i];

    const card = document.createElement("div");
    card.classList.add("game-card");

    const img = document.createElement("img");
    img.src = imageLink+game+".jpg";
    img.classList.add("game-img");
    img.alt = `Memory Match the Cards - ${game}`;
    card.appendChild(img);

    const title = document.createElement("h3");
    title.textContent = game;
    card.appendChild(title);

    const desc = document.createElement("p");
    desc.textContent = game;
    card.appendChild(desc);

    const playBtn = document.createElement("button");
    playBtn.classList.add("play-btn");
    playBtn.innerHTML = `Play now <i class="fas fa-chevron-right"></i>`;
    card.appendChild(playBtn);


    playBtn.addEventListener("click", () => {
        window.location.href = url + "games/match-the-card/" + game + "/";
    });
    gamesGrid.appendChild(card);
}
