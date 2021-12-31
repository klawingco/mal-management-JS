/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios'

export interface IAuthorization {
  generatePCKE: () => Promise<string>
  generateAuthURL: (
    clientId: string,
    codeChallenge?: string | undefined
  ) => Promise<string>
  authorize: (
    clientId: string,
    clientSecret: string,
    codeChallenge: string,
    callbackAuthcode: string
  ) => Promise<AxiosResponse<any>>
}
