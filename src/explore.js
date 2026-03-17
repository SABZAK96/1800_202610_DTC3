import { db } from "./firebaseConfig.js";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
async function loadevents() {
  const ref = collection(db, "Events_2026");
  const snap = await getDocs(ref);
  let populate = 0;

  snap.forEach((doc) => {
    let data = doc.data();
    let id = doc.id ;
      let result = `<div class="explorecards flex flex-col lg:flex-row lg:w-1/2  w-full gap-5  bg-white rounded-xl  shadow-md  mb-4  items-stretch lg:min-h-[300px] ">
    
    <div class="lg:w-1/2 w-full h-auto relative">
      <img 
        id="evntimglist" 
        class="w-full h-full object-cover rounded-l-xl" 
        src="./images/${doc.id}.png"" 
        alt="Event"
      >
      <div class="flex  flex-row flex-wrap gap-2 pb-4 absolute bottom-0 left-1  ">
        <span class=" bg-[var(--light-blue)] whitespace-nowrap w-fit  text-white py-1 px-2 rounded-full text-xs">
           <span class="evnttag">${data.tags[0]}</span>
        </span>
        <span class="bg-[var(--light-pink)]  whitespace-nowrap w-fit text-white py-1 px-2 rounded-full text-xs">
           <span class="evnttype">${data.tags[1]}</span>
        </span>
      </div>
       <div >
          <button class="rounded-full w-fit h-fit bg-white absolute top-3 right-3 p-2">
            <svg class="favbtn fill-black w-6 h-6 stroke-black stroke-2" id="" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">

          <path class="cls-1" d="M179.24,31.69h0c-20-20-52.44-20-72.44,0l-6.8,6.8-6.8-6.8c-20-20-52.44-20-72.44,0h0C.75,51.69.75,84.13,20.76,104.13l6.8,6.8-.4.4,63.58,63.58c4.9,4.9,12.84,4.92,17.77.05l64.34-63.63-.4-.4,6.8-6.8c20-20,20-52.44,0-72.44Z"/>
        </svg>
            </button>

            </div>
    </div>

    <div class="p-6 lg:w-1/2 flex flex-col justify-center">
      <div class="flex flex-col">
<h2 class="evnttitle text-xl font-bold text-[#445629] mb-2">${data.title}</h2>
 
      </div>
      <p class="text-gray-700   text-sm pb-4 evntdesclist" > ${data.shortest_summary}
        
      </p>

      <!-- tags for the event -->

        <a href="eventpage.html?docID=${doc.id}&from=explore.html" class="w-fit bg-black text-white text-sm py-1 px-3 rounded-lg hover:opacity-90 transition-opacity">
        Go to Event
      </a> 
    </div>
    <!-- more cards -->
  </div>`;
   const card = document.createElement("div");
    card.innerHTML = result;
    if (populate < 2) {
      // favorite button
    let favselected = false;

document.querySelectorAll(".favbtn").forEach(function(btn) {
    btn.addEventListener("click", function(){favClick(btn);})});

function favClick(x) {
    if (favselected == false) {
        x.style.fill = "red";
        x.style.stroke = "none";
        favselected = true;
    } else {
        x.style.fill = "black";
        x.style.stroke = "black";
        favselected = false;
    }
    return x;
}
      document.querySelector(".firstcontainer").appendChild(card.firstElementChild);
      populate++;
    } 
    else if (populate >= 2 && populate < 4){
            // favorite button
    let favselected = false;

document.querySelectorAll(".favbtn").forEach(function(btn) {
    btn.addEventListener("click", function(){favClick(btn);})});

function favClick(x) {
    if (favselected == false) {
        x.style.fill = "red";
        x.style.stroke = "none";
        favselected = true;
    } else {
        x.style.fill = "black";
        x.style.stroke = "black";
        favselected = false;
    }
    return x;
}
    document.querySelector(".secondcontainer").appendChild(card.firstElementChild);
    populate++;

    }
    else if (populate >= 4 && populate <= 6){

        let new_result = ` <div class="w-full lg:w-1/3 p-2">
          
          <div class="flex flex-col rounded-2xl  h-full shadow-md border-0 bg-white ">
            <div class="w-full relative">
              <div class="relative">
                <img class="h-48 w-full object-cover rounded-t-xl " src="./images/${doc.id}.png" alt="">
                <div class="flex  flex-row gap-2 pb-4 absolute bottom-0 left-1  ">
        <span class=" bg-[var(--light-blue)] w-fit flex-nowrap text-white py-1 px-2 rounded-full text-xs">
           <span id="evnttag">${data.tags[0]}</span>
        </span>
        <span class="bg-[var(--light-pink)] flex-nowrap whitespace-nowrap w-fit text-white py-1 px-2 rounded-full text-xs">
           <span>${data.tags[1]}</span>
        </span>
      </div>
              </div>
                  
              <div >
                    <button class="rounded-full w-fit h-fit bg-white absolute top-3 right-3 p-2">
                      <svg class="favbtn fill-black w-6 h-6 stroke-black stroke-2" id="" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">

          <path class="cls-1" d="M179.24,31.69h0c-20-20-52.44-20-72.44,0l-6.8,6.8-6.8-6.8c-20-20-52.44-20-72.44,0h0C.75,51.69.75,84.13,20.76,104.13l6.8,6.8-.4.4,63.58,63.58c4.9,4.9,12.84,4.92,17.77.05l64.34-63.63-.4-.4,6.8-6.8c20-20,20-52.44,0-72.44Z"/>
        </svg>
                    </button>

            </div>

          </div>
            <div class="p-4">
              <h3 id="evntdate" class="font-semibold text-sm  text-[var(--medium-grey)] pt-2">${data.date}</h3>
               
            <p id="evnttitle" class=" font-bold text-md pt-3 pb-8">${data.title}</p>
            <a href="eventpage.html?docID=${doc.id}&from=eventlist.html" 
              type="button"  
              class="bg-black rounded-xl text-white text-center  mt-8 px-2 py-2 text-xs cursor-pointer focus:outline-none">
              View Details
            </a>
            </div>
          </div>
          </div>`

                // favorite button
    let favselected = false;

document.querySelectorAll(".favbtn").forEach(function(btn) {
    btn.addEventListener("click", function(){favClick(btn);})});

function favClick(x) {
    if (favselected == false) {
        x.style.fill = "red";
        x.style.stroke = "none";
        favselected = true;
    } else {
        x.style.fill = "black";
        x.style.stroke = "black";
        favselected = false;
    }
    return x;
}
          let new_card = document.createElement("div")
          new_card.innerHTML = new_result
          document.querySelector(".thirdcontainer").appendChild(new_card.firstElementChild);
          populate++;
    }
  });
}

loadevents();


