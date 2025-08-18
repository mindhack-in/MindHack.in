fetch("dynamic/games.json")
  .then((response) => response.json())
  .then((data) => gamePopulate(data));

  document.getElementById("year").innerText = new Date().getFullYear();

function gamePopulate(data) {
  const container = document.getElementById("game-grid");

  data.forEach((key) => {
    console.log("sdfdsfdsf");
    console.log(key);

    const gameCard = document.createElement("div");
    gameCard.classList = "game-card";

    const h3 = document.createElement("h3");
    h3.innerHTML = key.name;
    const p = document.createElement("p");
    p.innerHTML = key.description;

    const button = document.createElement("button");
    button.onclick = key.link;
    button.innerHTML = "Play Now";
    button.onclick = () => {
      console.log(key.gameLink);
      window.location.href = key.gameLink;
    };
    gameCard.appendChild(h3);
    gameCard.appendChild(p);
    gameCard.appendChild(button);

    container.appendChild(gameCard);
  });
}
