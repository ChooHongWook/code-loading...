// 소수인지 확인하는 계산기

let isprimeNum = e => {
  if (e % 2 === 0) return false;
  let squareRoot_E = Math.floor(Math.sqrt(e));
  for (let i = 3; i <= squareRoot_E; i++) {
    if (e % i === 0) return false;
  }
  return true;
} 

console.log(isprimeNum(8779)) 

