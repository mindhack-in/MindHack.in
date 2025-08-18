fetch("../header.html")
  .then((res) => res.text())
  .then((data) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "../assets/css/header.css";
    document.head.appendChild(link);
    document.getElementById("header").innerHTML = data;
  });

function toggleNav() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.toggle("active");
}

// document.getElementById("year").innerText = new Date().getFullYear();


fetch("../footer.html")
  .then((res) => res.text())
  .then((data) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "../assets/css/footer.css";
    document.head.appendChild(link);
    document.getElementById("footer").innerHTML = data;
  });
