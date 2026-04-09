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
    <div class="explorecards flex flex-col lg:flex-row lg:w-1/2 w-full bg-white rounded-xl shadow-md mb-4 items-stretch lg:min-h-[300px]">
      <div class="lg:w-1/2 w-full h-48 lg:h-auto relative">
        <a href="eventpage.html?docID=${id}&from=explore.html" class="block w-full h-full">
          <img id="evntimglist" class="w-full h-full object-cover rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none" src="./images/${id}.jpg" alt="Event">
          <div class="flex flex-row flex-wrap gap-2 pb-4 absolute bottom-0 left-1">
            <span class="bg-[var(--light-blue)] whitespace-nowrap w-fit text-white py-1 px-2 rounded-full text-xs">
              <span class="evnttag">${data.tags[0]}</span>
            </span>
            <span class="bg-[var(--light-pink)] whitespace-nowrap w-fit text-white py-1 px-2 rounded-full text-xs">
              <span class="evnttype">${data.tags[1]}</span>
            </span>
          </div>
        </a>
        <button class="rounded-full w-fit h-fit bg-white absolute top-3 right-3 p-2 z-10">${heartSVG()}</button>
      </div>
      <a href="eventpage.html?docID=${id}&from=explore.html" class="flex flex-col flex-1 p-6 justify-center">
        <h2 class="evnttitle text-xl font-bold text-[#445629] mb-2">${data.title}</h2>
        <p class="text-gray-700 text-sm pb-4 evntdesclist">${data.shortest_summary}</p>
        <span class="w-fit bg-black text-white text-sm py-1 px-3 rounded-lg">Go to Event</span>
      </a>
    </div>`;
  return div.firstElementChild;
}
 
function createGridCard(data, id) {
  const div = document.createElement("div");
  div.innerHTML = `
    <div class="w-full lg:w-1/3 p-2">
      <div class="flex flex-col rounded-2xl h-full shadow-md border-0 bg-white">
        <div class="w-full relative">
          <a href="eventpage.html?docID=${id}&from=explore.html" class="block">
            <img class="h-48 w-full object-cover rounded-t-xl" src="./images/${id}.jpg" alt="">
            <div class="flex flex-row gap-2 pb-4 absolute bottom-0 left-1">
              <span class="bg-[var(--light-blue)] w-fit flex-nowrap text-white py-1 px-2 rounded-full text-xs"><span>${data.tags[0]}</span></span>
              <span class="bg-[var(--light-pink)] flex-nowrap whitespace-nowrap w-fit text-white py-1 px-2 rounded-full text-xs"><span>${data.tags[1]}</span></span>
            </div>
          </a>
          <button class="rounded-full w-fit h-fit bg-white absolute top-3 right-3 p-2 z-10">${heartSVG()}</button>
        </div>
        <a href="eventpage.html?docID=${id}&from=explore.html" class="flex flex-col flex-1 p-4">
          <h3 class="font-semibold text-sm text-[var(--medium-grey)] pt-2">${data.date}</h3>
          <p class="font-bold text-md pt-3 pb-8">${data.title}</p>
          <span class="w-fit bg-black text-white text-sm py-1 px-3 rounded-lg">View Details</span>
        </a>
      </div>
    </div>`;
  return div.firstElementChild;
}
 
function renderEvents(events, user) {
  console.log("Rendering events:", events.length);
 
  document.querySelector(".firstcontainer").innerHTML = "";
  document.querySelector(".secondcontainer").innerHTML = "";
  document.querySelector(".thirdcontainer").innerHTML = "";
 
  let populate = 0;
 
  events.forEach((event) => {
    let card;
 
    if (populate < 2) {
      card = createListCard(event, event.id);
      document.querySelector(".firstcontainer").appendChild(card);
    } else if (populate < 4) {
      card = createListCard(event, event.id);
      document.querySelector(".secondcontainer").appendChild(card);
    } else if (populate < 7) {
      card = createGridCard(event, event.id);
      document.querySelector(".thirdcontainer").appendChild(card);
    } else {
      return;
    }
 
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