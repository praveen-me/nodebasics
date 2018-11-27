const http = require('http');
/** 
 * Since you included http in this script in the first line and it seems important, 
 * so you should have the curiosity to find out what it actually is and does.
 * So go ahead and google "http module nodejs"
 */

const hostname = '127.0.0.1';
const port = 3000;

// const server = http.createServer((req, res) => {                        // request handler function
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World!\n');
// });

// same thing - server object is an EventEmitter, and can be added listener to.

const server = http.createServer();
server.on('request', (request, response) => {
 // the same kind of magic happens here!
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');
    response.end('<h1>Hello World!</h1>\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


http.get('http://nodejs.org/dist/index.json', (res) => {
  console.log(res.statusCode, res.writeable, res.headers, res.data)

  // res.on('data', (chunk) => {
  //   console.log(`BODY: ${chunk}`);
  // });
});
