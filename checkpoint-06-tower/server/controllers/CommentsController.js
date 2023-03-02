import BaseController from "../utils/BaseController";
import { Auth0Provider } from '@bcwdev/auth0provider'
import { commentsService } from "../services/CommentsService";


export class CommentsController extends BaseController {
  constructor(){
    super('api/comments')
    this.router
      .use( Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create_comment)
      .delete('/:commentId', this.delete_comment)
  }

  async create_comment(req, res, next){
try {
  const comment_data = req.body
  comment_data.creatorId = req.userInfo.id
  const comment = await commentsService.create_comment(comment_data)
  return res.send(comment)
} catch (error) {
  next(error)
}
  }

  async delete_comment(req, res, next){
    try {
      const commentId = req.params.commentId
      const requestorId = req.userInfo.id
      const removed_comment = await commentsService.delete_comment(commentId, requestorId)
      return res.send(removed_comment)
    } catch (error) {
      next(error)
    }
  }
}