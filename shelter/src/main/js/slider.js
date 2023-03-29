const nextButton = document.querySelector(".main__pets__arrow-next");
const prevButton = document.querySelector(".main__pets__arrow-prev");
const figureBlock = document.querySelector(".main__pets__block");
const figureSection = document.querySelector(".main__pets__figure-block");
const figureAll = document.querySelectorAll(".pets__figure");


function addCloneNode(node, number, side) {
  const reverseSide = side === "1500" ? "-1500" : "1500";
  for (let i = 0; i < number; i += 1) {
    const cloneNode = node.cloneNode(true);
    cloneNode.style.transform = `translate(${reverseSide}px)`
    setTimeout( () => cloneNode.style.transform = `translate(0px)`, 300 )
    figureSection.append(cloneNode);
  }
  setTimeout( () => { figureBlock.addEventListener("click", flipSlider) }, 500);
}

function removeAddNode(side) {
  const figureAll = document.querySelectorAll(".pets__figure");
  figureAll.forEach((v) => v.remove());
  addCloneNode(figureAll[0], 3, side);
}

function animateFlip(side) {
  const figureAll = document.querySelectorAll(".pets__figure");
  const getSide = { transform: `translate(${side}px)` };
  figureAll.forEach((v) => v.animate(getSide, { duration: 310 }));

  setTimeout( () => { removeAddNode(side) }, 300);
}

function flipSlider(event) {
  const target = event.target;
  if (target.localName !== "span") return;
  figureBlock.removeEventListener("click", flipSlider);
  const arrowClass = "main__pets__arrow-";
  if (target.classList.contains(`${arrowClass}next`)) animateFlip("1500");
  if (target.classList.contains(`${arrowClass}prev`)) animateFlip("-1500");
}

figureBlock.addEventListener("click", flipSlider);
