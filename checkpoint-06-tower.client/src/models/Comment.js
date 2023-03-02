import { Profile } from "./Account.js"
import { Event } from "./Event.js"
export class Comment{ 
  constructor(data){
    this.id = data.id
    this.body = data.body
    this.eventId = data.eventId
    this.creatorId = data.creatorId
    this.createdAt = data.createdAt
    this.event = data.event
    this.creator = data.creator
  }

}