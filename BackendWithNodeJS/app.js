const http = require('http');

const server = http.createServer((req, res) => {
    console.log('Parichay Negi');
})

server.listen(4000, () => {
    console.log('Parichay Negi');
  });