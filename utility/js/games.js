import { url } from "./constants.js";
import { dynamicResource } from "./constants.js";
import { iframeLink } from "./constants.js";

const name = window.pageConfig ? window.pageConfig.name : "";


const gamesGrid = document.querySelector("#games-grid");

const pageType = window.pageConfig ? window.pageConfig.pageType : 'home';
const isHomePage = pageType === 'home';
const games = [
    {
        name: "Cube",
        img: "games/rubikscube/2X2.jpg",
        link: "games/rubiks-cube-scramble/",
        description: "Test your skills in this addictive Rubik's Cube game—twist, turn, and solve the puzzle"
    },
    {
        name: "2048",
        img: "games/2048.jpg",
        link: "games/2048/",
        description: "Test your skills in this addictive 2048 game—combine tiles to reach the highest number"
    },
    {
        name: "Sudoku",
        img: "games/sudoku.png",
        link: "games/sudoku/",
        description: "Test your skills in this addictive Sudoku game—fill the grid with numbers while following the rules"
    },
    {
        name: "Slidingpuzzle",
        img: "games/slidingpuzzle.png",
        link: "games/sliding-puzzle",
        description: "Test your skills in this addictive Sliding Puzzle game—arrange the tiles in the correct order by sliding them around"
    },

    {
        name: "flappy-bird",
        img: "games/flappy-bird.png",
        link: "games/flappy-bird/",
        description: "Test your skills in this addictive Flappy Bird game—navigate through the pipes without hitting them"
    }
    ,
    {
        name: "pacman",
        img: "games/pacman.png",
        link: "games/pacman",
        description: "Test your skills in this addictive Pac-Man game—eat all the dots while avoiding the ghosts"
    }
    , {
        name: "demon-strikes",
        img: "games/shooting-games/demon-skies.png",
        link: "games/air-force-mission/demon-skies.html",
        description: "Test your skills in this addictive Demon Strikes game—defeat demons and become the ultimate warrior"
    },
    {
        name: "match-the-cards",
        img: "games/match-the-card/animals.jpg",
        link: "",
        description: "Test your skills in this addictive Match the Cards game—find pairs of matching cards"
    }



]

let gameCount = isHomePage ? 5 : games.length;
for (let i = 0; i < gameCount; i++) {


    const game = games[i];

        
    if(name==game.name)
        continue;

    
    const card = document.createElement("div");
    card.classList.add("game-card");

    const img = document.createElement("img");
    img.src = dynamicResource+ game.img;
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

const i = 0;
if (isHomePage) {
    const card = document.createElement("div");
    card.classList.add("game-card");
    const title = document.createElement("h3");
    title.textContent = "View All Games";
    card.appendChild(title);

    const desc = document.createElement("p");
    desc.textContent = "View our full collection of games and find your next favorite!";
    card.appendChild(desc);

    const playBtn = document.createElement("button");
    playBtn.classList.add("play-btn");
    playBtn.innerHTML = `Play now <i class="fas fa-chevron-right"></i>`;
    card.appendChild(playBtn);


    playBtn.addEventListener("click", () => {
        window.location.href = url + "games/";
    });
    gamesGrid.appendChild(card);
}