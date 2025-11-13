import { url } from "./constants.js";


const headLeft = document.getElementById("head-left")

headLeft.innerHTML = `
<div class="headerMain">
    <header class="header-container">
        <div class="logo">
            <img class="logoimg" alt="Mindhac.in" id="logoimg"
                 src="https://mindhack.in/dynamic/logo.png"/>
        </div>
        <nav class="nav-links" id="navLinks">
        </nav>

        <div class="user-actions">
            <button class="menu-toggle" id="menuToggle">
                <i class="fas fa-bars"></i>
            </button>
            
        </div>

    </header>
</div>
<aside class="left-sidebar" id="leftSidebar">

</aside>`;


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

document.getElementById("year").textContent = new Date().getFullYear();

document.querySelectorAll(".faq-item").forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});
