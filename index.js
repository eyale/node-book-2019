const http = require('http');
const fs = require('fs');

const PORT = 8124;

http.createServer((req, res) => {
  let name = require('url').parse(req.url,true).query.name;
  
  switch (name) {
    case undefined:
      name = 'world';
      break;
    case 'burningbird':
      let file = 'assets/phoenix.png';
      fs.stat(file, (err,stat) => {
        if(err) {
          console.log(err);
          res.writeHead(200, {'Content/Type': 'text/plain'})
          res.end('Sorry, Burningbird is not around right now');
      } else {
        const img = fs.readFileSync(file);
        res.contentType = 'image/png';
        res.contentLength = stat.size;
        res.end(img, 'binary');
      }
    });
      break;
    default:
      res.writeHead(200, {'Content-Type': 'text/plain'})
      res.end(`Hello ${name}`);
      break;
  }
}).listen(PORT);

console.log(`SERVER RUNING ON ${PORT} PORT`);
