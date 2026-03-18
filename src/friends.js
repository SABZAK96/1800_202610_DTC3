import { doc } from "firebase/firestore"


// toggle dropdown
document.getElementById("trigger").addEventListener("click", () => {
    document.getElementById("dropd").classList.toggle("hidden")
    document.getElementById("toggledown").classList.toggle("hidden")
    document.getElementById("toggleup").classList.toggle("hidden")
})