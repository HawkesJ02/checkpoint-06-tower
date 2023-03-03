import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { router } from "../router.js";
import { Event } from "../models/Event.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class EventsService{
  async get_all_events(){
    const res = await api.get('/api/events')
    // logger.log(res.data, 'RESPONSE DATA ')
    AppState.events = res.data.map(e => new Event(e))
  }


  async get_selected_event(eventId){
    const res = await api.get('api/events/' + eventId)
    AppState.events = new Event(res.data)
  }

  async create_event(form_data){
    const res = await api.post('api/events', form_data)
    AppState.events.push(res.data)
    logger.log(res.data)
    router.push('/events/' + res.data.id)
    return res.data
  }

  async cancel_selected_event(event_id){
    const res = await api.delete('api/events/' + event_id)
    logger.log('CANCELED EVENT', res.data)
    AppState.events = new Event(res.data)
  }

  dump_events(){
    AppState.events = []
  }

 
}

export const eventsService = new EventsService()