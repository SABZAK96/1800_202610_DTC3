(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&e(a)}).observe(document,{childList:!0,subtree:!0});function r(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function e(t){if(t.ep)return;t.ep=!0;const s=r(t);fetch(t.href,s)}})();class o extends HTMLElement{constructor(){super(),this.renderNavbar()}renderNavbar(){this.innerHTML=`
        <nav>
        <!--Desktop-->
        <!--Outer Container-->
        <div class="hidden md:flex md:flex-col fixed left-0 justify-between w-50 h-screen px-7 pt-4 pb-10">
            <!--Top Part-->
            <div class="flex flex-col gap-4">
                <img src="images/extra-time-logo-white.svg" class="w-30 mb-10 mt-5">
                <!--Menu Item 1-->
                <a href="/main.html">
                <button id="homeButton" class="btnhomed menuButton h-13 w-full px-4 pt-1 rounded-full hover:bg-[#aaa9bc]">
                    <div class="flex flex-1 items-center gap-2 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" id="homeIcon" data-name="homeIcon" viewBox="0 0 200 200" class="homeicond text-white w-6 pr-1" fill="currentColor">
                            <path class="cls-1" d="M134.16,52.58H62.51c-18.39,0-33.3,14.91-33.3,33.3v71.64c0,18.39,14.91,33.3,33.3,33.3h18.67v-37.86c0-9.47,7.68-17.15,17.15-17.15h0c9.47,0,17.15,7.68,17.15,17.15v37.86h18.67c18.39,0,33.3-14.91,33.3-33.3v-71.64c0-18.39-14.91-33.3-33.3-33.3Z"/>
                            <path class="cls-1" d="M76.51,13.5l-57.15,50.89c-22.52,20.05-8.34,57.32,21.82,57.32h114.3c30.16,0,44.34-37.26,21.82-57.32L120.16,13.5c-12.44-11.08-31.2-11.08-43.64,0Z"/>
                        </svg>
                        <p class="hometext text-white">Home</p>
                    </div>
                </button>
                </a>
                <!--Menu Item 2-->
                <a href="/explore.html">
                <button id="exploreButton" class="btnexplored menuButton h-13 w-full px-4 pt-1 rounded-full hover:bg-[#aaa9bc] text-white ">
                    <div class="flex flex-1 items-center gap-2 mb-2">
                        <svg  xmlns="http://www.w3.org/2000/svg" id="exploreIcon" data-name="Explore Icon" viewBox="0 0 200 200" class="text-white expoloreicond w-6 pr-1" fill="currentColor">
                            <path class="cls-1" d="M99.61,6.19C48.02,6.19,6.19,48.02,6.19,99.62s41.83,93.43,93.43,93.43,93.43-41.83,93.43-93.43S151.21,6.19,99.61,6.19ZM151.56,53.26l-24.65,48.45c-5.53,10.86-14.35,19.69-25.21,25.21l-48.44,24.65c-3.59,1.82-7.42-2-5.59-5.59l24.65-48.45c5.53-10.86,14.35-19.69,25.21-25.21l48.44-24.65c3.59-1.82,7.42,2,5.59,5.59Z"/>
                            <circle class="cls-1" cx="99.61" cy="99.61" r="8.99"/>
                        </svg>
                        <p class="exptext">Explore</p>
                    </div>
                </button>
                </a>
                <!--Menu Item 3-->
                <a href="/calendar.html">
                <button id="calendarButton" class="btncalendard menuButton h-13 w-full px-4 pt-1 rounded-full hover:bg-[#aaa9bc] text-white">
                    <div class="flex flex-1 items-center gap-2 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" id="calendarIcon" data-name="Calendar Icon" viewBox="0 0 200 200" class="calendaricond text-white w-6 pr-1" fill="currentColor">
                            <path class="cls-1" d="M16.96,82.4v79.14c0,17.59,14.26,31.85,31.85,31.85h104.71c17.59,0,31.85-14.26,31.85-31.85v-79.14H16.96ZM68.33,164.27c0,4-3.24,7.24-7.24,7.24h-12.63c-4,0-7.24-3.24-7.24-7.24v-12.63c0-4,3.24-7.24,7.24-7.24h12.63c4,0,7.24,3.24,7.24,7.24v12.63ZM68.33,120.1c0,4-3.24,7.24-7.24,7.24h-12.63c-4,0-7.24-3.24-7.24-7.24v-12.63c0-4,3.24-7.24,7.24-7.24h12.63c4,0,7.24,3.24,7.24,7.24v12.63ZM112.87,164.27c0,4-3.24,7.24-7.24,7.24h-12.63c-4,0-7.24-3.24-7.24-7.24v-12.63c0-4,3.24-7.24,7.24-7.24h12.63c4,0,7.24,3.24,7.24,7.24v12.63ZM112.87,120.1c0,4-3.24,7.24-7.24,7.24h-12.63c-4,0-7.24-3.24-7.24-7.24v-12.63c0-4,3.24-7.24,7.24-7.24h12.63c4,0,7.24,3.24,7.24,7.24v12.63ZM157.04,164.27c0,4-3.24,7.24-7.24,7.24h-12.63c-4,0-7.24-3.24-7.24-7.24v-12.63c0-4,3.24-7.24,7.24-7.24h12.63c4,0,7.24,3.24,7.24,7.24v12.63ZM157.04,120.1c0,4-3.24,7.24-7.24,7.24h-12.63c-4,0-7.24-3.24-7.24-7.24v-12.63c0-4,3.24-7.24,7.24-7.24h12.63c4,0,7.24,3.24,7.24,7.24v12.63Z"/>
                            <path class="cls-1" d="M185.37,65.28v-8.46c0-17.59-14.26-31.85-31.85-31.85H48.81c-17.59,0-31.85,14.26-31.85,31.85v8.46h168.41Z"/>
                            <rect class="cls-1" x="47.38" y="5.19" width="20.27" height="39.09" rx="1.79" ry="1.79"/>
                            <rect class="cls-1" x="132.79" y="5.19" width="20.27" height="39.09" rx="1.79" ry="1.79"/>
                        </svg>
                        <p class="caltext">Calendar</p>
                    </div>
                </button>
                </a>
                <!--Menu Item 4-->
                <a href="/friends.html">
                <button id="friendsButton" class="btnfriendsd menuButton h-13 w-full px-4 pt-1 rounded-full hover:bg-[#aaa9bc] text-white">
                    <div class="flex flex-1 items-center gap-2 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" id="friendsIcon" data-name="Friends Icon" viewBox="0 0 200 200" class="friendsicond text-white w-6 pr-1" fill="currentColor">
                            <circle class="cls-1" cx="136.7" cy="55.58" r="30.06"/>
                            <circle class="cls-1" cx="65.72" cy="45.58" r="30.06"/>
                            <path class="cls-1" d="M65.72,193.03c7.64,0,14.92.35,21.59.35,21.01,0,35.83-3.5,35.83-32.56,0-38.27-25.71-69.3-57.42-69.3S8.3,122.55,8.3,160.83c0,29.06,14.82,32.56,35.83,32.56,6.66,0,13.95-.35,21.59-.35Z"/>
                            <path class="cls-1" d="M136.7,100c-7.52,0-14.68,1.64-21.26,4.55,14.29,14.76,23.29,35.71,23.29,58.99,0,13.29-3.03,22.73-7.62,29.58,1.84-.03,3.7-.05,5.59-.05,31.71,0,57.42,5.57,57.42-29.52s-25.71-63.54-57.42-63.54Z"/>
                        </svg>
                        <p class="friendstext">Friends</p>
                    </div>
                </button>
                </a>
            </div>
            
            <!--Bottom part-->
            <div>
                <!--Menu Item 5-->
                <a href="/settings.html">
                <button  class="btnsetting menuButton h-13 w-full px-4 pt-1 rounded-full hover:bg-[#aaa9bc] text-white">
                    <div class="flex flex-1 items-center gap-2 mb-2">
                        <svg  xmlns="http://www.w3.org/2000/svg" id="settingsIcon" data-name="Settings Icon" viewBox="0 0 200 200" class="text-white settingicon w-6" fill="currentColor">
                            <path class="cls-1" d="M99.61,6.19C48.02,6.19,6.19,48.02,6.19,99.61s41.83,93.43,93.43,93.43,93.43-41.83,93.43-93.43S151.21,6.19,99.61,6.19ZM99.61,35.23c17.15,0,31.06,13.9,31.06,31.06s-13.9,31.06-31.06,31.06-31.06-13.9-31.06-31.06,13.9-31.06,31.06-31.06ZM99.61,183.71c-26.64,0-50.37-12.4-65.77-31.73,13.7-21.91,38.03-36.49,65.77-36.49s52.07,14.58,65.77,36.49c-15.41,19.33-39.14,31.73-65.77,31.73Z"/>
                        </svg>
                        <p class="settext">Settings</p>
                    </div>
                </button>
                </a>
            </div>

        </div>

        <!--Mobile-->
        <div class="fixed px-[1rem] bottom-0 w-full bg-gradient-to-t from-[#484856]/75 to-transparent z-50 md:z-0 md:flex">
        <div class="flex flex-row md:hidden mx-auto mb-5 px-3 h-[5rem] w-full bg-white justify-between items-center gap-2 shadow-2xl rounded-full">
            <!--Menu Item 1-->
            <a href="/main.html">
            <button class="menuButtonMobile btnhomem h-15 w-15 rounded-full bg-white hover:bg-[#f4f1ea] ">
                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 200 200" class="homeiconm text-[#ccc5b6] w-8 mx-auto" fill="currentColor">
                    <path class="cls-1" d="M134.16,52.58H62.51c-18.39,0-33.3,14.91-33.3,33.3v71.64c0,18.39,14.91,33.3,33.3,33.3h18.67v-37.86c0-9.47,7.68-17.15,17.15-17.15h0c9.47,0,17.15,7.68,17.15,17.15v37.86h18.67c18.39,0,33.3-14.91,33.3-33.3v-71.64c0-18.39-14.91-33.3-33.3-33.3Z"/>
                    <path class="cls-1" d="M76.51,13.5l-57.15,50.89c-22.52,20.05-8.34,57.32,21.82,57.32h114.3c30.16,0,44.34-37.26,21.82-57.32L120.16,13.5c-12.44-11.08-31.2-11.08-43.64,0Z"/>
                </svg>
            </button>
            </a>
            <!--Menu Item 2-->
            <a href="/explore.html">
            <button class="menuButtonMobile btnexplorem h-15 w-15 rounded-full bg-white hover:bg-[#f4f1ea]">
                <svg   xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 200 200" class="expoloreiconm text-[#ccc5b6] w-8 mx-auto" fill="currentColor">
                    <path class="cls-1" d="M99.61,6.19C48.02,6.19,6.19,48.02,6.19,99.62s41.83,93.43,93.43,93.43,93.43-41.83,93.43-93.43S151.21,6.19,99.61,6.19ZM151.56,53.26l-24.65,48.45c-5.53,10.86-14.35,19.69-25.21,25.21l-48.44,24.65c-3.59,1.82-7.42-2-5.59-5.59l24.65-48.45c5.53-10.86,14.35-19.69,25.21-25.21l48.44-24.65c3.59-1.82,7.42,2,5.59,5.59Z"/>
                    <circle class="cls-1" cx="99.61" cy="99.61" r="8.99"/>
                </svg>
            </button>
            </a>
            <!--Menu Item 3-->
            <a href="/calendar.html">
            <button class="menuButtonMobile btncalendarm h-15 w-15 rounded-full bg-white hover:bg-[#f4f1ea]">
                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 200 200" class="calendariconm text-[#ccc5b6] w-8 mx-auto" fill="currentColor">
                    <path class="cls-1" d="M16.96,82.4v79.14c0,17.59,14.26,31.85,31.85,31.85h104.71c17.59,0,31.85-14.26,31.85-31.85v-79.14H16.96ZM68.33,164.27c0,4-3.24,7.24-7.24,7.24h-12.63c-4,0-7.24-3.24-7.24-7.24v-12.63c0-4,3.24-7.24,7.24-7.24h12.63c4,0,7.24,3.24,7.24,7.24v12.63ZM68.33,120.1c0,4-3.24,7.24-7.24,7.24h-12.63c-4,0-7.24-3.24-7.24-7.24v-12.63c0-4,3.24-7.24,7.24-7.24h12.63c4,0,7.24,3.24,7.24,7.24v12.63ZM112.87,164.27c0,4-3.24,7.24-7.24,7.24h-12.63c-4,0-7.24-3.24-7.24-7.24v-12.63c0-4,3.24-7.24,7.24-7.24h12.63c4,0,7.24,3.24,7.24,7.24v12.63ZM112.87,120.1c0,4-3.24,7.24-7.24,7.24h-12.63c-4,0-7.24-3.24-7.24-7.24v-12.63c0-4,3.24-7.24,7.24-7.24h12.63c4,0,7.24,3.24,7.24,7.24v12.63ZM157.04,164.27c0,4-3.24,7.24-7.24,7.24h-12.63c-4,0-7.24-3.24-7.24-7.24v-12.63c0-4,3.24-7.24,7.24-7.24h12.63c4,0,7.24,3.24,7.24,7.24v12.63ZM157.04,120.1c0,4-3.24,7.24-7.24,7.24h-12.63c-4,0-7.24-3.24-7.24-7.24v-12.63c0-4,3.24-7.24,7.24-7.24h12.63c4,0,7.24,3.24,7.24,7.24v12.63Z"/>
                    <path class="cls-1" d="M185.37,65.28v-8.46c0-17.59-14.26-31.85-31.85-31.85H48.81c-17.59,0-31.85,14.26-31.85,31.85v8.46h168.41Z"/>
                    <rect class="cls-1" x="47.38" y="5.19" width="20.27" height="39.09" rx="1.79" ry="1.79"/>
                    <rect class="cls-1" x="132.79" y="5.19" width="20.27" height="39.09" rx="1.79" ry="1.79"/>
                </svg>
            </button>
            </a>
            <!--Menu Item 4-->
            <a href="/friends.html">
            <button class="menuButtonMobile btnfriendsm h-15 w-15 rounded-full bg-white hover:bg-[#f4f1ea]">
                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 200 200" class="friendsiconm text-[#ccc5b6] w-8 mx-auto" fill="currentColor">
                    <circle class="cls-1" cx="136.7" cy="55.58" r="30.06"/>
                    <circle class="cls-1" cx="65.72" cy="45.58" r="30.06"/>
                    <path class="cls-1" d="M65.72,193.03c7.64,0,14.92.35,21.59.35,21.01,0,35.83-3.5,35.83-32.56,0-38.27-25.71-69.3-57.42-69.3S8.3,122.55,8.3,160.83c0,29.06,14.82,32.56,35.83,32.56,6.66,0,13.95-.35,21.59-.35Z"/>
                    <path class="cls-1" d="M136.7,100c-7.52,0-14.68,1.64-21.26,4.55,14.29,14.76,23.29,35.71,23.29,58.99,0,13.29-3.03,22.73-7.62,29.58,1.84-.03,3.7-.05,5.59-.05,31.71,0,57.42,5.57,57.42-29.52s-25.71-63.54-57.42-63.54Z"/>
                </svg>
            </button>
            </a>
            <!--Menu Item 5-->
            <a id="setting" href="/settings.html">
                <button id="" class="menuButtonMobile btnsettingm h-15 w-15 rounded-full bg-white hover:bg-[#f4f1ea]">
                    <svg  xmlns="http://www.w3.org/2000/svg"  data-name="Layer 1" viewBox="0 0 200 200" class="settingiconm text-[#ccc5b6] w-8 mx-auto" fill="currentColor">
                        <path class="cls-1" d="M99.61,6.19C48.02,6.19,6.19,48.02,6.19,99.61s41.83,93.43,93.43,93.43,93.43-41.83,93.43-93.43S151.21,6.19,99.61,6.19ZM99.61,35.23c17.15,0,31.06,13.9,31.06,31.06s-13.9,31.06-31.06,31.06-31.06-13.9-31.06-31.06,13.9-31.06,31.06-31.06ZM99.61,183.71c-26.64,0-50.37-12.4-65.77-31.73,13.7-21.91,38.03-36.49,65.77-36.49s52.07,14.58,65.77,36.49c-15.41,19.33-39.14,31.73-65.77,31.73Z"/>
                    </svg>
                </button>
            </a>
        </div>
        </div>
    </nav>`}}customElements.define("site-navbar",o);function n(){const l=document.querySelectorAll(".menuButton"),c=window.location.href,r=c.endsWith("/index.html")||c.endsWith("/main.html");l.forEach(e=>{const t=e.parentElement.getAttribute("href");(r&&(t==="/index.html"||t==="/main.html")||c.endsWith(t)||c.includes(t.slice(1)))&&(e.classList.add("bg-white","shadow-2xl"),e.classList.remove("hover:bg-[#aaa9bc]"),e.querySelector("svg").classList.remove("text-white"),e.querySelector("svg").classList.add("text-[var(--primary-green)]"),e.querySelector("svg").nextElementSibling.classList.remove("text-white"),e.querySelector("svg").nextElementSibling.classList.add("text-black"))})}function i(){const l=document.querySelectorAll(".menuButtonMobile"),c=window.location.href,r=c.endsWith("/index.html")||c.endsWith("/main.html");l.forEach(e=>{const t=e.parentElement.getAttribute("href");if(r&&(t==="/index.html"||t==="/main.html")||c.endsWith(t))e.classList.add("bg-[var(--light-grey)]"),e.classList.remove("hover:bg-[#f4f1ea]"),e.querySelector("svg").classList.remove("text-white"),e.querySelector("svg").classList.add("text-[var(--primary-green)]");else if(c.includes(t.slice(1))){e.classList.add("bg-white","shadow-2xl"),e.classList.remove("hover:bg-[#f4f1ea]"),e.querySelector("svg").classList.remove("text-white"),e.querySelector("svg").classList.add("text-[var(--primary-green)]");const s=e.querySelector("svg").nextElementSibling;s&&(s.classList.remove("text-white"),s.classList.add("text-black"))}})}n();i();class d extends HTMLElement{constructor(){super(),this.renderFooter()}renderNavbar(){this.innerHTML=""}}customElements.define("site-footer",d);
