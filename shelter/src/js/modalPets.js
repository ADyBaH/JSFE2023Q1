import { getJsonPets } from "./jsonPets";
import { activeBackgroundForPopUp } from "./modal";

const petsBlock = document.querySelector(".main__pets__figure-block");
const petsModal = document.querySelector(".modal-box");

async function generatePetsModal(namePets) {
  const agePets = petsModal.querySelector("ul > li:nth-child(1)");
  const inoculationsPets = petsModal.querySelector("ul > li:nth-child(2)");
  const diseasesPets = petsModal.querySelector("ul > li:nth-child(3)");
  const parasitesPets = petsModal.querySelector("ul > li:nth-child(4)");
  const petsArr = await getJsonPets();
  const objectPet = petsArr.find((v) => v.name === namePets);
  petsModal.querySelector("h3").textContent = objectPet.name;

  petsModal.querySelector("h4")
    .textContent = `${objectPet.type} - ${objectPet.breed}`;

  petsModal.querySelector("p")
    .textContent = objectPet.description;

  agePets.lastElementChild.textContent = objectPet.age;
  inoculationsPets.lastElementChild.textContent = objectPet.inoculations.join(", ");
  diseasesPets.lastElementChild.textContent = objectPet.diseases.join(", ");
  parasitesPets.lastElementChild.textContent = objectPet.parasites.join(", ");
  
  petsModal.querySelector("img").src = objectPet.img;
}
export function closeModalPets() {
  petsModal.style.opacity = 0;
  setTimeout(() => {
    petsModal.classList.add("modal-box_display-none");
  }, 300);
}

async function activePetsModal(event) {
  if(
    event.target.parentNode.className === "pets__figure" ||
    event.target.parentNode.className === "main__pets__figure-block"
  ) {
    const name = event.target.parentNode.querySelector("h4").textContent;

    await generatePetsModal(name);
    petsModal.classList.remove("modal-box_display-none");
    petsModal.animate([{ opacity: 0, opacity: 1 }], { duration: 310 });
    setTimeout(() => {
      petsModal.style.opacity = 1;
    }, 300);
    activeBackgroundForPopUp();
  }
}

petsBlock.addEventListener("click", activePetsModal);