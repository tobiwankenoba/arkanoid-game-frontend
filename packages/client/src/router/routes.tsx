import { RouteObject } from 'react-router-dom'

import { ROUTES } from '@/constants/routes'
import { ForumPage } from '@/pages/ForumPage'
import { ForumTopicPage } from '@/pages/ForumTopicPage'
import { GamePage } from '@/pages/GamePage'
import { HomePage } from '@/pages/HomePage'
import { LeaderboardPage } from '@/pages/LeaderboardPage'
import { LoginPage } from '@/pages/LoginPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { RegisterPage } from '@/pages/RegisterPage'
import { ServerErrorPage } from '@/pages/ServerErrorPage'

import { PrivateRoute } from './privateRoute'

export const routes: RouteObject[] = [
  {
    path: ROUTES.home,
    element: <HomePage />,
  },
  {
    path: ROUTES.game,
    element: <GamePage />,
  },
  {
    path: ROUTES.leaderboard,
    element: <LeaderboardPage />,
  },
  {
    path: ROUTES.login,
    element: <LoginPage />,
  },
  {
    path: ROUTES.register,
    element: <RegisterPage />,
  },
  {
    path: ROUTES.profile,
    element: (
      <PrivateRoute>
        <ProfilePage />
      </PrivateRoute>
    ),
  },
  {
    path: ROUTES.forum,
    element: (
      <PrivateRoute>
        <ForumPage />
      </PrivateRoute>
    ),
  },
  {
    path: ROUTES.forumTopic,
    element: (
      <PrivateRoute>
        <ForumTopicPage />
      </PrivateRoute>
    ),
  },
  {
    path: ROUTES.serverError,
    element: <ServerErrorPage />,
  },
  {
    path: ROUTES.notFound,
    element: <NotFoundPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]
