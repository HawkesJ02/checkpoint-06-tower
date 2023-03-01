import BaseController from "../utils/BaseController";
import { Auth0Provider } from '@bcwdev/auth0provider'
import { ticketsService } from "../services/TicketsService";


export class TicketsController extends BaseController {
  constructor(){
    super('api/tickets')
    this.router
    .use( Auth0Provider.getAuthorizedUserInfo )
    .post('', this.create_ticket)
  }


  async create_ticket(req, res, next){
    try {
      const ticket_data = req.body
      ticket_data.accountId = req.userInfo.id
      const ticket = await ticketsService.create_ticket(ticket_data)
      return res.send(ticket)

    } catch (error) {
      next(error)
    }
  }
}