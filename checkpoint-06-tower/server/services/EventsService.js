import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors.js"
class EventsService{
 
  async create_event(event_data) {
    const event = await dbContext.Events.create(event_data)

    return event 
  }

  
  async edit_event(eventId, requestorId, eventData) {
    const event = await this.get_event_by_id(eventId)
    if (event.creatorId.toString() != requestorId || event.isCanceled == true){
      throw new Forbidden('You are not allowed to perform this action')
    } 
    event.name = eventData.name || event.name
    event.description = eventData.description || event.description
    event.coverImg = eventData.coverImg || event.coverImg
    event.location = eventData.location || event.location
    event.capacity = eventData.capacity || event.capacity
    event.startDate = eventData.startDate || event.startDate

    await event.save()
    return event
  }

  async cancel_event(eventId, requestorId) {
    const event = await this.get_event_by_id(eventId)

    if (event.creatorId.toString() != requestorId || event.isCanceled == true) {
      throw new Forbidden('You cannot cancel this event')
    }

    event.isCanceled = true
    await event.save()
    return event
  }

 async  get_all_events() {
    const events = await dbContext.Events.find()
      .populate('creator', 'name picture')
      // TODO !! ADD ATTENDEE COUNT!!!
      // .populate('attendeeorsomethingCount')
      return events 
  }

 async  get_event_by_id(eventId) {
    const event = await dbContext.Events.findById(eventId)
      .populate('creator', 'name picture')
     if (!event) {
        throw new BadRequest('Not a valid Event ID!')
      } 
      return event
    
  }

 
}

export const eventsService = new EventsService()