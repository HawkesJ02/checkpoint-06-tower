import BaseController from "../utils/BaseController";
import { Auth0Provider } from '@bcwdev/auth0provider'
import { eventsService } from "../services/EventsService";
import { ticketsService } from "../services/TicketsService";


export class EventsController extends BaseController {
  constructor(){
    super('api/events')
    this.router
    .get('', this.get_all_events)
    .get('/:eventId', this.get_event_by_id)
    .get('/:eventId/tickets', this.get_event_tickets)
    .use( Auth0Provider.getAuthorizedUserInfo )
    .post('', this.create_event)
    .put('/:eventId', this.edit_event)
    .delete('/:eventId', this.cancel_event)

  }

  async create_event(req, res, next){
    try {
      const event_data = req.body
      event_data.creatorId = req.userInfo.id
      const event = await eventsService.create_event(event_data)
      return res.send(event)

    } catch (error) {
      next(error)
    }
  }

  async get_all_events(req, res, next){
    try {
      const events = await eventsService.get_all_events()
      return res.send(events)
    } catch (error) {
      next(error)
    }
  }

  async get_event_by_id(req, res, next){
    try {
      const eventId = req.params.eventId
      const event = await eventsService.get_event_by_id(eventId)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }

  async get_event_tickets(req, res, next){
    try {
      const eventId = req.params.eventId
      const ticket_holders = await ticketsService.get_event_tickets(eventId)
      return res.send(ticket_holders)
    } catch (error) {
      next(error)
    }
  }

  async edit_event(req, res, next){
    try {
      const eventId = req.params.eventId
      const requestorId = req.userInfo.id
      const eventData = req.body
      const updatedEvent = await eventsService.edit_event(eventId, requestorId, eventData)
      return res.send(updatedEvent)
    } catch (error) {
      next(error)
    }
  }

  async cancel_event(req, res, next){
try {
  const eventId = req.params.eventId
  const requestorId = req.userInfo.id
  const event = await eventsService.cancel_event(eventId, requestorId)
  return res.send(event)
} catch (error) {
  next(error)
}
  }

}

