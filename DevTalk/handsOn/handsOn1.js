// const nextCharForNumberString = str => {
//     const trimmed = str.trim()
//     const number = parseInt(trimmed)
//     const nextNumber = number + 1
//     return String.fromCharCode(nextNumber)
// }

// const result = nextCharForNumberString('  64  ')

// console.log(result)


//------------------------

// const nextCharForNumberString = str => {
//     return String.fromCharCode(parseInt(str.trim()) + 1)
// }

// const result = nextCharForNumberString('  64  ')

// console.log(result)

//------------------------

// const nextCharForNumberString = str => 
//     [str]
//     .map(s => s.trim())
//     .map(s => parseInt(s))
//     .map(i => i + 1)
//     .map(i => String.fromCharCode(i))

// const result = nextCharForNumberString('  64  ')

// console.log(result)

//------------------------

const Box = x => 
({
    map: f => Box(f(x)),
    fold: f => f(x),
    inspect: () => `Box(${x})`
})


const nextCharForNumberString = str => 
    Box(str)
    .map(s => s.trim())
    .map(r => new Number(r))
    .map(i => i + 1)
    .map(i => String.fromCharCode(i))
    // .inspect()
    .fold(c => c.toLowerCase())

const result = nextCharForNumberString('  64  ')

console.log(result)
// inspect 안써도 결과가 나오는 이유 물어보기
// https://egghead.io/lessons/javascript-linear-data-flow-with-container-style-types-box
// 3:30 