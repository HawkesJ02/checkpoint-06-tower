import { logger } from "../utils/Logger"
import { api } from "./AxiosService"
import { AppState } from "../AppState"


class CommentsService {

  async get_comments_on_event(eventId){
    const res = await api.get('api/events/' + eventId + '/comments')
    logger.log(res.data, 'GOTTEN COMMENTS!')
  }

}

export const commentsService = new CommentsService()