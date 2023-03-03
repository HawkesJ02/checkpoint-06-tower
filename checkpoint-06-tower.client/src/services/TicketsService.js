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

  async delete_ticket(ticketId){
    const res = await api.delete('api/tickets/' + ticketId)
    return res.data 
  }

  async get_selected_event_tickets(eventId){
    const res = await api.get('api/events/' + eventId + '/tickets')
    logger.log(res.data, 'GOTTEN TICKETS')
    AppState.tickets = res.data.map(t => new Ticket(t))
   }

   async get_events_by_my_ticket(){
    const res = await api.get('account/tickets')
    logger.log(res.data, 'GOTTEN TICKETS FOR MYSELF')
    AppState.myTickets = res.data
    logger.log(AppState.myTickets, 'APPSTATE GOTTEN TICKETS FOR MYSELF')


   }

   dump_tickets(){
    AppState.tickets = []
   }

}

export const ticketsService = new TicketsService()