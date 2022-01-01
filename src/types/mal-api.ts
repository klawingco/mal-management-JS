import { AnimeDetail, AnimeFields } from '.'
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
  }
}

export interface IMALClient {
  clientId: string
  accessToken?: string
}

/* MAL api counterpart types */
export interface AnimeListOptions {
  q: string
  limit?: number
  offset?: number
}


export interface DetailOptions {
  id?: number
  fields?: AnimeFields[]
}

export interface AnimeDetailOptions extends DetailOptions {
  id: number
}


