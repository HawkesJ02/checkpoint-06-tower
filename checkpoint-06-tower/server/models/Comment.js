import mongoose from "mongoose";
const Schema = mongoose.Schema

export const CommentSchema = new Schema(
  {
    body: {type: String, required: true},
    eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true},
    creatorId: { type: Schema.Types.ObjectId, ref: 'creator', required: true }
  },  { timestamps: true, toJSON: { virtuals: true } }
)

CommentSchema.virtual('event', {
  ref: 'Events',
  localField: 'eventId',
  foreignField: '_id',
})

CommentSchema.virtual('creator', {
  ref: 'Account',
  localField:'creatorId',
  foreignField: '_id',
  justOne: true
})