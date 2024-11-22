import { RouteObject } from 'react-router-dom'

import { AuthPage } from '@/pages/AuthPage'
import { ForumPage } from '@/pages/ForumPage'
import { ForumTopicPage } from '@/pages/ForumTopicPage'
import { GamePage } from '@/pages/GamePage'
import { HomePage } from '@/pages/HomePage'
import { LeaderboardPage } from '@/pages/LeaderboardPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { ServerErrorPage } from '@/pages/ServerErrorPage'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/game',
    element: <GamePage />,
  },
  {
    path: '/leaderboard',
    element: <LeaderboardPage />,
  },
  {
    path: '/login',
    element: <AuthPage type="login" />,
  },
  {
    path: '/register',
    element: <AuthPage type="register" />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
  {
    path: '/forum',
    element: <ForumPage />,
  },
  {
    path: '/forum/topic/:id',
    element: <ForumTopicPage />,
  },
  {
    path: '/500',
    element: <ServerErrorPage />,
  },
  {
    path: '/404',
    element: <NotFoundPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]
