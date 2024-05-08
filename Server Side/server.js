const http = require('http');
const app = require('./app/app');

// Create Server
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);
server.listen(PORT, console.log(`Server is up and running on port ${PORT}`));
