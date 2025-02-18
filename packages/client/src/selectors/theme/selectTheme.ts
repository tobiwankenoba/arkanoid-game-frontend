import { TApplicationState } from '@/types/redux'
import { IThemeState } from '@/types/themes'

export const selectTheme = (state: TApplicationState): IThemeState => {
  return state.theme
}
