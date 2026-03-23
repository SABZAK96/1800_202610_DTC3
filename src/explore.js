import { db } from "./firebaseConfig.js";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";

let allEvents = []; 

async function loadevents() {
  const ref = collection(db, "Events_2026"); 
  const snap = await getDocs(ref); 

  allEvents = snap.docs.map(doc => ({ id: doc.id, ...doc.data()}))
  
  renderEvents(allEvents);
};

window.applyFilters = () => {
  const search = document.getElementById("searchInput").value.toLowerCase();
  const tag = document.getElementById("tagFilter").value;

  const filtered = allEvents.filter(event => {
    const matchesSearch = event.title?.toLowerCase().includes(search) || event.shortest_summary?.toLowerCase().includes(search);
    const matchesTag = !tag || event.tags?.includes(tag);
    return matchesSearch && matchesTag;
  });

  renderEvents(filtered);
};

function renderEvents(events) {
  document.querySelector(".firstcontainer").innerHTML = "";
  document.querySelector(".secondcontainer").innerHTML = "";
  document.querySelector(".thirdcontainer").innerHTML = "";

  let populate = 0;

  events.forEach((data) => {
    const id = data.id;

    if (populate < 2) {
      const card = createListCard(data, id);
      document.querySelector(".firstcontainer").appendChild(card);
      populate++;
    } 
    else if (populate < 4) {
      const card = createListCard(data, id);
      document.querySelector(".secondcontainer").appendChild(card);
      populate++;
    } 
    else if (populate < 7) {
      const card = createGridCard(data, id);
      document.querySelector(".thirdcontainer").appendChild(card);
      populate++;
    }
  });
}

function createListCard(data, id) {
  const div = document.createElement("div");
  div.innerHTML = `
    <div class="explorecards flex flex-col lg:flex-row lg:w-1/2 w-full gap-5 bg-white rounded-xl shadow-md mb-4 items-stretch lg:min-h-[300px]">
      <div class="lg:w-1/2 w-full h-auto relative">
        <img class="w-full h-full object-cover rounded-l-xl" src="./images/${id}.png" alt="Event">

        <div class="flex flex-row flex-wrap gap-2 pb-4 absolute bottom-0 left-1">
          <span class="bg-[var(--light-blue)] whitespace-nowrap w-fit text-white py-1 px-2 rounded-full text-xs">${data.tags[0]}</span>

          <span class="bg-[var(--light-pink)] whitespace-nowrap w-fit text-white py-1 px-2 rounded-full text-xs">${data.tags[1]}</span>
        </div>

        <button class="rounded-full w-fit h-fit bg-white absolute top-3 right-3 p-2">
          ${heartSVG()}
        </button>
      </div>

      <div class="p-6 lg:w-1/2 flex flex-col justify-center">
        <h2 class="text-xl font-bold text-[#445629] mb-2">${data.title}</h2>

        <p class="text-gray-700 text-sm pb-4">${data.shortest_summary}</p>
        
        <a href="eventpage.html?docID=${id}" class="w-fit bg-black text-white text-sm py-1 px-3 rounded-lg hover:opacity-90">Go to Event</a>
      </div>
    </div>`;
  attachFavListeners(div);
  return div.firstElementChild;
}

function createGridCard(data, id) {
  const div = document.createElement("div");
  div.innerHTML = `
    <div class="w-full lg:w-1/3 p-2">
      <div class="flex flex-col rounded-2xl h-full shadow-md bg-white">
        <div class="w-full relative">
          <img class="h-48 w-full object-cover rounded-t-xl" src="./images/${id}.png" alt="">

          <div class="flex flex-row gap-2 pb-4 absolute bottom-0 left-1">
            <span class="bg-[var(--light-blue)] w-fit text-white py-1 px-2 rounded-full text-xs">${data.tags[0]}</span>

            <span class="bg-[var(--light-pink)] w-fit text-white py-1 px-2 rounded-full text-xs">${data.tags[1]}</span>
          </div>
          <button class="rounded-full w-fit h-fit bg-white absolute top-3 right-3 p-2">
            ${heartSVG()}
          </button>
        </div>
        <div class="p-4">
          <h3 class="font-semibold text-sm text-[var(--medium-grey)] pt-2">${data.date}</h3>

          <p class="font-bold text-md pt-3 pb-8">${data.title}</p>
          
          <a href="eventpage.html?docID=${id}" class="bg-black rounded-xl text-white text-center px-2 py-2 text-xs">View Details</a>
        </div>
      </div>
    </div>`;
  attachFavListeners(div);
  return div.firstElementChild;
}

// THANK YOU BEAAN
function heartSVG() {
  return `<svg class="favbtn fill-black w-6 h-6 stroke-black stroke-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
    <path d="M179.24,31.69h0c-20-20-52.44-20-72.44,0l-6.8,6.8-6.8-6.8c-20-20-52.44-20-72.44,0h0C.75,51.69.75,84.13,20.76,104.13l6.8,6.8-.4.4,63.58,63.58c4.9,4.9,12.84,4.92,17.77.05l64.34-63.63-.4-.4,6.8-6.8c20-20,20-52.44,0-72.44Z"/>
  </svg>`;
}

function attachFavListeners(container) {
  container.querySelectorAll(".favbtn").forEach(btn => {
    let selected = false;
    btn.addEventListener("click", () => {
      selected = !selected;
      btn.style.fill = selected ? "red" : "black";
      btn.style.stroke = selected ? "none" : "black";
    });
  });
}

loadevents();