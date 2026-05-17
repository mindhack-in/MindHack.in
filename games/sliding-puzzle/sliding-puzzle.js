import { url } from "../../utility/js/constants.js";
import { iframeLink } from "../../utility/js/constants.js";
import { dynamicResource } from "../../utility/js/constants.js";

const gamesGrid = document.querySelector("#inner-games-grid");

const games = [
    {
        name: "3X3 Sliding Puzzle",
        img: "/games/sliding-puzzle/3x3.jpg",
        link: "games/sliding-puzzle/3X3/",
        description: "Test your skills in this addictive 2048 game—combine tiles to reach the highest number"
    },
    {
        name: "4X4 Sliding Puzzle",
        img: "/games/sliding-puzzle/4x4.jpg",
        link: "games/sliding-puzzle/4X4/",
        description: "Test your skills in this addictive Sudoku game—fill the grid with numbers while following the rules"
    },
    {
        name: "5X5 Sliding Puzzle",
        img: "/games/sliding-puzzle/5X5.jpg",
        link: "games/sliding-puzzle/5X5/",
        description: "Test your skills in this addictive Sliding Puzzle game—arrange the tiles in the correct order by sliding them around"
    },

    {
        name: "6X6 Sliding Puzzle",
        img: "/games/sliding-puzzle/6X6.jpg",
        link: "games/sliding-puzzle/6X6/",
        description: "Test your skills in this addictive Flappy Bird game—navigate through the pipes without hitting them"
    }
    ,
    {
        name: "7X7 Sliding Puzzle",
        img: "/games/sliding-puzzle/7X7.jpg",
        link: "games/sliding-puzzle/7X7/",
        description: "Test your skills in this addictive Pac-Man game—eat all the dots while avoiding the ghosts"
    },
       {
        name: "8X8 Sliding Puzzle",
        img: "/games/sliding-puzzle/8X8.jpg",
        link: "games/sliding-puzzle/8X8/",
        description: "Test your skills in this addictive Sliding Puzzle game—arrange the tiles in the correct order by sliding them around"
    },

    {
        name: "9X9 Sliding Puzzle",
        img: "/games/sliding-puzzle/9X9.jpg",
        link: "games/sliding-puzzle/9X9/",
        description: "Test your skills in this addictive Flappy Bird game—navigate through the pipes without hitting them"
    }
    ,
    {
        name: "10X10 Sliding Puzzle",
        img: "/games/sliding-puzzle/10X10.jpg",
        link: "games/sliding-puzzle/10X10/",
        description: "Test your skills in this addictive Pac-Man game—eat all the dots while avoiding the ghosts"
    }
]

for (let i = 0; i < games.length; i++) {
    const game = games[i];
    const card = document.createElement("div");
    card.classList.add("game-card");

    // const img = document.createElement("img");
    // img.src = dynamicResource + game.img;
    // img.classList.add("game-img");
    // card.appendChild(img);

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
