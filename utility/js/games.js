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
        description: "Test your skills in this addictive Rubik's Cube game—twist, turn, and solve the puzzle",
        anchorText: "Use Rubik's Timer"
    },
    {
        name: "2048",
        img: "games/2048.jpg",
        link: "games/2048/",
        description: "Test your skills in this addictive 2048 game—combine tiles to reach the highest number",
        anchorText: "Play 2048 Online"
    },
    {
        name: "Sudoku",
        img: "games/sudoku.png",
        link: "games/sudoku/",
        description: "Test your skills in this addictive Sudoku game—fill the grid with numbers while following the rules",
        anchorText: "Play Sudoku Free"
    },
    {
        name: "Slidingpuzzle",
        img: "games/slidingpuzzle.png",
        link: "games/sliding-puzzle/",
        description: "Test your skills in this addictive Sliding Puzzle game—arrange the tiles in the correct order by sliding them around",
        anchorText: "Play Sliding Puzzle"
    },
    {
        name: "flappy-bird",
        img: "games/flappy-bird.png",
        link: "games/flappy-bird/",
        description: "Test your skills in this addictive Flappy Bird game—navigate through the pipes without hitting them",
        anchorText: "Play Flappy Bird"
    },
    {
        name: "pacman",
        img: "games/pacman.png",
        link: "games/pacman/",
        description: "Test your skills in this addictive Pac-Man game—eat all the dots while avoiding the ghosts",
        anchorText: "Play Pacman"
    },
    {
        name: "demon-strikes",
        img: "games/shooting-games/demon-skies.png",
        link: "games/air-force-mission/demon-skies.html/",
        description: "Test your skills in this addictive Demon Strikes game—defeat demons and become the ultimate warrior",
        anchorText: "Play Demon Strikes"
    },
    {
        name: "match-the-cards",
        img: "games/match-the-card/animals.jpg",
        link: "games/match-the-card/",
        description: "Test your skills in this addictive Match the Cards game—find pairs of matching cards",
        anchorText: "Play Match the Cards"
    }
]

if (gamesGrid && gamesGrid.children.length === 0) {
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
        // Ensure image alt attribute is set for SEO image alt text audit
        img.alt = game.anchorText || game.name;
        card.appendChild(img);

        const title = document.createElement("h3");
        title.textContent = game.name;
        card.appendChild(title);

        const desc = document.createElement("p");
        desc.textContent = game.description;
        card.appendChild(desc);

        const playLink = document.createElement("a");
        playLink.classList.add("play-btn");
        const finalUrl = game.link.startsWith("http") ? game.link : url + game.link;
        playLink.href = finalUrl;
        
        const anchorText = game.anchorText || "Play now";
        playLink.innerHTML = `${anchorText} <i class="fas fa-chevron-right"></i>`;
        card.appendChild(playLink);
    }

    if (isHomePage) {
        const card = document.createElement("div");
        card.classList.add("game-card");
        const title = document.createElement("h3");
        title.textContent = "View All Games";
        card.appendChild(title);

        const desc = document.createElement("p");
        desc.textContent = "View our full collection of games and find your next favorite!";
        card.appendChild(desc);

        const playLink = document.createElement("a");
        playLink.classList.add("play-btn");
        playLink.href = url + "games/";
        playLink.innerHTML = `Browse All Games <i class="fas fa-chevron-right"></i>`;
        card.appendChild(playLink);
    }
}