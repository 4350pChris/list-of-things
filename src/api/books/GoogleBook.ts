export interface ReadingModes {
  text: boolean
  image: boolean
}

export interface PanelizationSummary {
  containsEpubBubbles: boolean
  containsImageBubbles: boolean
}

export interface ImageLinks {
  large?: string
  medium?: string
  small?: string
  smallThumbnail: string
  thumbnail: string
}

export interface VolumeInfo {
  title: string
  authors: string[]
  publisher: string
  publishedDate: string
  description: string
  readingModes: ReadingModes
  pageCount: number
  categories: string[]
  maturityRating: string
  allowAnonLogging: boolean
  contentVersion: string
  panelizationSummary: PanelizationSummary
  imageLinks: ImageLinks
  previewLink: string
  infoLink: string
  canonicalVolumeLink: string
}

export interface ListPrice {
  amount: number
  currencyCode: string
}

export interface RetailPrice {
  amount: number
  currencyCode: string
}

export interface Offer {
  finskyOfferType: number
  listPrice: ListPrice
  retailPrice: RetailPrice
  giftable: boolean
}

export interface SaleInfo {
  country: string
  listPrice: ListPrice
  retailPrice: RetailPrice
  buyLink: string
  offers: Offer[]
}

export interface Epub {
  isAvailable: boolean
  acsTokenLink: string
}

export interface Pdf {
  isAvailable: boolean
}

export interface AccessInfo {
  country: string
  epub: Epub
  pdf: Pdf
  accessViewStatus: string
}

export interface SearchInfo {
  textSnippet: string
}

export interface GoogleBook {
  kind: string
  id: string
  etag: string
  selfLink: string
  volumeInfo: VolumeInfo
  saleInfo: SaleInfo
  accessInfo: AccessInfo
  searchInfo: SearchInfo
}

export interface GoogleBooksLiteResponse {
  kind: string
  totalItems: number
  items: GoogleBook[]
}
