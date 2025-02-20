import { Box } from '@mui/material'
import React, { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useFullscreen } from '@/hooks/useFullscreenTrigger'
import { selectTheme } from '@/selectors/theme'

import Game from '../../../../GameEngine/Game'

interface ICanvasProps {
  width: number
  height: number
}

export const GameCanvas: React.FC<ICanvasProps> = ({ width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const { isFullscreen } = useFullscreen(canvasRef)

  const { theme } = useSelector(selectTheme)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const game = new Game(canvas)
    game.start()

    return () => {
      game.finish()
    }
  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        color: theme === 'black' ? 'white' : 'black',
        backgroundColor: theme === 'black' ? 'black' : 'transparent',
      }}>
      <div className="container-canvas">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          style={{ background: '#82ccdd' }}
        />
        {!isFullscreen && (
          <p>
            <span>
              <b>Enter</b> - для удара по шару
            </span>
            <br />
            <span>
              <b>Пробел</b> - для паузы
            </span>
            <br />
            <span>
              <b>Стрелки влево и вправо</b> - для перемещения платформы
            </span>
            <br />
            <span>
              <b>F12</b> - для перехода в полноэкранный режим
            </span>
          </p>
        )}
      </div>
    </Box>
  )
}
