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
} from '../../types'
import { shapeAnimeList, shapeAnimeQuery } from '../../util'

const initAnime = (apiRequest: ApiRequest) => {
  return {
    /*
        Get Anime Detail
    */
    async getAnimeDetail(
      animeDetailOpts: AnimeDetailOptions
    ): Promise<AnimeDetail> {
      const { data = null } = await apiRequest(
        shapeAnimeQuery(
          `${MAL_ANIME_URL}/${animeDetailOpts.id}`,
          animeDetailOpts
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
        shapeAnimeQuery(MAL_ANIME_URL, animeOpts)
      ).catch((err) => {
        throw err
      })
      return shapeAnimeList(data.data, this.getAnimeDetail)
    },
    /*
        Get Anime Ranking List
    */
    async getAnimeRanking(
      animeRankOpts: AnimeRankingListOptions
    ): Promise<Anime[]> {
      const { data = null } = await apiRequest(
        shapeAnimeQuery(MAL_ANIME_RANKING, animeRankOpts)
      ).catch((err) => {
        throw err
      })
      return shapeAnimeList(data.data, this.getAnimeDetail)
    },
    /*
        Get Anime Seasonal List
    */
    async getAnimeSeasonal(
      animeSeasonalOpts: AnimeSeasonalListOptions
    ): Promise<Anime[]> {
      const { data = null } = await apiRequest(
        shapeAnimeQuery(
          `${MAL_ANIME_SEASONAL}/${animeSeasonalOpts.year}/${animeSeasonalOpts.season}`,
          animeSeasonalOpts
        )
      ).catch((err) => {
        throw err
      })
      return shapeAnimeList(data.data, this.getAnimeDetail)
    },
  }
}

export default initAnime;
