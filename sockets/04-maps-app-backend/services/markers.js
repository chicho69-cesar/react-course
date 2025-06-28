export class Markers {
  constructor() {
    this.markers = {}
  }

  addMarker(marker) {
    this.markers[marker.id] = marker
    return marker
  }

  removeMarker(id) {
    delete this.markers[id]
  }

  updateMarker(marker) {
    this.markers[marker.id] = marker
    return marker
  }
}
