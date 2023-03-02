import { Schema } from "mongoose";


export const EventSchema = new Schema({
  name: {type: String, required: true, maxLength: 500 },
  description: {type: String, required: true},
  coverImg: {type: String, maxLength: 5000, required: true},
  location: {type: String, required: true},
  capacity: {type: Number, required: true, min: 0},
  startDate: {type: String, required: true},
  type: {type: String},
  isCanceled: {type: Boolean, required: true, default: false},
  creatorId: {type: Schema.Types.ObjectId, ref: 'Account', required: true}


}, { timestamps: true, toJSON: { virtuals: true } } )

EventSchema.virtual('creator', {
  ref: 'Account',
  localField:'creatorId',
  foreignField: '_id',
  justOne: true
})






// "name": "{{eventName}}",
// "description" : "{{eventDescription}}",
// "coverImg": "{{eventCoverImg}}",
// "location": "{{eventLocation}}",
// "capacity": {{eventCapacity}},
// "startDate": "{{eventStartDate}}",
// "type": "{{eventType}}"