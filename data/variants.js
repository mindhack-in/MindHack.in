/**
 * Variant catalogues for the three game hub pages.
 *
 * These lists used to live in page-local <script> files
 * (matchcards.js, sliding-puzzle.js, rubiccubescramble.js) that built the grid
 * in the browser. That meant the 24 variant pages had no crawlable inbound
 * links at all. They are now server-rendered as real anchors.
 *
 * `img` paths resolve against DYNAMIC_RESOURCE from .env.
 */

const matchTheCardTypes = [
  "fruits",
  "animals",
  "birds",
  "vegetables",
  "symbols",
  "transport",
  "sports",
  "faces",
  "sea-creatures",
  "desserts",
];

const titleCase = (value) =>
  value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export const matchTheCard = matchTheCardTypes.map((type) => ({
  name: titleCase(type),
  img: `games/match-the-card/${type}.jpg`,
  alt: `Memory Match the Cards - ${type}`,
  link: `/games/match-the-card/${type}/`,
  description: `Flip and pair the ${titleCase(type).toLowerCase()} cards from memory.`,
  anchorText: "Play now",
}));

// NOTE: the original sliding-puzzle.js shipped copy-pasted descriptions that
// described 2048, Flappy Bird and Pac-Man on the sliding puzzle cards. Those
// were plainly wrong and are corrected here.
export const slidingPuzzle = [3, 4, 5, 6, 7, 8, 9, 10].map((size) => ({
  name: `${size}X${size} Sliding Puzzle`,
  img: `games/sliding-puzzle/${size}x${size}.jpg`,
  alt: `${size}x${size} Sliding Tiles Puzzle Board`,
  link: `/games/sliding-puzzle/${size}x${size}/`,
  description: `Slide the tiles into order on a ${size}x${size} board — a tighter squeeze the bigger the grid gets.`,
  anchorText: `Play ${size}x${size}`,
  // The original commented out the artwork on these cards; kept text-only.
  showImage: false,
}));

export const rubiksCube = [2, 3, 4, 5, 6, 7].map((size) => ({
  name: `${size}X${size} Cube`,
  img: `games/rubikscube/${size}X${size}.jpg`,
  alt: `Mindhack-games-rubik's Cube  ${size}X${size} Cube`,
  link: `/games/rubiks-cube-scramble/${size}X${size}/`,
  description:
    "Test your skills in this addictive Rubik's Cube game—twist, turn, and solve the puzzle",
  anchorText: "Play now",
}));

export const variantSets = { matchTheCard, slidingPuzzle, rubiksCube };
