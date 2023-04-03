import dataJson from "@/assets/pets.json"

export function getRandomDataJson(arr = [], number = 3, getJsonArray = true) {
  const newArr = [];
  while(newArr.length - 1 !== number - 1) {
    const randomValue = Math.floor(Math.random() * 8);

    const checkValue = !arr.includes(randomValue) && !newArr.includes(randomValue);
    if(checkValue) {
      newArr.push(randomValue);
    }
  }
  if(getJsonArray) return [newArr, newArr.map(v => dataJson[v])];
  return newArr
}
