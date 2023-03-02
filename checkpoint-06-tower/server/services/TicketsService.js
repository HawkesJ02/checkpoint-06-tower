import { dbContext } from "../db/DbContext"
import { eventsService } from '../services/EventsService.js'
class TicketsService {
  async get_my_tickets(accountId) {
    const tickets = await dbContext.Tickets.find({accountId})
    .populate('event')

  return tickets
  }
  async  create_ticket(ticket_data) {
    const event = await eventsService.get_event_by_id
    (ticket_data.eventId)
    const ticket = await dbContext.Tickets
    .create(ticket_data)
    await ticket.populate('profile', 'name picture')
    await ticket.populate('event')
    event.capacity -= 1 
    event.save()

    return ticket
  }

}

export const ticketsService = new TicketsService()