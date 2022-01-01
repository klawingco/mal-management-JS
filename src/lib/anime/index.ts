import { MAL_ANIME_URL } from '../../constants'
import { Anime, AnimeDetail, AnimeDetailOptions, AnimeFields, AnimeListOptions, ApiRequest, DetailOptions, HTTP_METHOD } from '../../types'

async function getAnime(apiRequest: ApiRequest, animeOpts: AnimeListOptions): Promise<Anime[]> {
  const {data = null} = await apiRequest({
    Method: HTTP_METHOD.GET,
    Url: MAL_ANIME_URL,
    Query: { ...animeOpts },
  }).catch(err=> { throw err })

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

  const manageFields = animeDetailOpts?.fields?.map(field=> AnimeFields[field]) || []
  const { data = null } = await apiRequest({
    Method: HTTP_METHOD.GET,
    Url: `${MAL_ANIME_URL}/${animeDetailOpts.id}`,
    Query: { ...animeDetailOpts, fields: manageFields.join(',') },
  }).catch((err) => {
    throw err
  })

  return data
}




export { getAnime, getAnimeDetail }
