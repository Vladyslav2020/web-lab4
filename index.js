const http = require('http');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const returnStaticFile = (res, filePath) => {
    fs.readFile(filePath, function (err, data) {
        if (err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        res.writeHead(200);
        res.end(data);
    });
};

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        if (req.url === '/') {
            returnStaticFile(res, path.join(__dirname, 'src', 'index.html'));
        } else {
            returnStaticFile(res, path.join(__dirname, 'src', req.url));
        }
    }
    if (req.method === 'OPTIONS') {
        req.statusCode = 200;
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
            'Access-Control-Allow-Headers',
            'origin, content-type, accept',
        );
        res.end();
    }
});

server.listen(PORT, () => {
    console.log(`Server is started on PORT ${PORT}`);
});
