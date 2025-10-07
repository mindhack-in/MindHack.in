import { dynamicUrl,url } from "../utility/js/constants.js";


fetch(dynamicUrl+"/games/games.json")
  .then((response) => response.json())
  .then((data) => gamePopulate(data));
const container = document.getElementById("game-grid");

function gamePopulate(data) {
  data.forEach((key) => {
    const gameCard = document.createElement("div");
    gameCard.classList = "card";

    if (key.new === true) {
      const newTag = document.createElement("span");
      newTag.classList.add("tag-new");
      newTag.innerHTML = "New";
      gameCard.appendChild(newTag);
    }
    if (key.image != undefined) {
      const img = document.createElement("img");
      img.src = key.image;
      gameCard.appendChild(img);
    }

    if (key.video != undefined) {
      const video = document.createElement("video");
      video.autoplay = true;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.src = dynamicUrl+key.video;
      video.type = "video/mp4";
      video.onclick = () => {
        window.location.href =url+"games/"+ key.gameLink;
      };
      video.setAttribute("muted", "");
      video.setAttribute("playsinline", "");

      // Load and play explicitly
      video.load();
      video.play().catch(() => {
      });

      gameCard.appendChild(video);
    }
    container.appendChild(gameCard);
  });
}
