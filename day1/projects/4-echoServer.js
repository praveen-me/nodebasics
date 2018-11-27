/* ====== Take 1   ====== */

// const http = require('http');

// http.createServer((request, response) => {
//   if (request.method === 'POST' && request.url === '/echo') {
//     let body = [];
//     request.on('data', (chunk) => {
//       body.push(chunk);
//     }).on('end', () => {
//       body = Buffer.concat(body).toString();
//       response.end(body);
//     });
//   } else {
//     response.statusCode = 404;
//     response.end();
//   }
// }).listen(8000);




/* ====== Take 2   ====== */

// Stream magic - Not for now.

const http = require('http');

http.createServer((request, response) => {
  if (request.method === 'POST' && request.url === '/echo') {0   
    request.pipe(response);
  } else {
    response.statusCode = 404;
    response.end();
  }
}).listen(8000);




/* ====== Take 3   ====== */

// Stream magic with Error handling
// const http = require('http');

// http.createServer((request, response) => {
//   request.on('error', (err) => {
//     console.error(err);
//     response.statusCode = 400;
//     response.end();
//   });
//   response.on('error', (err) => {
//     console.error(err);
//   });
//   if (request.method === 'POST' && request.url === '/echo') {
//     request.pipe(response);
//   } else {
//     response.statusCode = 404;
//     response.end();
//   }
// }).listen(8000);