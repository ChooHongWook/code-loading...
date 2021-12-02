// let arr1 = [0, 1, 2];
// let arr2 = [3, 4, 5];
// arr1 = [...arr1, ...arr2]; 

// console.log(arr1) // [ 0, 1, 2, 3, 4, 5 ]

//------------------------------------------------------------

// let arr1 = [0, 1, 2];
// let arr2 = [3, 4, 5];
// arr1 = [...arr1, 7, 8]; 
// spreadArr1 = (...arr1);   //SyntaxError (변수에는 1개의 값만 들어감!!)
// console.log(spreadArr1) // 0 1 2 7 8

//------------------------------------------------------------

// TODO 매개변수의 숫자를 넘는 인자들을 출력하고 싶음

// function myFun(a, b, ...manyMoreElements) {
//   console.log("a", a);
//   console.log("b", b);
//   console.log("manyMoreElements", manyMoreElements);
// }

// myFun("one", "two", "three", "four");

/** 예상  
 * a one
 * b two
 * ? three
 * ? four
*/

/** 결과
 * a one
 * b two
 * manyMoreElements [ 'three', 'four' ]
 */


//------------------------------------------------------------

 // TODO Rest문법 (객체에서의 활용)

// const {a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40}

// console.log(a)   // 10
// console.log(b)   // 20
// console.log(rest)  // { c: 30, d: 40 }

//------------------------------------------------------------

function whoAmI({nickName: nickName, fullName: {firstName: name}}){
  console.log(nickName + " is " + name);
}

let myInfo = {
  id: 42,
  nickName: "jdoe",
  fullName: {
      firstName: "John",
      lastName: "Doe"
  }
};

console.log(whoAmI(user)) 