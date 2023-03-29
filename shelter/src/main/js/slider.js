const nextButton = document.querySelector(".main__pets__arrow-next");
const prevButton = document.querySelector(".main__pets__arrow-prev");
const figureBlock = document.querySelector(".main__pets__block");
const figureSection = document.querySelector(".main__pets__figure-block");
const figureAll = document.querySelectorAll(".pets__figure");


function addCloneNode(node, number, side) {
  const reverseSide = side === "slideRight" ? "slideLeft" : "slideRight";
  for (let i = 0; i < number; i += 1) {
    const cloneNode = node.cloneNode(true);

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

function animateFlip(side) {
  const figureAll = document.querySelectorAll(".pets__figure");
  figureAll.forEach((v) => v.classList.add(`slide${side}`));
  setTimeout( () => { removeAddNode(`slide${side}`) }, 600);
}

function flipSlider(event) {
  const target = event.target;
  if (target.localName !== "span") return;
  figureBlock.removeEventListener("click", flipSlider);
  const arrowClass = "main__pets__arrow-";
  figureSection.classList.add("overflowHidden");
  if (target.classList.contains(`${arrowClass}next`)) animateFlip("Right");
  if (target.classList.contains(`${arrowClass}prev`)) animateFlip("Left");
}

figureBlock.addEventListener("click", flipSlider);
