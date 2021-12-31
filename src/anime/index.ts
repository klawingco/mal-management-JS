import { MAL_ANIME_URL } from '../constants'
import { AnimeListOptions, ApiRequest, HTTP_METHOD } from '../types'

async function getAnime(apiRequest: ApiRequest, animeOpts: AnimeListOptions) {
  return apiRequest({
    Method: HTTP_METHOD.GET,
    Url: MAL_ANIME_URL,
    Query: { ...animeOpts },
  })
}

export { getAnime }
