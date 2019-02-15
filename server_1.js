const http = require('http');
const url = require('url');

const handler =  (request, response) => {

    
    const path = url.parse(request.url).pathname;
    
    if (path === '/') {
        response.writeHead(200, { 'Content-Type': 'text/plain'});
        response.write('Hello Node Server');    
    } else if (path === '/about') {
        response.writeHead(200, { 'Content-Type': 'text/plain'});
        response.write('Here\'s some stuff about us');    
    } else if (path === '/contact') {
        response.writeHead(200, { 'Content-Type': 'text/plain'});
        response.write('some contact info: ### ### ####');    
    } else {
        response.writeHead(404,{'Content-Type':'text/plain'});
        response.write('Error Not Found');
    }
   
    response.end();
}

const server = http.createServer(handler);

server.listen(3000, () => { console.log('Node server created at port 3000') });
