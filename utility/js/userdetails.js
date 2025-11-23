import { url as e, beurl } from "./constants.js";

const updateDetails = document.getElementById("updateDetails");

const email = localStorage.getItem("email");
if (!email)
    updateDetails.innerHTML = '<p>Login to continue..</p>';


document.getElementById("userEmail").innerText = email;
document.getElementById("submitBtn").addEventListener("click", async () => {
    const payload = {
        mobileNumber: document.getElementById("number").value,
        instagramHandler: document.getElementById("instagram").value,
        youtubeHandler: document.getElementById("youtube").value,
        email: email
    };
    try {
        const token = localStorage.getItem("token")
        const res = await fetch(beurl + "api/users/users-details", {
            method: "POST",
            headers: { "Content-Type": "application/json", 'authorization': `Bearer ${token}` },
            body: JSON.stringify(payload)
        });

        const data = await res.json();
        alert("Details submitted successfully!");
        console.log(data);

    } catch (err) {
        alert("Error submitting details");
        console.error(err);
    }
});


