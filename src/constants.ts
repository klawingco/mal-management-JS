const OAUTH_BASE_MAL_URL = 'https://myanimelist.net'
const API_BASE_MAL_URL = 'https://api.myanimelist.net'

const MAL_API_URL = `${API_BASE_MAL_URL}/v2`

// Auth Related
export const MAL_AUTH_URL = `${OAUTH_BASE_MAL_URL}/v1/oauth2/authorize`
export const MAL_ACCESSTOKEN_URL = `${OAUTH_BASE_MAL_URL}/v1/oauth2/token`

// MAL API
export const MAL_ANIME_URL = `${MAL_API_URL}/anime`
export const MAL_ANIME_RANKING = `${MAL_ANIME_URL}/ranking`
export const MAL_ANIME_SEASONAL = `${MAL_ANIME_URL}/season`

export const MAL_MANGA_URL = `${MAL_API_URL}/manga`
