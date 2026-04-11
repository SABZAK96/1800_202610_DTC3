
import { onAuthReady } from "./authentication.js";
import { db } from "./firebaseConfig.js";
import { collection, getDocs } from "firebase/firestore";

async function loadindex() {

    const ref = collection(db,"Events_2026");
    const snap = await getDocs(ref);
    let populate = 0

    snap.forEach((doc) => {

        let id = doc.id;
        let data = doc.data();
        if (populate === 0){
            let result = `
        <a href="eventpage.html?docID=${id}" class="flex flex-1 lg:flex-row flex-col bg-white rounded-4xl shadow-2xl">
            <div class="flex-1 rounded-l-4xl shadow-xl w-full">
                <img src="./images/${id}.jpg" class="w-full rounded-l-4xl h-80 object-cover object-center">
            </div>

            <div class="flex-1 flex flex-col justify-between py-10 px-10">
                <div>
                    <p class="text-sm text-gray-500">${data.date}</p>
                    <h1>${data.title}</h1>
                    <p>${data.shortest_summary}</p>
                </div>

                <span class="Loginbtn bg-black h-10 w-35 px-6 rounded-full text-sm text-white flex items-center justify-center w-fit">
                    Learn more
                </span>
            </div>
        </a>
        `;

        let outerdiv = document.createElement("div");
        outerdiv.innerHTML = result;
        document.querySelector(".featured-container").appendChild(outerdiv.firstElementChild);
populate++
        }
        else if (populate >=1 && populate <=5){
            let other_result = `<div class="flex flex-col bg-white rounded-4xl shadow-2xl">
      <!--Image-->
      <div class="rounded-t-4xl w-full relative">
        <div class="absolute right-3 top-3 flex justify-center items-center w-13 h-13 mb-2 rounded-full bg-white shadow-2xl z-10">
          <svg class="favbtn" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" width="24" height="24" viewBox="0 0 200 200">
            <path class="cls-1" d="M179.24,31.69h0c-20-20-52.44-20-72.44,0l-6.8,6.8-6.8-6.8c-20-20-52.44-20-72.44,0h0C.75,51.69.75,84.13,20.76,104.13l6.8,6.8-.4.4,63.58,63.58c4.9,4.9,12.84,4.92,17.77.05l64.34-63.63-.4-.4,6.8-6.8c20-20,20-52.44,0-72.44Z"/>
          </svg>
        </div>
        <img src="/images/${id}.jpg" class="w-full rounded-t-4xl h-50 object-cover object-center">
      </div>
      <!--Text-->
      <a href="eventpage.html?docID=${id}" class="flex flex-col flex-1">
      <div class="flex flex-col flex-1 justify-between py-8 px-8">
        <div>
          <p class="text-sm text-gray-500">${data.date}</p>
          <h2>${data.title}</h2>
        </div>
        <span class="bg-black h-10 w-35 px-6 rounded-full text-sm text-white flex items-center justify-center w-fit mt-4">Learn more</span>
      </div>
      </a>
    </div>`
    let container = document.createElement("div");
    container.innerHTML = other_result;
    const each_card = document.querySelector(".thisweek-container").appendChild(container.firstElementChild);
    const favBtn = each_card.querySelector(".favbtn");
    favBtn.parentElement.addEventListener("click", function () {
      window.location.href = "login.html";
    });
    populate++;}
        
    });
    
}
// The same logic we used in main.js searching and landing on the correct result on explore.js
// Takes the search input value and redirects to explore.html
// constructs the new url by creating a param and setting it to "search"
window.searchRedirect = function() {
  const search = document.getElementById("searchInput").value;
  if (search) {
    window.location.href = "explore.html?search=" + search;
  }
};

loadindex();


