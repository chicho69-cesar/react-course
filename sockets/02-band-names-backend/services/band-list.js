import { Band } from '../models/band.js';

export class BandList {
  constructor() {
    this.bands = [
      new Band('Metallica'),
      new Band('Iron Maiden'),
      new Band('Guns N Roses'),
      new Band('Bon Jovi'),
      new Band('AC/DC')
    ]
  }

  getBands() {
    return this.bands;
  }

  getBandById(id) {
    return this.bands.find((band) => band.id === id);
  }

  addBand(name) {
    const newBand = new Band(name);
    this.bands.push(newBand);
    return this.bands;
  }

  updateBand(id, newName) {
    this.bands = this.bands.map((band) => {
      if (band.id === id) {
        band.name = newName;
      }

      return band;
    })
  }

  removeBand(id) {
    this.bands = this.bands.filter((band) => band.id !== id);
    return this.bands;
  }

  increaseVotes(id) {
    this.bands = this.bands.map((band) => {
      if (band.id === id) {
        band.votes += 1;
      }

      return band;
    })
  }
}