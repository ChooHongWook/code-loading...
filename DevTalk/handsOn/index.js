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