
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
        <div class="flex flex-1 bg-white rounded-4xl shadow-2xl">
            <div class="flex-1 rounded-l-4xl shadow-xl w-full">
                <img src="./images/${id}.png" class="w-full rounded-l-4xl h-80 object-cover object-center">
            </div>

            <div class="flex-1 flex flex-col justify-between py-10 px-10">
                <div>
                    <p class="text-sm text-gray-500">${data.date}</p>
                    <h1>${data.title}</h1>
                    <p>${data.shortest_summary}</p>
                </div>

                <a href="eventpage.html?docID=${id}"> <button class="Loginbtn bg-black h-10 w-35 px-6 rounded-full text-sm text-white">
                    Learn more
                </button></a>
            </div>
        </div>
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
        <div class="absolute right-3 top-3 flex justify-center items-center w-13 h-13 mb-2 rounded-full bg-white shadow-2xl">
          <svg class=favbtn xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" width="24" height="24" viewBox="0 0 200 200">
            <path class="cls-1" d="M179.24,31.69h0c-20-20-52.44-20-72.44,0l-6.8,6.8-6.8-6.8c-20-20-52.44-20-72.44,0h0C.75,51.69.75,84.13,20.76,104.13l6.8,6.8-.4.4,63.58,63.58c4.9,4.9,12.84,4.92,17.77.05l64.34-63.63-.4-.4,6.8-6.8c20-20,20-52.44,0-72.44Z"/>
          </svg>
        </div>
        <img src="/images/${id}.png" class="w-full rounded-t-4xl h-50 object-cover object-center">
      </div>
      <!--Text-->
      <div class="flex flex-col flex-1 justify-between py-8 px-8">
        <div>
          <p class="text-sm text-gray-500">${data.date}</p>
          <h2>${data.title}</h2>
        </div>  
        <a href="eventpage.html?docID=${id}"><button id="LearnMore" type="button" class="bg-black h-10 w-35 px-6 rounded-full text-sm text-white">Learn more</button></a>
      </div>
    </div>`
    let container = document.createElement("div");
    container.innerHTML = other_result;
    document.querySelector(".thisweek-container").appendChild(container.firstElementChild);
    populate++;
        };

// Fav button logic — runs AFTER all cards are in the DOM
  let favselected = false;
  document.querySelectorAll(".favbtn").forEach(function (btn) {
    btn.addEventListener("click", function () { favClick(btn); });
  });

  function favClick(x) {
    if (favselected == false) {
      x.style.fill = "red";
      x.style.stroke = "none";
      favselected = true;
    } else {
      x.style.fill = "none";
      x.style.stroke = "black";
      favselected = false;
    }
    return x;
  }
        
    });
    
}

loadindex();