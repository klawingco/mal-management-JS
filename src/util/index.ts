import {
  Fields,
  AnimeFields,
  MangaFields,
  Anime,
  DetailOptions,
  AnimeListOptions,
  AnimeRankingListOptions,
  AnimeDetailOptions,
  AnimeSeasonalListOptions,
  HTTP_METHOD,
  MangaDetailOptions,
} from '../types'

export const queryfyObj = (targetObj: { [key: string]: string }) => {
  const params = new URLSearchParams()
  for (const key in targetObj) {
    params.append(key as string, targetObj[key])
  }
  return params.toString()
}

export const manageFields = (
  fields?: Fields,
  fieldSource: typeof MangaFields | typeof AnimeFields = AnimeFields
) => {
  const _fields =
    fields?.map((field) => {
      if (typeof field === 'string') {
        return field
      }
      return fieldSource[field]
    }) || []
  return _fields.join(',')
}


export const shapeAnimeQuery = (
  URL: string,
  opts:
    | AnimeListOptions
    | AnimeRankingListOptions
    | AnimeDetailOptions
    | AnimeSeasonalListOptions
    | MangaDetailOptions,
  fieldSource?: typeof MangaFields | typeof AnimeFields
) => {
  return {
    Method: HTTP_METHOD.GET,
    Url: URL,
    Query: {
      ...opts,
      fields: manageFields(opts?.fields, fieldSource),
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


