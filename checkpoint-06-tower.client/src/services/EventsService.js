import { AppState } from "../AppState.js"
import { Event } from "../models/Event.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class EventsService{
  async get_all_events(){
    const res = await api.get('/api/events')
    logger.log(res.data, 'RESPONSE DATA ')
    AppState.events = res.data.map(e => new Event(e))
    // AppState.events = res.data
  }
}

export const eventsService = new EventsService()