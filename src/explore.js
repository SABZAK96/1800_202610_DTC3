import { db } from "./firebaseConfig.js";
import { auth } from "./firebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDocs, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
 
let allEvents = [];
let currentUser = null;

// this took me wayy to long to figure out
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
 
function attachFavBtn(favBtn, user, eventId) {
  if (user) {
    remember_heart_color(favBtn, user, eventId);
    favBtn.parentElement.addEventListener("click", () => favClick(favBtn, user, eventId));
  } else {
    favBtn.parentElement.addEventListener("click", () => { window.location.href = "login.html"; });
  }
}
 
function heartSVG() {
  return `<svg class="favbtn fill-black w-6 h-6 stroke-black stroke-2" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
    <path class="cls-1" d="M179.24,31.69h0c-20-20-52.44-20-72.44,0l-6.8,6.8-6.8-6.8c-20-20-52.44-20-72.44,0h0C.75,51.69.75,84.13,20.76,104.13l6.8,6.8-.4.4,63.58,63.58c4.9,4.9,12.84,4.92,17.77.05l64.34-63.63-.4-.4,6.8-6.8c20-20,20-52.44,0-72.44Z"/>
  </svg>`;
}
 
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

// bad things happen when you touch this 
window.applyFilters = () => {
  const search = document.getElementById("searchInput")?.value.toLowerCase() || "";
  const tag = document.getElementById("tagFilter")?.value || "";
 
  const filtered = allEvents.filter(event => {
    const matchesSearch = event.title?.toLowerCase().includes(search) || event.shortest_summary?.toLowerCase().includes(search);
    const matchesTag = !tag || event.tags?.includes(tag);
    return matchesSearch && matchesTag;
  });
 
  renderEvents(filtered, currentUser); 
};
 
async function loadevents() {
  const snap = await getDocs(collection(db, "Events_2026"));
  allEvents = snap.docs.map(eventdoc => ({ id: eventdoc.id, ...eventdoc.data() }));
  console.log("Total events loaded:", allEvents.length);
}

function applyQueryParams() {
  const params = new URLSearchParams(window.location.search);
  const tag = params.get("tag");
  const search = params.get("search");

  if (tag) {
    const tagFilter = document.getElementById("tagFilter");
    if (tagFilter) tagFilter.value = tag;
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
  applyQueryParams();
  applyFilters();
});