import { useState, useCallback, useEffect } from 'react'

export function useFullscreen(
  ref: React.RefObject<HTMLElement>,
  toggleKey = 'F12'
) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const enableFullscreen = useCallback(() => {
    const element = ref.current
    if (element && !document.fullscreenElement) {
      element.requestFullscreen?.().then(() => setIsFullscreen(true))
    }
  }, [ref])

  const exitFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen?.().then(() => setIsFullscreen(false))
    }
  }, [])

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      enableFullscreen()
    } else {
      exitFullscreen()
    }
  }, [enableFullscreen, exitFullscreen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === toggleKey) {
        toggleFullscreen()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [toggleFullscreen, toggleKey])

  return { isFullscreen }
}
