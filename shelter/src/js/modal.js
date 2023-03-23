import { deactivateBurger } from "./burger.js";

export function deactivateScroll() {
  document.body.classList.toggle("noScroll");
}
function closeAllModal(event) {
  if(!event.target.classList.contains("bg-popup")) return;
  deactivateBurger();
}

document.addEventListener("click", closeAllModal);
function checkSize() {
  if (window.innerWidth < 768) return;
  if (!document.querySelector(".header").classList.contains("header_active")) return;
  deactivateBurger();
}

window.addEventListener("resize", checkSize)