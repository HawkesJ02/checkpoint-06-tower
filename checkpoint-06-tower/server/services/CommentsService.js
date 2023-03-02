import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"

class CommentsService {
  async delete_comment(commentId, requestorId) {
    const comment = await this.get_comment_by_id(commentId)
    if (comment.creatorId != requestorId){
      throw new Forbidden('You are not the writer of this comment bro!')
    }
    await comment.remove()
    return comment 
  }
  async get_comment_by_id(commentId) {
    const comment = await dbContext.Comments.findById(commentId)
if (!comment) {
  throw new BadRequest('Invalid comment ID!')
}
return comment
  }
  async get_comments_on_event(eventId) {
   const comments = await dbContext.Comments.find({eventId})
    .populate('creator', "name picture")
    .populate('event')
  return comments
  }
  async create_comment(comment_data) {
    const comment = await dbContext.Comments.create(comment_data)
    await comment.populate('event')
    await comment.populate('creator')

    return comment
  }

}

export const commentsService = new CommentsService()