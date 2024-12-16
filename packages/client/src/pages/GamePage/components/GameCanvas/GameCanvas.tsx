import React, { useRef, useEffect } from 'react'

import Game from '../../../../GameEngine/Game'

interface ICanvasProps {
  width: number
  height: number
}

export const GameCanvas: React.FC<ICanvasProps> = ({ width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

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
    <div className="container-canvas">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{ background: '#82ccdd' }}
      />
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
      </p>
    </div>
  )
}
