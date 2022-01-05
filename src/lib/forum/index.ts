import {
  HTTP_METHOD,
  ApiRequest,
  ForumTopicOptions,
  ForumTopicDetailOptions,
  ForumBoardTopic,
} from '../../types'
import {
  MAL_FORUM_BOARDS_URL,
  MAL_FORUM_TOPIC_URL,
  MAL_FORUM_TOPICS_URL,
} from '../../constants'
import {shapeDataList} from '../../util'

const initForum = (apiRequest: ApiRequest) => {
  return {
    /*
        Get Main Forum Boards 
    */
    async getForumBoard() {
      const { data = null } = await apiRequest({
        Url: MAL_FORUM_BOARDS_URL,
        Method: HTTP_METHOD.GET,
      }).catch((err) => {
        throw err
      })
      return data.categories
    },
    /*
        Get Forum Topics 
    */
    async getForumTopics(opts: ForumTopicOptions) {
      const { data = null } = await apiRequest({
        Url: MAL_FORUM_TOPICS_URL,
        Method: HTTP_METHOD.GET,
        Query: { ...opts },
      }).catch((err) => {
        throw err
      })
      // MAL returns this with data object
      return shapeDataList<ForumBoardTopic>(data.data, this.getForumTopicDetail, '')
    },
    /*
        Get Topic Details 
    */
    async getForumTopicDetail(opts: ForumTopicDetailOptions) {
      const { data = null } = await apiRequest({
        Url: `${MAL_FORUM_TOPIC_URL}/${opts.id}`,
        Method: HTTP_METHOD.GET,
        Query: { ...opts },
      }).catch((err) => {
        throw err
      })
      // MAL returns this with data object
      return data.data
    },
  }
}

export default initForum
