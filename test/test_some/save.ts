const logger = require('../../../../../helper/logger');


console.log('----------------------------------------------------------------');
await logger.error(new Error('test'));
console.log('process.exit(1)');
console.log('----------------------------------------------------------------');

//get invoice.ts

async error(err, req = {}) {
    const user = req.decoded || {};
    const now = new Date().toISOString();
    console.log('error 작동');
    await axios.post(`${logging.host}/log`, {
        name: logging.name,
        message: err.message,
        date: now,
        level: 'err',
        err: {
            date: now,
            stackTrace: err.stack,
        },
        user,
        req: formatReq(req),
        txId: req.txId,
    });