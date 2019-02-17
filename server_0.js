const http = require('http');

const handler =  (request, response) => {

    response.writeHead(200, { 'Content-Type': 'text/plain'});
    response.write('Hello Node Server');
    response.end();
}

const server = http.createServer(handler);

server.listen(3000, () => { console.log('Node server created at port 3000') });
