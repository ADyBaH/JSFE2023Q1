import dataJson from "@/assets/pets.json"

export async function getJsonPets() {
  // const fetchPets = await fetch("../assets/pets.json");
  // const cashJson = await fetchPets.json();

  return dataJson;
}
