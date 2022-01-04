import {
  NSFWType,
  AnimeMediaType,
  AnimeStatus,
  AnimeSeason,
  AnimeSource,
  MangaMediaType,
} from './mal-enum'
import { DetailOptions } from './mal-api'

// Shared interfaces
interface GenericIdToName {
  id: number
  name: string
}

export interface Picture {
  large?: string
  medium: string
}

export type AlternativeTitle = {
  synonyms?: string[]
  en?: string
  ja?: string
}

export interface Genre extends GenericIdToName {}
export interface Studio extends GenericIdToName {}

export interface GenericDetail {
  id: number
  title: string
  main_picture: Picture
  alternative_titles?: AlternativeTitle
  start_date?: Date
  end_date?: Date
  sypnosis?: string
  mean?: number
  rank?: number
  popularity?: number
  num_list_users?: number
  num_scoring_users?: number
  nsfw?: NSFWType
  genres?: Genre[]
  created_at?: Date
  updated_at?: Date
  status?: AnimeStatus
  // Only available at detailed endpoint
  pictures?: Picture[]
  background?: string
  related_anime?: object[] // TODO recursive
  related_manga?: object[]
  recommendations?: object[]
  statistics?: object

  my_list_status?: object //TODO. Only available when Authorization
}

// Interfaces
export interface AnimeDetail extends GenericDetail {
  media_type?: AnimeMediaType,

  num_episodes?: number
  start_season?: {
    year: number
    season: AnimeSeason
  }
  broadcast?: {
    day_of_the_week: string
    start_time?: string
  }
  source?: AnimeSource
  average_episode_duration?: number
  rating?: string // TODO Typescript declaration
  studios?: Studio[]
}

export interface MangaDetail extends GenericDetail {
  media_type?: MangaMediaType
  num_volumes: number
  num_chapters: number
  authors: object // TODO Typescript declaration
  serialization: object /// TODO Typescript declaration
}

export interface Anime extends AnimeDetail {
  // Functions
  getDetail: (opts?: DetailOptions) => Promise<AnimeDetail>
}

export interface Manga extends MangaDetail {
  // Functions
  getDetail: (opts?: DetailOptions) => Promise<MangaDetail>
}



