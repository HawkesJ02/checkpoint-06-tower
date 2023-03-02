import { Profile } from "./Account.js"
import { Event } from "./Event.js"
export class Comment{ 
  constructor(data){
    this.body = data.body
    this.eventId = data.eventId
    this.creatorId = data.creatorId
    this.createdAt = data.createdAt
    this.event = new Event(data.event)
    this.creator = new Profile(data.profile)
  }

}