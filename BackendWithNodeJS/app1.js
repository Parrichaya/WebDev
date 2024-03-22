const http = require('http');
const routes = require('./routes.js')

console.log(routes.someText);
const server = http.createServer(routes);

server.listen(4000, () => {
    console.log('Listening...');
  });