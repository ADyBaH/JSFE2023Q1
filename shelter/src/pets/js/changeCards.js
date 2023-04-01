export function changeCard(nodeArray, chunk) {
  // console.log(nodeArray)
  [...nodeArray].forEach((element, index) => {
    const { img, name } = chunk[index];
    element.classList.add("pets__figure_opacity0");

    setTimeout(() => {
      element.querySelector(".pets__figure_img").src = img;
      element.querySelector(".pets__figure_title").textContent = name;
      element.classList.remove("pets__figure_opacity0")
    }, 400)
  });

}