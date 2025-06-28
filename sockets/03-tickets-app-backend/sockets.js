import { TicketList } from './services/ticket-list.js'

export class Sockets {
  constructor(io) {
    this.io = io
    this.ticketList = new TicketList()

    this.socketEvents()
  }

  socketEvents() {
    this.io.on('connection', (socket) => {
      console.log('Client connected')

      socket.on('request-ticket', (data, callback) => {
        const newTicket = this.ticketList.createTicket()
        callback(newTicket)
      })

      socket.on('next-ticket', ({ agent, desktop }, callback) => {
        const ticket = this.ticketList.assignTicket(agent, desktop)
        callback(ticket)

        this.io.emit('last-tickets', this.ticketList.lastNumbers)
      })
    })
  }
}
