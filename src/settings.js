import { onAuthReady } from "./authentication.js";
import { db } from "./firebaseConfig.js";
import { collection, getDocs,setDoc, doc } from "firebase/firestore";
import { auth } from "./firebaseConfig.js"; 
import { onAuthStateChanged, signOut } from "firebase/auth";

// if the user is not logged in, switch the window to login so they signup first
onAuthReady((user) => {
    if (!user) {
        window.location.href = "login.html";
    }  else {
        // before adding this line, if the user was not authenticated, the content of the page were shown completely
        // then they would get redirected to login. it was weird
        document.getElementById("unsigneduser").classList.toggle("hidden");
    }
});

//-------------------------------------------------------------
// Function to enable editing of user info form fields
//------------------------------------------------------------- 
document.querySelector('#editButton').addEventListener('click', ()=>{
document.getElementById('personalInfoFields').disabled = false;
});


//  upon clicking submit which is save button, the profile setting will be called, everychanges would be saved into database and
// then the message will be shown to the user
document.getElementById("submit").addEventListener("click", async function() {
    await profilesettings();
    document.getElementById("savechange").classList.remove("hidden");
});

// clicking on continue lands you on the main.html
document.getElementById("continue").addEventListener("click", () =>
window.location.href = 'main.html')
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
            // adding merge true for not deleting existing data
        }, {merge : true});

        console.log("Saved successfully");
    }
}
