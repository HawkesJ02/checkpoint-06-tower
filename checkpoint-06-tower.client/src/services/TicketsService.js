import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { Event } from "../models/Event.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
class TicketsService{
  async create_ticket(eventId){
    const res = await api.post('api/tickets', { eventId })
    logger.log('BECOMING TICKET HOLDER HOPEUFLLY', res.data)

  }

  async get_selected_event_tickets(eventId){
    const res = await api.get('api/events/' + eventId + '/tickets')
    logger.log(res.data, 'GOTTEN TICKETS')
    AppState.tickets = res.data.map(t => new Ticket(t))
   }

   dump_tickets(){
    AppState.tickets = []
   }

}

export const ticketsService = new TicketsService()