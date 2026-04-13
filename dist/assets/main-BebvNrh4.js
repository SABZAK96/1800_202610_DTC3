import{o as j,a as p,b as m,d,s as T,e as x,c as y,g as M,u as b,f as Z,h as q,i as N,j as E}from"./firebaseConfig-BbYGTN39.js";import{o as O}from"./authentication-lA7oHY1c.js";const R=document.getElementById("username-display"),L=document.getElementById("auth-btn"),_=document.querySelector(".signedinuser");j(x,async e=>{if(_&&_.classList.remove("hidden"),e){R.textContent=e.displayName||e.email||"User";const t=await p(m(d,"users",e.uid)),n=t.data();t.exists()&&n.profileImage&&(document.getElementById("profile-img").src="data:image/png;base64,"+n.profileImage),L.onclick=async()=>{try{await T(x),window.location.href="index.html"}catch{console.log("Logout error")}}}else L.onclick=()=>{window.location.href="login.html"}});function U(){const e=document.getElementById("username-display");O(t=>{if(t)document.getElementById("unsigneduser").classList.toggle("hidden"),C(t);else{location.href="index.html";return}const n=t.displayName||t.email;e&&(e.textContent=`${n}!`)})}U();let g=[];async function k(e,t,n,r){const i=document.querySelector(".favourites-container");if(t){async function v(){const a=(await p(m(d,"users",t.uid))).data();if(a.favorite_events)return a.favorite_events;{let l=[];return await N(m(d,"users",t.uid),{favorite_events:l},{merge:!0}),l}}async function f(s){await v(),(await p(m(d,"users",t.uid))).data().favorite_events.includes(n)?(s.style.fill="red",s.style.stroke="none"):(s.style.fill="black",s.style.stroke="black")}f(e),e.parentElement.addEventListener("click",function(){u(e)});async function u(s){await v();let a=!1;if((await p(m(d,"users",t.uid))).data().favorite_events.includes(n)?a=!0:a=!1,a==!1)s.style.fill="red",s.style.stroke="none",a=!0,await b(m(d,"users",t.uid),{favorite_events:Z(n)});else if(a=!1,s.style.fill="black",s.style.stroke="black",await b(m(d,"users",t.uid),{favorite_events:q(n)}),r.remove(),g.splice(g.indexOf(n),1),C(t),i.querySelectorAll(".favbtn").length===0){let c='<div class="col-span-full flex flex-col items-center justify-center gap-4 py-10 w-full"><p>No favorited events yet!</p><a href="explore.html" class="bg-black h-10 px-6 rounded-full text-white text-sm flex items-center justify-center">Go Explore</a></div>';const h=document.createElement("div");h.innerHTML=c,i.appendChild(h.firstElementChild)}return s}}else e.parentElement.addEventListener("click",function(){window.location.href="login.html"})}async function C(e){const t=y(d,"Events_2026"),n=await M(t),r=await p(m(d,"users",e.uid)),i=r.exists()?r.data():{},v=i.favorite_events||[];let f=0;const u=document.querySelector(".favourites-container");if(u&&(u.innerHTML="",g=[]),n.forEach(s=>{let a=s.data(),l=s.id;if(v.includes(l)&&f<3){let o=`
        <div class="flex flex-col bg-white rounded-4xl shadow-2xl">
          <div class="rounded-t-4xl w-full relative">
            <div class="absolute right-3 top-3 flex justify-center items-center w-13 h-13 mb-2 rounded-full bg-white shadow-2xl z-10">
              <svg class="favbtn" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" width="24" height="24" viewBox="0 0 200 200">
                <path class="cls-1" d="M179.24,31.69h0c-20-20-52.44-20-72.44,0l-6.8,6.8-6.8-6.8c-20-20-52.44-20-72.44,0h0C.75,51.69.75,84.13,20.76,104.13l6.8,6.8-.4.4,63.58,63.58c4.9,4.9,12.84,4.92,17.77.05l64.34-63.63-.4-.4,6.8-6.8c20-20,20-52.44,0-72.44Z"/>
              </svg>
            </div>
            <img src="./images/${l}.jpg" class="w-full rounded-t-4xl h-50 object-cover object-center">
          </div>
          <a href="eventpage.html?docID=${l}&from=main.html" class="flex flex-col flex-1">
          <div class="flex flex-col flex-1 justify-between py-8 px-8">
            <div>
              <p class="text-sm text-gray-500">${a.date}</p>
              <h2>${a.title}</h2>
            </div>
            <span class="bg-black h-10 w-35 px-6 rounded-full text-sm text-white flex items-center justify-center w-fit mt-4">Learn more</span>
          </div>
          </a>
        </div>`;const c=document.createElement("div");c.innerHTML=o;const h=u.appendChild(c.firstElementChild);g.push(l);const w=h.querySelector(".favbtn");k(w,x.currentUser,l,h),f++}}),v.length===0){let s='<div class="col-span-full flex flex-col items-center justify-center gap-4 py-10 w-full"><p>No favorited events yet!</p><a href="explore.html" class="bg-black h-10 px-6 rounded-full text-white text-sm flex items-center justify-center">Go Explore</a></div>';const a=document.createElement("div");a.innerHTML=s,u.appendChild(a.firstElementChild)}if((i.favorite_events||[]).length>3){let s='<div class="col-span-full flex justify-center mt-4"><button id="viewM" class="bg-black h-10 px-6 rounded-full text-sm text-white">View more</button></div>';const a=document.createElement("div");a.innerHTML=s,document.querySelector(".favourites-container").appendChild(a.firstElementChild),document.getElementById("viewM").addEventListener("click",()=>{B(e)})}}async function B(e){const t=y(d,"Events_2026"),n=await M(t),v=(await p(m(d,"users",e.uid))).data().favorite_events||[];document.getElementById("viewM").parentElement.remove();const f=document.querySelector(".favourites-container");let u=0;if(n.forEach(s=>{let a=s.data(),l=s.id;if(v.includes(l)&&!g.includes(l)&&u<3){let o=`
        <div class="flex flex-col bg-white rounded-4xl shadow-2xl">
          <div class="rounded-t-4xl w-full relative">
            <div class="absolute right-3 top-3 flex justify-center items-center w-13 h-13 mb-2 rounded-full bg-white shadow-2xl z-10">
              <svg class="favbtn" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" width="24" height="24" viewBox="0 0 200 200">
                <path class="cls-1" d="M179.24,31.69h0c-20-20-52.44-20-72.44,0l-6.8,6.8-6.8-6.8c-20-20-52.44-20-72.44,0h0C.75,51.69.75,84.13,20.76,104.13l6.8,6.8-.4.4,63.58,63.58c4.9,4.9,12.84,4.92,17.77.05l64.34-63.63-.4-.4,6.8-6.8c20-20,20-52.44,0-72.44Z"/>
              </svg>
            </div>
            <img src="./images/${l}.jpg" class="w-full rounded-t-4xl h-50 object-cover object-center">
          </div>
          <a href="eventpage.html?docID=${l}&from=main.html" class="flex flex-col flex-1">
          <div class="flex flex-col flex-1 justify-between py-8 px-8">
            <div>
              <p class="text-sm text-gray-500">${a.date}</p>
              <h2>${a.title}</h2>
            </div>
            <span class="bg-black h-10 w-35 px-6 rounded-full text-sm text-white flex items-center justify-center w-fit mt-4">Learn more</span>
          </div>
          </a>
        </div>`;const c=document.createElement("div");c.innerHTML=o;const h=f.appendChild(c.firstElementChild);g.push(l);const w=h.querySelector(".favbtn");k(w,e,l,h),u++}}),g.length<v.length){let s='<div class="col-span-full flex justify-center mt-4"><button id="viewM" class="bg-black h-10 px-6 rounded-full text-sm text-white">View more</button></div>';const a=document.createElement("div");a.innerHTML=s,document.querySelector(".favourites-container").appendChild(a.firstElementChild),document.getElementById("viewM").addEventListener("click",()=>{B(e)})}}window.searchRedirect=function(){const e=document.getElementById("searchInput").value;e&&(window.location.href="explore.html?search="+e)};function F(e,t){const n=setInterval(()=>{const r=document.querySelector(e);r&&(clearInterval(n),t(r))},100)}F(".carousel",e=>{let t=!1,n,r;e.addEventListener("dragstart",i=>i.preventDefault()),e.addEventListener("mousedown",i=>{i.preventDefault(),t=!0,e.classList.add("cursor-grabbing"),n=i.pageX-e.offsetLeft,r=e.scrollLeft}),e.addEventListener("mouseleave",()=>{t=!1}),e.addEventListener("mouseup",()=>{t=!1,e.classList.remove("cursor-grabbing")}),e.addEventListener("mousemove",i=>{if(!t)return;i.preventDefault();const f=(i.pageX-e.offsetLeft-n)*2;e.scrollLeft=r-f})});async function X(){j(x,async e=>{if(e)try{const t=m(d,"users",e.uid),n=y(d,"Events_2026");E(t,r=>{if(!r.exists())return console.log("No such document!");const i=r.data().calendar||[];E(n,v=>{const f={};v.forEach(o=>f[o.id]=o.data());let u={};Object.entries(f).forEach(([o,c])=>{i.includes(o)&&(u[o]=c.datetime)});const s=Object.entries(u).sort((o,c)=>new Date(o[1])-new Date(c[1])),a=Object.fromEntries(s);console.log(a);const l=document.getElementById("upcomingEvents");l.innerHTML="",Object.keys(a).forEach(o=>{console.log(o);const c=f[o];console.log(c);let h=o,w=c.title,I=c.location,D=c.date,$=c.time,S=c.weekday,H=`
                <a href="eventpage.html?docID=${h}&from=main.html" class="flex bg-white rounded-4xl shadow-2xl h-50 w-150 hover:opacity-90 transition-opacity">
                <!--Image-->
                    <div class="flex rounded-l-4xl shadow-xl w-50">
                        <img src="/images/${h}.jpg" draggable="false" class="w-full rounded-l-4xl h-50 w-50 object-cover object-center">
                    </div>
                    <!--Text-->
                    <div class="flex-1 flex flex-col justify-between py-5 px-10">
                        <div>
                            <h2>${w}</h2>
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
                                <p class="text-black">${S}, ${D}, ${$}</p>
                            </div>
                            <!--Item 2-->
                            <div class="flex flex-1 items-center gap-2 mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" width="24" height="24" data-name="Layer 1" viewBox="0 0 200 200">
                                    <path class="cls-1" d="M97.01,3.7C55.25,3.7,21.39,37.55,21.39,79.31c0,66.2,75.62,112.28,75.62,112.28,0,0,75.62-46.08,75.62-112.28,0-41.76-33.85-75.62-75.62-75.62ZM97.01,109.34c-18.9,0-34.21-15.32-34.21-34.21s15.32-34.21,34.21-34.21,34.21,15.32,34.21,34.21-15.32,34.21-34.21,34.21Z"/>
                                </svg>
                                <p class="text-black">${I}</p>
                            </div>
                        </div>
                        
                    </div>
                </a>
            `;l.innerHTML+=H}),l.innerHTML+=`
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
        `})})}catch(t){console.error("Error getting user document:",t)}else console.log("No user is signed in")})}X();
