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

  dump_comments(){
    AppState.comments = []
  }
}

export const commentsService = new CommentsService()