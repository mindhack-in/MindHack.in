//   import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
//   import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

//   // Paste your exact Firebase config here again
// const firebaseConfig = {
//     apiKey: "AIzaSyA0HbneEc_QrtR2sJRoYHV5oommomZPEY4",
//     authDomain: "mhdev-103d6.firebaseapp.com",
//     projectId: "mhdev-103d6",
//     storageBucket: "mhdev-103d6.firebasestorage.app",
//     messagingSenderId: "1079449545877",
//     appId: "1:1079449545877:web:8706914ace3f5a7a197f9c",
//     measurementId: "G-M7FVR4900J"
//   };

//   // Initialize Firebase app
//   const app = initializeApp(firebaseConfig);

//   // Get auth instance from initialized app
//   const auth = getAuth(app);

//   // onAuthStateChanged(auth, async (user) => {
//   //   const userDetailsBtn = document.getElementById("userDetails");
//   //   if (user) {
//   //     const idToken = await user.getIdToken();
//   //     userDetailsBtn.textContent = user.email || "User";
//   //     // Call your backend API here
//   //   } else {
//   //     console.log("User not logged in");
//   //   }
//   // });


//   //  const userDetailsBtn = document.getElementById("userDetails");
//   //  userDetailsBtn.style.display = "none"; // Hide the button initially  