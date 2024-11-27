import { useCallback, useState } from 'react'

export const useToggleState = (initialValue = false) => {
  const [state, setState] = useState(initialValue)

  const toggle = useCallback(() => {
    setState(previousValue => !previousValue)
  }, [])

  return { state, toggle }
}
