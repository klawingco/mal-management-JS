import { ApiRequest, MangaDetailOptions, MangaFields } from '../../types'
import { MAL_MANGA_URL } from '../../constants'
import { shapeAnimeQuery } from '../../util'

const initManga = (apiRequest: ApiRequest) => {
  return {
    async getMangaDetail(mangaDetailOpts: MangaDetailOptions) {
      const { data = null } = await apiRequest(
        shapeAnimeQuery(
          `${MAL_MANGA_URL}/${mangaDetailOpts.id}`,
          mangaDetailOpts,
          MangaFields
        )
      ).catch((err) => {
        throw err
      })
      return data
    },
  }
}

export default initManga
