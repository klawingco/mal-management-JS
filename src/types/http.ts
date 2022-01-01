import { AxiosResponse } from 'axios'
import { AnimeFields } from './mal-enum'

export enum HTTP_METHOD {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete',
}

export interface APIFetcher {
  Url: string
  Method: HTTP_METHOD
  Query?: { [key: string]: string | number | string[] | AnimeFields[] }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ApiRequest = (apiOpts: APIFetcher) => Promise<AxiosResponse<any>>
