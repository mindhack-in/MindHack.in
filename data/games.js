/**
 * The game catalogue that powers every "games grid" on the site.
 *
 * `img` and `link` are relative on purpose: `img` is resolved against
 * DYNAMIC_RESOURCE and `link` against SITE_URL, both from .env.
 */
export const games = [
  {
    name: "Cube",
    img: "games/rubikscube/2X2.jpg",
    link: "games/rubiks-cube-scramble/",
    description:
      "Test your skills in this addictive Rubik's Cube game—twist, turn, and solve the puzzle",
    anchorText: "Use Rubik's Timer",
    alt: "Rubik's Cube Scramble Game",
  },
  {
    name: "2048",
    img: "games/2048.jpg",
    link: "games/2048/",
    description:
      "Test your skills in this addictive 2048 game—combine tiles to reach the highest number",
    anchorText: "Play 2048 Online",
    alt: "2048 Number Tile Merge Game",
  },
  {
    name: "Sudoku",
    img: "games/sudoku.png",
    link: "games/sudoku/",
    description:
      "Test your skills in this addictive Sudoku game—fill the grid with numbers while following the rules",
    anchorText: "Play Sudoku Free",
    alt: "Sudoku Classic Logic Puzzle Grid",
  },
  {
    name: "Slidingpuzzle",
    img: "games/slidingpuzzle.png",
    link: "games/sliding-puzzle/",
    description:
      "Test your skills in this addictive Sliding Puzzle game—arrange the tiles in the correct order by sliding them around",
    anchorText: "Play Sliding Puzzle",
    alt: "Sliding Number Puzzle Game Board",
  },
  {
    name: "flappy-bird",
    img: "games/flappy-bird.png",
    link: "games/flappy-bird/",
    description:
      "Test your skills in this addictive Flappy Bird game—navigate through the pipes without hitting them",
    anchorText: "Play Flappy Bird",
    alt: "Flappy Bird Arcade Retro Game",
  },
  {
    name: "pacman",
    img: "games/pacman.png",
    link: "games/pacman/",
    description:
      "Test your skills in this addictive Pac-Man game—eat all the dots while avoiding the ghosts",
    anchorText: "Play Pacman",
    alt: "Pacman Classic Maze Arcade Game",
  },
  {
    name: "demon-strikes",
    img: "games/shooting-games/demon-skies.png",
    link: "games/air-force-mission/demon-skies/",
    description:
      "Test your skills in this addictive Demon Strikes game—defeat demons and become the ultimate warrior",
    anchorText: "Play Demon Strikes",
    alt: "Demon Strikes Space Shooter Game",
  },
  {
    name: "match-the-cards",
    img: "games/match-the-card/animals.jpg",
    link: "games/match-the-card/",
    description:
      "Test your skills in this addictive Match the Cards game—find pairs of matching cards",
    anchorText: "Play Match the Cards",
    alt: "Match the Cards Memory Matching Game",
  },
];

/** How many cards the home page shows before the "View All Games" tile. */
export const HOME_GAME_COUNT = 5;
