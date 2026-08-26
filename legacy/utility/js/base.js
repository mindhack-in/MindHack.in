import { url } from "./constants.js";
import { logoUrl } from "./constants.js";

const sidebar = document.getElementById("sidebar");
const pageType = window.pageConfig ? window.pageConfig.pageType : "home";

if (sidebar) {
  sidebar.innerHTML = ` <div>
                <div class="sidebar-header">
                    <div class="logo">
                        <img src="${logoUrl}" alt="MindHack.in Logo">
                    </div>
                    <div class="icon-btn" id="sidebar-toggle">
                        <svg width="40" height="15" viewBox="0 0 40 30" fill="none" stroke="white" stroke-width="3"
                            stroke-linecap="round" stroke-linejoin="round">
                            <rect x="2" y="2" width="36" height="26" rx="3" />
                            <line x1="12" y1="2" x2="12" y2="28" />
                        </svg>
                    </div>
                </div>
                <div class="nav" id="nav">
                    <a href="${url}" class="nav-item">
                        <i class="fas fa-home"></i>
                        Home
                    </a>
                    <a href="${url}games/" class="nav-item">
                        <i class="fas fa-gamepad"></i>
                        Games
                    </a>
                </div>
            </div>
            <button class="cyber-button">
                <span class="glitch-text">Login / signup</span>
                <span class="arrow">></span>
            </button>`;
}

const toggleBtn = document.getElementById("sidebar-toggle");
if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    console.log(toggleBtn);

    if (sidebar) sidebar.classList.toggle("active");
  });
}

function glow(element) {
  if (!element || !element.parentElement) return;
  const siblings = element.parentElement.children;
  for (let sibling of siblings) {
    sibling.classList.remove("active");
  }
  element.classList.add("active");
}

// Automatically highlight the correct nav item based on the current page
const navItems = document.querySelectorAll(".nav-item");
if (navItems.length > 0) {
  if (pageType === "home" && navItems.length >= 1) {
    glow(navItems[0]);
  } else if (pageType === "games" && navItems.length >= 2) {
    glow(navItems[1]);
  } else if (pageType === "tournaments" && navItems.length >= 3) {
    glow(navItems[2]);
  } else if (pageType === "people" && navItems.length >= 4) {
    glow(navItems[3]);
  }
}


const authModalHTML = `
<div class="auth-overlay" id="auth-overlay">
    <div class="auth-modal">
        <button class="auth-close" id="auth-close"><i class="fas fa-times"></i></button>
        <div class="auth-tabs">
            <button class="auth-tab active" id="tab-login">Login</button>
            <button class="auth-tab" id="tab-signup">Sign Up</button>
            <div class="auth-tab-indicator" id="auth-indicator"></div>
        </div>
        
        <div id="auth-message" class="auth-message"></div>

        <form class="auth-form active" id="form-login">
            <div class="auth-input-group">
                <label>Email</label>
                <input type="email" class="auth-input" id="login-email" placeholder="Enter your email" required>
            </div>
            <div class="auth-input-group">
                <label>Password</label>
                <input type="password" class="auth-input" id="login-password" placeholder="Enter your password" required>
            </div>
            <button type="submit" class="auth-submit-btn" id="btn-login">Login to Mindhack</button>
        </form>

        <form class="auth-form" id="form-signup">
            <div class="auth-input-group">
                <label>Username</label>
                <input type="text" class="auth-input" id="signup-username" placeholder="Choose a username" required>
            </div>
            <div class="auth-input-group">
                <label>Email</label>
                <input type="email" class="auth-input" id="signup-email" placeholder="Enter your email" required>
            </div>
            <div class="auth-input-group">
                <label>Password</label>
                <input type="password" class="auth-input" id="signup-password" placeholder="Create a password" required>
            </div>
            <button type="submit" class="auth-submit-btn" id="btn-signup">Create Account</button>
        </form>
    </div>
</div>
`;

document.body.insertAdjacentHTML("beforeend", authModalHTML);

// Auth Modal Logic
const authOverlay = document.getElementById("auth-overlay");
const authClose = document.getElementById("auth-close");
const tabLogin = document.getElementById("tab-login");
const tabSignup = document.getElementById("tab-signup");
const authIndicator = document.getElementById("auth-indicator");
const formLogin = document.getElementById("form-login");
const formSignup = document.getElementById("form-signup");
const authMessage = document.getElementById("auth-message");

// Attach listener to dynamically created cyber-buttons or existing ones
document.addEventListener("click", (e) => {
  const cyberBtn = e.target.closest(".cyber-button");
  if (cyberBtn) {
    authOverlay.classList.add("active");
    clearAuthMessage();
  }
});

authClose.addEventListener("click", () => {
  authOverlay.classList.remove("active");
});

authOverlay.addEventListener("click", (e) => {
  if (e.target === authOverlay) {
    authOverlay.classList.remove("active");
  }
});

function switchTab(isLogin) {
  clearAuthMessage();
  if (isLogin) {
    tabLogin.classList.add("active");
    tabSignup.classList.remove("active");
    formLogin.classList.add("active");
    formSignup.classList.remove("active");
    authIndicator.style.transform = "translateX(0)";
  } else {
    tabSignup.classList.add("active");
    tabLogin.classList.remove("active");
    formSignup.classList.add("active");
    formLogin.classList.remove("active");
    authIndicator.style.transform = "translateX(100%)";
  }
}

tabLogin.addEventListener("click", () => switchTab(true));
tabSignup.addEventListener("click", () => switchTab(false));

function showMessage(msg, isError = false) {
  authMessage.textContent = msg;
  authMessage.className = `auth-message ${isError ? "error" : "success"}`;
}

function clearAuthMessage() {
  authMessage.className = "auth-message";
  authMessage.textContent = "";
}

// API Integration
formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  const btn = document.getElementById("btn-login");

  btn.disabled = true;
  btn.textContent = "Logging in...";
  clearAuthMessage();

  try {
    const response = await fetch(
      "https://mindhack-in-backend-137262061877.asia-south1.run.app/api/users/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      },
    );

    let data;
    try {
      data = await response.json();
    } catch (err) {
      data = { message: "Server error" };
    }

    if (response.ok) {
      showMessage("Login successful!");
      if (data.token) localStorage.setItem("mindhack_token", data.token);
      setTimeout(() => {
        authOverlay.classList.remove("active");
        window.location.reload();
      }, 1000);
    } else {
      showMessage(
        data.message || "Login failed. Please check your credentials.",
        true,
      );
    }
  } catch (err) {
    showMessage("Network error. Please try again later.", true);
  } finally {
    btn.disabled = false;
    btn.textContent = "Login to Mindhack";
  }
});

formSignup.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("signup-username").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const btn = document.getElementById("btn-signup");

  btn.disabled = true;
  btn.textContent = "Creating Account...";
  clearAuthMessage();

  try {
    const response = await fetch(
      "https://mindhack-in-backend-137262061877.asia-south1.run.app/api/users/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      },
    );

    let data;
    try {
      data = await response.json();
    } catch (err) {
      data = { message: "Server error" };
    }

    if (response.ok) {
      showMessage("Account created successfully!");
      setTimeout(() => switchTab(true), 1500); // Switch to login
    } else {
      showMessage(
        data.message || "Registration failed. Please try again.",
        true,
      );
    }
  } catch (err) {
    showMessage("Network error. Please try again later.", true);
  } finally {
    btn.disabled = false;
    btn.textContent = "Create Account";
  }
});


// Dynamic footer injection
const pageContent = document.querySelector(".page-content");
if (pageContent) {
  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `
    <div class="footer-container">
      <div class="footer-links">
        <a href="${url}about/" class="footer-link">About Us</a>
        <span class="footer-separator">|</span>
        <a href="${url}privacy/" class="footer-link">Privacy Policy</a>
        <span class="footer-separator">|</span>
        <a href="${url}terms/" class="footer-link">Terms of Service</a>
        <span class="footer-separator">|</span>
        <a href="${url}contact/" class="footer-link">Contact Us</a>
        <span class="footer-separator">|</span>
        <a href="${url}sitemap.xml" class="footer-link">Sitemap</a>
      </div>
      <div class="footer-copyright">
        &copy; ${new Date().getFullYear()} MindHack.in. All rights reserved.
      </div>
    </div>
  `;
  pageContent.appendChild(footer);
}

let script = document.createElement("script");
 function gtag() { 
  dataLayer.push(arguments) 
}
 script.src = "https://www.googletagmanager.com/gtag/js?id=G-9RC3CF2CZ3"
 script.async = !0
 window.dataLayer = window.dataLayer || []
  gtag("js", new Date), gtag("config", "G-9RC3CF2CZ3")
  document.head.appendChild(script);