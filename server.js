import app from './lib/app.js';
import http from 'http';

const server = http.createServer(app);

server.listen(7890);
