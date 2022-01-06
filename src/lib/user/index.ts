import { MAL_USER_URL } from '../../constants'
import { ApiRequest, UserProfileOptions, UserFields } from '../../types'
import { shapeQuery } from '../../util'

const initUser = (apiRequest: ApiRequest) => {
    return {
      /*
        Get User Detail
      */
      async getUserProfile(opts: UserProfileOptions = {}) {
        const { data = null } = await apiRequest(
          shapeQuery(`${MAL_USER_URL}/@me`, opts, UserFields)
        ).catch((err) => {
          throw err
        })
        return data
      },
    }

}

export default initUser
