import { db } from "./firebaseConfig.js";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";

//Load All events
async function loadEventsIndex() {
    const snap = await getDocs(collection(db, "Events_2026"));
    let result = "";

    snap.forEach((doc) => {
        const data = doc.data();
        result += `
        <div class="flex flex-col bg-white rounded-4xl shadow-2xl">
            <!--Image-->
            <div class="rounded-t-4xl w-full relative">
                <div class="absolute right-3 top-3 flex justify-center items-center w-13 h-13 mb-2 rounded-full bg-white shadow-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" width="24" height="24" viewBox="0 0 200 200" class="favbtn">
                    <path class="cls-1" d="M179.24,31.69h0c-20-20-52.44-20-72.44,0l-6.8,6.8-6.8-6.8c-20-20-52.44-20-72.44,0h0C.75,51.69.75,84.13,20.76,104.13l6.8,6.8-.4.4,63.58,63.58c4.9,4.9,12.84,4.92,17.77.05l64.34-63.63-.4-.4,6.8-6.8c20-20,20-52.44,0-72.44Z"/>
                </svg>
                </div>
                <img src="/images/${doc.id}.png" class="w-full rounded-t-4xl h-50 object-cover object-center">
            </div>
            <!--Text-->
            <div class="flex flex-col flex-1 justify-between py-8 px-8">
                <div>
                <p class="text-sm text-gray-500">${data.date}</p>
                <h2>${data.title}</h2>
                </div>  
                <a href="eventpage.html?docID=${doc.id}"><button id="LearnMore" type="button" class="bg-black h-10 w-35 px-6 rounded-full text-sm text-white">Learn more</button></a>
            </div>
        </div>
        `;
    });

    document.getElementById("allEvents").innerHTML = result;


    let favselected = false;
    document.querySelectorAll(".favbtn").forEach(function (btn) {
    btn.addEventListener("click", function () { favClick(btn); });
  });


  function favClick(x) {
    if (favselected == false) {
      x.style.fill = "red";
      favselected = true;
    } else {
      x.style.fill = "black";
      favselected = false;
    }
    return x;
  }

}

loadEventsIndex();




async function loadEventsTest() {
    console.log("Loading events...");

    const snap = await getDocs(collection(db, "Events_2026"));

    console.log("Snapshot size:", snap.size);

    snap.forEach((doc) => {
        console.log("Doc:", doc.id, doc.data());
    });
}

loadEventsTest();