export function changeCard(nodeArray, chunk, animation = true) {
  // console.log(nodeArray)
  [...nodeArray].forEach((element, index) => {
    const { img, name } = chunk[index];
    if(animation) {
      element.classList.add("pets__figure_opacity0");
      setTimeout(() => {
        element.querySelector(".pets__figure_img").src = img;
        element.querySelector(".pets__figure_title").textContent = name;
        element.classList.remove("pets__figure_opacity0")
      }, 400)
    } else {
      element.querySelector(".pets__figure_img").src = img;
      element.querySelector(".pets__figure_title").textContent = name;
    }
  });

}