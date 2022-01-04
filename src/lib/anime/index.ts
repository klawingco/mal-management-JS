import {
  MAL_ANIME_URL,
  MAL_ANIME_RANKING,
  MAL_ANIME_SEASONAL,
} from '../../constants'
import {
  ApiRequest,
  Anime,
  AnimeDetail,
  AnimeDetailOptions,
  AnimeListOptions,
  AnimeRankingListOptions,
  AnimeSeasonalListOptions,
  AnimeFields,
} from '../../types'
import { shapeDataList, shapeQuery } from '../../util'

const initAnime = (apiRequest: ApiRequest) => {
  return {
    /*
        Get Anime Detail
    */
    async getAnimeDetail(
      animeDetailOpts: AnimeDetailOptions
    ): Promise<AnimeDetail> {
      const { data = null } = await apiRequest(
        shapeQuery(
          `${MAL_ANIME_URL}/${animeDetailOpts.id}`,
          animeDetailOpts,
          AnimeFields
        )
      ).catch((err) => {
        throw err
      })
      return data
    },
    /*
        Get Anime Lists
    */
    async getAnime(animeOpts: AnimeListOptions): Promise<Anime[]> {
      const { data = null } = await apiRequest(
        shapeQuery(MAL_ANIME_URL, animeOpts, AnimeFields)
      ).catch((err) => {
        throw err
      })
      return shapeDataList<Anime>(data.data, this.getAnimeDetail)
    },
    /*
        Get Anime Ranking List
    */
    async getAnimeRanking(
      animeRankOpts: AnimeRankingListOptions
    ): Promise<Anime[]> {
      const { data = null } = await apiRequest(
        shapeQuery(MAL_ANIME_RANKING, animeRankOpts, AnimeFields)
      ).catch((err) => {
        throw err
      })
      return shapeDataList<Anime>(data.data, this.getAnimeDetail)
    },
    /*
        Get Anime Seasonal List
    */
    async getAnimeSeasonal(
      animeSeasonalOpts: AnimeSeasonalListOptions
    ): Promise<Anime[]> {
      const { data = null } = await apiRequest(
        shapeQuery(
          `${MAL_ANIME_SEASONAL}/${animeSeasonalOpts.year}/${animeSeasonalOpts.season}`,
          animeSeasonalOpts,
          AnimeFields
        )
      ).catch((err) => {
        throw err
      })
      return shapeDataList<Anime>(data.data, this.getAnimeDetail)
    },
  }
}

export default initAnime;
