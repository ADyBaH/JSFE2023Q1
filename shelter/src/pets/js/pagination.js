import { getRandomDataJson } from "@/js/getRandomSlider.js";
import { changeCard } from "./changeCards.js";
// main
const paginationWrapper = document.querySelector(".main__section");
// arr figure and button
const petCards = paginationWrapper.getElementsByClassName("pets__figure");
const buttonsBlock = paginationWrapper.querySelector(".pets__buttons-block");
//button
const buttonFirtsPage = buttonsBlock.firstElementChild;
const buttonPrevPage = buttonsBlock.querySelector(".button-block_arrow-prew");

const buttonNextPage = buttonsBlock.querySelector(".button-block_arrow-next");
const buttonLastPage = buttonsBlock.lastElementChild;

const currentPageButton = buttonsBlock.querySelector(".button-block_number");

const paginationArr = [];

for (let i = 0; i <= 5; i += 1) paginationArr.push(...getRandomDataJson([] , 8, true)[1]);

const paginationState = {
  chunkSize: 8,
  currentPage: 1,
};

paginationState["maxPages"] = paginationArr.length / paginationState.chunkSize;

//"logic"//
console.log(paginationArr)

//загружаем карточки на старте:
changeCard(petCards, paginationArr.slice(0, 8), false);

function getChank() {
  const start = paginationState.chunkSize * (paginationState.currentPage - 1);
  const end = start + paginationState.chunkSize;
  changeCard(petCards, paginationArr.slice(start, end))
  // console.log(start, end)

  // console.log(paginationArr.slice(start, end))
  paginationArr.slice(start, end)
}


function disableButton(...arr) {
  arr.forEach(v => v.disabled = true);
}
function checkDisableButton() {
  buttonsBlock.querySelectorAll("button").forEach(v => v.disabled = false);

  if(paginationState.currentPage === paginationState.maxPages) {
    disableButton(buttonNextPage, buttonLastPage);
  }
  if(paginationState.currentPage === 1) {
    disableButton(buttonFirtsPage, buttonPrevPage);
  }
}

function changePage(direction) {
  if(direction === "next") {
    paginationState.currentPage === paginationState.maxPages ?
      paginationState.currentPage : paginationState.currentPage++;
  }
  
  if(direction === "prev") {
    paginationState.currentPage === 1 ?
      paginationState.currentPage : paginationState.currentPage--;
  };
  checkDisableButton()
  currentPageButton.textContent = paginationState.currentPage;
  getChank()
}
function changeOnLastPage(direction) {
  console.log(1)
  if(direction === "next") {
    paginationState.currentPage = paginationState.maxPages;
  }
  if(direction === "prev") {
    paginationState.currentPage = 1;
  }
  checkDisableButton()
  currentPageButton.textContent = paginationState.currentPage;
  getChank()
}

buttonNextPage.addEventListener("click", () => changePage("next"));
buttonPrevPage.addEventListener("click", () => changePage("prev"));

buttonFirtsPage.addEventListener("click", () => changeOnLastPage("prev"))
buttonLastPage.addEventListener("click", () => changeOnLastPage("next"))
// console.log(paginationArr);
