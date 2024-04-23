import { Url } from 'next/dist/shared/lib/router/router'
import Router from 'next/router'

export const jump = (url?: Url, type = '_blank') => {
  if (url == null) {
    return
  }
  if (typeof url === 'string' && url.startsWith('http')) {
    window.open(url, type)
  } else {
    Router.push(url)
  }
}
