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
  thumbNail: string
}

const ajaxHTTPRequester = (options: RequestArgs): Promise<Array<Thumbnail>> => {
  const { url, method, data } = options
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    //error listener handlrer
    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState !== 4) return
      if (xhr.status >= 200 && xhr.status < 300) {
        const jsonConvertion: Array<Thumbnail> = JSON.parse(xhr.responseText) //as any http request it would need to parse the json
        resolve(jsonConvertion)
      } else {
        ///error from http request and show alert
        const errorMessage = xhr.statusText || 'An error happended on the request'
        reject(errorMessage)
      }
    })
    xhr.open(method || 'GET', url)

    xhr.setRequestHeader('content-type', 'application/json;charset=utf-8')

    xhr.send(JSON.stringify(data))
  })
}

export { ajaxHTTPRequester }
