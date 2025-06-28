import { Ticket } from '../models/ticket.js'

export class TicketList {
  constructor() {
    this.lastNumber = 0
    this.pending = []
    this.assigned = []
  }

  get nextNumber() {
    // this.lastNumber++
    return ++this.lastNumber
  }

  get lastNumbers() {
    return this.assigned.slice(0, 10)
  }

  createTicket() {
    const newTicket = new Ticket(this.nextNumber)
    this.pending.push(newTicket)
    return newTicket
  }

  assignTicket(agent, desktop) {
    if (this.pending.length === 0) {
      return null
    }

    const nextTicket = this.pending.shift()

    nextTicket.agent = agent
    nextTicket.desktop = desktop

    this.assigned.unshift(nextTicket)
    
    return nextTicket
  }
}