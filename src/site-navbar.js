class SiteNavbar extends HTMLElement {
    constructor() {
        super();
        this.renderNavbar();
        this.tabeffects();
        // this.renderAuthControls();
    }

    renderNavbar() {
        this.innerHTML = `
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
        <div class="fixed bottom-0 w-full bg-gradient-to-t from-[#484856]/75 to-transparent z-50 md:z-0 md:flex">
        <div class="flex flex-row md:hidden m-5 px-3 h-20 min-w-[250px] bg-white justify-between items-center gap-2 shadow-2xl rounded-full">
            <!--Menu Item 1-->
            <a href="main.html">
            <button class="btnhomem h-15 w-15 rounded-full bg-white hover:bg-[#f4f1ea] ">
                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 200 200" class="homeiconm text-[#ccc5b6] w-8 mx-auto" fill="currentColor">
                    <path class="cls-1" d="M134.16,52.58H62.51c-18.39,0-33.3,14.91-33.3,33.3v71.64c0,18.39,14.91,33.3,33.3,33.3h18.67v-37.86c0-9.47,7.68-17.15,17.15-17.15h0c9.47,0,17.15,7.68,17.15,17.15v37.86h18.67c18.39,0,33.3-14.91,33.3-33.3v-71.64c0-18.39-14.91-33.3-33.3-33.3Z"/>
                    <path class="cls-1" d="M76.51,13.5l-57.15,50.89c-22.52,20.05-8.34,57.32,21.82,57.32h114.3c30.16,0,44.34-37.26,21.82-57.32L120.16,13.5c-12.44-11.08-31.2-11.08-43.64,0Z"/>
                </svg>
            </button>
            </a>
            <!--Menu Item 2-->
            <a href="explore.html">
            <button class="btnexplorem h-15 w-15 rounded-full bg-white hover:bg-[#f4f1ea]">
                <svg   xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 200 200" class="expoloreiconm text-[#ccc5b6] w-8 mx-auto" fill="currentColor">
                    <path class="cls-1" d="M99.61,6.19C48.02,6.19,6.19,48.02,6.19,99.62s41.83,93.43,93.43,93.43,93.43-41.83,93.43-93.43S151.21,6.19,99.61,6.19ZM151.56,53.26l-24.65,48.45c-5.53,10.86-14.35,19.69-25.21,25.21l-48.44,24.65c-3.59,1.82-7.42-2-5.59-5.59l24.65-48.45c5.53-10.86,14.35-19.69,25.21-25.21l48.44-24.65c3.59-1.82,7.42,2,5.59,5.59Z"/>
                    <circle class="cls-1" cx="99.61" cy="99.61" r="8.99"/>
                </svg>
            </button>
            </a>
            <!--Menu Item 3-->
            <a href="calendar.html">
            <button class="btncalendarm h-15 w-15 rounded-full bg-white hover:bg-[#f4f1ea]">
                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 200 200" class="calendariconm text-[#ccc5b6] w-8 mx-auto" fill="currentColor">
                    <path class="cls-1" d="M16.96,82.4v79.14c0,17.59,14.26,31.85,31.85,31.85h104.71c17.59,0,31.85-14.26,31.85-31.85v-79.14H16.96ZM68.33,164.27c0,4-3.24,7.24-7.24,7.24h-12.63c-4,0-7.24-3.24-7.24-7.24v-12.63c0-4,3.24-7.24,7.24-7.24h12.63c4,0,7.24,3.24,7.24,7.24v12.63ZM68.33,120.1c0,4-3.24,7.24-7.24,7.24h-12.63c-4,0-7.24-3.24-7.24-7.24v-12.63c0-4,3.24-7.24,7.24-7.24h12.63c4,0,7.24,3.24,7.24,7.24v12.63ZM112.87,164.27c0,4-3.24,7.24-7.24,7.24h-12.63c-4,0-7.24-3.24-7.24-7.24v-12.63c0-4,3.24-7.24,7.24-7.24h12.63c4,0,7.24,3.24,7.24,7.24v12.63ZM112.87,120.1c0,4-3.24,7.24-7.24,7.24h-12.63c-4,0-7.24-3.24-7.24-7.24v-12.63c0-4,3.24-7.24,7.24-7.24h12.63c4,0,7.24,3.24,7.24,7.24v12.63ZM157.04,164.27c0,4-3.24,7.24-7.24,7.24h-12.63c-4,0-7.24-3.24-7.24-7.24v-12.63c0-4,3.24-7.24,7.24-7.24h12.63c4,0,7.24,3.24,7.24,7.24v12.63ZM157.04,120.1c0,4-3.24,7.24-7.24,7.24h-12.63c-4,0-7.24-3.24-7.24-7.24v-12.63c0-4,3.24-7.24,7.24-7.24h12.63c4,0,7.24,3.24,7.24,7.24v12.63Z"/>
                    <path class="cls-1" d="M185.37,65.28v-8.46c0-17.59-14.26-31.85-31.85-31.85H48.81c-17.59,0-31.85,14.26-31.85,31.85v8.46h168.41Z"/>
                    <rect class="cls-1" x="47.38" y="5.19" width="20.27" height="39.09" rx="1.79" ry="1.79"/>
                    <rect class="cls-1" x="132.79" y="5.19" width="20.27" height="39.09" rx="1.79" ry="1.79"/>
                </svg>
            </button>
            </a>
            <!--Menu Item 4-->
            <a href="friends.html">
            <button class="btnfriendsm h-15 w-15 rounded-full bg-white hover:bg-[#f4f1ea]">
                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 200 200" class="friendsiconm text-[#ccc5b6] w-8 mx-auto" fill="currentColor">
                    <circle class="cls-1" cx="136.7" cy="55.58" r="30.06"/>
                    <circle class="cls-1" cx="65.72" cy="45.58" r="30.06"/>
                    <path class="cls-1" d="M65.72,193.03c7.64,0,14.92.35,21.59.35,21.01,0,35.83-3.5,35.83-32.56,0-38.27-25.71-69.3-57.42-69.3S8.3,122.55,8.3,160.83c0,29.06,14.82,32.56,35.83,32.56,6.66,0,13.95-.35,21.59-.35Z"/>
                    <path class="cls-1" d="M136.7,100c-7.52,0-14.68,1.64-21.26,4.55,14.29,14.76,23.29,35.71,23.29,58.99,0,13.29-3.03,22.73-7.62,29.58,1.84-.03,3.7-.05,5.59-.05,31.71,0,57.42,5.57,57.42-29.52s-25.71-63.54-57.42-63.54Z"/>
                </svg>
            </button>
            </a>
            <!--Menu Item 5-->
            <a id="setting" href="settings.html">
                <button id="" class="btnsettingm h-15 w-15 rounded-full bg-white hover:bg-[#f4f1ea]">
                    <svg  xmlns="http://www.w3.org/2000/svg"  data-name="Layer 1" viewBox="0 0 200 200" class="settingiconm text-[#ccc5b6] w-8 mx-auto" fill="currentColor">
                        <path class="cls-1" d="M99.61,6.19C48.02,6.19,6.19,48.02,6.19,99.61s41.83,93.43,93.43,93.43,93.43-41.83,93.43-93.43S151.21,6.19,99.61,6.19ZM99.61,35.23c17.15,0,31.06,13.9,31.06,31.06s-13.9,31.06-31.06,31.06-31.06-13.9-31.06-31.06,13.9-31.06,31.06-31.06ZM99.61,183.71c-26.64,0-50.37-12.4-65.77-31.73,13.7-21.91,38.03-36.49,65.77-36.49s52.07,14.58,65.77,36.49c-15.41,19.33-39.14,31.73-65.77,31.73Z"/>
                    </svg>
                </button>
            </a>
        </div>
        </div>
    </nav>`;

    }
tabeffects(){
        // for checking if the url contains the name of the tabs that we already have
    const params = new URL(window.location.href).pathname;
    if (params.includes("settings.html")){
        // fixing desktop navbar effect for settings, also document. doesnt work here because the navbar is inside renderNavbar and we have to user this.
        const setbtnd = this.querySelector(".btnsetting");
        const seticond = this.querySelector(".settingicon");
        const settextd = this.querySelector(".settext")
        setbtnd.classList.add("bg-white");
        seticond.classList.remove("text-white");
        seticond.classList.add("text-[#74af27]");
        settextd.classList.add("text-black");
        // fixing mobile avbar effect for settings, method is the same as desktop
        const setbtnm = this.querySelector(".btnsettingm");
        const seticonm = this.querySelector(".settingiconm");
        setbtnm.classList.remove("bg-white");
        setbtnm.classList.add("bg-[#f4f1ea]");
        seticonm.classList.remove("text-[#ccc5b6]");
        seticonm.classList.add("text-[#74af27]");
    }
    else if (params.includes("explore.html")){
        // fixing desktop navbar effect for explore, also document. doesnt work here because the navbar is inside renderNavbar and we have to user this.
        const expbtnd = this.querySelector(".btnexplored");
        const expicond = this.querySelector(".expoloreicond");
        const exptextd = this.querySelector(".exptext")
        expbtnd.classList.add("bg-white");
        exptextd.classList.add("text-black");
        expicond.classList.remove("text-white");
        expicond.classList.add("text-[#74af27]");
        // fixing mobile avbar effect for explore, method is the same as desktop
        const expbtnm = this.querySelector(".btnexplorem");
        const expiconm = this.querySelector(".expoloreiconm");
        expbtnm.classList.remove("bg-white");
        expbtnm.classList.add("bg-[#f4f1ea]");
        expiconm.classList.remove("text-[#ccc5b6]");
        expiconm.classList.add("text-[#74af27]");
    }
    else if (params.includes("calendar.html")){
        // fixing desktop navbar effect for calendar
        const calbtnd = this.querySelector(".btncalendard");
        const calicond = this.querySelector(".calendaricond");
        const caltextd = this.querySelector(".caltext")
        calbtnd.classList.add("bg-white");
        calicond.classList.remove("text-white");
        calicond.classList.add("text-[#74af27]");
        caltextd.classList.add("text-black");
        // fixing mobile navbar effect for calendar
        const calbtnm = this.querySelector(".btncalendarm");
        const caliconm = this.querySelector(".calendariconm");
        calbtnm.classList.remove("bg-white");
        calbtnm.classList.add("bg-[#f4f1ea]");
        caliconm.classList.remove("text-[#ccc5b6]");
        caliconm.classList.add("text-[#74af27]");
    }
    else if (params.includes("friends.html")){
        // fixing desktop navbar effect for friends
        const fribtnd = this.querySelector(".btnfriendsd");
        const friicond = this.querySelector(".friendsicond");
        const fritextd = this.querySelector(".friendstext")
        fribtnd.classList.add("bg-white");
        friicond.classList.remove("text-white");
        friicond.classList.add("text-[#74af27]");
        fritextd.classList.add("text-black");
        // fixing mobile navbar effect for friends
        const fribtnm = this.querySelector(".btnfriendsm");
        const friiiconm = this.querySelector(".friendsiconm");
        fribtnm.classList.remove("bg-white")
        fribtnm.classList.add("bg-[#f4f1ea]");
        friiiconm.classList.remove("text-[#ccc5b6]");
        friiiconm.classList.add("text-[#74af27]");
    }
    // this should work for both main and index
    else if (params.includes("main.html") || params.includes("index.html") ){
        // fixing desktop navbar effect for home
        const homebtnd = this.querySelector(".btnhomed");
        const homeicond = this.querySelector(".homeicond");
        const hometextd = this.querySelector(".hometext")
        homebtnd.classList.add("bg-white");
        homeicond.classList.remove("text-white");
        homeicond.classList.add("text-[#74af27]");
        hometextd.classList.remove("text-white");
        hometextd.classList.add("text-black");
        // fixing mobile navbar effect for home
        const homebtnm = this.querySelector(".btnhomem");
        const homeiconm = this.querySelector(".homeiconm");
        homebtnm.classList.remove("bg-white")
        homebtnm.classList.add("bg-[#f4f1ea]");
        homeiconm.classList.remove("text-[#ccc5b6]");
        homeiconm.classList.add("text-[#74af27]");
    }

}

}

customElements.define('site-navbar', SiteNavbar);