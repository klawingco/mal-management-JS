import {
  GenericFields,
  AnimeSpecificFields,
  MangaSpecificFields,
  AnimeRankingType,
  MangaRankingType,
  AnimeSeason,
  AnimeSortType,
} from './mal-enum'
import { Anime, AnimeDetail, Manga, MangaDetail } from './mal-api-responses'
import { IAuthorization } from './authorization'

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
    getManga(mangaDetailOpts: MangaListOptions): Promise<Manga[]>
    getMangaDetail(mangaDetailOpts: MangaDetailOptions): Promise<MangaDetail>
    getMangaRanking: (opts: MangaRankingListOptions) => Promise<Manga[]>
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

export type Fields = GenericFields | AnimeSpecificFields | MangaSpecificFields

export interface DetailOptions {
  id?: number
  fields?: Fields[]
}

export interface AnimeListOptions extends Pagination {
  q: string
  fields?: Fields[]
}

export interface AnimeDetailOptions extends DetailOptions {
  id: number
}

export interface AnimeRankingListOptions extends Pagination {
  ranking_type: AnimeRankingType
  fields?: Fields[]
}

export interface AnimeSeasonalListOptions extends Pagination {
  year: number
  season: AnimeSeason
  sort: AnimeSortType
  fields?: Fields[]
}

export interface MangaDetailOptions extends DetailOptions {
  id: number
}

export interface MangaListOptions extends Pagination {
  q: string
  fields?: Fields[]
}

export interface MangaRankingListOptions extends Pagination {
  ranking_type: MangaRankingType
  fields?: Fields[]
}

export type QueryOpts =
  | AnimeListOptions
  | AnimeRankingListOptions
  | AnimeDetailOptions
  | AnimeSeasonalListOptions
  | MangaDetailOptions
  | MangaListOptions
  | MangaRankingListOptions


