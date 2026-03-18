import { onAuthReady } from "./authentication.js"; 
import { db } from "./firebaseConfig.js";
import { collection, doc,getDoc, getDocs,setDoc, updateDoc, onSnapshot, arrayRemove, arrayUnion } from "firebase/firestore";
import { auth } from "./firebaseConfig.js"; 
import { onAuthStateChanged, signOut } from "firebase/auth";
// fixing back button behaviour by adding from to links in event template cards, retrieving it and setting back href attribute to it
const params = new URL(window.location.href).searchParams;
const previousPage = params.get("from");
if (previousPage) {
    document.getElementById("backbutton").setAttribute("href", previousPage);
}

function getDocIdFromUrl() {
  const params = new URL(window.location.href).searchParams;
  const current_id = params.get("docID");
  return current_id;
}


function eventdetails(id) {
  const ref = doc(db, "Events_2026", id);
  onSnapshot(ref, (docSnap) => {
    if (docSnap.exists()) {
      console.log("exists?", docSnap.exists());
      const id = docSnap.id;
      console.log(id);
     
      document.getElementById("tag0").innerHTML = docSnap.data().tags[0];
      document.getElementById("tag1").innerHTML = docSnap.data().tags[1];
      document.getElementById("price").innerHTML = docSnap.data().price;
      document.getElementById("loc").innerText = docSnap.data().location;
      document.getElementById("addr").innerText = docSnap.data().address;
      document.getElementById("date").innerText = docSnap.data().date;
      document.getElementById("time").innerText = docSnap.data().time;
      document.getElementById("evnttitle").innerText = docSnap.data().title;
      document.getElementById("evntsum").innerText =
        docSnap.data().short_summary;
      document.getElementById("evntdescr").innerText =
        docSnap.data().description;
      document.getElementById("refundpolicy").innerText =
        docSnap.data().refund_policy;
    } else {
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
  docs.forEach((eventdoc) => {
    const data = eventdoc.data();

    let z = getDocIdFromUrl();
    const a = eventdoc.id;
    if( z == eventdoc.id && number ==0 ){
      number ++;
    const result_html = `<div class ="relative">
    <div id="evntimgpage" class=" bg-[url('./images/${eventdoc.id}.png')] rounded-2xl mb-3 bg-center bg-cover " style="height: 350px;"></div>
        <!-- fav button -->
        <div class="absolute top-4 right-4 bg-white rounded-2xl w-fit py-1 px-3"><button class="flex flex-row text-sm whitespace-nowrap justify-center items-center gap-1">
        <svg class=" favbtn w-6 h-6 fill-none stroke-black stroke-2" id="" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
          <path class="cls-1" d="M179.24,31.69h0c-20-20-52.44-20-72.44,0l-6.8,6.8-6.8-6.8c-20-20-52.44-20-72.44,0h0C.75,51.69.75,84.13,20.76,104.13l6.8,6.8-.4.4,63.58,63.58c4.9,4.9,12.84,4.92,17.77.05l64.34-63.63-.4-.4,6.8-6.8c20-20,20-52.44,0-72.44Z"/>
        </svg>Add to Favorites</button></div></div>`
        // prepand will return none, so the same logic for appending and query selecting that i used for the bottom cards will not work here
        const container = document.querySelector(".new-container");
        const single_card = document.createElement("div");
        single_card.innerHTML = result_html;
        const card = single_card.firstElementChild;
        container.prepend(card);
        const favBtn = card.querySelector(".favbtn");

    // the whole logic in other if statement for the cards at the bottom should be applied to this one
    const user = auth.currentUser;

    if (user) {
      async function check_fav_field_main(){
        const ref = await getDoc(doc(db, "users",user.uid))
        const user_data = ref.data()
        if (!user_data.favorite_events){
          let saved_events =[]
          await setDoc(doc(db,"users",user.uid), {
            favorite_events: saved_events,
          },{ merge: true })
          return saved_events
        } else {
          return user_data.favorite_events
        }
      }
        async function remember_heart_color_main(x){
          await check_fav_field_main();
          const ref = await getDoc(doc(db,"users", user.uid));
          const ref_data_event = ref.data().favorite_events;
          if (ref_data_event.includes(eventdoc.id)){
            x.style.fill = "red";
            x.style.stroke = "none";
          } else {
            x.style.fill = "black";
            x.style.stroke = "black";
          }
        }

        remember_heart_color_main(favBtn);
        favBtn.addEventListener("click", function () {
          favClick_main(favBtn);
        });

        async function favClick_main(x) {
          await check_fav_field_main();
          let favselected = false;
          const ref = await getDoc(doc(db,"users",user.uid));
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
    } else {
      favBtn.addEventListener("click", function () {
        window.location.href = "login.html";
      });
    }

    }
    else {
      if (number >0 && number < 4) {
        let result = `<div class="w-full lg:w-1/3 p-2">
          
          <div class="flex flex-col rounded-2xl  h-full shadow-md border-0 bg-white ">
            <div class="w-full relative">
              <div class="relative">
                <img class="h-48 w-full object-cover rounded-t-xl " src="./images/${eventdoc.id}.png" alt="">
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
                      <svg class="favbtn fill-black w-6 h-6 stroke-black stroke-2" id="" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">

          <path class="cls-1" d="M179.24,31.69h0c-20-20-52.44-20-72.44,0l-6.8,6.8-6.8-6.8c-20-20-52.44-20-72.44,0h0C.75,51.69.75,84.13,20.76,104.13l6.8,6.8-.4.4,63.58,63.58c4.9,4.9,12.84,4.92,17.77.05l64.34-63.63-.4-.4,6.8-6.8c20-20,20-52.44,0-72.44Z"/>
        </svg>
                    </button>

            </div>

          </div>
            <div class="p-4">
              <h3 id="" class="font-semibold text-sm  text-[var(--medium-grey)] pt-2">${data.date}</h3>
               
            <p id="" class=" font-bold text-xl pt-3 pb-8">${data.title}</p>
            <a href="eventpage.html?docID=${eventdoc.id}" 
              type="button"  
              class="bg-black rounded-xl text-white text-center  mt-8 px-2 py-2 text-xs cursor-pointer focus:outline-none">
              View Details
            </a>
            </div>
          </div>
          </div>`;

        const new_card = document.createElement("div");
        new_card.innerHTML = result;
        const each_card = document.querySelector(".container").appendChild(new_card.firstElementChild);
      // having favselected here doesnt work cause everytime i refresh the page it goes away??
      // using foreach loop attached multiple listeners to a single heart button, when ever the function worked, so at
      // the third iteration, first heart button had 3 listeners. with this method we attach one listener to each created card heart button
        const favBtn = each_card.querySelector(".favbtn");

 // favorite button should work for logged in user
    const user = auth.currentUser;

    if (user) {
      // if there is no favorite events field in the database, create one, and update it if needed
      async function check_fav_field(){
        const ref = await getDoc(doc(db, "users",user.uid))
        const user_data = ref.data()
        if (!user_data.favorite_events){
          let saved_events =[]
          // should use merge true when using setdocs to avoid deleting other data
          await setDoc(doc(db,"users",user.uid), {
            favorite_events: saved_events,
          },{ merge: true })
          return saved_events
        } else {
          return user_data.favorite_events
        }
      }
      // get the fields related to a user and check the events saved in the required field, if they are in there, it should
      // always be red as along as they are in the database
        async function remember_heart_color(x){
          // this function should be called first to get the favorite events list array
          await check_fav_field();
          const ref = await getDoc(doc(db,"users", user.uid));
          const ref_data_event = ref.data().favorite_events;
          if (ref_data_event.includes(eventdoc.id)){
            x.style.fill = "red";
            x.style.stroke = "none";

          } else {
            x.style.fill = "black";
            x.style.stroke = "black";

          }
        }

  //  load the current heart color status from firestore and then handle clicking
  // this eventlistener should be added inside if(user) because it should only work for authenticated users
        remember_heart_color(favBtn);
        favBtn.addEventListener("click", function () {
          favClick(favBtn);
        });

        async function favClick(x) {
          // check_fav_filed() should be called here before updating 
          await check_fav_field();
          let favselected = false;
          const ref = await getDoc(doc(db,"users",user.uid));
          const ref_data = ref.data();
          // check if an event (its ID) exists in the favorite events
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
            // array union is for firebase for adding sth to array
           favorite_events : arrayUnion(id_fav),
          } )
          } else {
            // updating the database if fav button is selected again

            favselected = false;
            x.style.fill = "black";
            x.style.stroke = "black";
            const id_fav = eventdoc.id;
  
            
             await updateDoc(doc(db, "users", user.uid), {
              // array remove is for firebase for removing stuff from an array
            favorite_events : arrayRemove(id_fav) ,
          } )
            
          }
          return x;
        }

    } else {
      favBtn.addEventListener("click", function () {
        window.location.href = "login.html";
      });
    }

        number++;
      }
    }
  });
}
console.log("loadcards is running");
loadcards();

// add to calendar events save into database
async function AddtoCalendar(id){
  // if user signed in do the following
    const user = auth.currentUser;
    if (user) {
      // first get the user docs
      const ref = await getDoc(doc(db, "users", user.uid));
      const ref_data = ref.data();
      // check if the calendar field exists, if not create one
      if (!ref_data.calendar){
        let new_calendar = []
        await setDoc(doc(db, "users", user.uid),{
          calendar : new_calendar,
        }, {merge : true})
    }
        await setDoc(doc(db, "users", user.uid), {
        calendar : arrayUnion(id)
      }, {merge : true})
  } else {
       // redirect the user to log in if they're not logged in already
    window.location.href ="login.html"
    }
    // add the id to the collection, if button clicked
    

  
  }


  document.querySelector(".Btncalendar").addEventListener("click",async ()=>{
    await AddtoCalendar(getDocIdFromUrl());
    // change the button text when its added to the calendar
    document.querySelector(".calendarmsgcurrent").classList.toggle("hidden")
    document.querySelector(".calendarmsg").classList.toggle("hidden")
    
  } )
  

  
  
  
