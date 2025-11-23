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
