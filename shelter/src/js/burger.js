const burger = document.querySelector(".header__nav_burger");
const bg = document.querySelector(".bg-popup");
const navBar = document.querySelector(".header__nav");
const headerLogo = document.querySelector(".header__logo_h1")

function activeBackgroundForPopUp() {
  bg.classList.add("bg-popup_opacity");
  bg.classList.add("bg-popup_visible");
}
export function deActiveBackgroundForPopUp() {
  bg.classList.remove("bg-popup_opacity");
  setTimeout(() => {
    bg.classList.remove("bg-popup_visible");
  }, 300);
}

export function activateBurger() {
  deActiveBackgroundForPopUp();
  burger.classList.remove("burger_active");
  navBar.classList.remove("burger__nav_active");
  // headerLogo.classList.remove("header_active");
  navBar.parentNode.classList.remove("header_active");
}

function deactivateBurger() {
  activeBackgroundForPopUp();
  burger.classList.add("burger_active");
  navBar.classList.add("burger__nav_active");
  navBar.parentNode.classList.add("header_active");
  // headerLogo.classList.add("header_active");
}
function burgerToggle() {
  burger.classList.contains("burger_active")?
  activateBurger() : deactivateBurger();
}
burger.addEventListener("click", burgerToggle);
