const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css",
}

// Create Server
const server = http.createServer((req, res) => {
    const uri = url.parse(req.url).pathname;
    var fileName = path.join(process.cwd(), unescape(uri));
    console.log(`Loading ${uri}`);
    var stats;

    try {
        stats = fs.lstatSync(fileName);
    } catch (err) {
        res.writeHead(404, {
            'Content-Type': 'text/plain'
        });
        res.write('404 Not Found\n');
        res.end();
        return;
    }

    if (stats.isFile()) {
        const mimeType = mimeTypes[path.extname(fileName).split('.').reverse()[0]]
        res.writeHead(200, {
            'Content-Type': mimeType
        })
        const fileStream = fs.createReadStream(fileName);
        fileStream.pipe(res);
    } else if (stats.isDirectory()) {
        res.writeHead(302, {
            'Location': 'index.html'
        })
        res.end()
    } else {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('500 Internal Error\n')
    }
});

server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}/`)
});
