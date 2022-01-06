
import { IMAL, IMALClient, APIFetcher } from './types'
import { apiFetcher } from './lib/api-adapter'
import Auth from './lib/authentication'
import initAnime from './lib/anime'
import initManga from './lib/manga'
import initForum from './lib/forum'
import initUserProfile from './lib/user'

export const createClient = (clientOpts: IMALClient) => {
  
  let nsfw = false
  // Build the apiFetcher based from options
  const apiRequest = (apiOpts: APIFetcher) =>
    apiFetcher(apiOpts, { ...clientOpts, nsfw})

  return {
    ...initAnime(apiRequest),
    ...initManga(apiRequest),
    ...initForum(apiRequest),
    ...initUserProfile(apiRequest),
    allowNSFW: function(){
      nsfw = true;
      return this;
    }

  }
}

const mal = {
  ...Auth,
  createClient,
} as IMAL

module.exports = mal
export default mal
