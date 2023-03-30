import dataJson from "@/assets/pets.json"

// export function getRandom2Arrays() {
//   const arr = [[], []];

//   arr.forEach(v => {
//     while(v.length !== 3) {
//       const randomValue = Math.floor(Math.random() * 8);
//       if(
//         !arr[0].includes(randomValue) &&
//         !arr[1].includes(randomValue)
//       ) v.push(randomValue);
//     }
//   })

//   return arr;
// }

export function getRandomDataJson(arr) {
  const newArr = [];
  while(newArr.length !== 3) {
    const randomValue = Math.floor(Math.random() * 7);
    
    // шо это за говно
    if(!arr) {
      if(!newArr.includes(randomValue)) {
        newArr.push(randomValue);
      }
      continue;
    }
    const checkValue = !arr.includes(randomValue) && !newArr.includes(randomValue);
    if(checkValue) {
      newArr.push(randomValue);
    }
  }
  return [newArr, newArr.map(v => dataJson[v])];
}

// const r = getRandomDataJson();
// console.log(r)
// console.log(getRandomDataJson(r));