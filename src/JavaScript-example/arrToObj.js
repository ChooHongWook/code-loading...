let arr = [
  [
    ['firstName', 'Joe'],
    ['age', 42],
    ['gender', 'male'],
  ],
  [
    ['firstName', 'Mary'],
    ['lastName', 'Jenkins'],
    ['age', 36],
    ['gender', 'female'],
  ],
  [
    ['lastName', 'Kim'],
    ['age', 40],
    ['gender', 'female'],
  ],
];

  // TODO: 여기에 코드를 작성합니다.
  // 사람들의 정보를 담은 배열을 입력받아 객체로 만들고
  // 조건에 맞게 각 개인의 전체 이름을 요소로 갖는 배열을 리턴

  let getObjArr = arr.map(e => {
    return e.reduce((acc, cur) => { 
      let bupper = {};
      bupper[cur[0]] = cur[1]
      return {...acc, ...bupper};  // 초기값에 객체를 넣어놓고  그 객체에 배열의 0번째는 key  1번째는 value로 넣음 [cur[0]] = cur[1]
    },{})
  })

  getObjArr.sort((a, b) => {
    if(a.age > b.age) return 1;
    if(a.age === b.age) return 0;
    if(a.age < b.age) return -1;
  });


  let result = getObjArr.map(e => {
    if (e.firstName === undefined ) {
      return  e.lastName;
    } else if (e.lastName === undefined) {
      return e.firstName;
    } else {
      return e.firstName + " " + e.lastName;
    }
  })

  console.log(result)

