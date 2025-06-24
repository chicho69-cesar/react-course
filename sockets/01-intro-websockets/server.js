import express from 'express';
import http from 'node:http';
import path from 'node:path';
import { Server as SocketIO  } from 'socket.io';

import { Socket } from './socket.js';

export class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    this.server = http.createServer(this.app);
    this.io = new SocketIO(this.server, { /*  */ });
  }

  middlewares() {
    this.app.use(express.static(path.join(process.cwd(), 'public')));
  }

  configureSockets() {
    new Socket(this.io);
  }

  execute() {
    this.middlewares();
    this.configureSockets();

    this.server.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}