import { deactivateBurger } from "./burger.js";
import { closeModalPets } from "./modalPets.js";

export function activeBackgroundForPopUp() {
  const bg = document.querySelector(".bg-popup");
  bg.classList.add("bg-popup_opacity");
  bg.classList.add("bg-popup_visible");
  deactivateScroll();
}

export function deactivateScroll() {
  if (!document.body.classList.contains("noScroll")) {
    document.body.classList.add("noScroll");
    return;
  }
  setTimeout(() => {
    document.body.classList.remove("noScroll");
  }, 300);
  
}
function closeAllModal(event) {
  if(
    !event.target.classList.contains("bg-popup") &&
    !event.target.classList.contains("crossButton")) return;

  deactivateBurger();
  closeModalPets();
}

document.addEventListener("click", closeAllModal);

function checkSize() {
  if (window.innerWidth < 768) return;
  if (!document.querySelector(".header").classList.contains("header_active")) return;
  deactivateBurger();
}

window.addEventListener("resize", checkSize)