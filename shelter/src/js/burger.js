import { deactivateScroll } from "./modal";

const burger = document.querySelector(".header__nav_burger");
const bg = document.querySelector(".bg-popup");
const navBar = document.querySelector(".header__nav");
// const headerLogo = document.querySelector(".header__logo_h1")

function activeBackgroundForPopUp() {
  bg.classList.add("bg-popup_opacity");
  bg.classList.add("bg-popup_visible");
  deactivateScroll();
}
export function deActiveBackgroundForPopUp() {
  bg.classList.remove("bg-popup_opacity");
  setTimeout(() => {
    bg.classList.remove("bg-popup_visible");
  }, 300);
}

function activateBurger() {
  activeBackgroundForPopUp();
  burger.classList.add("burger_active");
  navBar.classList.add("burger__nav_active");
  navBar.parentNode.classList.add("header_active");
  // headerLogo.classList.add("header_active");
  
}

export function deactivateBurger() {
  deActiveBackgroundForPopUp();
  burger.classList.remove("burger_active");
  navBar.classList.remove("burger__nav_active");
  // headerLogo.classList.remove("header_active");
  navBar.parentNode.classList.remove("header_active");
  deactivateScroll();
}
function burgerToggle() {
  burger.classList.contains("burger_active")?
   deactivateBurger() : activateBurger();
}
burger.addEventListener("click", burgerToggle);

const navigation = document.querySelector(".nav__list");
function closeBurgerAfterClick(event) {
  const arr = [
    "About the shelter",
    "Our pets",
    "Help the shelter",
    "Contacts",
  ]
  if(!arr.includes(event.target.innerHTML)) return;
  deactivateBurger();
}
navigation.addEventListener("click", closeBurgerAfterClick) 
