import { url } from "../../utility/js/constants.js";
import { iframeLink } from "../../utility/js/constants.js";
import { dynamicResource } from "../../utility/js/constants.js";

const gamesGrid = document.querySelector("#inner-games-grid");

const games = [
    {
        name: "2X2 Cube",
        img: "/games/rubikscube/2X2.jpg",
        link: "games/rubiks-cube-scramble/2X2/",
        description: "Test your skills in this addictive Rubik's Cube game—twist, turn, and solve the puzzle"
    },
    {
        name: "3X3 Cube",
        img: "/games/rubikscube/3x3.jpg",
        link: "games/rubiks-cube-scramble/3X3/",
        description: "Test your skills in this addictive 2048 game—combine tiles to reach the highest number"
    },
    {
        name: "4X4 Cube",
        img: "/games/rubikscube/4x4.jpg",
        link: "games/rubiks-cube-scramble/4X4/",
        description: "Test your skills in this addictive Sudoku game—fill the grid with numbers while following the rules"
    },
    {
        name: "5X5 Cube",
        img: "/games/rubikscube/5X5.jpg",
        link: "games/rubiks-cube-scramble/5X5/",
        description: "Test your skills in this addictive Sliding Puzzle game—arrange the tiles in the correct order by sliding them around"
    },

    {
        name: "6X6 Cube",
        img: "/games/rubikscube/6X6.jpg",
        link: "games/rubiks-cube-scramble/6X6/",
        description: "Test your skills in this addictive Flappy Bird game—navigate through the pipes without hitting them"
    }
    ,
    {
        name: "7X7 Cube",
        img: "/games/rubikscube/7X7.jpg",
        link: "games/rubiks-cube-scramble/7X7/",
        description: "Test your skills in this addictive Pac-Man game—eat all the dots while avoiding the ghosts"
    }
]

for (let i = 0; i < games.length; i++) {
    const game = games[i];
    const card = document.createElement("div");
    card.classList.add("game-card");

    const img = document.createElement("img");
    img.src = dynamicResource + game.img;
    img.alt= 'Mindhack-games-rubik\'s Cube  '+game.name;
    img.classList.add("game-img");
    card.appendChild(img);

    const title = document.createElement("h3");
    title.textContent = game.name;
    card.appendChild(title);

    const desc = document.createElement("p");
    desc.textContent = game.description;
    card.appendChild(desc);

    const playBtn = document.createElement("button");
    playBtn.classList.add("play-btn");
    playBtn.innerHTML = `Play now <i class="fas fa-chevron-right"></i>`;
    card.appendChild(playBtn);


    playBtn.addEventListener("click", () => {
        const finalUrl = game.link.startsWith("http") ? game.link : url + game.link;
        window.location.href = finalUrl;
    });
    gamesGrid.appendChild(card);
}