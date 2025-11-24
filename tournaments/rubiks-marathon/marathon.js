import { beurl } from "../../utility/js/constants.js";
const openBtn = document.getElementById("openSocialPopup");
const closeBtn = document.getElementById("closeSocialPopup");
const popup = document.getElementById("socialPopup");
const submitBtn = document.getElementById("submitSocial");
openBtn.addEventListener("click", () => {
    popup.style.display = "flex";
});
closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
});
submitBtn.addEventListener("click", async () => {
    const socialType = document.querySelector('input[name="socialType"]:checked').value;
    const link = document.getElementById("socialLink").value.trim();
    if (link === "") {
        alert("Please enter a link.");
        return;
    }
    console.log("Selected:", socialType);
    console.log("Link:", link);


    const url = beurl+'marathon/users-details';
    const token=localStorage.getItem("token");
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${token}`
        },
        body: `{"socialMedia":"${socialType}","link":"${link}"}`
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
    popup.style.display = "none";
});


const popupLeaderboard = document.getElementById("leaderboardpopupLeaderboard");
const openBtnLeaderboard = document.getElementById("openLeaderboard");
const closeBtnLeaderboard = document.getElementById("closeLeaderboard");
const tableBody = document.querySelector("#leaderboardTable tbody");

let currentPage = 0;
openBtnLeaderboard.addEventListener("click", () => {
    currentPage = 0;

    popupLeaderboard.style.display = "flex";
    loadLeaderboard(); // Fetch data on open
});

closeBtnLeaderboard.addEventListener("click", () => {
    popupLeaderboard.style.display = "none";
});

function loadLeaderboard() {

    const url = beurl+"marathon/leaderboard?startDate=2025-01-01T00:00:00&endDate=2025-12-31T23:59:59&page="+currentPage+"&size=5";

    fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(response => response.json())
    .then(data => {
        tableBody.innerHTML = ""; // Clear old rows

        data.content.forEach(row => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${row.name}</td>
                <td>${row.solveCount}</td>
                <td>${row.videoCount}</td>
                <td>${row.totalScore}</td>
            `;
            tableBody.appendChild(tr);
        });
    })
    .catch(err => {
        console.error("Error loading leaderboard:", err);
    });
}


const prevBtn = document.getElementById("prevPage");
const nextBtn = document.getElementById("nextPage");
// Next Page Button
nextBtn.addEventListener("click", () => {
    currentPage++;
    loadLeaderboard();
});

// Previous Page Button
prevBtn.addEventListener("click", () => {
    if (currentPage > 0) {
        currentPage--;
        loadLeaderboard();
    }
});