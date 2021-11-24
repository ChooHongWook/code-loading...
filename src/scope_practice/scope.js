let x = 'a';
let y = 'b';
function outer() {
  var x = 20;
  
  if(x === 20){
    var y= 1;
  }
  function inner() {
    let x;
    x = x + 20;
    return x;
  }
  inner();
}

outer();
let result = x;

console.log(result);
console.log(y);
