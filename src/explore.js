import { db } from "./firebaseConfig.js";
import { auth } from "./firebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDocs, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
 
let allEvents = [];
let currentUser = null;


// Checks if the user's Firestore document has a favorite_events field.
// If it doesn't exist yet, it creates it as an empty array.
// This prevents errors when trying to read or update favorites
// for a user who has never favorited anything before.

async function check_fav_field(user) {
  const ref = await getDoc(doc(db, "users", user.uid));
  
  if (!ref.exists()) {
    await setDoc(doc(db, "users", user.uid), { favorite_events: [] });
    return [];
  }

  const user_data = ref.data();

  if (!user_data.favorite_events) {
    await setDoc(doc(db, "users", user.uid), { favorite_events: [] }, { merge: true });
    return [];
  }

  return user_data.favorite_events;
}
 

// Sets the heart icon color when a card is first loaded.
// If the event is already in the user's favorites it shows red,
// otherwise it shows black.

async function remember_heart_color(favBtn, user, eventId) {
  await check_fav_field(user);
  const ref = await getDoc(doc(db, "users", user.uid));
  const favorites = ref.data().favorite_events;
  if (favorites.includes(eventId)) {
    favBtn.style.fill = "red";
    favBtn.style.stroke = "none";
  } else {
    favBtn.style.fill = "black";
    favBtn.style.stroke = "black";
  }
}


// Handles a click on the heart button.
// If the event is not yet a favorite, it adds it and turns the heart red.
// If it is already a favorite, it removes it and turns the heart black.

async function favClick(favBtn, user, eventId) {
  await check_fav_field(user);
  const ref = await getDoc(doc(db, "users", user.uid));
  const isFav = ref.data().favorite_events.includes(eventId);
  if (!isFav) {
    favBtn.style.fill = "red";
    favBtn.style.stroke = "none";
    await updateDoc(doc(db, "users", user.uid), { favorite_events: arrayUnion(eventId) });
  } else {
    favBtn.style.fill = "black";
    favBtn.style.stroke = "black";
    await updateDoc(doc(db, "users", user.uid), { favorite_events: arrayRemove(eventId) });
  }
}
 

// Wires up the heart button on each event card.
// If the user is logged in, it sets the correct color and listens for clicks.
// If they are not logged in, clicking the heart sends them to the login page.

function attachFavBtn(favBtn, user, eventId) {
  if (user) {
    remember_heart_color(favBtn, user, eventId);
    favBtn.parentElement.addEventListener("click", () => favClick(favBtn, user, eventId));
  } else {
    favBtn.parentElement.addEventListener("click", () => { window.location.href = "login.html"; });
  }
}
 
// Returns the SVG markup for the heart icon used on every event card.
function heartSVG() {
  return `<svg class="favbtn fill-black w-6 h-6 stroke-black stroke-2" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
    <path class="cls-1" d="M179.24,31.69h0c-20-20-52.44-20-72.44,0l-6.8,6.8-6.8-6.8c-20-20-52.44-20-72.44,0h0C.75,51.69.75,84.13,20.76,104.13l6.8,6.8-.4.4,63.58,63.58c4.9,4.9,12.84,4.92,17.77.05l64.34-63.63-.4-.4,6.8-6.8c20-20,20-52.44,0-72.44Z"/>
  </svg>`;
}
 

// Builds and returns an event card in list layout.
// Takes the event data and its Firestore document ID,
// and returns a  HTML element.

function createListCard(data, id) {
  const div = document.createElement("div");
  div.innerHTML = `
    <div class="w-full  p-2">
      <div class="flex flex-col rounded-4xl h-full shadow-2xl border-0 bg-white">
        <div class="w-full relative">
          <a href="eventpage.html?docID=${id}&from=explore.html" class="block">
            <img class="h-48 w-full object-cover rounded-t-4xl" src="./images/${id}.jpg" alt="">
         
          </a>
          <button class="rounded-full w-fit h-fit bg-white absolute top-3 right-3 p-2 z-10">${heartSVG()}</button>
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
        
      </div>
    </div>
    `;
  return div.firstElementChild;
}
 

// Builds and returns an event card in grid layout.
// Takes the event data and its Firestore document ID,
// and returns a  HTML element.
function createGridCard(data, id) {
  const div = document.createElement("div");
  div.innerHTML = `
    <div class="w-full">
      <div class="flex flex-col rounded-4xl h-full shadow-2xl border-0 bg-white">
        <div class="w-full relative">
          <a href="eventpage.html?docID=${id}&from=explore.html" class="block">
            <img class="h-48 w-full object-cover rounded-t-4xl" src="./images/${id}.jpg" alt="">
         
          </a>
          <button class="rounded-full w-fit h-fit bg-white absolute top-3 right-3 p-2 z-10">${heartSVG()}</button>
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
        
      </div>
    </div>`;
  return div.firstElementChild;
}


// Clears the event grid and re-renders it with the given list of events.
// Also wires up the heart button on each card.
// Called every time the filters change.

function renderEvents(events, user) {
  console.log("Rendering events:", events.length);
 

  document.querySelector(".exploreContainer").innerHTML = "";
 
  let populate = 0;
 
  events.forEach((event) => {
    let card;

    card = createGridCard(event, event.id);
    document.querySelector(".exploreContainer").appendChild(card);
  
    const favBtn = card.querySelector(".favbtn");
    attachFavBtn(favBtn, user, event.id); 
    populate++;
  });
}


// Reads the user's saved preferences, budget, and days from
// Firestore and pre-checks the matching filter checkboxes.
// The checkbox values in the HTML match what is stored in Firestore,
// so we can find and check them directly.
// Called once after the user's data is loaded in onAuthStateChanged.
function preSelectUserFilters(data) {
  // check each tag checkbox whose value matches a saved preference
  (data.preferences || []).forEach(function(pref) {
    const checkbox = document.querySelector(`.tagFilter[value="${pref}"]`);
    if (checkbox) checkbox.checked = true;
  });

  // check the budget checkbox that matches the saved budget value
  const budgetBox = document.querySelector(`.budgetFilter[value="${data.budget}"]`);
  if (budgetBox) budgetBox.checked = true;

  // check each day checkbox whose value matches a saved preferred day
  (data.days || []).forEach(function(day) {
    const checkbox = document.querySelector(`.dayFilter[value="${day}"]`);
    if (checkbox) checkbox.checked = true;
  });
}

// bad things happen when you touch this
window.applyFilters = () => {
  const search = document.getElementById("searchInput")?.value.toLowerCase() || "";

  // get a list of every checked checkbox in each filter group
  const checkedTags    = document.querySelectorAll('.tagFilter:checked');
  const checkedBudgets = document.querySelectorAll('.budgetFilter:checked');
  const checkedDays    = document.querySelectorAll('.dayFilter:checked');

  const filtered = allEvents.filter(event => {
    const matchesSearch = event.title?.toLowerCase().includes(search) || event.shortest_summary?.toLowerCase().includes(search);

    // if nothing is checked, show all events
    let matchesTag = true;

    // if at least one tag is checked, only show events that match one of them
    // checkbox values now match the event tag strings directly so no translation needed
    if (checkedTags.length > 0) {
      matchesTag = false;
      checkedTags.forEach(function(box) {
        if (event.tags?.includes(box.value)) {
          matchesTag = true;
        }
      });
    }

    // if a budget is checked, compare the event price directly against the selected cap

    let matchesBudget = true;
    if (checkedBudgets.length > 0) {
      matchesBudget = false;
      checkedBudgets.forEach(function(box) {
        if (box.value === "nolimit") {
          matchesBudget = true;
        } else if (event.price <= box.value) {
          matchesBudget = true;
        }
      });
    }

    // if days are checked, compare the event's day field directly against the selected days
    // events store their day as a string like "tuesday" which matches the checkbox values
    let matchesDay = true;
    if (checkedDays.length > 0) {
      matchesDay = false;
      checkedDays.forEach(function(box) {
        if (event.weekday?.toLowerCase() === box.value) {
          matchesDay = true;
        }
      });
    }

    return matchesSearch && matchesTag && matchesBudget && matchesDay;
  });

  renderEvents(filtered, currentUser);
};
 

// Fetches all events from the Firestore collection and stores them
// in the allEvents array so the filters can work without
// making a new database request every time.

async function loadevents() {
  const snap = await getDocs(collection(db, "Events_2026"));
  allEvents = snap.docs.map(eventdoc => ({ id: eventdoc.id, ...eventdoc.data() }));
  console.log("Total events loaded:", allEvents.length);
}


// Reads the URL for any tag or search parameters passed from another page.
// For example, clicking a tag on the home page links to
// explore.html?tag=Music and this function picks that up and
// checks the right filter checkbox automatically.
function applyQueryParams() {
  const params = new URLSearchParams(window.location.search);
  const tag = params.get("tag");
  const search = params.get("search");

  if (tag) {
    // find the checkbox whose value matches the tag and check it
    const matchingBox = document.querySelector(`.tagFilter[value="${tag}"]`);
    if (matchingBox) matchingBox.checked = true;
  }

  if (search) {
    const searchInput = document.getElementById("searchInput");
    if (searchInput) searchInput.value = search;
  }
}
 
onAuthStateChanged(auth, async (user) => {
  currentUser = user;
  if (allEvents.length === 0) {
    await loadevents();
  }

  // if the user is logged in, load their saved settings and pre-check the filter checkboxes
  if (user) {
    const userSnap = await getDoc(doc(db, "users", user.uid));
    if (userSnap.exists()) {
      preSelectUserFilters(userSnap.data());
    }
  }

  applyQueryParams();
  applyFilters();
});

// close the other filter dropdowns when one is opened
// so they don't all stack on top of each other on small screens
const allDropdowns = document.querySelectorAll('details');

allDropdowns.forEach(function(dropdown) {
  dropdown.addEventListener('toggle', function() {

    // only run this when a dropdown is being opened (not closed)
    if (dropdown.open) {

      // go through every dropdown on the page
      allDropdowns.forEach(function(other) {

        // close all of them except the one that was just opened
        if (other !== dropdown) {
          other.open = false;
        }
      });
    }
  });
});

// close all dropdowns when clicking anywhere outside of them
// the following line listens for click anywhere on the page, e stands for click event
document.addEventListener('click', function(e) {
  allDropdowns.forEach(function(dropdown) {
    //  Checks if the thing that was clicked (e.target) is not inside this dropdown.
    // e.target points to the exact HTML element the user clicked on.
    if (!dropdown.contains(e.target)) {
      // Closes the dropdown by setting its open property to false.
      dropdown.open = false;
    }
  });
});