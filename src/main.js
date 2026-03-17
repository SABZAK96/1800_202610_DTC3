import { onAuthReady } from "./authentication.js";
 import { db } from "./firebaseConfig.js"; 
 import { collection, doc, getDocs, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
 import { auth } from "./firebaseConfig.js";
  import { onAuthStateChanged, signOut } from "firebase/auth"
// the exact logic for favoriting cards for signed in users is used in here.
// only necessary changes(exactly as eventpage.js) are made for applying the favorite logic
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

  onAuthReady((user) => {
    if (!user) {
      location.href = "index.html";
      return;
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

async function loadMainEvents() {
  const ref = collection(db, "Events_2026");
  const snap = await getDocs(ref);
  let populate = 0;

  const carouselInner = document.querySelector(".carousel .flex.gap-4.w-max");
  const favouritesContainer = document.querySelector(".favourites-container");

  // Clear static hardcoded cards
  if (carouselInner) carouselInner.innerHTML = "";

  snap.forEach((eventdoc) => {
    let data = eventdoc.data();
    let id = eventdoc.id;

    // First 4 events → carousel cards
    if (populate < 4) {
      let carouselCard = `
        <a href="eventpage.html?docID=${id}&from=main.html" class="flex bg-white rounded-4xl shadow-2xl h-50 w-150 hover:opacity-90 transition-opacity">
          <div class="flex rounded-l-4xl shadow-xl w-50">
            <img src="./images/${id}.png" draggable="false" class="w-full rounded-l-4xl h-50 w-50 object-cover object-center">
          </div>
          <div class="flex-1 flex flex-col justify-between py-5 px-10">
            <div>
              <h2>${data.title}</h2>
            </div>
            <div>
              <div class="flex flex-1 items-center gap-2 mb-2">
                ${calendarSVG}
                <p class="text-black">${data.date}</p>
              </div>
              <div class="flex flex-1 items-center gap-2 mb-2">
                ${locationSVG}
                <p class="text-black">${data.location}</p>
              </div>
            </div>
          </div>
        </a>`;
      const card = document.createElement("div");
      card.innerHTML = carouselCard;
      carouselInner.appendChild(card.firstElementChild);
      populate++;
    }

    // Next 3 events favourites grid cards
    else if (populate >= 4 && populate < 8) {
      let favCard = `
        <div class="flex flex-col bg-white rounded-4xl shadow-2xl">
          <div class="rounded-t-4xl w-full relative">
            <div class="absolute right-3 top-3 flex justify-center items-center w-13 h-13 mb-2 rounded-full bg-white shadow-2xl">
              <svg class="favbtn" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" width="24" height="24" viewBox="0 0 200 200">
                <path class="cls-1" d="M179.24,31.69h0c-20-20-52.44-20-72.44,0l-6.8,6.8-6.8-6.8c-20-20-52.44-20-72.44,0h0C.75,51.69.75,84.13,20.76,104.13l6.8,6.8-.4.4,63.58,63.58c4.9,4.9,12.84,4.92,17.77.05l64.34-63.63-.4-.4,6.8-6.8c20-20,20-52.44,0-72.44Z"/>
              </svg>
            </div>
            <img src="./images/${id}.png" class="w-full rounded-t-4xl h-50 object-cover object-center">
          </div>
          <div class="flex flex-col flex-1 justify-between py-8 px-8">
            <div>
              <p class="text-sm text-gray-500">${data.date}</p>
              <h2>${data.title}</h2>
            </div>
            <a href="eventpage.html?docID=${id}&from=main.html" type="button" class="bg-black h-10 w-35 px-6 rounded-full text-sm text-white flex items-center justify-center w-fit mt-4">Learn more</a>
          </div>
        </div>`;
      const card = document.createElement("div");
      card.innerHTML = favCard;
      const each_card = favouritesContainer.appendChild(card.firstElementChild);
      const favBtn = each_card.querySelector(".favbtn");
      const user = auth.currentUser;
      if (user) {
        async function check_fav_field(){
          const ref = await getDoc(doc(db, "users", user.uid))
          const user_data = ref.data()
          if (!user_data.favorite_events){
            let saved_events = []
            await setDoc(doc(db, "users", user.uid), {
              favorite_events: saved_events,
            },{ merge: true })
            return saved_events
          } else {
            return user_data.favorite_events
          }
        }
        async function remember_heart_color(x){
          await check_fav_field();
          const ref = await getDoc(doc(db, "users", user.uid));
          const ref_data_event = ref.data().favorite_events;
          if (ref_data_event.includes(eventdoc.id)){
            x.style.fill = "red";
            x.style.stroke = "none";
          } else {
            x.style.fill = "black";
            x.style.stroke = "black";
          }
        }
        remember_heart_color(favBtn);
        favBtn.addEventListener("click", function () {
          favClick(favBtn);
        });
        async function favClick(x) {
          await check_fav_field();
          let favselected = false;
          const ref = await getDoc(doc(db, "users", user.uid));
          const ref_data = ref.data();
          if (!ref_data.favorite_events.includes(eventdoc.id)){
            favselected = false;
          } else {
            favselected = true;
          }
          if (favselected == false) {
            x.style.fill = "red";
            x.style.stroke = "none";
            favselected = true;
            const id_fav = eventdoc.id
            await updateDoc(doc(db, "users", user.uid), {
              favorite_events : arrayUnion(id_fav),
            })
          } else {
            favselected = false;
            x.style.fill = "black";
            x.style.stroke = "black";
            const id_fav = eventdoc.id;
            await updateDoc(doc(db, "users", user.uid), {
              favorite_events : arrayRemove(id_fav),
            })
          }
          return x;
        }
      }
      populate++;
    }
  });
}

loadMainEvents();

// Carousel drag to scroll
function waitForElement(selector, callback) {
  const interval = setInterval(() => {
    const el = document.querySelector(selector);
    if (el) {
      clearInterval(interval);
      callback(el);
    }
  }, 100);
}

waitForElement(".carousel", (slider) => {
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener("dragstart", (e) => e.preventDefault());
  slider.addEventListener("mousedown", (e) => {
    e.preventDefault();
    isDown = true;
    slider.classList.add("cursor-grabbing");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener("mouseleave", () => {
    isDown = false;
  });
  slider.addEventListener("mouseup", () => {
    isDown = false;
    slider.classList.remove("cursor-grabbing");
  });
  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
  });
});

// Mark current page in navbar
function currentPage() {
  const links = document.querySelectorAll(".menuButton");
  const currentPath = window.location.pathname;
  links.forEach(link => {
    if (link.parentElement.getAttribute("href") === currentPath) {
      link.classList.add("bg-white", "shadow-2xl");
      link.querySelector("svg").classList.remove("text-white");
      link.querySelector("svg").classList.add("text-[var(--primary-green)]");
      link.querySelector("svg").nextElementSibling.classList.remove("text-white");
      link.querySelector("svg").nextElementSibling.classList.add("text-black");
    }
  });
}

currentPage();

