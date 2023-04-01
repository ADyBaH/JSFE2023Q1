import dataJson from "@/assets/pets.json";
import { getRandomDataJson } from "@/js/getRandomSlider.js";


// const nextButton = document.querySelector(".main__pets__arrow-next");
// const prevButton = document.querySelector(".main__pets__arrow-prev");
const figureBlock = document.querySelector(".main__pets__block");
const figureSection = document.querySelector(".main__pets__figure-block");
let numberForMassive = 0;
let counterForSlider = 0;
let cacheSide = "Start";
let cacheArr = [getRandomDataJson()];
let [randomNumbers, randomDataJson] = cacheArr[numberForMassive];

(function generatePetsCardOnStart() {
  const figureAll = document.querySelectorAll(".pets__figure");
  figureAll.forEach((v, i) => initialPetsNode(v, i))
  cacheArr.push(getRandomDataJson(randomNumbers));
  console.log(cacheArr, randomNumbers)
})();

function changeSlide(side) {
  counterForSlider += 1;
  // не показывать Егору, желательно переписать.
  if(cacheSide !== "Start" && cacheSide !== side) {
    console.log("возвращаем кэш");
    cacheSide = "Start";
    numberForMassive = 0;
    counterForSlider = 0;
  }
  if(counterForSlider === 1) {
    console.log("одно нажатие")
    cacheArr.pop();
    numberForMassive = 1;
  }
  if(counterForSlider === 2) {
    console.log("второе нажатие")
    cacheArr.shift();
    counterForSlider = 1;
  }
    cacheSide = side
    cacheArr.push(getRandomDataJson(randomNumbers));
    [randomNumbers, randomDataJson] = cacheArr[numberForMassive];
    console.log(counterForSlider, randomNumbers)
  
}

function initialPetsNode(node, number) {
  const { img, name } = randomDataJson[number];

  node.getElementsByClassName("pets__figure_img")[0].src = img;
  node.getElementsByClassName("pets__figure_title")[0].textContent = name;
}

function addCloneNode(node, number, side) {
  const reverseSide = side === "slideRight" ? "slideLeft" : "slideRight";

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
  changeSlide(side);
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
