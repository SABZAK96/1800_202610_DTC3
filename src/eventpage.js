import { db } from "./firebaseConfig.js";
import { collection, doc,getDocs, onSnapshot } from "firebase/firestore";

function getDocIdFromUrl() {
    const params = new URL(window.location.href).searchParams;
const current_id = params.get("docID");
    return current_id ;
}

function eventdetails(id){
    const ref = doc(db, "Events_2026", id)
    onSnapshot(ref , docSnap =>{
        if (docSnap.exists()) {
            console.log("exists?", docSnap.exists());
            const id = docSnap.id;
            console.log(id);
            document.getElementById("evntimgpage").style.backgroundImage = `url('./images/${id}.png')`;
            document.getElementById("tag0").innerHTML = docSnap.data().tags[0];
            document.getElementById("tag1").innerHTML = docSnap.data().tags[1];
            document.getElementById("price").innerHTML = docSnap.data().price;
            document.getElementById("loc").innerText = docSnap.data().location;
            document.getElementById("addr").innerText = docSnap.data().address;
            document.getElementById("date").innerText = docSnap.data().date;
            document.getElementById("time").innerText = docSnap.data().time;
            document.getElementById("evnttitle").innerText = docSnap.data().title;
            document.getElementById("evntsum").innerText = docSnap.data().short_summary;
            document.getElementById("evntdescr").innerText = docSnap.data().description;
            document.getElementById("refundpolicy").innerText = docSnap.data().refund_policy;
        } else{
            console.log("no such data exist!");
        }
    });
}
eventdetails(getDocIdFromUrl());

// load the bottom placeholders
async function loadcards() {
    const ref = collection(db, "Events_2026");
    const docs = await getDocs(ref);
    let number = 0;
    docs.forEach((doc) =>{
        const data = doc.data();
        
        let z = getDocIdFromUrl();
        const a = doc.id;
        if (z != doc.id){
            if (number < 3){
                
            let result = `<div class="w-full lg:w-1/3 p-2">
          
          <div class="flex flex-col rounded-2xl  h-full shadow-md border-0 bg-white ">
            <div class="w-full relative">
              <div class="relative">
                <img class="h-48 w-full object-cover rounded-t-xl " src="./images/${doc.id}.png" alt="">
                <div class="flex  flex-wrap gap-2 pb-4 absolute bottom-0 left-1  ">
        <span class=" bg-[var(--light-blue)] whitespace-nowrap w-fit  text-white py-1 px-2 rounded-full text-xs">
           <span id="">${data.tags[0]}</span>
        </span>
        <span class="bg-[var(--light-pink)]  whitespace-nowrap w-fit text-white py-1 px-2 rounded-full text-xs">
           <span id="">${data.tags[1]}</span>
        </span>
      </div>
              </div>
                  
              <div >
                    <button class="rounded-full w-fit h-fit bg-white absolute top-3 right-3 p-2">
                      <svg class="favbtn fill-none w-6 h-6 stroke-black stroke-2" id="" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">

          <path class="cls-1" d="M179.24,31.69h0c-20-20-52.44-20-72.44,0l-6.8,6.8-6.8-6.8c-20-20-52.44-20-72.44,0h0C.75,51.69.75,84.13,20.76,104.13l6.8,6.8-.4.4,63.58,63.58c4.9,4.9,12.84,4.92,17.77.05l64.34-63.63-.4-.4,6.8-6.8c20-20,20-52.44,0-72.44Z"/>
        </svg>
                    </button>

            </div>

          </div>
            <div class="p-4">
              <h3 id="" class="font-semibold text-sm  text-[var(--medium-grey)] pt-2">${data.date}</h3>
               
            <p id="" class=" font-bold text-xl pt-3 pb-8">${data.title}</p>
            <a href="eventpage.html?docID=${doc.id}" 
              type="button"  
              class="bg-black rounded-xl text-white text-center  mt-8 px-2 py-2 text-xs cursor-pointer focus:outline-none">
              View Details
            </a>
            </div>
          </div>
          </div>`
          const new_card = document.createElement("div");
          new_card.innerHTML = result;
          document.querySelector(".container").appendChild(new_card.firstElementChild);
          number ++;
            }
        }
});
    
}
console.log("loadcards is running");
loadcards();