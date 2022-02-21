export type PosterWidth = 92 | 154 | 185 | 342 | 500 | 780 | 'original'

export type BackdropWidth = 300 | 780 | 1280 | 'original'

export function getImageURL(width: PosterWidth | BackdropWidth, path: string) {
  const w = typeof width === 'number' ? 'w' + width : width
  return `https://image.tmdb.org/t/p/${w}${path}`
}
