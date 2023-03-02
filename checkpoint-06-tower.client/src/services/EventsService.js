import { AppState } from "../AppState.js"
import { Event } from "../models/Event.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class EventsService{
  async get_all_events(){
    const res = await api.get('/api/events')
    logger.log(res.data, 'RESPONSE DATA ')
    AppState.events = res.data.map(e => new Event(e))
  }


  async get_selected_event(eventId){
    const res = await api.get('api/events/' + eventId)
    AppState.events = new Event(res.data)
  }

  async create_event(form_data){
    const res = await api.post('api/events', form_data)
    AppState.events.push(res.data)
    return res.data
  }


  // TODO Come back to this
  async get_selected_event_tickets(eventId){
   const res = await api.get('api/events/' + eventId + '/tickets')
   logger.log(res.data)
  //  AppState.tickets = new Ticket(res.data)
  }

  dump_events(){
    AppState.events = []
  }
}

export const eventsService = new EventsService()