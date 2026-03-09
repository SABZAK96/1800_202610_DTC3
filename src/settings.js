import { onAuthReady } from "./authentication.js"; import { db } from "./firebaseConfig.js";
import { collection, getDocs,setDoc, doc } from "firebase/firestore";
import { auth } from "./firebaseConfig.js"; 
import { onAuthStateChanged, signOut } from "firebase/auth";

// instead of using the save button id, we can use form, save button is already attached to the form
// we want this block to save the user data in database when user actually saves it.
// event listener uses an async function, cause it froze the webpage, and call a function that interacts with database and should
// wait for its response.
// if you dont use preventdefault , when you submit the form, and the profilesetting is called, in the midlle of the process the browser will refresh
document.getElementById("settings-form").addEventListener("submit", async function(ev) {
    // prevent default prevent refreshing the browser automatically.
    // preventDefault() is a built-in method that belongs specifically to the Event object.
    ev.preventDefault();
    await profilesettings();
});
async function profilesettings() {
    const user = auth.currentUser;

    if (user) {
        let username = document.getElementById("username").value;
        let firstname = document.getElementById("first-name").value;
        let lastname = document.getElementById("last-name").value;
        let email = document.getElementById("email").value;
        let country = document.getElementById("country").value;

        let preferences = [];
        document.querySelectorAll('input[name="interest"]:checked').forEach(box => preferences.push(box.id));

        let budget = document.querySelector('input[name="budget"]:checked').value;

        let days = [];
        document.querySelectorAll('input[name="day"]:checked').forEach(box => days.push(box.id));

        let transport = [];
        document.querySelectorAll('input[name="transport"]:checked').forEach(box => transport.push(box.id));

        let distance = document.querySelector('input[name="distance"]:checked').value;

        console.log("Saving settings for:", user.uid);

        await setDoc(doc(db, "users", user.uid), {
            username: username,
            firstname: firstname,
            lastname: lastname,
            email: email,
            country: country,
            preferences: preferences,
            budget: budget,
            days: days,
            transport: transport,
            distance: distance
        });

        console.log("Saved successfully");
    }
}
// make the save pop up appear
document.getElementById("submit").addEventListener("click", ()=>
document.getElementById("savechange").classList.remove("hidden"))
// clicking on continue lands you on the main.html
document.getElementById("continue").addEventListener("click", () =>
window.location.href = 'main.html')
