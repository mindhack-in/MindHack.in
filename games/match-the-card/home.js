import { dynamicUrl,url } from "../../utility/js/constants.js";

const types = [
  "fruits",
  "animals",
  "birds" ,
  "vegetables",
  "symbols",
  "transport",
  "sports",
  "faces",
  "seaCreatures",
  "desserts"];


const gameBoard=document.getElementById("game-board");

for(let i=0;i<types.length;i++){

  const imageCard=document.createElement("div");
  imageCard.classList.add("image-card");

   const image=document.createElement("img");
  image.src=dynamicUrl+`games/match-the-card/${types[i]}.jpg`;
  
  const overlay=document.createElement("div");
  overlay.className="overlay";
  overlay.innerText=types[i].charAt(0).toUpperCase() + types[i].slice(1); 

  imageCard.appendChild(overlay);
  imageCard.appendChild(image);

  imageCard.onclick = () => {
          window.location.href =url+"games/match-the-card/"+ types[i];
        };
  gameBoard.appendChild(imageCard);
}