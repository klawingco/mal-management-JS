import {
  GenericFields,
  AnimeSpecificFields,
  MangaSpecificFields,
  AnimeRankingType,
  AnimeSeason,
  AnimeSortType,
  AnimeDetail,
} from '.'
import { IAuthorization } from './authorization'
import { Anime } from './mal-api-responses'

export interface IMAL extends IAuthorization {
  generatePCKE: () => Promise<string>
  generateAuthURL: (
    clientId: string,
    codeChallenge?: string | undefined
  ) => Promise<string>
  createClient: (clientOpts: IMALClient) => {
    getAnime: (opts: AnimeListOptions) => Promise<Anime[]>
    getAnimeDetail: (opts: AnimeDetailOptions) => Promise<AnimeDetail>
    getAnimeRanking: (opts: AnimeRankingListOptions) => Promise<Anime[]>
    getAnimeSeasonal: (opts: AnimeSeasonalListOptions) => Promise<Anime[]>
    getMangaDetail(mangaDetailOpts: MangaDetailOptions): Promise<any>
  }
}

export interface IMALClient {
  clientId?: string
  accessToken?: string
}

/* MAL api counterpart types */
interface Pagination {
  limit?: number
  offset?: number
}

export type Fields = GenericFields[] | AnimeSpecificFields[] | MangaSpecificFields[]

export interface AnimeListOptions extends Pagination {
  q: string
  fields?: Fields
}

export interface DetailOptions {
  id?: number
  fields?: Fields
}

export interface AnimeDetailOptions extends DetailOptions {
  id: number
}

export interface AnimeRankingListOptions extends Pagination {
  ranking_type: AnimeRankingType
  fields?: Fields
}
export interface AnimeSeasonalListOptions extends Pagination {
  year: number
  season: AnimeSeason
  sort: AnimeSortType
  fields?: Fields
}


export interface MangaDetailOptions extends DetailOptions {
  id: number
}

