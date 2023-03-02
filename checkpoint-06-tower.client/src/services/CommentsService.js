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

}

export const commentsService = new CommentsService()