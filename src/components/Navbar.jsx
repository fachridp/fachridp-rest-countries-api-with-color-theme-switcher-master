import { useState, useRef } from "react";

// DOM Selector
const html = document.querySelector("html");
const body = document.querySelector("body");

export default function Navbar() {
 const [darkMode, setDarkMode] = useState(false);

 const toggleRef = useRef(null);

 // Toggle Dark Mode
 const toggleDarkMode = () => {
  setDarkMode(!darkMode);
 };

 // Add and Remove Dark Mode Class to HTML and Body
 if (darkMode) {
  html.classList.add("dark");
  body.classList.add("bg-very-dark-blue");
 } else {
  html.classList.remove("dark");
  body.classList.remove("bg-very-dark-blue");
 }

 return (
  <header>
   <nav className="flex justify-between px-4 py-4 shadow-md mobile-2xl:px-6 md:px-8 lg:px-12 max-wrapper dark:bg-dark-blue selection:bg-dark-blue selection:text-white dark:selection:bg-white dark:selection:text-very-dark-blue-text">
    <h1 className="font-extrabold text-very-dark-blue-text dark:text-white">Where in the world?</h1>

    {/* Dark Mode Wrapper */}
    <div className="flex items-center gap-2 font-semibold cursor-pointer text-very-dark-blue-text dark:text-white">
     <svg className="w-4 dark:fill-white" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 32 40" x="0px" y="0px">
      <path d="M27.492,18.66a10.736,10.736,0,0,1-2.187.22,11.012,11.012,0,0,1-11-11,10.674,10.674,0,0,1,.557-3.439,1,1,0,0,0-1.143-1.3A13,13,0,1,0,28.646,19.951a1,1,0,0,0-1.154-1.291ZM16.305,26.88A11,11,0,0,1,12.514,5.55,13.008,13.008,0,0,0,25.305,20.88c.271,0,.542-.008.809-.025A10.959,10.959,0,0,1,16.305,26.88Z" />
     </svg>
     <input ref={toggleRef} type="checkbox" id="toggle" className="hidden" />
     <label onClick={() => toggleDarkMode(toggleRef.current)} className="cursor-pointer dark:text-white" htmlFor="toggle">
      Dark Mode
     </label>
    </div>
   </nav>
  </header >
 )
}
