import Auth from './authentication'
import { IMAL, IMALClient, APIFetcher } from './types'
import { apiFetcher } from './lib/api-adapter'
import { getAnime } from './anime'

const mal = {
  ...Auth,
  createClient: (clientOpts: IMALClient) => {
    // Build the apiFetcher based from options
    const apiRequest = (apiOpts: APIFetcher) => apiFetcher(apiOpts, clientOpts)
    return {
      getAnime: (animeOpts) => getAnime(apiRequest, animeOpts),
    }
  },
} as IMAL
export default mal
