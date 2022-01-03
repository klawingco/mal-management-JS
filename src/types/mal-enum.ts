export enum AnimeFields {
  alternative_titles,
  start_date,
  end_date,
  synopsis,
  mean,
  rank,
  popularity,
  num_list_users,
  num_scoring_users,
  nsfw,
  created_at,
  media_type,
  status,
  genres,
  my_list_status,
  num_episodes,
  start_season,
  broadcast,
  source,
  average_episode_duration,
  rating,
  pictures,
  background,
  related_anime,
  related_manga,
  recommendations,
  studios,
  statistics  
}

export type AnimeRankingType = 'all' | 'airing' |'upcoming' |'tv' |'ova' |'movie' | 'special' |'bypopularity' |'favorite'

export type AnimeSeason = 'winter' | 'spring' | 'summer' | 'fall'

export type AnimeSortType = 'anime_score' | 'anime_num_list_users'