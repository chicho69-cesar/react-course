import http from 'node:http';
import path from 'node:path';
import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';

import { Sockets } from './sockets.js';

export class ServerApp {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    this.server = http.createServer(this.app);
    this.io = new Server(this.server, {
      cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true
      }
    })
  }

  middlewares() {
    this.app.use(express.static(path.join(process.cwd(), 'public')));
    this.app.use(cors({
      origin: 'http://localhost:5173',
      credentials: true
    }));
  }

  configureSockets() {
    new Sockets(this.io);
  }

  execute() {
    this.middlewares();
    this.configureSockets();

    this.server.listen(this.port, () => {
      console.log(`Server running on port: ${this.port}`);
    });
  }
}