import { Layout, initLayout } from '@/components/Layout'
import { ROUTES } from '@/constants/routes'
import { ForumPage } from '@/pages/ForumPage'
import { ForumTopicPage } from '@/pages/ForumTopicPage'
import { GamePage } from '@/pages/GamePage'
import { HomePage } from '@/pages/HomePage'
import { LeaderboardPage } from '@/pages/LeaderboardPage'
import { LoginPage } from '@/pages/LoginPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { OAuthCallbackPage } from '@/pages/OAuthCallbackPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { RegisterPage } from '@/pages/RegisterPage'
import { ServerErrorPage } from '@/pages/ServerErrorPage'
import { StartGame } from '@/pages/StartPage'
import { TApplicationState, TDispatch } from '@/types/redux'

import { PrivateRoute } from './privateRoute'

export type TPageInitContext = {
  clientToken?: string
}

export type TPageInitArgs = {
  dispatch: TDispatch
  state: TApplicationState
  ctx: TPageInitContext
}
const initPageWithoutState = () => Promise.resolve()

export const routes = [
  {
    element: <Layout />,
    fetchData: initLayout,
    children: [
      {
        path: ROUTES.home,
        element: <HomePage />,
        fetchData: initLayout,
      },
      {
        path: ROUTES.start,
        element: <StartGame />,
        fetchData: initLayout,
      },
      {
        path: ROUTES.game,
        element: <GamePage />,
        fetchData: initLayout,
      },
      {
        path: ROUTES.leaderboard,
        element: (
          <PrivateRoute>
            <LeaderboardPage />
          </PrivateRoute>
        ),
        fetchData: initLayout,
      },
      {
        path: ROUTES.profile,
        element: (
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        ),
        fetchData: initLayout,
      },
      {
        path: ROUTES.forum,
        element: (
          <PrivateRoute>
            <ForumPage />
          </PrivateRoute>
        ),
        fetchData: initLayout,
      },
      {
        path: ROUTES.forumTopic,
        element: <ForumTopicPage />,
        fetchData: initLayout,
      },
    ],
  },
  {
    path: ROUTES.login,
    element: <LoginPage />,
    fetchData: initPageWithoutState,
  },
  {
    path: ROUTES.register,
    element: <RegisterPage />,
    fetchData: initPageWithoutState,
  },
  {
    path: ROUTES.oauth,
    element: <OAuthCallbackPage />,
    fetchData: initPageWithoutState,
  },
  {
    path: ROUTES.serverError,
    element: <ServerErrorPage />,
    fetchData: initPageWithoutState,
  },
  {
    path: ROUTES.notFound,
    element: <NotFoundPage />,
    fetchData: initPageWithoutState,
  },
  {
    path: '*',
    element: <NotFoundPage />,
    fetchData: initPageWithoutState,
  },
]
