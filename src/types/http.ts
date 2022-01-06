import { AxiosResponse } from 'axios'
import { Fields } from './mal-api'

export enum HTTP_METHOD {
  GET = 'get',
  PUT = 'put',
}

export interface APIFetcher {
  Url: string
  Method: HTTP_METHOD
  Query?: {
    [key: string]: string | number | string[] | boolean | Fields
  }
  data?: any
}
export type ApiRequest = (apiOpts: APIFetcher) => Promise<AxiosResponse<any>>
