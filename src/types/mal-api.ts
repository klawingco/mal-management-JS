import { AxiosResponse } from 'axios'
import { IAuthorization } from './authorization'

export interface IMAL extends IAuthorization {
  generatePCKE: () => Promise<string>
  generateAuthURL: (
    clientId: string,
    codeChallenge?: string | undefined
  ) => Promise<string>
  createClient: (clientOpts: IMALClient) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getAnime: (opts: AnimeListOptions) => Promise<AxiosResponse<any>>
  }
}

export interface IMALClient {
  clientId: string
  accessToken?: string
}

export interface IMALApiOptions {
  anime: string
}

export interface AnimeListOptions {
  q: string
}
