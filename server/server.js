import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

import './services/db.js';

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION!');
  console.log(err.name, err.message);
  process.exit(1);
});

import http from 'http';
import app from './app.js';

const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port, () => {
  console.log('app running in port:', port);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION!');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
