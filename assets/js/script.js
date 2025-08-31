fetch("dynamic/games.json")
  .then((response) => response.json())
  .then((data) => gamePopulate(data));

// document.getElementById("year").innerText = new Date().getFullYear();

function gamePopulate(data) {
  const container = document.getElementById("game-grid");

  data.forEach((key) => {
  
    const gameCard = document.createElement("div");
    gameCard.classList = "card";

    const newTag = document.createElement("span");
    newTag.classList.add("tag-new");
    newTag.innerHTML = "New";

    gameCard.appendChild(newTag);

    const img = document.createElement("img");
    img.src = key.image;

    gameCard.appendChild(img);
    const title = document.createElement("div");
    title.classList.add("title");
    title.innerHTML = key.name;
    gameCard.appendChild(title);

    const button = document.createElement("button");
    button.onclick = key.link;
    button.classList.add('btn');
    button.innerHTML = "Play Now";
    button.onclick = () => {
      console.log(key.gameLink);
      window.location.href = key.gameLink;
    };
    gameCard.appendChild(button);
    container.appendChild(gameCard);
  });
}
