import dataJson from "@/assets/pets.json";
import { getRandomDataJson } from "@/js/getRandomSlider.js";


// const nextButton = document.querySelector(".main__pets__arrow-next");
// const prevButton = document.querySelector(".main__pets__arrow-prev");
const figureBlock = document.querySelector(".main__pets__block");
const figureSection = document.querySelector(".main__pets__figure-block");
let counter = 0;
let sideNow;
const cacheArr = [getRandomDataJson()];
let [randomNumbers, randomDataJson] = cacheArr[counter];

(function generatePetsCardOnStart() {
  const figureAll = document.querySelectorAll(".pets__figure");
  figureAll.forEach((v, i) => initialPetsNode(v, i))
})();

function saveCache(side) {
  if(sideNow === undefined) {
    cacheArr.push(getRandomDataJson(randomNumbers));
    sideNow = side;
    counter = 1;
    [randomNumbers, randomDataJson] = cacheArr[counter];
    return
  } 
  if(side === sideNow) {
    cacheArr.pop();
    cacheArr.push(getRandomDataJson(randomNumbers));
    counter = 1;
    [randomNumbers, randomDataJson] = cacheArr[counter];
    return
  }
  counter = 0;
  sideNow = side;
  [randomNumbers, randomDataJson] = cacheArr[counter];
}

function initialPetsNode(node, number) {
  const { img, name } = randomDataJson[number];

  node.getElementsByClassName("pets__figure_img")[0].src = img;
  node.getElementsByClassName("pets__figure_title")[0].textContent = name;
}

function addCloneNode(node, number, side) {
  const reverseSide = side === "slideRight" ? "slideLeft" : "slideRight";
  // const arrSide = side === "slideRight" ? rightArr : lefftArr;

  for (let i = 0; i < number; i += 1) {
    const cloneNode = node.cloneNode(true);
    initialPetsNode(cloneNode, i);
    cloneNode.classList.add(`${reverseSide}Back`)
    setTimeout( () => cloneNode.classList.remove(`${reverseSide}Back`), 700 )

    figureSection.append(cloneNode);
  }

  setTimeout( () => {
    figureBlock.addEventListener("click", flipSlider);
    figureSection.classList.remove("overflowHidden");
  }, 500);
}

function removeAddNode(side) {
  const figureAll = document.querySelectorAll(".pets__figure");
  figureAll[0].classList.remove(side)
  figureAll.forEach((v) => v.remove());
  addCloneNode(figureAll[0], 3, side);
}

function swapSlide(side) {
  saveCache(side);
  const figureAll = document.querySelectorAll(".pets__figure");
  figureAll.forEach((v) => v.classList.add(`slide${side}`));
  setTimeout( () => { removeAddNode(`slide${side}`) }, 500);
}

function flipSlider(event) {
  const { target } = event;
  if (target.localName !== "span") return;
  figureBlock.removeEventListener("click", flipSlider);
  const arrowClass = "main__pets__arrow-";
  figureSection.classList.add("overflowHidden");
  if (target.classList.contains(`${arrowClass}next`)) swapSlide("Right");
  if (target.classList.contains(`${arrowClass}prev`)) swapSlide("Left");
}

figureBlock.addEventListener("click", flipSlider);
