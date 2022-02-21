import { apiBasePath } from './common'
import { GoogleBooksLiteResponse, GoogleBook } from './GoogleBook'

const searchApiPath = apiBasePath + '/volumes'

const key = process.env.VUE_APP_GOOGLE_API_KEY

function replaceHTTP(book: GoogleBook) {
  const links = book.volumeInfo.imageLinks
  if (links) {
    const https = Object.entries(links).map(([k, v]) => [k, (v as string).replace('http://', 'https://')])
    book.volumeInfo.imageLinks = Object.fromEntries(https)
  }
  return book
}

export function query(value: string, paging?: { startIndex: number; maxResults: number }) {
  let url = `${searchApiPath}?q=${encodeURI(value)}&key=${key}`
  if (paging) {
    url = Object.entries(paging).reduce((acc, [key, value]) => `${acc}&${key}=${value}`, url)
  }
  return fetch(url)
    .then(res => res.json() as Promise<GoogleBooksLiteResponse>)
    .then(res => ({ ...res, items: res.items?.map(book => replaceHTTP(book)) }))
}

export function getById(id: string) {
  return fetch(`${searchApiPath}/${id}`)
    .then(res => res.json() as Promise<GoogleBook>)
    .then(book => replaceHTTP(book))
}
