// Carousel drag to scroll

// polls the DOM every 100ms until the element matching selector exists, then fires the callback with it
function waitForElement(selector, callback) {
  const interval = setInterval(() => {
    const el = document.querySelector(selector);
    if (el) {
      clearInterval(interval);
      callback(el);
    }
  }, 100);
}

waitForElement(".carousel", (slider) => {
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
