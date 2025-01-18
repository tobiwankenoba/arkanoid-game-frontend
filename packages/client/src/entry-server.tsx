import { renderToString } from 'react-dom/server'

import SSRComponent from '@/SSRComponent'

export const render = () => renderToString(<SSRComponent />)
