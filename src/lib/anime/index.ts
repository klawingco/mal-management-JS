import {
  MAL_ANIME_URL,
  MAL_ANIME_RANKING,
  MAL_ANIME_SEASONAL,
  MAL_USER_URL,
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
  UserAnimeListOptions,
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
    /*
        Get User Anime List
    */
    async getUserAnime(opts: UserAnimeListOptions): Promise<Anime[]> {
      const optFields = opts?.fields || [] 
      const sort = opts?.sort || 'list_updated_at'
      const { data = null } = await apiRequest(
        shapeQuery(
          `${MAL_USER_URL}/@me/animelist`,
          {
            ...opts,
            sort,
            fields: [
              ...optFields,
              AnimeFields['my_list_status{priority,comments}'],
            ],
          },
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
