import dateJson from "@/assets/pets.json"

export function getRandomArray() {
  const arr = [[], []];

  arr.forEach(v => {
    while(v.length !== 3) {
      const randomValue = Math.floor(Math.random() * 8);
      if(
        !arr[0].includes(randomValue) &&
        !arr[1].includes(randomValue)
      ) v.push(randomValue);
    }
  })

  return arr;
}
