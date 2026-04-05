import { onAuthReady } from "./authentication.js";
import { db } from "./firebaseConfig.js";
import { collection, getDocs,setDoc,getDoc, doc } from "firebase/firestore";
import { auth } from "./firebaseConfig.js"; 
import { onAuthStateChanged, signOut } from "firebase/auth";
  //------------------------------------------------------------
  // This function is an Event Listener for the file (image) picker
  // When an image is chosen, it will then save that image into the
  // user's document in Firestore
  //-------------------------------------------------------------
  
   function uploadImage(){
        // Attach event listener to the file input
        // Function to handle file selection and Base64 encoding
        document.getElementById("inputImage").addEventListener("change", handleFileSelect);
        function handleFileSelect(event) {
            var file = event.target.files[0]; // Get the selected file

            if (file) {
                var reader = new FileReader(); // Create a FileReader to read the file

                // When file reading is complete
                reader.onload = function (e) {
                    var base64String = e.target.result.split(',')[1]; // Extract Base64 data

                    // Save the Base64 string to Firestore under the user's profile
                    saveProfileImage(base64String);
                };

                // Read the file as a Data URL (Base64 encoding)
                reader.readAsDataURL(file);
            }
        }
   }
   uploadImage();

    //---------------------------------------------------
// Function to save the Base64 image to Firestore
// as a key value pair in the user's document. 
// This function is triggered when a image is selected.
//---------------------------------------------------
async function saveProfileImage(base64String) {
  const user = auth.currentUser;
  if (user) {
    const userDocRef = doc(db, "users", user.uid);
    try {
      await setDoc(userDocRef, { profileImage: base64String }, { merge: true });
      console.log("✅ Profile image saved successfully!");
      displayProfileImage(base64String);
    } catch (error) {
      console.error("❌ Error saving profile image:", error);
    }
  } else {
    console.error("⚠️ No user is signed in.");
  }
}

//----------------------------------------------------------------
// Function to display the stored Base64 image on the profile page.
// This is called when the user picks an image using the file chooser.
// so that the user can see what picture they picked!
// Before the image can be displayed, prepend meta data info back.
//----------------------------------------------------------------
function displayProfileImage(base64String) {
    const imgElement = document.getElementById("profileImage");   // Assuming there's an <img> element with this ID
    if (imgElement) {
        imgElement.src = `data:image/png;base64,${base64String}`; // Set the image source to the Base64 string
    } else {
        console.error("⚠️ No image element found to display the profile image.");
    }
}

// if the user is not logged in, switch the window to login so they signup first
onAuthReady(async (user) => {
    if (!user) {
        window.location.href = "login.html";
    }  else {
        // before adding this line, if the user was not authenticated, the content of the page were shown completely
        // then they would get redirected to login. it was weird
        document.getElementById("unsigneduser").classList.toggle("hidden");
        // load saved profile image if it exists
        const userSnap = await getDoc(doc(db, "users", user.uid));
        // check if profile image exists then displays it
        if (userSnap.exists() && userSnap.data().profileImage) {
            displayProfileImage(userSnap.data().profileImage);
        }
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
            // adding merge true for not deleting existing data
        }, {merge : true});

        console.log("Saved successfully");
    }
}
