// 원하는 자리수의 모든 2진법 구하기
function makeAllBinaryNum_n_digitNum(len) {
  let lastNum = Array(len).fill(2);
  let cntNum = Array(len).fill(0);

  while (Number(cntNum.join) <= Number(lastNum.join)) {
    // cntNum이 lastNum과 같아질때 까지 반복
    console.log(cntNum);
    console.log(typeof cntNum);
    cntNum++;
    for (let i = 0; i < cntNum.length; i++) {
      // 각자리의 숫자가 3가되면 윗자리수의 숫자를 올림
      if (cntNum[i] === 3) {
        cntNum[i] = 1;
        cntNum[i + 1] += 1;
      }
    }
    // 1 자리수 반복 확인 하고 반복하면 넘기기
  }
}

let wantLen = 2; // wantLen 은 원하는 자리수
makeAllBinaryNum_n_digitNum(wantLen)