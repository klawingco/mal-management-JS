import { MAL_USER_URL } from '../../constants'
import { HTTP_METHOD, ApiRequest } from '../../types'

const initUser = (apiRequest: ApiRequest) => {
    return {
      /*
        Get User Detail
      */
      async getMyProfile() {
        const { data = null } = await apiRequest({
          Url: `${MAL_USER_URL}/@me`,
          Method: HTTP_METHOD.GET,
        }).catch((err) => {
          throw err
        })
        return data.categories
      },
    }

}

export default initUser
