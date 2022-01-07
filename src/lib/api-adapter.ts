import axios, { AxiosInstance } from 'axios'
import { APIFetcher, IMALClient } from '../types'
import { MAL_API_URL } from '../constants'

const initApiClient = (clientOpts: IMALClient) => {

  const isPublicOnly = !Boolean(clientOpts.accessToken)
  const headers: { [key: string]: string } = {}

  if (isPublicOnly && clientOpts.clientId) {
    headers['X-MAL-CLIENT-ID'] = clientOpts.clientId
  } else if (clientOpts.accessToken) {
    headers['Authorization'] = `Bearer ${clientOpts.accessToken}`
  } else {
    throw new Error('Please provide Client Id or Authorization')
  }

  const instance = axios.create({
    baseURL: MAL_API_URL,
    headers,
  })
  return instance
}

const apiFetcher = async (
  apiInstance: AxiosInstance,
  opts: APIFetcher,
  clientOpts: IMALClient
) => {
  return apiInstance({
    method: opts.Method,
    url: opts.Url,
    data: opts?.data,
    // TODO Better way to inject clientOpts
    params: { ...opts.Query, nsfw: clientOpts.nsfw },
  })
}

export { initApiClient, apiFetcher }
