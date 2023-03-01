import BaseController from "../utils/BaseController";
import { Auth0Provider } from '@bcwdev/auth0provider'
import { eventsService } from "../services/EventsService";


export class EventsController extends BaseController {
  constructor(){
    super('api/events')
    this.router
      .use( Auth0Provider.getAuthorizedUserInfo )
      .post('', this.create_event)
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

}

