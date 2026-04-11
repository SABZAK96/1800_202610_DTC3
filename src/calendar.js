import { onAuthReady } from "./authentication.js";
import { auth } from "./firebaseConfig.js";
import { onAuthStateChanged, signOut } from "firebase/auth"
import { db } from "./firebaseConfig.js";
import { collection, getDoc, doc, getDocs, updateDoc, setDoc, onSnapshot } from "firebase/firestore";
import { length } from "firebase/firestore/pipelines";

const usernameDisplay = document.getElementById("username-display");
const authBtn = document.getElementById("auth-btn");
const signedInUserSection = document.querySelector(".signedinuser");

onAuthStateChanged(auth, async (user) => {
    if (signedInUserSection) {
        signedInUserSection.classList.remove("hidden");
    }
    if (user) {
         const nameElement = document.getElementById("username-display"); 
         const name = user.displayName || user.email;
        if (nameElement) {
              nameElement.textContent = `${name}!`;
               }
        // adding profile image just like main.js
        const userSnap = await getDoc(doc(db, "users", user.uid));
        if (userSnap.exists() && userSnap.data().profileImage) {
            document.getElementById("profile-img").src = "data:image/png;base64," + userSnap.data().profileImage;
        }
        authBtn.onclick = async () => {
            try {
                await signOut(auth);
                window.location.href = "index.html";
            } catch (error) {
                console.log("Logout error");
            }
        };
    } else {
        authBtn.onclick = () => { window.location.href = "login.html"; };
    }
});


async function sortEvents() {
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

          // Show placeholder if calendar is empty
          if (Object.keys(eventsDict).length == 0) {
              console.log("No events");
              let calendarPlaceholder = document.getElementById("calendar-empty-state")
              calendarPlaceholder.classList.remove("hidden")
              
          }

          if (Object.keys(eventsDict).length > 0) {
              // Remove placeholder if calendar is not empty
              document.getElementById("calendar-empty-state").classList.add("hidden")  
          }
         

          const sortedEntries = Object.entries(eventsDict).sort(
            (a, b) => new Date(a[1]) - new Date(b[1])
          );
          const sortedEvents = Object.fromEntries(sortedEntries);

          // Group by day
          const groupedByDay = {};
          Object.entries(sortedEvents).forEach(([eventId, datetime]) => {
            const currentDay = datetime.split("T")[0];
            if (!groupedByDay[currentDay]) groupedByDay[currentDay] = [];
            groupedByDay[currentDay].push(eventId);
          });

    

          // Clear calendar container before repopulating
          const calendarContainer = document.getElementById("userCalendar");
          calendarContainer.innerHTML = "";

          // Loop over groupedByDay and populate HTML
          Object.values(groupedByDay).forEach((eventArray) => {
        
            const currentEvent = eventMap[eventArray[0]];
            let weekday = currentEvent.weekday;
            let date = currentEvent.date;

            //Opening tags
            let dayHTML = `
              <div class="mb-20">
                  <h1 style="margin-bottom: 40px;">${weekday}, ${date}</h1>       
                  <!--Outer cards container-->
                  <div class="flex gap-4">
                      <!--Left Bar-->
                      <div class="hidden md:flex rounded-full w-2 self-stretch bg-[var(--primary-green)]"></div>

                      <!--Inner cards container-->
                      <div class="w-full flex flex-col gap-6">
            `;

            eventArray.forEach((eventId) => {
              const data = eventMap[eventId];

                let title = data.title;
                let location = data.location;
                let address = data.address;
                let time = data.time;

              dayHTML += `
                <div class="flex flex-col md:flex-row gap-4 rounded-4xl bg-white shadow-2xl p-3">
                    <!--Text section-->
                    <div class="flex-2 p-2 md:p-3">
                        <div class="flex flex-col justify-between h-full">
                            <div>
                                <h2>${title}</h2>
                            </div>
                            <div>
                                <!--Time-->
                                <div class="flex flex-1 items-center gap-2 mb-2">
                                    <svg class="w-4 h-4" data-name="Time icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                                        <path d="M99.42,6.81C47.61,6.81,5.61,48.81,5.61,100.62s42,93.81,93.81,93.81,93.81-42,93.81-93.81S151.23,6.81,99.42,6.81ZM154.89,121.56h-54.89c-5.78,0-10.47-4.69-10.47-10.47,0-.08.01-.16.01-.24,0-.08-.01-.16-.01-.24V43.72c0-5.78,4.69-10.47,10.47-10.47s10.47,4.69,10.47,10.47v56.9h44.43c5.78,0,10.47,4.69,10.47,10.47s-4.69,10.47-10.47,10.47Z"/>
                                    </svg>
                                    <p class="text-sm">${time}</p>
                                </div>
                                <!--Venue-->
                                <div class="flex flex-1 items-center gap-2 mb-2">
                                    <svg class="w-4 h-4" data-name="Pin icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                                        <path d="M97.01,3.7C55.25,3.7,21.39,37.55,21.39,79.31c0,66.2,75.62,112.28,75.62,112.28,0,0,75.62-46.08,75.62-112.28,0-41.76-33.85-75.62-75.62-75.62ZM97.01,109.34c-18.9,0-34.21-15.32-34.21-34.21s15.32-34.21,34.21-34.21,34.21,15.32,34.21,34.21-15.32,34.21-34.21,34.21Z"/>
                                    </svg>
                                    <p class="text-sm">${location}</p>
                                </div>
                                <!--Address-->
                                <div class="flex flex-1 items-center gap-2 mb-2">
                                    <p class="text-sm ml-6">${address}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!--Image-->
                    <div class="flex-2 md:hidden lg:flex rounded-3xl w-full relative">
                        <img src="images/${eventId}.jpg" class="w-full rounded-3xl h-50 object-cover object-center">
                    </div> 

                    <!--Buttons-->
                    <div class="flex-1 flex flex-col gap-1 rounded-3xl w-full relative text-sm">
                        <button class="flex-1 rounded-t-3xl bg-[var(--light-grey)] hover:bg-[#d8d4da] min-h-15">Invite friends</button>
                        <button onclick="window.location.href='eventpage.html?docID=${eventId}&from=eventlist.html';" class="flex-1 bg-[var(--light-grey)] hover:bg-[#d8d4da] min-h-15">See details</button>
                        <button id="${eventId}" class="removeButton flex-1 rounded-b-3xl bg-[var(--light-grey)] hover:bg-[#d8d4da] min-h-15">Remove</button>
                    </div> 

                  </div>
              `;
            });

            dayHTML += `
              <!--Inner card container ends-->
                  </div>
                <!--Outer card container ends-->
                </div>

              </div>
              </div>
            `;
            calendarContainer.innerHTML += dayHTML;
          });
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

sortEvents();


function removeEvent(eventId) {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        
          //get current calendar
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);
          const newCalendar = userSnap.data().calendar;
          console.log(newCalendar);
          const index = newCalendar.indexOf(eventId);
          newCalendar.splice(index, 1);        

          // Update calendar with new array
          await updateDoc(doc(db, "users", user.uid), {
            calendar: newCalendar
          })
          .then(() => {
            console.log("Event removed");
          });
       
      }
      catch (error) {
        console.error("Error getting user document:", error);
      }
    }
  })
}

// Add unique event listener for each remove button
document.getElementById("userCalendar").addEventListener("click", (event) => {
  if (event.target.classList.contains("removeButton")) {
    removeEvent(event.target.id);
  }
});