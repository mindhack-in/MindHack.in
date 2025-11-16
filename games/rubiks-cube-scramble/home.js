import { url } from "../../utility/js/constants.js";
const dynamicUrl = "../../dynamic/";

function goToScramble(cubeType) {
  window.location.href = url + `games/rubiks-cube-scramble/${cubeType}`
}
let size = window.pageConfig?.size ? parseInt(window.pageConfig.size) : 0;
size=size+"X"+size;
const cubeTypes = ['2X2', '3X3', '4X4', '5X5', '6X6', '7X7'];

const cubeContainer = document.querySelector('.cube-container');


for (const type of cubeTypes) {

  if(size=== type)
    continue;
  const cubeCard = document.createElement('div');
  cubeCard.className = 'cube-card';
  cubeCard.onclick = () => goToScramble(type);

  const cubeImg = document.createElement('img');
  cubeImg.src =  `/dynamic/games/rubikscube/${type}.png`

  cubeImg.alt = `${type} Cube`;
  cubeImg.className = 'cube-img';
  cubeCard.appendChild(cubeImg);

  const cubeName = document.createElement('div');
  cubeName.className = 'cube-name';
  cubeName.textContent = `${type} Cube`;
  cubeCard.appendChild(cubeName);

  cubeContainer.appendChild(cubeCard);
}