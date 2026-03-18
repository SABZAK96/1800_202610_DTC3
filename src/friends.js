import { doc } from "firebase/firestore"
import { auth } from "./firebaseConfig.js"; 
import { onAuthStateChanged, signOut } from "firebase/auth";
import { onAuthReady } from "./authentication.js";
// this is for the logout and name at the top of screen to work

const usernameDisplay = document.getElementById("username-display");
const authBtn = document.getElementById("auth-btn");
const signedInUserSection = document.querySelector(".signedinuser");


onAuthStateChanged(auth, (user) => {
    if (signedInUserSection) {
        signedInUserSection.classList.remove("hidden");
    }

    if (user) {
        usernameDisplay.textContent = user.displayName || user.email || "User";
        authBtn.onclick = async () => {
            try {
                await signOut(auth);
                window.location.href = "index.html";
            } catch (error) {
                console.log("Logout error");
            }
        };
    } else {
        authBtn.onclick = () => {
            window.location.href = "login.html";
        };
    }
});

function showDashboard() {
  const nameElement = document.getElementById("username-display"); 

// for showing contents of this page only to logged in users
onAuthReady((user) =>{
    if (!user){
        window.location.href = "login.html"
    }
    else {
        document.getElementById("ifunsigned").classList.toggle("hidden");
    }
    const name = user.displayName || user.email;
    if (nameElement) {
      nameElement.textContent = `${name}!`;
    }
})
}
showDashboard();

// toggle dropdown
    document.getElementById("trigger").addEventListener("click", () => {
    document.getElementById("dropd").classList.toggle("hidden")
    document.getElementById("toggledown").classList.toggle("hidden")
    document.getElementById("toggleup").classList.toggle("hidden")
})