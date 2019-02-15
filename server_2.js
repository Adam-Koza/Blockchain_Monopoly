const express     = require('express');
const bodyParser  = require("body-parser");
const server      = express();

server.use(bodyParser.json());

server.set('port', process.env.PORT || 3000);

server.get('/', (request, response) => {
    response.send('Welcome to Blockchain Monopoly');
});

server.get('/joingame', (request, response) => {
    response.send('Server list of games open to new players');
});

server.get('/scoreboard', (request, response) => {
    response.send('List of top players');
});

server.get('/error', (request, response) => {
    throw new Error("BROKEN");
});

server.get('/game/:id', (request, response) => {
    response.send(request.params.id);
});

server.post('/payload', (request, response) => {
    console.log(request.body.key);
    response.send(request.body);
});


server.listen(3000, () => { console.log('Node server created at port 3000') });

