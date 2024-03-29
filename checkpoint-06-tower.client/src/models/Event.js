import { Profile } from "./Account.js"


export class Event {
  constructor(data){
    this.id = data.id
    this.name = data.name
    this.description = data.description
    this.coverImg = data.coverImg
    this.location = data.location
    this.type = data.type
    this.capacity = data.capacity
    this.startDate = data.startDate 
    this.isCanceled = data.isCanceled
    this.creatorId = data.creatorId
    this.creator = new Profile(data.creator)
  }
}