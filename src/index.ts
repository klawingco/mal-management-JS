
import { IMAL, IMALClient, APIFetcher } from './types'
import { initApiClient, apiFetcher } from './lib/api-adapter'
import Auth from './lib/authentication'
import initAnime from './lib/anime'
import initManga from './lib/manga'
import initForum from './lib/forum'
import initUserProfile from './lib/user'
import { AxiosResponse, AxiosRequestConfig } from 'axios'

export const createClient = (clientOpts: IMALClient) => {

  let nsfw = false

  const axiosInstance = initApiClient(clientOpts);

  // Build the apiFetcher based from options
  const apiRequest = (apiOpts: APIFetcher) =>
    apiFetcher(axiosInstance, apiOpts, { ...clientOpts, nsfw })

  return {
    ...initAnime(apiRequest),
    ...initManga(apiRequest),
    ...initForum(apiRequest),
    ...initUserProfile(apiRequest),

    // Extension functions
    allowNSFW: function () {
      nsfw = true
      return this
    },
    setRequestLogger: function (
      loggerCb?: (response: AxiosRequestConfig) => void
    ) {
      if (loggerCb) {
        axiosInstance.interceptors.request.use((request) => {
          loggerCb(request)
          return request
        })
      }
      return this
    },
    setResponseLogger: function (
      loggerCb?: (response: AxiosResponse<any>) => void
    ) {
      if (loggerCb) {
        axiosInstance.interceptors.response.use((response) => {
          loggerCb(response)
          return response
        })
      }
      return this
    },
  }
}

const mal = {
  ...Auth,
  createClient,
} as IMAL

module.exports = mal
export default mal
