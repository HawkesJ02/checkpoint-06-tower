import { Profile } from "./Account.js"
import { Event } from "./Event.js"


export class Ticket{
  constructor(data){
    this.id = data.id
    this.accountId = data.accountId
    this.eventId = data.eventId
    this.profile = data.profile
    this.event = data.event[0]
    // this.event = new Event(data.event)
  }
}