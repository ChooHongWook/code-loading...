function listPrimes(num) {
  // TODO: 여기에 코드를 작성합니다.
  // function isPrime(num) {
  //   for (let i = 2; i < num; i ++) {
  //     if ( num % i === 0) {
  //       return false;
  //     }
  //   }
  //   return true;
  // }
  // /*--------------------*/
  // let result = '2'
  // for(let i = 3; i <= num; i++) {
  //   if (isPrime(i) === true) {
  //     result = result + '-' + i;
  //   }
  // }
  // return result;

  let result = '2'
  for(let i = 3; i <= num; i++) {
    for (let j = 2; j < i; j ++) {
      if ( i % j === 0) {
        break;
      }
    }
    result = result + '-' + i;
  }
  return result;


}
