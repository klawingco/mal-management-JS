import {
  NSFWType,
  AnimeMediaType,
  AnimeStatus,
  AnimeSeason,
  AnimeSource,
} from '.'
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

// Interfaces

export interface Anime extends AnimeDetail {
  // Functions
  getDetail: (opts?: DetailOptions) => Promise<AnimeDetail>
}

export interface AnimeDetail {
  id: number
  title: string
  main_picture: {
    medium: string
    large: string
  }
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
  media_type?: AnimeMediaType
  status?: AnimeStatus
  my_list_status?: object //TODO. Only available when Authorization
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
  // Only available at detailed endpoint
  pictures?: Picture[]
  background?: string
  related_anime?: object[] // TODO recursive
  related_manga?: object[]
  recommendations?: object[]
  statistics?: object
}


