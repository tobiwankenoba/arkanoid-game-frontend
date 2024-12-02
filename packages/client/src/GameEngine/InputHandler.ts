import Ball from './Ball'
import Game from './Game'

function inputHandler(game: Game, ball: Ball) {
  window.addEventListener('keydown', (e: KeyboardEvent) => {
    e.preventDefault()
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      game.keyBoardKeys.add(e.key)
    }
    if (e.code === 'Space') {
      game.pause()
    }

    if (e.code === 'Enter') {
      console.log('Ball', ball)
      ball.move()
    }
  })
  window.addEventListener('keyup', (e: KeyboardEvent) => {
    e.preventDefault()
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      game.keyBoardKeys.clear()
    }
  })
}

export default inputHandler
