import { activateBurger } from "./burger.js";

function closeAllModal(event) {
  if(!event.target.classList.contains("bg-popup")) return;
  activateBurger();
}

document.addEventListener("click", closeAllModal);
function checkSize() {
  if (window.innerWidth < 768) return;
  if (!document.querySelector(".header").classList.contains("header_active")) return;
  activateBurger();
}

window.addEventListener("resize", checkSize)