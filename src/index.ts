import Auth from './lib/authentication'
import { IMAL, IMALClient, APIFetcher } from './types'
import { apiFetcher } from './lib/api-adapter'
import initAnime from './lib/anime'
import initManga from './lib/manga'
const mal = {
  ...Auth,
  createClient: (clientOpts: IMALClient) => {
    // Build the apiFetcher based from options
    const apiRequest = (apiOpts: APIFetcher) => apiFetcher(apiOpts, clientOpts)
    return {
      ...initAnime(apiRequest),
      ...initManga(apiRequest),
    }
  },
} as IMAL

module.exports = mal
export default mal
