import { logger } from "../utils/Logger"
import { api } from "./AxiosService"
import { AppState } from "../AppState"
import { Comment } from "../models/Comment"


class CommentsService {

  async get_comments_on_event(eventId){
    const res = await api.get('api/events/' + eventId + '/comments')
    logger.log(res.data, 'GOTTEN COMMENTS!')
    AppState.comments = res.data.map(c => new Comment(c))
  }

  async create_comment(comment_data){
    const res = await api.post('api/comments', comment_data)
    AppState.comments.push(new Comment(res.data))
    return res.data
  }

  async delete_comment(comment_id){
    const res = await api.delete('api/comments/' + comment_id)
   const found_comment = AppState.comments.findIndex(c => c.id == comment_id)
   if (found_comment !== -1) {
    AppState.comments.splice(found_comment, 1)
   }
    return res.data
  }

  dump_comments(){
    AppState.comments = []
  }
}

export const commentsService = new CommentsService()