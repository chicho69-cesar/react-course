import { Markers } from './services/markers.js'

export class Sockets {
  constructor(io) {
    this.io = io
    this.markers = new Markers()

    this.socketsEvents()
  }

  socketsEvents() {
    this.io.on('connection', (socket) => {
      console.log('Client connected')

      socket.emit('active-markers', this.markers.markers)

      socket.on('add-marker', (marker) => {
        this.markers.addMarker(marker)
        socket.broadcast.emit('add-marker', marker)
      })

      socket.on('update-marker', (marker) => {
        this.markers.updateMarker(marker)
        socket.broadcast.emit('update-marker', marker)
      })

      socket.on('remove-marker', (id) => {
        this.markers.removeMarker(id)
        socket.broadcast.emit('remove-marker', id)
      })
    })
  }
}