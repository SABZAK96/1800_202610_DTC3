import { collection, query, where, getDocs } from "firebase/firestore";

const qCard = query(collection(Events_2026));
const querySnapshot = await getDocs(qCard);

querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
});

querySnapshot();



// html code for explore cards
// `
// <div class="flex flex-col lg:flex-row lg:w-1/2  w-full gap-5  bg-white rounded-xl  shadow-md  mb-4 ">
// <div class=" lg:w-1/2 w-full h-auto relative">
//   <img 
//     id="evntimglist" 
//     class="w-full h-full object-cover rounded-l-xl" 
//     src="./images/Screenshot-2022-11-19-at-11.41.58-PM.png" 
//     alt="Event"
//   >
//     <div class="flex  flex-row gap-2 pb-4 absolute bottom-0 left-1  ">
//       <span class=" bg-[var(--light-blue)] w-fit flex-nowrap text-white py-1 px-2 rounded-full text-xs">
//         <span id="evnttag">Date</span>
//       </span>

//       <span class="bg-[var(--light-pink)] flex-nowrap whitespace-nowrap w-fit text-white py-1 px-2 rounded-full text-xs">
//         <span id="evnttype">Fan Festival</span>
//       </span>
//     </div>
//   <div>
//     <button class="rounded-full w-fit h-fit bg-white absolute top-3 right-3 p-2">
//       <svg class="favbtn fill-none w-6 h-6 stroke-black stroke-2" id="" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
//         <path class="cls-1" d="M179.24,31.69h0c-20-20-52.44-20-72.44,0l-6.8,6.8-6.8-6.8c-20-20-52.44-20-72.44,0h0C.75,51.69.75,84.13,20.76,104.13l6.8,6.8-.4.4,63.58,63.58c4.9,4.9,12.84,4.92,17.77.05l64.34-63.63-.4-.4,6.8-6.8c20-20,20-52.44,0-72.44Z"/>
//       </svg>
//     </button>
//   </div>
// </div>
// <div class="p-6 lg:w-1/2 flex flex-col justify-center">
//   <div class="flex flex-col">
//     <h2 id="evnttitle" class="text-6xl font-bold text-[#445629] mb-2">Event Title</h2>
//   </div>

//   <p id="evntdesclist" class="text-gray-700  text-sm pb-4" >
//     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Harum, libero. 
//   </p>

//   <!-- tags for the event -->

//   <a href="eventpage.html" class="w-fit bg-black text-white text-sm py-1 px-3 rounded-lg hover:opacity-90 transition-opacity">
//   Go to Event
//   </a> 
// </div>
// <!-- more cards -->
// </div>

// <div class="flex flex-col lg:flex-row lg:w-1/2  w-full gap-5  bg-white rounded-xl  shadow-md  mb-4 ">
// <div class=" lg:w-1/2 w-full h-auto relative">
//   <img 
//     id="evntimglist" 
//     class="w-full h-full object-cover rounded-l-xl" 
//     src="./images/Screenshot-2022-11-19-at-11.41.58-PM.png" 
//     alt="Event"
//   >

//   <div class="flex  flex-row gap-2 pb-4 absolute bottom-0 left-1  ">
//     <span class=" bg-[var(--light-blue)] w-fit flex-nowrap text-white py-1 px-2 rounded-full text-xs">
//        <span id="evnttag">Date</span>
//     </span>

//     <span class="bg-[var(--light-pink)] flex-nowrap whitespace-nowrap w-fit text-white py-1 px-2 rounded-full text-xs">
//        <span id="evnttype">Fan Festival</span>
//     </span>
//   </div>

//   <div>
//     <button class="rounded-full w-fit h-fit bg-white absolute top-3 right-3 p-2">
//       <svg class="favbtn fill-none w-6 h-6 stroke-black stroke-2" id="" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
//         <path class="cls-1" d="M179.24,31.69h0c-20-20-52.44-20-72.44,0l-6.8,6.8-6.8-6.8c-20-20-52.44-20-72.44,0h0C.75,51.69.75,84.13,20.76,104.13l6.8,6.8-.4.4,63.58,63.58c4.9,4.9,12.84,4.92,17.77.05l64.34-63.63-.4-.4,6.8-6.8c20-20,20-52.44,0-72.44Z"/>
//       </svg>
//     </button>
//   </div>
// </div>

// <div class="p-6 lg:w-1/2 flex flex-col justify-center">
//   <div class="flex flex-col">
//     <h2 id="evnttitle" class="text-6xl font-bold text-[#445629] mb-2">Event Title</h2>
//   </div>
                             
//   <p id="evntdesclist" class="text-gray-700  text-sm pb-4" >
//     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Harum, libero. 
//   </p>

//   <!-- tags for the event -->
            
//   <a href="eventpage.html" class="w-fit bg-black text-white text-sm py-1 px-3 rounded-lg hover:opacity-90 transition-opacity">
//   Go to Event
//   </a> 
// </div>
// <!-- more cards -->
// </div>
// </div>
// `