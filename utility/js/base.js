import { url as e, beurl as t } from "./constants.js"; let headLeft = document.getElementById("head-left"); headLeft.innerHTML = `
<div class="headerMain">
    <header class="header-container">
        <div class="logo">
            <img class="logoimg" alt="Mindhac.in" id="logoimg" loading="lazy"
                 src="https://mindhack.in/dynamic/logo.png"/>
        </div>
            <nav class="nav-links" id="navLinks">
        </nav>

<button class="login-Button" id="openModal">Login / Signup</button>

<div class="login-modal" id="authModal">
  <div class="login-modal-content">
    <span class="login-close" id="closeModal">&times;</span>

    <div class="login-tabs">
      <button id="loginTab" class="active">Login</button>
      <button id="signupTab">Signup</button>
    </div>

    <form id="loginForm">
      <input id="loginEmail" class="login-input" type="email" placeholder="Email" required />
      <input id="loginPassword" class="login-input" type="password" placeholder="Password" required />
      <button type="button" class="login-submit-btn" id="loginUser">Login</button>
    </form>

    <form id="signupForm" style="display:none;">
      <input id="signupName" class="login-input" type="text" placeholder="Name" required />
      <input id="signupEmail"  class="login-input" type="email" placeholder="Email" required />
      <input id="signupPassword"  class="login-input" type="password" placeholder="Password" required />
      <button type="button" class="login-submit-btn" id="signupUser">Signup</button>
    </form>

    <div id="login-responseMsg"></div>

  </div>
  
</div>
 <div class="user-actions">
            <button class="menu-toggle" id="menuToggle">
                <i class="fas fa-bars"></i>
            </button>
            
        </div>
    </header>
</div>
<aside class="left-sidebar" id="leftSidebar">

</aside>`; let openModalButton = document.getElementById("openModal"); openModalButton.addEventListener("click", openModal); let closeModalButton = document.getElementById("closeModal"); closeModalButton.addEventListener("click", closeModal); let showLoginButton = document.getElementById("loginTab"); showLoginButton.addEventListener("click", showLogin); let showSignupButton = document.getElementById("signupTab"); showSignupButton.addEventListener("click", showSignup); let loginUserButton = document.getElementById("loginUser"); loginUserButton.onclick = function (e) { loginUser() }; let signupUserButton = document.getElementById("signupUser"); signupUserButton.onclick = function (e) { signupUser() }; let email = localStorage.getItem("email"); null !== email && (openModalButton.innerHTML = email); let navLinks = document.getElementById("navLinks"), dashboard = document.createElement("a"); dashboard.classList.add("nav-button"), dashboard.innerHTML = "Dashboard", navLinks.appendChild(dashboard); let competition = document.createElement("a"); competition.classList.add("nav-button"), competition.innerHTML = "Competition", navLinks.appendChild(competition); let leftSidebar = document.getElementById("leftSidebar"), home = document.createElement("a"); home.id = "home_nav", home.href = e, home.classList.add("sidebar-link", "active"); let home_i = document.createElement("i"); home_i.classList.add("fas", "fa-home"); let home_i_span = document.createElement("span"); home_i_span.classList.add("link-text"), home_i_span.innerHTML = "Home", home.appendChild(home_i), home.appendChild(home_i_span), leftSidebar.appendChild(home); let games = document.createElement("a"); games.id = "games_nav", games.href = e + "games", games.classList.add("sidebar-link"); let games_i = document.createElement("i"); games_i.classList.add("fas", "fa-gamepad"); let game_i_span = document.createElement("span"); game_i_span.classList.add("link-text"), game_i_span.innerHTML = "Games", games.appendChild(games_i), games.appendChild(game_i_span), leftSidebar.appendChild(games); let tournaments = document.createElement("a"); tournaments.id = "tournaments_nav", tournaments.href = e + "tournaments/", tournaments.classList.add("sidebar-link"); let tournaments_i = document.createElement("i"); tournaments_i.classList.add("fas", "fa-trophy"); let tournaments_i_span = document.createElement("span"); tournaments_i_span.classList.add("link-text"), tournaments_i_span.innerHTML = "Tournaments", tournaments.appendChild(tournaments_i), tournaments.appendChild(tournaments_i_span), leftSidebar.appendChild(tournaments), document.getElementById("menuToggle").addEventListener("click", function () { document.getElementById("leftSidebar").classList.toggle("active") }); let faders = document.querySelectorAll(".fade-in"), appearOptions = { threshold: .3, rootMargin: "0px 0px -50px 0px" }, appearOnScroll = new IntersectionObserver(function (e, t) { e.forEach(e => { e.isIntersecting && (e.target.classList.add("visible"), t.unobserve(e.target)) }) }, appearOptions); faders.forEach(e => { appearOnScroll.observe(e) }); let script = document.createElement("script"); function gtag() { dataLayer.push(arguments) } script.src = "https://www.googletagmanager.com/gtag/js?id=G-9RC3CF2CZ3", script.async = !0, window.dataLayer = window.dataLayer || [], gtag("js", new Date), gtag("config", "G-9RC3CF2CZ3"), document.head.appendChild(script); let footer = document.getElementById("footer"); function openModal() { document.getElementById("authModal").style.display = "flex" } function closeModal() { document.getElementById("authModal").style.display = "none", document.getElementById("login-responseMsg").innerHTML = "" } function showLogin() { document.getElementById("loginForm").style.display = "block", document.getElementById("signupForm").style.display = "none", loginTab.classList.add("active"), signupTab.classList.remove("active") } function showSignup() { document.getElementById("loginForm").style.display = "none", document.getElementById("signupForm").style.display = "block", signupTab.classList.add("active"), loginTab.classList.remove("active") } async function loginUser() { let e, n = await fetch(t + "api/users/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: document.getElementById("loginEmail").value, password: document.getElementById("loginPassword").value }) }), a = await n.json(); n.ok ? (console.log(a), openModalButton.innerHTML = a.email, localStorage.setItem("token", a.token), localStorage.setItem("email", a.email), location.reload(), openModalButton.removeEventListener("click", openModal), openModalButton.addEventListener("click", logout), closeModal()) : document.getElementById("login-responseMsg").innerHTML = "Invalid Credentials" } async function signupUser() { let e = document.getElementById("signupName").value, n, a = await fetch(t + "api/users/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: e, email: document.getElementById("signupEmail").value, password: document.getElementById("signupPassword").value }) }), i = await a.text(); document.getElementById("login-responseMsg").innerHTML = a.ok ? "Signup Successful! Please" : i } footer.innerHTML = `
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
              <a href="https://www.instagram.com/mindhack.in/" target="_blank"><i class="fab fa-instagram"></i></a>
          </div>
           <div class="social-icons">
              <a href="https://chat.whatsapp.com/LrVRp3fymPt8GQPC4gkJvL/" target="_blank"><i class="fab fa-whatsapp"></i></a>
          </div>
      </div>
  </div>

  <div class="footer-bottom">
      \xa9 <span id="year"></span> MindHack.in | All Rights Reserved
  </div>
`, document.getElementById("year").textContent = new Date().getFullYear(), document.querySelectorAll(".faq-item").forEach(e => { e.addEventListener("click", () => { e.classList.toggle("active") }) });


const gameHolder = document.getElementById("gameHolder");

const game_data = [
  {
    id: "rubikscube",
    size: "medium",
    link: "/games/rubiks-cube-scramble/",
    img: "/dynamic/games/rubikscube/2X2.png",
    alt: "rubikscube"
  },
  {
    id: "2048",
    size: "small",
    link: "/games/2048/",
    img: "/dynamic/games/2048.png",
    alt: "2048Game"
  },
  {
    id: "match-the-card",
    size: "small",
    link: "/games/match-the-card/",
    img: "/dynamic/games/match-the-card/animals.jpg",
    alt: "match-the-card"
  },
  {
    id: "sudoku",
    size: "small",
    link: "/games/sudoku/",
    img: "/dynamic/games/sudoku.png",
    alt: "sudoku"
  },
  {
    id: "slidingpuzzle",
    size: "medium",
    link: "/games/sliding-puzzle/",
    img: "/dynamic/games/slidingpuzzle.png",
    alt: "slidingpuzzleonline"
  },
  {
    id: "flappyBird",
    size: "small",
    link: "/games/flappy-bird/",
    img: "/dynamic/games/flappy-bird.png",
    alt: "flappyBird"
  },
  {
    id: "pacman",
    size: "small",
    link: "/games/pacman/",
    img: "/dynamic/games/pacman.png",
    alt: "pacman"
  },
    {
    id: "demon-strikes",
    size: "mid",
    link: "/games/shooting/demon-strikes/",
    img: "/dynamic/games/shooting/demon-strikes.png",
    alt: "demon-strikes"
  }
];
if (gameHolder) {
  game_data.forEach(game => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("game-holder", `game-holder-${game.size}`);
    wrapper.id = game.id;

    const anchor = document.createElement("a");
    anchor.href = game.link;

    const img = document.createElement("img");
    img.src = game.img;
    img.alt = game.alt;
    img.loading = "lazy";

    anchor.appendChild(img);
    wrapper.appendChild(anchor);
    gameHolder.appendChild(wrapper);
  });
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("email")
  openModalButton.addEventListener("click", openModal);
  openModalButton.removeEventListener("click", logout);
  openModalButton.innerHTML = 'Login / Signup'

}

if (email !== null) {
  openModalButton.removeEventListener("click", openModal);
  openModalButton.addEventListener("click", logout);
}


function showImagePopup(imageUrl, linkUrl) {
  if (localStorage.getItem("showBanner") !== null)
    return;
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.background = "rgba(0,0,0,0.6)";
  overlay.style.display = "flex";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
  overlay.style.zIndex = "9999";

  const popup = document.createElement("div");
  popup.style.position = "relative";
  popup.style.background = "#fff";
  popup.style.padding = "10px";
  popup.style.borderRadius = "8px";
  popup.style.boxShadow = "0 0 20px rgba(0,0,0,0.3)";

  const closeBtn = document.createElement("div");
  closeBtn.innerHTML = "✖";
  closeBtn.style.position = "absolute";
  closeBtn.style.top = "5px";
  closeBtn.style.right = "8px";
  closeBtn.style.cursor = "pointer";
  closeBtn.style.fontSize = "20px";

  closeBtn.onclick = () => {
    document.body.removeChild(overlay); localStorage.setItem("showBanner", true);
    setTimeout(() => {
      localStorage.removeItem("token");
      console.log("token removed!");
    }, 5000);


  }

  const link = document.createElement("a");
  link.href = linkUrl;
  link.target = "_blank";
  const img = document.createElement("img");
  img.src = imageUrl;
  img.style.maxWidth = "90vw";
  img.style.maxHeight = "80vh";
  link.appendChild(img);
  popup.appendChild(link);
  popup.appendChild(closeBtn);
  overlay.appendChild(popup);
  document.body.appendChild(overlay);
}

showImagePopup("https://mindhack.in/dynamic/banners/competition.png", "https://chat.whatsapp.com/LrVRp3fymPt8GQPC4gkJvL/");

let userProfile = document.createElement("a");
userProfile.id = "user-details_nav", userProfile.href = e + "userdetails.html";
userProfile.classList.add("sidebar-link");
let userProfile_i = document.createElement("i");
userProfile_i.classList.add("fas", "fa-user-edit");
let userProfile_i_spam = document.createElement("span");
userProfile_i_spam.classList.add("link-text");
userProfile_i_spam.innerHTML = "User Details";
userProfile.appendChild(userProfile_i);
userProfile.appendChild(userProfile_i_spam);
leftSidebar.appendChild(userProfile); 