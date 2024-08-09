export interface RequestArgs {
  url: string
  method?: string
  success?: () => object
  error?: () => object
  data?: object
}

export interface Thumbnail {
  albumId: number
  id: number
  title: string
  url: string
  thumbnailUrl: string
}

export interface PaginatedThumbnails {
  pages: number
  currentPage: number
  elements: Array<Thumbnail>
}
