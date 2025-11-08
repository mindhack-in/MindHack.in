const dynamicUrl="../dynamic/";

fetch(dynamicUrl + "tournaments/tournaments.json")
  .then((response) => response.json())
  .then((data) => tournamentPopulate(data));
const tournamentContainer = document.getElementById("competitions");

function tournamentPopulate(data) {
  data.forEach((key) => {
    const tournamentCard = document.createElement("div");
    tournamentCard.classList.add("competition-card");

    const leftCompetition = document.createElement("div");
    leftCompetition.classList.add("competition-left");

    const image = document.createElement("img");
    image.src = dynamicUrl + key.image;
    image.alt = key.name;
    const detail = document.createElement("P");
    detail.innerHTML = key.detail;

    leftCompetition.appendChild(image);
    leftCompetition.appendChild(detail);

    const rightCompetition = document.createElement("div");
    rightCompetition.classList.add("competition-right");

    const h2 = document.createElement("h2");
    h2.innerHTML = key.name;

    rightCompetition.appendChild(h2);

    for (let i = 0; i < key.p.length; i++) {
      const p = document.createElement("P");

      p.innerHTML = key.p[i];

      rightCompetition.appendChild(p);
    }

    const button = document.createElement("button");
    button.innerHTML = key.cta;
    button.onclick = () => {};
    rightCompetition.appendChild(button);

    tournamentCard.appendChild(leftCompetition);
    tournamentCard.appendChild(rightCompetition);
    tournamentContainer.appendChild(tournamentCard);
  });
}
