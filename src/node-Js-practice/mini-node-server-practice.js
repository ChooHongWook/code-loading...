// const http = require('http');

// const server = http.createServer((request, response) => {
//   // 여기서 작업이 진행됩니다!
// });

const server = http.createServer();
server.on('request', (request, response) => { // 여기서 쓰는 이벤트가 request라는 이벤트
  // 여기서 작업이 진행됩니다!
  const { method, url, headers } = request;
  const userAgent = headers['user-agent'];

  let body = [];
  request.on('error', (err) => {
    console.error(err);
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    // 여기서 헤더, 메서드, url, 바디를 가지게 되었고
    // 이 요청에 응답하는 데 필요한 어떤 일이라도 할 수 있게 되었습니다.
  });
}).listen(8080); // 이 서버를 활성화하고 8080 포트로 받습니다.


