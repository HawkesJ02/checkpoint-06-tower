import { dbContext } from "../db/DbContext"
import { eventsService } from '../services/EventsService.js'
import { BadRequest, Forbidden } from "../utils/Errors"
class TicketsService {
 async delete_ticket(ticketId, requestorId) {
    const selected_ticket = await this.get_ticked_by_id(ticketId)
    if (selected_ticket.accountId != requestorId) {
      throw new Forbidden('You are not the maker of this ticket')
    }
    const event = await eventsService.get_event_by_id(selected_ticket.eventId)
    event.capacity += 1
    event.save()
    await selected_ticket.remove()
    return selected_ticket
  }

  async get_ticked_by_id(ticketId){
const ticket = await dbContext.Tickets.findById(ticketId)
if (!ticket) {
  throw new BadRequest('Invalid ticket ID!')
}
return ticket
  }
 async get_event_tickets(eventId) {
    const ticket_holders = await dbContext.Tickets.find({eventId})
      .populate('profile', 'name picture')
    return ticket_holders 
  }
  async get_my_tickets(accountId) {
    const tickets = await dbContext.Tickets.find({accountId})
    .populate('event')

  return tickets
  }
  async  create_ticket(ticket_data) {
    const event = await eventsService.get_event_by_id
    (ticket_data.eventId)
    if (event.capacity <= 0) {
      throw new BadRequest('Event full!')
    }
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