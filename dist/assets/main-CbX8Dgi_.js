import"./site-footer-wjhKbfp3.js";import"./main_js-Bd0PfFd_.js";import{o as E,d as L,a as g,c as M,b as f,e as j}from"./firebaseConfig-DoznUf42.js";import"./authentication-9eOG5hMR.js";function Z(e,s){const l=setInterval(()=>{const o=document.querySelector(e);o&&(clearInterval(l),s(o))},100)}Z(".carousel",e=>{let s=!1,l,o;e.addEventListener("dragstart",a=>a.preventDefault()),e.addEventListener("mousedown",a=>{a.preventDefault(),s=!0,e.classList.add("cursor-grabbing"),l=a.pageX-e.offsetLeft,o=e.scrollLeft}),e.addEventListener("mouseleave",()=>{s=!1}),e.addEventListener("mouseup",()=>{s=!1,e.classList.remove("cursor-grabbing")}),e.addEventListener("mousemove",a=>{if(!s)return;a.preventDefault();const n=(a.pageX-e.offsetLeft-l)*2;e.scrollLeft=o-n})});async function D(){E(j,async e=>{if(e)try{const s=L(g,"users",e.uid),l=M(g,"Events_2026");f(s,o=>{if(!o.exists())return console.log("No such document!");const a=o.data().calendar||[];f(l,i=>{const n={};i.forEach(t=>n[t.id]=t.data());let d={};Object.entries(n).forEach(([t,c])=>{a.includes(t)&&(d[t]=c.datetime)});const m=Object.entries(d).sort((t,c)=>new Date(t[1])-new Date(c[1])),v=Object.fromEntries(m);console.log(v);const r=document.getElementById("upcomingEvents");r.innerHTML="",Object.keys(v).forEach(t=>{console.log(t);const c=n[t];console.log(c);let h=t,u=c.title,x=c.location,p=c.date,w=c.time,b=c.weekday,y=`
                <a href="eventpage.html?docID=${h}&from=main.html" class="flex bg-white rounded-4xl shadow-2xl h-50 w-150 hover:opacity-90 transition-opacity">
                <!--Image-->
                    <div class="flex rounded-l-4xl shadow-xl w-50">
                        <img src="/images/${h}.jpg" draggable="false" class="w-full rounded-l-4xl h-50 w-50 object-cover object-center">
                    </div>
                    <!--Text-->
                    <div class="flex-1 flex flex-col justify-between py-5 px-10">
                        <div>
                            <h2>${u}</h2>
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
                                <p class="text-black">${b}, ${p}, ${w}</p>
                            </div>
                            <!--Item 2-->
                            <div class="flex flex-1 items-center gap-2 mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" width="24" height="24" data-name="Layer 1" viewBox="0 0 200 200">
                                    <path class="cls-1" d="M97.01,3.7C55.25,3.7,21.39,37.55,21.39,79.31c0,66.2,75.62,112.28,75.62,112.28,0,0,75.62-46.08,75.62-112.28,0-41.76-33.85-75.62-75.62-75.62ZM97.01,109.34c-18.9,0-34.21-15.32-34.21-34.21s15.32-34.21,34.21-34.21,34.21,15.32,34.21,34.21-15.32,34.21-34.21,34.21Z"/>
                                </svg>
                                <p class="text-black">${x}</p>
                            </div>
                        </div>
                        
                    </div>
                </a>
            `;r.innerHTML+=y}),r.innerHTML+=`
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
        `})})}catch(s){console.error("Error getting user document:",s)}else console.log("No user is signed in")})}D();
