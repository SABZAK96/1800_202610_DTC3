import{o as M}from"./authentication-9eOG5hMR.js";import{o as B,g as p,d as o,a as i,I,e as g,c as _,K as C,J as y,L as S,N as q,s as $}from"./firebaseConfig-DoznUf42.js";const D=document.getElementById("username-display"),b=document.getElementById("auth-btn"),E=document.querySelector(".signedinuser");B(g,async n=>{if(E&&E.classList.remove("hidden"),n){D.textContent=n.displayName||n.email||"User";const a=await p(o(i,"users",n.uid)),s=a.data();a.exists()&&s.profileImage&&(document.getElementById("profile-img").src="data:image/png;base64,"+s.profileImage),b.onclick=async()=>{try{await I(g),window.location.href="index.html"}catch{console.log("Logout error")}}}else b.onclick=()=>{window.location.href="login.html"}});function H(){const n=document.getElementById("username-display");M(a=>{if(a)document.getElementById("unsigneduser").classList.toggle("hidden"),L(a);else{location.href="index.html";return}const s=a.displayName||a.email;n&&(n.textContent=`${s}!`)})}H();let u=[];async function k(n,a,s,m){const v=document.querySelector(".favourites-container");if(a){async function r(){const e=(await p(o(i,"users",a.uid))).data();if(e.favorite_events)return e.favorite_events;{let l=[];return await $(o(i,"users",a.uid),{favorite_events:l},{merge:!0}),l}}async function h(t){await r(),(await p(o(i,"users",a.uid))).data().favorite_events.includes(s)?(t.style.fill="red",t.style.stroke="none"):(t.style.fill="black",t.style.stroke="black")}h(n),n.parentElement.addEventListener("click",function(){c(n)});async function c(t){await r();let e=!1;if((await p(o(i,"users",a.uid))).data().favorite_events.includes(s)?e=!0:e=!1,e==!1)t.style.fill="red",t.style.stroke="none",e=!0,await y(o(i,"users",a.uid),{favorite_events:S(s)});else if(e=!1,t.style.fill="black",t.style.stroke="black",await y(o(i,"users",a.uid),{favorite_events:q(s)}),m.remove(),u.splice(u.indexOf(s),1),L(a),v.querySelectorAll(".favbtn").length===0){let f='<div class="col-span-full flex flex-col items-center justify-center gap-4 py-10 w-full"><p>No favorited events yet!</p><a href="explore.html" class="bg-black h-10 px-6 rounded-full text-white text-sm flex items-center justify-center">Go Explore</a></div>';const d=document.createElement("div");d.innerHTML=f,v.appendChild(d.firstElementChild)}return t}}else n.parentElement.addEventListener("click",function(){window.location.href="login.html"})}async function L(n){const a=_(i,"Events_2026"),s=await C(a),m=await p(o(i,"users",n.uid)),v=m.exists()?m.data():{},r=v.favorite_events||[];let h=0;const c=document.querySelector(".favourites-container");if(c&&(c.innerHTML="",u=[]),s.forEach(t=>{let e=t.data(),l=t.id;if(r.includes(l)&&h<3){let w=`
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
              <p class="text-sm text-gray-500">${e.date}</p>
              <h2>${e.title}</h2>
            </div>
            <span class="bg-black h-10 w-35 px-6 rounded-full text-sm text-white flex items-center justify-center w-fit mt-4">Learn more</span>
          </div>
          </a>
        </div>`;const f=document.createElement("div");f.innerHTML=w;const d=c.appendChild(f.firstElementChild);u.push(l);const x=d.querySelector(".favbtn");k(x,g.currentUser,l,d),h++}}),r.length===0){let t='<div class="col-span-full flex flex-col items-center justify-center gap-4 py-10 w-full"><p>No favorited events yet!</p><a href="explore.html" class="bg-black h-10 px-6 rounded-full text-white text-sm flex items-center justify-center">Go Explore</a></div>';const e=document.createElement("div");e.innerHTML=t,c.appendChild(e.firstElementChild)}if((v.favorite_events||[]).length>3){let t='<div class="col-span-full flex justify-center mt-4"><button id="viewM" class="bg-black h-10 px-6 rounded-full text-sm text-white">View more</button></div>';const e=document.createElement("div");e.innerHTML=t,document.querySelector(".favourites-container").appendChild(e.firstElementChild),document.getElementById("viewM").addEventListener("click",()=>{j(n)})}}async function j(n){const a=_(i,"Events_2026"),s=await C(a),r=(await p(o(i,"users",n.uid))).data().favorite_events||[];document.getElementById("viewM").parentElement.remove();const h=document.querySelector(".favourites-container");let c=0;if(s.forEach(t=>{let e=t.data(),l=t.id;if(r.includes(l)&&!u.includes(l)&&c<3){let w=`
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
              <p class="text-sm text-gray-500">${e.date}</p>
              <h2>${e.title}</h2>
            </div>
            <span class="bg-black h-10 w-35 px-6 rounded-full text-sm text-white flex items-center justify-center w-fit mt-4">Learn more</span>
          </div>
          </a>
        </div>`;const f=document.createElement("div");f.innerHTML=w;const d=h.appendChild(f.firstElementChild);u.push(l);const x=d.querySelector(".favbtn");k(x,n,l,d),c++}}),u.length<r.length){let t='<div class="col-span-full flex justify-center mt-4"><button id="viewM" class="bg-black h-10 px-6 rounded-full text-sm text-white">View more</button></div>';const e=document.createElement("div");e.innerHTML=t,document.querySelector(".favourites-container").appendChild(e.firstElementChild),document.getElementById("viewM").addEventListener("click",()=>{j(n)})}}window.searchRedirect=function(){const n=document.getElementById("searchInput").value;n&&(window.location.href="explore.html?search="+n)};
