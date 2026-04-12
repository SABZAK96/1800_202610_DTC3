// the exact logic for favoriting cards for signed in users is used in here.
// only necessary changes(exactly as eventpage.js) are made for applying the favorite logic

import { onAuthReady } from "./authentication.js";
import { db } from "./firebaseConfig.js";
import { collection, doc, getDocs, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { auth } from "./firebaseConfig.js";
import { onAuthStateChanged, signOut } from "firebase/auth"

const usernameDisplay = document.getElementById("username-display");
const authBtn = document.getElementById("auth-btn");
const signedInUserSection = document.querySelector(".signedinuser");


onAuthStateChanged(auth, async (user) => {
    if (signedInUserSection) {
        signedInUserSection.classList.remove("hidden");
      
    }

    if (user) {
        usernameDisplay.textContent = user.displayName || user.email || "User";
        // load image from fire-store
        // should use userSnap to avoid shadowing the user parameter
        const userSnap = await getDoc(doc(db, "users", user.uid))
        const data = userSnap.data();
        if (userSnap.exists() && data.profileImage){
          document.getElementById("profile-img").src = "data:image/png;base64," + data.profileImage;
        }
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

// redirects to index if no user is signed in, otherwise loads the main events for the signed-in user
function showDashboard() {
  const nameElement = document.getElementById("username-display");

  onAuthReady((user) => {
    if (!user) {
      location.href = "index.html";
      return;
    } else {
      document.getElementById("unsigneduser").classList.toggle("hidden");
      // the content should be loaded after auth resolves
      loadMainEvents(user);

    }
    const name = user.displayName || user.email;
    if (nameElement) {
      nameElement.textContent = `${name}!`;
    }
  });
  
}
showDashboard();

// Calendar SVG used in carousel cards
const calendarSVG = `<svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" width="24" height="24" data-name="Layer 1" viewBox="0 0 200 200">
  <g>
    <path class="cls-1" d="M16.96,82.4v79.14c0,17.59,14.26,31.85,31.85,31.85h104.71c17.59,0,31.85-14.26,31.85-31.85v-79.14H16.96ZM68.33,164.27c0,4-3.24,7.24-7.24,7.24h-12.63c-4,0-7.24-3.24-7.24-7.24v-12.63c0-4,3.24-7.24,7.24-7.24h12.63c4,0,7.24,3.24,7.24,7.24v12.63ZM68.33,120.1c0,4-3.24,7.24-7.24,7.24h-12.63c-4,0-7.24-3.24-7.24-7.24v-12.63c0-4,3.24-7.24,7.24-7.24h12.63c4,0,7.24,3.24,7.24,7.24v12.63ZM112.87,164.27c0,4-3.24,7.24-7.24,7.24h-12.63c-4,0-7.24-3.24-7.24-7.24v-12.63c0-4,3.24-7.24,7.24-7.24h12.63c4,0,7.24,3.24,7.24,7.24v12.63ZM112.87,120.1c0,4-3.24,7.24-7.24,7.24h-12.63c-4,0-7.24-3.24-7.24-7.24v-12.63c0-4,3.24-7.24,7.24-7.24h12.63c4,0,7.24,3.24,7.24,7.24v12.63ZM157.04,164.27c0,4-3.24,7.24-7.24,7.24h-12.63c-4,0-7.24-3.24-7.24-7.24v-12.63c0-4,3.24-7.24,7.24-7.24h12.63c4,0,7.24,3.24,7.24,7.24v12.63ZM157.04,120.1c0,4-3.24,7.24-7.24,7.24h-12.63c-4,0-7.24-3.24-7.24-7.24v-12.63c0-4,3.24-7.24,7.24-7.24h12.63c4,0,7.24,3.24,7.24,7.24v12.63Z"/>
    <path class="cls-1" d="M185.37,65.28v-8.46c0-17.59-14.26-31.85-31.85-31.85H48.81c-17.59,0-31.85,14.26-31.85,31.85v8.46h168.41Z"/>
  </g>
  <rect class="cls-1" x="47.38" y="5.19" width="20.27" height="39.09" rx="1.79" ry="1.79"/>
  <rect class="cls-1" x="132.79" y="5.19" width="20.27" height="39.09" rx="1.79" ry="1.79"/>
</svg>`;

// Location SVG used in carousel cards
const locationSVG = `<svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" width="24" height="24" data-name="Layer 1" viewBox="0 0 200 200">
  <path class="cls-1" d="M97.01,3.7C55.25,3.7,21.39,37.55,21.39,79.31c0,66.2,75.62,112.28,75.62,112.28,0,0,75.62-46.08,75.62-112.28,0-41.76-33.85-75.62-75.62-75.62ZM97.01,109.34c-18.9,0-34.21-15.32-34.21-34.21s15.32-34.21,34.21-34.21,34.21,15.32,34.21,34.21-15.32,34.21-34.21,34.21Z"/>
</svg>`;

//  this is used for "view more" button in favorites, the content of this will be checked everytime.
let favesshown = [];

// reusable fav button logic for favorite cards, originally this logic was inside loadevents after appending each favorite card
async function attachFavBtn(favBtn, user, eventId, each_card) {
  const favouritesContainer = document.querySelector(".favourites-container");
  if (user) {
    // checks if the user has a favorite_events field in firestore. if not, creates it to avoid null errors downstream
    async function check_fav_field(){
      const ref = await getDoc(doc(db, "users", user.uid))
      const user_data = ref.data()
      if (!user_data.favorite_events){
        let saved_events = []
        await setDoc(doc(db, "users", user.uid), { favorite_events: saved_events }, { merge: true })
        return saved_events
      } else {
        return user_data.favorite_events
      }
    }
    // sets the heart icon to red if this event is already in the user's favorites, black otherwise
    async function remember_heart_color(x){
      await check_fav_field();
      const ref = await getDoc(doc(db, "users", user.uid));
      const ref_data_event = ref.data().favorite_events;
      if (ref_data_event.includes(eventId)){
        x.style.fill = "red";
        x.style.stroke = "none";
      } else {
        x.style.fill = "black";
        x.style.stroke = "black";
      }
    }
    remember_heart_color(favBtn);
    favBtn.parentElement.addEventListener("click", function () {
      favClick(favBtn);
    });
    // toggles this event's favorite status in firestore and updates the heart icon color accordingly
    async function favClick(x) {
      await check_fav_field();
      let favselected = false;
      const ref = await getDoc(doc(db, "users", user.uid));
      const ref_data = ref.data();
      if (!ref_data.favorite_events.includes(eventId)){
        favselected = false;
      } else {
        favselected = true;
      }
      if (favselected == false) {
        x.style.fill = "red";
        x.style.stroke = "none";
        favselected = true;
        await updateDoc(doc(db, "users", user.uid), { favorite_events: arrayUnion(eventId) })
      } else {
        favselected = false;
        x.style.fill = "black";
        x.style.stroke = "black";
        await updateDoc(doc(db, "users", user.uid), { favorite_events: arrayRemove(eventId) })
        each_card.remove();
        favesshown.splice(favesshown.indexOf(eventId), 1);
        loadMainEvents(user);
        if (favouritesContainer.querySelectorAll(".favbtn").length === 0) {
          let emptyMsg = `<div class="col-span-full flex flex-col items-center justify-center gap-4 py-10 w-full"><p>No favorited events yet!</p><a href="explore.html" class="bg-black h-10 px-6 rounded-full text-white text-sm flex items-center justify-center">Go Explore</a></div>`;
          const card = document.createElement("div");
          card.innerHTML = emptyMsg;
          favouritesContainer.appendChild(card.firstElementChild);
        }
      }
      return x;
    }
  } else {
    favBtn.parentElement.addEventListener("click", function () {
      window.location.href = "login.html";
    });
  }
}
// pass user into load events, because initially it was undefined inside this function and we couldnt access user's info
async function loadMainEvents(user) {
  const ref = collection(db, "Events_2026");
  const snap = await getDocs(ref);
  // the purpose of these 4 line is to get user favorited events
  const ref_user = await getDoc(doc(db, "users", user.uid))
  // new users won't have a document yet, so fall back to an empty object
  const user_data = ref_user.exists() ? ref_user.data() : {};
  const favoriteEvents = user_data.favorite_events || [];
  // end of getting user info
  // initializing a new counter for favorite events
  let favcount = 0;

  const favouritesContainer = document.querySelector(".favourites-container");

  // clear favorite container after each call before populating cards
  if (favouritesContainer) {
    favouritesContainer.innerHTML = "";
    favesshown = [];  // everything should reset when container clears
  }
  snap.forEach((eventdoc) => {
    let data = eventdoc.data();
    let id = eventdoc.id;

    // Next 3 events favourites grid cards
    // check if an eventid we get at each iteration of forEach(eventdoc) is in favorite or not
    // we should have a new counter for this, cuz otherwise favorited stuff going into carousel would never appear here
    
    if(favoriteEvents.includes(id) && favcount < 3){
      let favCard = `
        <div class="flex flex-col bg-white rounded-4xl shadow-2xl">
          <div class="rounded-t-4xl w-full relative">
            <div class="absolute right-3 top-3 flex justify-center items-center w-13 h-13 mb-2 rounded-full bg-white shadow-2xl z-10">
              <svg class="favbtn" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" width="24" height="24" viewBox="0 0 200 200">
                <path class="cls-1" d="M179.24,31.69h0c-20-20-52.44-20-72.44,0l-6.8,6.8-6.8-6.8c-20-20-52.44-20-72.44,0h0C.75,51.69.75,84.13,20.76,104.13l6.8,6.8-.4.4,63.58,63.58c4.9,4.9,12.84,4.92,17.77.05l64.34-63.63-.4-.4,6.8-6.8c20-20,20-52.44,0-72.44Z"/>
              </svg>
            </div>
            <img src="./images/${id}.jpg" class="w-full rounded-t-4xl h-50 object-cover object-center">
          </div>
          <a href="eventpage.html?docID=${id}&from=main.html" class="flex flex-col flex-1">
          <div class="flex flex-col flex-1 justify-between py-8 px-8">
            <div>
              <p class="text-sm text-gray-500">${data.date}</p>
              <h2>${data.title}</h2>
            </div>
            <span class="bg-black h-10 w-35 px-6 rounded-full text-sm text-white flex items-center justify-center w-fit mt-4">Learn more</span>
          </div>
          </a>
        </div>`;


      const card = document.createElement("div");
      card.innerHTML = favCard;
      const each_card = favouritesContainer.appendChild(card.firstElementChild);
      favesshown.push(id);
      const favBtn = each_card.querySelector(".favbtn");
      // this replaced the original functions, I wanted them to be reusable for loadmorefavorites function so i moved it outside, and called it here
      attachFavBtn(favBtn, auth.currentUser, id, each_card);
      favcount++;
    }
  });
  // display a useful message if the container is empty. note this doesnt work if user unfavorite everything without refereshing the page
  // this should be checked again whenever the event is removed from favorite list
  if (favoriteEvents.length === 0) {
    let favCard = `<div class="col-span-full flex flex-col items-center justify-center gap-4 py-10 w-full"><p>No favorited events yet!</p><a href="explore.html" class="bg-black h-10 px-6 rounded-full text-white text-sm flex items-center justify-center">Go Explore</a></div>`;
    const card = document.createElement("div");
    card.innerHTML = favCard;
    favouritesContainer.appendChild(card.firstElementChild);
  }
  // only add this button if the favorite cards are more than 4
  if ((user_data.favorite_events || []).length > 3) {
    // adding a button to favorite cards
    let viewBtncontent = `<div class="col-span-full flex justify-center mt-4"><button id="viewM" class="bg-black h-10 px-6 rounded-full text-sm text-white">View more</button></div>`
    const viewBtn = document.createElement("div")
    viewBtn.innerHTML = viewBtncontent
    document.querySelector(".favourites-container").appendChild(viewBtn.firstElementChild)
    // enf of button code
    // attach a listener for removing button itself, loading data and adding the button again
    document.getElementById("viewM").addEventListener("click", () => {
      loadMoreFavorites(user);
    })
  }
}

// loads the next 3 favorited events not yet shown, then re-adds the "view more" button if there are still more left
async function loadMoreFavorites(user) {
  const ref = collection(db, "Events_2026");
  const snap = await getDocs(ref);
  // the purpose of these 4 line is to get user favorited events
  const ref_user = await getDoc(doc(db, "users", user.uid))
  const user_data = ref_user.data()
  const favoriteEvents = user_data.favorite_events || [];
  // remove the old button, will add it again after loading more content. the button is inside a div, so the div should be removed
  document.getElementById("viewM").parentElement.remove();
  const favouritesContainer = document.querySelector(".favourites-container");
  // we want to load 3 cards with each click
  let counter = 0;
  snap.forEach((eventdoc) => {
    let data = eventdoc.data();
    let id = eventdoc.id;
    if (favoriteEvents.includes(id) && !favesshown.includes(id) && counter < 3) {
      let favCard = `
        <div class="flex flex-col bg-white rounded-4xl shadow-2xl">
          <div class="rounded-t-4xl w-full relative">
            <div class="absolute right-3 top-3 flex justify-center items-center w-13 h-13 mb-2 rounded-full bg-white shadow-2xl z-10">
              <svg class="favbtn" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" width="24" height="24" viewBox="0 0 200 200">
                <path class="cls-1" d="M179.24,31.69h0c-20-20-52.44-20-72.44,0l-6.8,6.8-6.8-6.8c-20-20-52.44-20-72.44,0h0C.75,51.69.75,84.13,20.76,104.13l6.8,6.8-.4.4,63.58,63.58c4.9,4.9,12.84,4.92,17.77.05l64.34-63.63-.4-.4,6.8-6.8c20-20,20-52.44,0-72.44Z"/>
              </svg>
            </div>
            <img src="./images/${id}.jpg" class="w-full rounded-t-4xl h-50 object-cover object-center">
          </div>
          <a href="eventpage.html?docID=${id}&from=main.html" class="flex flex-col flex-1">
          <div class="flex flex-col flex-1 justify-between py-8 px-8">
            <div>
              <p class="text-sm text-gray-500">${data.date}</p>
              <h2>${data.title}</h2>
            </div>
            <span class="bg-black h-10 w-35 px-6 rounded-full text-sm text-white flex items-center justify-center w-fit mt-4">Learn more</span>
          </div>
          </a>
        </div>`;

      const card = document.createElement("div");
      card.innerHTML = favCard;
      const each_card = favouritesContainer.appendChild(card.firstElementChild);
      favesshown.push(id);
      const favBtn = each_card.querySelector(".favbtn");
      // this replaced the original functions, I wanted them to be reusable for loadmorefavorites function so i moved it outside, and called it here
      attachFavBtn(favBtn, user, id, each_card);
      counter++;
    }
  });
  // now we need to add the button back and attach event listener to it to load this function again and repeat the process, basically using the logic used in line 257
  // if the length of favorite events in the db and the length of the array that stores the event id shown is equal, this button should be removed
  if (favesshown.length < favoriteEvents.length) {
    // adding a button to favorite cards
    let viewBtncontent = `<div class="col-span-full flex justify-center mt-4"><button id="viewM" class="bg-black h-10 px-6 rounded-full text-sm text-white">View more</button></div>`
    const viewBtn = document.createElement("div")
    viewBtn.innerHTML = viewBtncontent
    document.querySelector(".favourites-container").appendChild(viewBtn.firstElementChild)
    // enf of button code
    // attach a listener for removing button itself, loading data and adding the button again
    document.getElementById("viewM").addEventListener("click", () => {
      loadMoreFavorites(user);
    })
  }
}


// Takes the search input value and redirects to explore.html
// constructs the new url by creating a param and setting it to "search"
window.searchRedirect = function() {
  const search = document.getElementById("searchInput").value;
  if (search) {
    window.location.href = "explore.html?search=" + search;
  }
};






 



