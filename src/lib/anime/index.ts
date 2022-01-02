import { MAL_ANIME_URL, MAL_ANIME_RANKING } from '../../constants'
import { Anime, AnimeDetail, AnimeDetailOptions, AnimeFields, AnimeListOptions, AnimeRankingListOptions, AnimeRankingType, ApiRequest, DetailOptions, HTTP_METHOD } from '../../types'
import {manageFields} from '../../util'

async function getAnime(apiRequest: ApiRequest, animeOpts: AnimeListOptions): Promise<Anime[]> {
  const { data = null } = await apiRequest({
    Method: HTTP_METHOD.GET,
    Url: MAL_ANIME_URL,
    Query: { ...animeOpts, fields: manageFields(animeOpts?.fields)},
  }).catch((err) => {
    throw err
  })
  // Shape the data and inject helper functions
  const malData = data.data;
  const animeList = malData?.map(
    ({ node }: { node: Anime }) =>
      ({
        ...node,
        getDetail: (opts: DetailOptions) =>
          getAnimeDetail(apiRequest, { ...opts, id: node.id }),
      } as Anime)
  )
  return animeList
}

async function getAnimeDetail(
  apiRequest: ApiRequest,
  animeDetailOpts: AnimeDetailOptions
): Promise<AnimeDetail> {
  const { data = null } = await apiRequest({
    Method: HTTP_METHOD.GET,
    Url: `${MAL_ANIME_URL}/${animeDetailOpts.id}`,
    Query: {
      ...animeDetailOpts,
      fields: manageFields(animeDetailOpts?.fields),
    },
  }).catch((err) => {
    throw err
  })
  return data
}

async function getAnimeRanking(
  apiRequest: ApiRequest,
  animeRankOpts: AnimeRankingListOptions
): Promise<Anime[]> {
  const { data = null } = await apiRequest({
    Method: HTTP_METHOD.GET,
    Url: MAL_ANIME_RANKING,
    Query: { 
      ...animeRankOpts,
      ranking_type: typeof animeRankOpts.ranking_type === 'string' 
        ? animeRankOpts.ranking_type :  AnimeRankingType[animeRankOpts.ranking_type],
      fields: manageFields(animeRankOpts?.fields) },
  }).catch((err) => {
    throw err
  })
  // Shape the data and inject helper functions
  const malData = data.data
  const animeList = malData?.map(
    ({ node }: { node: Anime }) =>
      ({
        ...node,
        getDetail: (opts: DetailOptions) =>
          getAnimeDetail(apiRequest, { ...opts, id: node.id }),
      } as Anime)
  )
  return animeList
}




export { getAnime, getAnimeDetail, getAnimeRanking }
