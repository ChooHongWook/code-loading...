const Right = x =>
({
    // chain: (f) =>
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

const formNullable = (x) => (x !== null && x !== undefined) ? Right(x) : Left(null);

// const getPort 

const fs = require('fs')

const getPort = () => {
    try {
        const rawcCnfig = fs.readFileSync('config.json');
        const config = JSON.parse(rawConfig);
        return config.port;

    } catch(e) {
        console.log(e)
    }
}


// 선언적 const , const
// 장점 : 엑셀, rs.js()
//

// 절차적. map, map, map (문제점, 에러발생시 파일 종료(크래수됨))