const express = require('express');
const http    = require('http');
const app     = express();

app.use('/', express.static('./src/public'));

const httpServer = http.createServer(app);
httpServer.listen(3000, () => console.log(`HTTP listening on port 3000`));