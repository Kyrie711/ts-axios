import { AxiosRequestConfig, Method } from './types'

const defaults: AxiosRequestConfig = {
  method: 'get',

  timeout: 3000,

  headers: {
    common: {
      Accept: 'application/json, text/plain, */*',
    },
  },

  xsrfCookieName: 'XSRF-TOKEN',

  xsrfHeaderName: 'X-XSRF-TOKEN',
}

const methodsNoData: Method[] = ['delete', 'get', 'head', 'options']

methodsNoData.forEach((method) => {
  defaults.headers[method] = {}
})

const methodsWithData: Method[] = ['post', 'put', 'patch']

methodsWithData.forEach((method) => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded',
  }
})

export default defaults
