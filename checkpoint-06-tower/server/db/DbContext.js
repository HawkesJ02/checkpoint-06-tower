import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { EventSchema } from "../models/Event";
import { TicketSchema } from '../models/Ticket'
import { CommentSchema } from "../models/Comment";

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Events = mongoose.model('Events', EventSchema);

  Tickets = mongoose.model('Tickets', TicketSchema)

  Comments = mongoose.model('Comments', CommentSchema)
}

export const dbContext = new DbContext()
