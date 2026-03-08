
import {
    onAuthReady
} from "./authentication.js"

function showDashboard() {
      const nameElement = document.getElementById("name-goes-here"); // the <h1> element to display "Hello, {name}"

      // Wait for Firebase to determine the current authentication state.
      // onAuthReady() runs the callback once Firebase finishes checking the signed-in user.
      // The user's name is extracted from the Firebase Authentication object
      // You can "go to console" to check out current users. 
      onAuthReady((user) => {
          if (!user) {
              // If no user is signed in → redirect back to login page.
              location.href = "index.html";
              return;
          }

          // If a user is logged in:
          // Use their display name if available, otherwise show their email.
          const name = user.displayName || user.email;

          // Update the welcome message with their name/email.
          if (nameElement) {
              nameElement.textContent = `${name}!`;
          }
      });
}

showDashboard();

let favselected = false;

document.querySelectorAll(".favbtn").forEach(function(btn) {
    btn.addEventListener("click", function(){favClick(btn);})});

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


//Carousel
function waitForElement(selector, callback) {
  const el = document.querySelector(selector);
  if (el) {
    callback(el);
  } else {
    requestAnimationFrame(() => waitForElement(selector, callback));
  }
}

waitForElement(".carousel", (slider) => {
  
  //Side scroll carousel
document.addEventListener("DOMContentLoaded", () => {

  const slider = document.querySelector(".carousel");
  console.log(slider);

  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener("dragstart", (e) => e.preventDefault());

  slider.addEventListener("mousedown", (e) => {
    e.preventDefault();
    isDown = true;
    slider.classList.add("cursor-grabbing");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener("mouseleave", () => {
    isDown = false;
  });

  slider.addEventListener("mouseup", () => {
    isDown = false;
    slider.classList.remove("cursor-grabbing");
  });

  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;

    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
  });

});
});



//js to mark current page
function currentPage() {
    const links = document.querySelectorAll(".menuButton");
    console.log(links);
    const currentPath = window.location.pathname;
    console.log(currentPath);

    links.forEach(link => {
        console.log(link.parentElement.getAttribute("href")) 
    })

    links.forEach(link => {
        if (link.parentElement.getAttribute("href") === currentPath) {
            link.classList.add("bg-white");
            link.classList.add("shadow-2xl");
            console.log(link)
            console.log(link.querySelector("svg"))
            console.log(link.querySelector("svg").classList.remove("text-white"));
            link.querySelector("svg").classList.add("text-[var(--primary-green)]");
            link.querySelector("svg").nextElementSibling.classList.remove("text-white");
            link.querySelector("svg").nextElementSibling.classList.add("text-black");
        }
    })
}

currentPage();