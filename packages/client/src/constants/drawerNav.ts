import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ForumIcon from '@mui/icons-material/Forum'
import HomeIcon from '@mui/icons-material/Home'
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset'

import { ROUTES } from './routes'

export const DRAWER_NAVIGATION_LINKS = [
  {
    title: 'Profile',
    url: ROUTES.profile,
    Icon: AccountCircleIcon,
  },
  {
    title: 'Game',
    url: ROUTES.game,
    Icon: VideogameAssetIcon,
  },
  {
    title: 'Main',
    url: ROUTES.home,
    Icon: HomeIcon,
  },
]

export const DRAWER_NAVIGATION_LINKS_TOPIC_PAGE = [
  ...DRAWER_NAVIGATION_LINKS,
  {
    title: 'Forum',
    url: ROUTES.forum,
    Icon: ForumIcon,
  },
]
