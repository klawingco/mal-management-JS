import {
  Fields,
  AnimeFields,
  Anime,
  DetailOptions,
  AnimeListOptions,
  AnimeRankingListOptions,
  AnimeDetailOptions,
  AnimeSeasonalListOptions,
  HTTP_METHOD,
} from '../types'

export const queryfyObj = (targetObj: { [key: string]: string }) => {
  const params = new URLSearchParams()
  for (const key in targetObj) {
    params.append(key as string, targetObj[key])
  }
  return params.toString()
}

export const manageFields = (fields?: Fields) => {
  const manageFields =
    fields?.map((field) => {
      if (typeof field === 'string') {
        return field
      }
      return AnimeFields[field]
    }) || []
  return manageFields.join(',')
}


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


