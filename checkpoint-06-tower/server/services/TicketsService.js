import { dbContext } from "../db/DbContext"
import { eventsService } from '../services/EventsService.js'
class TicketsService {
  async  create_ticket(ticket_data) {
    const event = await eventsService.get_event_by_id
    (ticket_data.eventId)
    const ticket = await dbContext.Tickets
    .create(ticket_data)
    await ticket.populate('profile')
    event.capacity -= 1 
    event.save()

    return ticket
  }

}

export const ticketsService = new TicketsService()