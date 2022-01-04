import {
  ApiRequest,
  MangaDetailOptions,
  MangaFields,
  MangaListOptions,
  Manga,
  MangaRankingListOptions,
} from '../../types'
import { MAL_MANGA_URL, MAL_MANGA_RANKING } from '../../constants'
import { shapeQuery, shapeDataList } from '../../util'

const initManga = (apiRequest: ApiRequest) => {
  return {
    /*
        Get Manga Detail
    */
    async getMangaDetail(mangaDetailOpts: MangaDetailOptions) {
      const { data = null } = await apiRequest(
        shapeQuery(
          `${MAL_MANGA_URL}/${mangaDetailOpts.id}`,
          mangaDetailOpts,
          MangaFields
        )
      ).catch((err) => {
        throw err
      })
      return data
    },
    /*
        Get Manga Lists
    */
    async getManga(mangaOpts: MangaListOptions): Promise<Manga[]> {
      const { data = null } = await apiRequest(
        shapeQuery(MAL_MANGA_URL, mangaOpts, MangaFields)
      ).catch((err) => {
        throw err
      })
      return shapeDataList<Manga>(data.data, this.getMangaDetail)
    },
    /*
        Get Manga Ranking List
    */
    async getMangaRanking(
      mangaRankOpts: MangaRankingListOptions
    ): Promise<Manga[]> {
      const { data = null } = await apiRequest(
        shapeQuery(MAL_MANGA_RANKING, mangaRankOpts, MangaFields)
      ).catch((err) => {
        throw err
      })
      return shapeDataList<Manga>(data.data, this.getMangaDetail)
    },
  }
}

export default initManga
