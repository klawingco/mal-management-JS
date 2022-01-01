import Auth from './lib/authentication'
import { IMAL, IMALClient, APIFetcher } from './types'
import { apiFetcher } from './lib/api-adapter'
import { getAnime, getAnimeDetail } from './lib/anime'

const mal = {
  ...Auth,
  createClient: (clientOpts: IMALClient) => {
    // Build the apiFetcher based from options
    const apiRequest = (apiOpts: APIFetcher) => apiFetcher(apiOpts, clientOpts)
    return {
      getAnime: (animeOpts) => getAnime(apiRequest, animeOpts),
      getAnimeDetail: (animeDetailOpts) =>
        getAnimeDetail(apiRequest, animeDetailOpts),
    }
  },
} as IMAL
export default mal
