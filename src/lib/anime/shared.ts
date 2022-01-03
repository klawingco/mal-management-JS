import {
  Anime,
  DetailOptions,
  AnimeListOptions,
  AnimeRankingListOptions,
  AnimeDetailOptions,
  AnimeSeasonalListOptions,
  HTTP_METHOD,
} from '../../types'
import { manageFields } from '../../util'


export const shapeAnimeQuery = (
  URL: string,
  opts:
    | AnimeListOptions
    | AnimeRankingListOptions
    | AnimeDetailOptions
    | AnimeSeasonalListOptions
) => {
  return {
    Method: HTTP_METHOD.GET,
    Url: URL,
    Query: {
      ...opts,
      fields: manageFields(opts?.fields),
    },
  }
}

export const shapeAnimeList = (dataList: any[], injectedFunc: any) => {
  // Shape the data and inject helper functions
  const animeList = dataList?.map(
    ({ node }: { node: Anime }) =>
      ({
        ...node,
        getDetail: (opts: DetailOptions) =>
          injectedFunc({ ...opts, id: node.id }),
      } as Anime)
  )
  return animeList
}

