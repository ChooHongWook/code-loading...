let value = 10;

function makeCounter() {
  return {
    value: 0,
    increase: function () {
      this.value++; 
    },
    decrease: function () {
      this.value--;
    },
    getValue: function () {
      return this.value;
    },
  };
}
function testThisCounter() {
  return {
    value: 0,
    increase: function () {
      value++; 
    },
    decrease: function () {
      value--;
    },
    getValue: function () {
      return value;
    },
  };
}

console.log(makeCounter())

let counter1 = makeCounter()
counter1.increase()
counter1.getValue() // 1
console.log(counter1.getValue())

let counter2 = testThisCounter()
counter2.decrease()
counter2.decrease()
counter2.getValue() // -2
console.log(counter2.getValue())

console.log(value)
