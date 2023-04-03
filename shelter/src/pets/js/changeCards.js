export function changeCard(nodeArray, chunk, animation = true) {
  // console.log(chunk.forEach(element => {
  //   console.log(element)
  // }))
  chunk.forEach((element, index) => {
    const { img, name } = element;
    if(animation) {
      nodeArray[index].classList.add("pets__figure_opacity0");
      setTimeout(() => {
        nodeArray[index].querySelector(".pets__figure_img").src = img;
        nodeArray[index].querySelector(".pets__figure_title").textContent = name;
        nodeArray[index].classList.remove("pets__figure_opacity0")
      }, 400)
    } else {
      nodeArray[index].querySelector(".pets__figure_img").src = img;
      nodeArray[index].querySelector(".pets__figure_title").textContent = name;
    }
  });
}

// export function changeCard(nodeArray, chunk, animation = true) {
//   // console.log(nodeArray)
//   [...nodeArray].forEach((element, index) => {
//     const { img, name } = chunk[index];
//     if(animation) {
//       element.classList.add("pets__figure_opacity0");
//       setTimeout(() => {
//         element.querySelector(".pets__figure_img").src = img;
//         element.querySelector(".pets__figure_title").textContent = name;
//         element.classList.remove("pets__figure_opacity0")
//       }, 400)
//     } else {
//       element.querySelector(".pets__figure_img").src = img;
//       element.querySelector(".pets__figure_title").textContent = name;
//     }
//   });
// }