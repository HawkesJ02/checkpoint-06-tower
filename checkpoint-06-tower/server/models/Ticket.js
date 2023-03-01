import { Schema } from "mongoose";


export const TicketSchema = new Schema({
  eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true},
  accountId: {type: Schema.Types.ObjectId, ref: 'Account', required: true},
  
}, { timestamps: true, toJSON: { virtuals: true } } )

TicketSchema.virtual('event', {
  ref: 'Event',
  localField: 'eventId',
  foreignField: '_id',
})

TicketSchema.virtual('profile', {
  ref: 'Account',
  localField: 'accountId',
  foreignField: '_id',
  justOne: true
})