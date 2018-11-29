// Render all pages dynamically via node server

// DONE - make a server
// handle routes 
    // - home
        // - read ./index.html from fs and then send data via response object
    // - about
    // - projects
    // - contact
    // CSS
    // Images
        // svg
        // jpeg
        // png

const http = require('http');
const fs = require('fs');
const {parse} = require('querystring');

function readFileFromSystem(url, contentType, res) {
    fs.readFile(url, (err, data) => {
        if(err) throw err;
        res.writeHeader(200, { 'Content-Type': contentType });
        res.write(data);
        res.end();
    });
}

function findContentType(ext) {
    switch(ext) {
        case 'svg':
            return 'image/svg+xml';
        case 'png':
            return 'image/png';
        default:
            return 'image/jpeg'
    }
}

const server = http.createServer((req, res) => {
    
  if(req.method === 'GET') {
    switch (req.url) {
      case '/':
        return readFileFromSystem('./index.html', 'text/html', res);
      case '/about':
        return readFileFromSystem('./about.html', 'text/html', res);
      case '/projects':
        return readFileFromSystem('./projects.html', 'text/html', res);
      case '/contact':
        return readFileFromSystem('./contact.html', 'text/html', res);
      case '/assets/main.css':
        return readFileFromSystem('./assets/main.css', 'text/css', res);
      case  String(req.url.match(/\/assets\/media\/.*/)):
        const imageStrArr = req.url.split(".");
        const imageNameExt = imageStrArr[imageStrArr.length - 1];
        return readFileFromSystem(`.${req.url}`, findContentType(imageNameExt), res);
      default:
        res.statusCode = 404;
        return res.end('Not Found');
      }
    } else if(req.method === 'POST') {
      switch(req.url) {
        case "/contact" : {
          console.log('post reqest')
          let body = '';
          req.on('data', chunk => {
            body += chunk.toString();
          })

          req.on('end', () => {
            body = parse(body);
            console.log(body);

            const userInfo = 
            `
Name = ${body.name}
Email = ${body.email}
Message = ${body.message}
            `

            fs.appendFile('user.txt', userInfo, err => {
              if(err) throw err;
              console.log("File is written");
            })
            res.end("Form Submitted");
          })
        }
      }
    }
});

server.listen(8000, () => {
    console.log('Server running at 8000');
});