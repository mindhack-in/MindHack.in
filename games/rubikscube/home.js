import { dynamicUrl,url } from "../../utility/js/constants.js";

function goToScramble(cubeType) {
       window.location.href =url+`games/rubikscube/${cubeType}rubikscube.html`
}

const cubeTypes = ['2X2', '3X3', '4X4', '5X5', '6X6', '7X7'];
// ,'pyraminx','skewb','megaminx','mirror,','ghost','clock'

const cubeContainer = document.querySelector('.cube-container');


for (const type of cubeTypes) {

  const cubeCard = document.createElement('div');
  cubeCard.className = 'cube-card';
  cubeCard.onclick = () => goToScramble(type);

  const cubeImg = document.createElement('img');
  cubeImg.src =  dynamicUrl+`games/rubikscube/${type}.jpg`
  console.log(cubeImg.src);
    // cubeImg.src =  dynamicUrl+`games/rubikscube/2X2.jpg`

  cubeImg.alt = `${type} Cube`;
  cubeImg.className = 'cube-img';
  cubeCard.appendChild(cubeImg);

  const cubeName = document.createElement('div');
  cubeName.className = 'cube-name';
  cubeName.textContent = `${type} Cube`;
  cubeCard.appendChild(cubeName);

  cubeContainer.appendChild(cubeCard);
}