/* eslint-disable camelcase */

export interface Movie {
  poster_path: string
  popularity: number
  vote_count: number
  video: boolean
  media_type: string
  id: number
  adult: boolean
  backdrop_path: string
  original_language: string
  original_title: string
  genre_ids: number[]
  title: string
  vote_average: number
  overview: string
  release_date: string
}

export interface Account {
  gravatar_hash: string
  name: string
  username: string
  id: string
}

export interface BaseList {
  account_object_id: string
  adult: number
  average_rating: number
  backdrop_path: string
  created_at: string
  description: string
  featured: number
  id: number
  iso_3166_1: string
  iso_639_1: string
  name: string
  number_of_items: number
  public: number
  revenue: string
  runtime: number
  sort_by: number
  updated_at: string
}

export interface DetailList {
  average_rating: number
  backdrop_path: string
  comments: Record<string, string | null>
  created_by: Account
  description: string
  id: number
  iso_3166_1: string
  iso_639_1: string
  name: string
  object_ids: Record<string, string>
  page: number
  poster_path: string | null
  public: boolean
  results: Movie[]
  revenue: number
  runtime: number
  sort_by: string
  total_pages: number
  total_results: number
}
