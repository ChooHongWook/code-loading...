// let age = 27;
// let name = 'jin';
// let height = 179;

// function outerFn() {
//   let age = 24;
//   name = 'jimin';
//   let height = 178;

// }

// outerFn();

// console.log(name)

//-------------------------------------------------------

// let x = 11;

// function get () { return x; }
// function set (value) { let x = value; }

// set(10);
// let result = get(20);
// console.log(result) //11

//-------------------------------------------------------

// let x = 30;

// function get () { return x; }
// function set (value) { x = value; }

// set(10);
// let result = get(20);

//-------------------------------------------------------

// let x = 10;

// function outer () {
//   let x = 20;

//   function inner () {
//     x = x + 10;
//     return x;
//   }
//   inner();
// }

// outer();
// let result = x;
// console.log(result)

//-------------------------------------------------------

let add = function(x) {
  let sum = function(y) {
    return x + y;
  }
  return sum;
}

let foo = add(1);
foo(3);
let total = foo(6);
console.log(total)