import { onAuthReady } from "./authentication.js";
import { auth } from "./firebaseConfig.js";
import { onAuthStateChanged, signOut } from "firebase/auth"
import { db } from "./firebaseConfig.js";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";

console.log("Test");

const user = auth.currentUser;
console.log(user);

async function sortEvents() {
  const ref = collection(db, "Events_2026");
  const snap = await getDocs(ref);

  snap.forEach((doc) => {
    let data = doc.data();
    let id = doc.id ;
    console.log(id);
  })
}

sortEvents();
