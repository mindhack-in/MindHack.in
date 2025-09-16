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

// // document.getElementById("year").innerText = new Date().getFullYear();


// fetch("../footer.html")
//   .then((res) => res.text())
//   .then((data) => {
//     const link = document.createElement("link");
//     link.rel = "stylesheet";
//     link.href = "../assets/css/footer.css";
    
//        const link2 = document.createElement("link");
//     link2.rel = "stylesheet";
//     link2.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.cssx";
    
//     document.head.appendChild(link);
//     document.head.append(link2)
//     document.getElementById("footer").innerHTML = data;
//   });
