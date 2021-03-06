export enum GenericFields {
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
  pictures,
  background,
  related_anime,
  related_manga,
  recommendations,
  statistics,
  'my_list_status{priority,comments}',
}

export enum AnimeSpecificFields {
  num_episodes = 22,
  start_season,
  broadcast,
  source,
  average_episode_duration,
  rating,
  studios,
  // For User List only
  list_status,
}

export enum MangaSpecificFields {
  num_volumes = 22,
  num_chapters,
  'authors{first_name,last_name}',
  'serialization{name}',
}
export const AnimeFields = { ...GenericFields, ...AnimeSpecificFields }
export const MangaFields = { ...GenericFields, ...MangaSpecificFields }

export enum UserFields {
  anime_statistics,
  time_zone,
  is_supporter
}

/*
white	This work is safe for work
gray	This work may be not safe for work
This work is not safe for work
*/
export type NSFWType = 'white' | 'gray' | 'black'

export type AnimeMediaType =
  | 'unknown'
  | 'tv'
  | 'ova'
  | 'movie'
  | 'special'
  | 'ona'
  | 'music'

export type AnimeRankingType =
  | 'all'
  | 'airing'
  | 'upcoming'
  | 'tv'
  | 'ova'
  | 'movie'
  | 'special'
  | 'bypopularity'
  | 'favorite'

export type AnimeSeason = 'winter' | 'spring' | 'summer' | 'fall'

export type AnimeSortType = 'anime_score' | 'anime_num_list_users'

export type AnimeStatus =
  | 'finished_airing'
  | 'currently_airing'
  | 'not_yet_aired'

export type AnimeSource =
  | 'other'
  | 'original'
  | 'manga'
  | '4_koma_manga'
  | 'web_manga'
  | 'digital_manga'
  | 'novel'
  | 'light_novel'
  | 'visual_novel'
  | 'game'
  | 'card_game'
  | 'book'
  | 'picture_book'
  | 'radio'
  | 'music'


export type MangaMediaType =
  | 'unknown'
  | 'manga'
  | 'novel'
  | 'one_shot'
  | 'doujinshi'
  | 'manhwa'
  | 'manhua'
  | 'oel' 

export type MangaRankingType =
  | 'all'
  | 'manga'
  | 'novels'
  | 'oneshots'
  | 'doujin'
  | 'manhwa'
  | 'manhua'
  | 'bypopularity'
  | 'favorite'

export type ForumSortType = | 'recent'

export type AnimeWatchStatus =
  | 'watching'
  | 'completed'
  | 'on_hold'
  | 'dropped'
  | 'plan_to_watch'

export type AnimeListSortType =
  | 'list_score'
  | 'list_updated_at'
  | 'anime_title'
  | 'anime_start_date'
  | 'anime_id' // MAL: Under development


