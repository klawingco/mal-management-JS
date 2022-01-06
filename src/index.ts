
import { IMAL, IMALClient, APIFetcher } from './types'
import { apiFetcher } from './lib/api-adapter'
import Auth from './lib/authentication'
import initAnime from './lib/anime'
import initManga from './lib/manga'
import initForum from './lib/forum'
import initUserProfile from './lib/user'
const mal = {
  ...Auth,
  createClient: (clientOpts: IMALClient) => {
    // Build the apiFetcher based from options
    const apiRequest = (apiOpts: APIFetcher) => apiFetcher(apiOpts, clientOpts)
  
    return {
      ...initAnime(apiRequest),
      ...initManga(apiRequest),
      ...initForum(apiRequest),
      ...initUserProfile(apiRequest),
    }
  },
} as IMAL

module.exports = mal
export default mal
