import { BandList } from './services/band-list.js';

export class Sockets {
  constructor(io) {
    this.io = io;
    this.bandList = new BandList();

    this.socketEvents();
  }

  socketEvents() {
    this.io.on('connection', (socket) => {
      console.log('Client connected');

      socket.emit('current-bands', this.bandList.getBands());

      socket.on('add-band', (name) => {
        this.bandList.addBand(name);
        this.io.emit('current-bands', this.bandList.getBands());
      });

      socket.on('update-band', ({ id, newName }) => {
        this.bandList.updateBand(id, newName);
        this.io.emit('current-bands', this.bandList.getBands());
      });

      socket.on('remove-band', (id) => {
        this.bandList.removeBand(id);
        this.io.emit('current-bands', this.bandList.getBands());
      });

      socket.on('vote-for-band', (id) => {
        this.bandList.increaseVotes(id);
        this.io.emit('current-bands', this.bandList.getBands());
      });
    });
  }
}