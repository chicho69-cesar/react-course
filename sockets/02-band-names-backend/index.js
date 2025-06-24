import 'dotenv/config';
import { ServerApp } from './server.js';

const server = new ServerApp();
server.execute();
