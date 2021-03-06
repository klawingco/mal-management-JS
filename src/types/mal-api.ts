import {
  GenericFields,
  AnimeSpecificFields,
  MangaSpecificFields,
  AnimeRankingType,
  MangaRankingType,
  AnimeSeason,
  AnimeSortType,
  ForumSortType,
  UserFields,
  AnimeWatchStatus,
  AnimeListSortType,
} from './mal-enum'
import {
  Anime,
  AnimeDetail,
  Manga,
  MangaDetail,
  ForumBoardCategory,
  ForumBoardTopic,
  ForumTopicDetail,
  UserProfile,
} from './mal-api-responses'
import { IAuthorization } from './authorization'
import { AxiosRequestConfig, AxiosResponse } from 'axios'

interface CreateClient {
  getAnime: (opts: AnimeListOptions) => Promise<Anime[]>
  getAnimeDetail: (opts: AnimeDetailOptions) => Promise<AnimeDetail>
  getAnimeRanking: (opts: AnimeRankingListOptions) => Promise<Anime[]>
  getAnimeSeasonal: (opts: AnimeSeasonalListOptions) => Promise<Anime[]>
  getUserAnime: (opts: UserAnimeListOptions) => Promise<Anime[]>
  getManga(opts: MangaListOptions): Promise<Manga[]>
  getMangaDetail(opts: MangaDetailOptions): Promise<MangaDetail>
  getMangaRanking: (opts: MangaRankingListOptions) => Promise<Manga[]>
  getForumBoard: () => Promise<ForumBoardCategory[]>
  getForumTopics: (opts: ForumTopicOptions) => Promise<ForumBoardTopic[]>
  getForumTopicDetail: (
    opts: ForumTopicDetailOptions
  ) => Promise<ForumTopicDetail[]>
  getUserProfile: (opts?: UserProfileOptions) => Promise<UserProfile[]>
  // Extensions
  allowNSFW: () => CreateClient
  setRequestLogger: (
    callback?: (request: AxiosRequestConfig) => void
  ) => CreateClient
  setResponseLogger: (
    callback?: (response: AxiosResponse<any>) => void
  ) => CreateClient
}

export interface IMAL extends IAuthorization {
  generatePCKE: () => Promise<string>
  generateAuthURL: (
    clientId: string,
    codeChallenge?: string | undefined
  ) => Promise<string>
  createClient: (clientOpts: IMALClient) => CreateClient
}

export interface IMALClient {
  clientId?: string
  accessToken?: string
  nsfw?: boolean
}

/* MAL api counterpart types */
export interface Pagination {
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
  nsfw?: boolean
}

export interface AnimeDetailOptions extends DetailOptions {
  id: number
}

export interface AnimeRankingListOptions extends Pagination {
  ranking_type: AnimeRankingType
  fields?: Fields[]
  nsfw?: boolean
}

export interface AnimeSeasonalListOptions extends Pagination {
  year: number
  season: AnimeSeason
  sort: AnimeSortType
  fields?: Fields[]
  nsfw?: boolean
}

export interface MangaDetailOptions extends DetailOptions {
  id: number
}
export interface MangaListOptions extends Pagination {
  q: string
  fields?: Fields[]
  nsfw?: boolean
}
export interface MangaRankingListOptions extends Pagination {
  ranking_type: MangaRankingType
  fields?: Fields[]
  nsfw?: boolean
}

export interface ForumTopicOptions extends Pagination {
  board_id?: number
  subboard_id?: number
  sort?: ForumSortType
  q?: string
  topic_user_name?: string
  user_name?: string
}

export interface ForumTopicDetailOptions extends Pagination {
  id: number 
}

export interface UserProfileOptions {
  fields?: UserFields[] | string[]
}

export interface UserAnimeListOptions extends Pagination {
  fields?: Fields[]
  status?: AnimeWatchStatus
  sort?: AnimeListSortType
}

export type QueryOpts =
  | AnimeListOptions
  | AnimeRankingListOptions
  | AnimeDetailOptions
  | AnimeSeasonalListOptions
  | MangaDetailOptions
  | MangaListOptions
  | MangaRankingListOptions
  | UserProfileOptions
  | UserAnimeListOptions


