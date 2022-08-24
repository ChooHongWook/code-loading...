const Either = Right || Left

const Right = x =>
({
    map: f => Right(f(x)),
    fold: (f,g)  = g(x),
    inspect: () => `Right(${x})`
})

const Left = x =>
({
    map: f => Left(f(x)),
    fold: (f,g)  = g(x),
    inspect: () => `Left(${x})`
})

// const result = Right(3).map(x => x => x + 1).map(x => x / 2)
// console.log(result)


console.log( 
    Right(3)
        .map(3)
)
// const formNullable = (x) => x != null ? Right(x) : Left(null);
const formNullable = (x) => (x !== null && x !== undefined) ? Right(x) : Left(null);
const findColor = (name) => {
    const color={
        red: '#ff0000',
        blue: '#0000ff',
        green: '#00ff00',
    };
    const foundColor = color[name];
    return color[name]
}

console.log( 
    findColor('red')
    .map((c => c.slice(1))
    .fold((e) => `error ${e}`,
          (color) => color))
)

// 보여주려는 것
// Promise
//     .then(x => ...)
//     .then(x => ...)
//     .then(x => ...)
//     .catch(..)