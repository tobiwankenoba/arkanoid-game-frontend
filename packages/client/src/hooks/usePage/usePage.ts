import { Store } from '@reduxjs/toolkit'
import { useEffect } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux'

import { TPageInitArgs, TPageInitContext } from '@/router/routes'
import {
  setPageHasBeenInitializedOnServer,
  selectPageHasBeenInitializedOnServer,
} from '@/slices/ssrSlice/ssrSlice'

const getCookie = (name: string) => {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
        // eslint-disable-next-line
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)'
    )
  )
  return matches ? decodeURIComponent(matches[1]) : undefined
}

const createContext = (): TPageInitContext => ({
  clientToken: getCookie('token'),
})

type TPageProps = {
  initPage: (data: TPageInitArgs) => Promise<unknown>
}

export const usePage = ({ initPage }: TPageProps) => {
  const dispatch = useDispatch()
  const pageHasBeenInitializedOnServer = useSelector(
    selectPageHasBeenInitializedOnServer
  )
  const store: Store = useStore()

  useEffect(() => {
    if (pageHasBeenInitializedOnServer) {
      dispatch(setPageHasBeenInitializedOnServer(false))
      return
    }
    initPage({ dispatch, state: store.getState(), ctx: createContext() })
  }, [])
}
