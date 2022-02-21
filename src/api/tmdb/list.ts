import { DetailList } from './models'
import { apiBasePath, makeHeader, handleResponse } from './common'

export type ListCreationOptions = {
  name: string
  iso_639_1: string
  description?: string
  iso_3166_1?: string
  public?: boolean
}

export type ListUpdateOptions = {
  id: number
  name?: string
  description?: string
  public?: boolean
  sort_by?: SortValues
  ascending?: boolean
}

export type Item = { media_type: 'movie' | 'tv'; media_id: number }

export type SortValues = 'original_order' | 'vote_average' | 'primary_release_date' | 'title'

export const sortValues: { text: string; value: SortValues }[] = [
  { text: 'Original Order', value: 'original_order' },
  { text: 'Vote Average', value: 'vote_average' },
  { text: 'Primary Release Date', value: 'primary_release_date' },
  { text: 'Title', value: 'title' }
]

const apiPath = apiBasePath + '4/list'

export function getList(options: { token: string; id: number }): Promise<DetailList> {
  return fetch([apiPath, options.id].join('/'), { headers: makeHeader(options.token) }).then(r => handleResponse(r))
}

export function createList(options: { token: string; list: ListCreationOptions }): Promise<number> {
  return fetch(apiPath, {
    headers: makeHeader(options.token),
    body: JSON.stringify(options.list),
    method: 'POST'
  }).then(r => handleResponse(r, 'id'))
}

export function changeList(options: { token: string; list: ListUpdateOptions }) {
  const body = {
    name: options.list.name,
    description: options.list.description,
    public: options.list.public,
    sort_by: [options.list.sort_by, options.list.ascending ? 'asc' : 'desc'].join('.')
  }
  return fetch([apiPath, options.list.id].join('/'), {
    headers: makeHeader(options.token),
    body: JSON.stringify(body),
    method: 'PUT'
  }).then(r => handleResponse(r))
}

export function deleteList(options: { token: string; id: number }) {
  return fetch([apiPath, options.id].join('/'), {
    headers: makeHeader(options.token),
    body: JSON.stringify({ list_id: options.id }),
    method: 'DELETE'
  }).then(r => handleResponse(r))
}

export function changeItems(method: 'POST' | 'DELETE', options: { token: string; id: number; items: Item[] }) {
  return fetch([apiPath, options.id, 'items'].join('/'), {
    headers: makeHeader(options.token),
    body: JSON.stringify({ items: options.items }),
    method
  }).then(r => handleResponse(r))
}

export function commentItem(options: { token: string; id: number; items: (Item & { comment: string })[] }) {
  return fetch([apiPath, options.id, 'items'].join('/'), {
    headers: makeHeader(options.token),
    body: JSON.stringify({ items: options.items }),
    method: 'PUT'
  }).then(r => handleResponse(r))
}
