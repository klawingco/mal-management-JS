import axios from 'axios'
import { HTTP_METHOD } from 'src/types'
export const apiFetcher = async (
  URL: string,
  METHOD: HTTP_METHOD,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any
) =>
  axios({
    method: METHOD,
    url: URL,
    data: data,
    headers: {},
  })
