import { dbContext } from "../db/DbContext"

class EventsService{
  async create_event(event_data) {
    const event = await dbContext.Events.create(event_data)

    return event 
  }

}

export const eventsService = new EventsService()