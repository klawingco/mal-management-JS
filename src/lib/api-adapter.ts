import axios from 'axios'
import { APIFetcher, IMALClient } from 'src/types'

const apiFetcher = async (opts: APIFetcher, clientOpts: IMALClient) => {
  const isPublicOnly = !Boolean(clientOpts.accessToken)
  const headers: { [key: string]: string } = {}
  if (isPublicOnly && clientOpts.clientId) {
    headers['X-MAL-CLIENT-ID'] = clientOpts.clientId
  } else {
    headers['Authorization'] = `Bearer ${clientOpts.accessToken}`
  }
  console.log('URL', opts.Url)
  console.log('QUERY', opts.Query)
  
  return axios({
    method: opts.Method,
    url: opts.Url,
    data: opts?.data,
    headers,
    params: { ...opts.Query, nsfw: clientOpts.nsfw },
  })
}

export { apiFetcher }
