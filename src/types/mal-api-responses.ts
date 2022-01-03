import { DetailOptions } from "./mal-api";

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
} 

export type AlternativeTitle = {
    synonyms?: string[]
    en?: string 
    ja?: string
}

