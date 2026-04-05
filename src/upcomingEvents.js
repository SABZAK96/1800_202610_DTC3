import { onAuthReady } from "./authentication.js";
import { auth } from "./firebaseConfig.js";
import { onAuthStateChanged, signOut } from "firebase/auth"
import { db } from "./firebaseConfig.js";
import { collection, getDoc, doc, getDocs, updateDoc, setDoc, onSnapshot } from "firebase/firestore";


async function loadUpcomingEvents() {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
      const userRef = doc(db, "users", user.uid);
      const eventsRef = collection(db, "Events_2026");

      // Listen to the user document
      onSnapshot(userRef, (userSnap) => {
        if (!userSnap.exists()) return console.log("No such document!");
        const userCalendar = userSnap.data().calendar || [];

        // Listen to events collection
        onSnapshot(eventsRef, (eventSnap) => {
          const eventMap = {};
          eventSnap.forEach((doc) => (eventMap[doc.id] = doc.data()));

          // Create sorted dictionary of ids and datetimes
          let eventsDict = {};
          Object.entries(eventMap).forEach(([eventId, data]) => {
            if (userCalendar.includes(eventId)) {
              eventsDict[eventId] = data.datetime;
            }
          });

          const sortedEntries = Object.entries(eventsDict).sort(
            (a, b) => new Date(a[1]) - new Date(b[1])
          );
          const sortedEvents = Object.fromEntries(sortedEntries);
          console.log(sortedEvents)

          // Clear calendar container before repopulating
          const upcomingEventsContainer = document.getElementById("upcomingEvents");
          upcomingEventsContainer.innerHTML = "";

          // Loop over sortedEvents
          Object.keys(sortedEvents).forEach((eventArray) => {
            console.log(eventArray)
            const data = eventMap[eventArray]
            console.log(data)
            let id = eventArray;
            let title = data.title;
            let location = data.location;
            let date = data.date;
            let time = data.time;
            let weekday = data.weekday;

            let currentEvent = `
                <a href="eventpage.html?docID=${id}&from=main.html" class="flex bg-white rounded-4xl shadow-2xl h-50 w-150 hover:opacity-90 transition-opacity">
                <!--Image-->
                    <div class="flex rounded-l-4xl shadow-xl w-50">
                        <img src="/images/${id}.png" draggable="false" class="w-full rounded-l-4xl h-50 w-50 object-cover object-center">
                    </div>
                    <!--Text-->
                    <div class="flex-1 flex flex-col justify-between py-5 px-10">
                        <div>
                            <h2>${title}</h2>
                        </div>  
                        <div class="">
                            <!--Item 1-->
                            <div class="flex flex-1 items-center gap-2 mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" width="24" height="24" data-name="Layer 1" viewBox="0 0 200 200">
                                <g>
                                    <path class="cls-1" d="M16.96,82.4v79.14c0,17.59,14.26,31.85,31.85,31.85h104.71c17.59,0,31.85-14.26,31.85-31.85v-79.14H16.96ZM68.33,164.27c0,4-3.24,7.24-7.24,7.24h-12.63c-4,0-7.24-3.24-7.24-7.24v-12.63c0-4,3.24-7.24,7.24-7.24h12.63c4,0,7.24,3.24,7.24,7.24v12.63ZM68.33,120.1c0,4-3.24,7.24-7.24,7.24h-12.63c-4,0-7.24-3.24-7.24-7.24v-12.63c0-4,3.24-7.24,7.24-7.24h12.63c4,0,7.24,3.24,7.24,7.24v12.63ZM112.87,164.27c0,4-3.24,7.24-7.24,7.24h-12.63c-4,0-7.24-3.24-7.24-7.24v-12.63c0-4,3.24-7.24,7.24-7.24h12.63c4,0,7.24,3.24,7.24,7.24v12.63ZM112.87,120.1c0,4-3.24,7.24-7.24,7.24h-12.63c-4,0-7.24-3.24-7.24-7.24v-12.63c0-4,3.24-7.24,7.24-7.24h12.63c4,0,7.24,3.24,7.24,7.24v12.63ZM157.04,164.27c0,4-3.24,7.24-7.24,7.24h-12.63c-4,0-7.24-3.24-7.24-7.24v-12.63c0-4,3.24-7.24,7.24-7.24h12.63c4,0,7.24,3.24,7.24,7.24v12.63ZM157.04,120.1c0,4-3.24,7.24-7.24,7.24h-12.63c-4,0-7.24-3.24-7.24-7.24v-12.63c0-4,3.24-7.24,7.24-7.24h12.63c4,0,7.24,3.24,7.24,7.24v12.63Z"/>
                                    <path class="cls-1" d="M185.37,65.28v-8.46c0-17.59-14.26-31.85-31.85-31.85H48.81c-17.59,0-31.85,14.26-31.85,31.85v8.46h168.41Z"/>
                                </g>
                                <rect class="cls-1" x="47.38" y="5.19" width="20.27" height="39.09" rx="1.79" ry="1.79"/>
                                <rect class="cls-1" x="132.79" y="5.19" width="20.27" height="39.09" rx="1.79" ry="1.79"/>
                                </svg>
                                <p class="text-black">${weekday}, ${date}, ${time}</p>
                            </div>
                            <!--Item 2-->
                            <div class="flex flex-1 items-center gap-2 mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" width="24" height="24" data-name="Layer 1" viewBox="0 0 200 200">
                                    <path class="cls-1" d="M97.01,3.7C55.25,3.7,21.39,37.55,21.39,79.31c0,66.2,75.62,112.28,75.62,112.28,0,0,75.62-46.08,75.62-112.28,0-41.76-33.85-75.62-75.62-75.62ZM97.01,109.34c-18.9,0-34.21-15.32-34.21-34.21s15.32-34.21,34.21-34.21,34.21,15.32,34.21,34.21-15.32,34.21-34.21,34.21Z"/>
                                </svg>
                                <p class="text-black">${location}</p>
                            </div>
                        </div>
                        
                    </div>
                </a>
            `;


            upcomingEventsContainer.innerHTML += currentEvent;

            });
        
        upcomingEventsContainer.innerHTML += `
            <a href="explore.html" class="flex bg-white rounded-4xl shadow-2xl h-50 w-150 hover:opacity-90 transition-opacity">
                <!--Image-->
                <div class="flex rounded-l-4xl shadow-xl w-50">
                    <img src="/images/plus-background.jpg" draggable="false" class="w-full rounded-l-4xl h-50 w-50 object-cover object-center">
                </div>
                <!--Text-->
                <div class="flex-1 flex flex-col justify-between py-5 px-10">
                    <div>
                        <h2>Add events to your calendar to see upcoming events</h2>
                    </div>
                </div>
            </a>
        `;
          
        });
      });
    }
      catch (error) {
        console.error("Error getting user document:", error);
      }
    } else {
      console.log("No user is signed in");
    }
  });
}

loadUpcomingEvents();