import { AnimeDetail, AnimeFields, AnimeRankingType, AnimeSeason, AnimeSortType } from '.'
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
  }
}

export interface IMALClient {
  clientId: string
  accessToken?: string
}



/* MAL api counterpart types */
interface Pagination {
  limit?: number
  offset?: number
}

export interface AnimeListOptions extends Pagination {
  q: string
  fields?: AnimeFields[]
}

export interface DetailOptions {
  id?: number
  fields?: AnimeFields[]
}

export interface AnimeDetailOptions extends DetailOptions {
  id: number
}

export interface AnimeRankingListOptions extends Pagination {
  ranking_type: AnimeRankingType
  fields?: AnimeFields[]
}
export interface AnimeSeasonalListOptions extends Pagination {
  year: number
  season: AnimeSeason
  sort: AnimeSortType
  fields?: AnimeFields[]
}


