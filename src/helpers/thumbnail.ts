import { type PaginatedThumbnails, type Thumbnail } from '../types/index'
import { ajaxHTTPRequester } from './ajax'

const getAllThumbnails = async (): Promise<Array<Thumbnail>> => {
  const thumbnailsApiUrl = 'https://jsonplaceholder.typicode.com/photos'

  const requestObj = {
    url: thumbnailsApiUrl,
    method: 'GET'
  }
  const data: Array<Thumbnail> = await ajaxHTTPRequester(requestObj)

  return data
}

const getPaginatedThumbnails = async (): Promise<PaginatedThumbnails> => {
  const paginatedThumbnails = pagination(await getAllThumbnails(), 25)
  return paginatedThumbnails
}

const pagination = (
  arrayData: Array<Thumbnail>,
  elementsPerPage: number,
  currentPage: number = 0
): Promise<PaginatedThumbnails> => {
  const totalPages = arrayData.length / elementsPerPage
  // if (method === '+') {
  //   currentPage++
  //   const newPageElements = arrayData.slice(currentPage, elementsPerPage)
  //   return {
  //     pages: totalPages,
  //     currentPage,
  //     elements: arrayData.slice(currentPage, elementsPerPage)
  //   }
  // }

  // if (method === '-') {
  //   currentPage--
  //   const newPageElements = arrayData.slice(currentPage, elementsPerPage)
  //   return {
  //     pages: totalPages,
  //     currentPage,
  //     elements: arrayData.slice(currentPage, elementsPerPage)
  //   }
  // }

  return { pages: totalPages, currentPage, elements: arrayData.slice(currentPage, elementsPerPage) }
}

export { getAllThumbnails, pagination, getPaginatedThumbnails }
