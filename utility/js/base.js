import { url } from "./constants.js";

const navLinks = document.getElementById("navLinks");

const dashboard = document.createElement("a");
dashboard.classList.add("nav-button");
dashboard.innerHTML = "Dashboard";
navLinks.appendChild(dashboard);

const competition = document.createElement("a");
competition.classList.add("nav-button");
competition.innerHTML = "Competition";
navLinks.appendChild(competition);

const leftSidebar = document.getElementById("leftSidebar");

const home = document.createElement("a");
home.id = "home_nav";
home.href = url;
home.classList.add("sidebar-link", "active");

const home_i = document.createElement("i");
home_i.classList.add("fas", "fa-home");

const home_i_span = document.createElement("span");
home_i_span.classList.add("link-text");
home_i_span.innerHTML = "Home";
home.appendChild(home_i);
home.appendChild(home_i_span);

leftSidebar.appendChild(home);

const games = document.createElement("a");
games.id = "games_nav";
games.href = url + "games";
games.classList.add("sidebar-link");

const games_i = document.createElement("i");
games_i.classList.add("fas", "fa-gamepad");

const game_i_span = document.createElement("span");
game_i_span.classList.add("link-text");
game_i_span.innerHTML = "Games";
games.appendChild(games_i);
games.appendChild(game_i_span);

leftSidebar.appendChild(games);

const tournaments = document.createElement("a");
tournaments.id = "tournaments_nav";

tournaments.href = url + "tournaments/home.html";
tournaments.classList.add("sidebar-link");

const tournaments_i = document.createElement("i");
tournaments_i.classList.add("fas", "fa-trophy");

const tournaments_i_span = document.createElement("span");
tournaments_i_span.classList.add("link-text");
tournaments_i_span.innerHTML = "Tournaments";
tournaments.appendChild(tournaments_i);
tournaments.appendChild(tournaments_i_span);

leftSidebar.appendChild(tournaments);

const community = document.createElement("a");
community.href = url + "#";
community.classList.add("sidebar-link");

const community_i = document.createElement("i");
community_i.classList.add("fas", "fa-users");

const community_i_span = document.createElement("span");
community_i_span.classList.add("link-text");
community_i_span.innerHTML = "Community";
community.appendChild(community_i);
community.appendChild(community_i_span);

leftSidebar.appendChild(community);

const settings = document.createElement("a");
settings.href = "#";
settings.classList.add("sidebar-link");

const settings_i = document.createElement("i");
settings_i.classList.add("fas", "fa-user");

const settings_i_span = document.createElement("span");
settings_i_span.classList.add("link-text");
settings_i_span.innerHTML = "Profile";
settings.appendChild(settings_i);
settings.appendChild(settings_i_span);

leftSidebar.appendChild(settings);

const about = document.getElementById("about");

const h2 = document.createElement("h2");
h2.innerHTML = "About MindHack.in";

const p1 = document.createElement("p");
p1.innerHTML =
  "  Mindhack.in offers the varity of puzzles for sharpen your mind along with keep playing games for free.";

const p2 = document.createElement("p");
p2.innerHTML =
  "We have a wide varity of puzzles from sudoku to sliding puzzle, from rubiks cube scramble to Matching of similar card";

about.appendChild(h2);
about.appendChild(p1);
about.appendChild(p2);

document.getElementById("menuToggle").addEventListener("click", function () {
  var nav = document.getElementById("leftSidebar");
  nav.classList.toggle("active");
});

const faders = document.querySelectorAll(".fade-in");

const appearOptions = {
  threshold: 0.3,
  rootMargin: "0px 0px -50px 0px",
};

const appearOnScroll = new IntersectionObserver(function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach((fader) => {
  appearOnScroll.observe(fader);
});

window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());

gtag("config", "G-9RC3CF2CZ3");

const footer = document.getElementById("footer");

// Create footer container
footer.innerHTML = `
  <div class="footer-bottom"></div>
  <div class="footer-container">

      <div class="footer-col">
          <h3>MindHack.in</h3>
          <p>Unlock your brain’s potential with fun, challenging, and mind-bending games.</p>
      </div>

      <div class="footer-col">
          <h3>Quick Links</h3>
          <a href="#">Home</a>
          <a href="#games">Games</a>
          <a href="#">About Us</a>
      </div>

      <div class="footer-col">
          <h3>Follow Us</h3>
          <div class="social-icons">
              <a href="https://www.instagram.com/mindhack.in/"><i class="fab fa-instagram"></i></a>
          </div>
      </div>
  </div>

  <div class="footer-bottom">
      © <span id="year"></span> MindHack.in | All Rights Reserved
  </div>
`;

// Set current year
document.getElementById("year").textContent = new Date().getFullYear();

document.querySelectorAll(".faq-item").forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});
