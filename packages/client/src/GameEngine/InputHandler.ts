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

  function sendNotification(message: string) {
    if (!('Notification' in window)) {
      alert(message)
      return
    }

    if (Notification.permission === 'granted') {
      new Notification(message)
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification(message)
        }
      })
    }
  }

  window.addEventListener('gamepadconnected', (e: GamepadEvent) => {
    sendNotification(`Gamepad connected: ${e.gamepad}`)
  })

  window.addEventListener('gamepaddisconnected', (e: GamepadEvent) => {
    sendNotification(`Gamepad disconnected: ${e.gamepad}`)
  })

  function updateGamepad() {
    const gamepads = navigator.getGamepads ? navigator.getGamepads() : []
    if (gamepads) {
      const gamepad = gamepads[0]
      if (gamepad) {
        if (gamepad.buttons[14].pressed) {
          game.keyBoardKeys.add('ArrowRight')
          if (gamepad.buttons[15].pressed) {
            game.keyBoardKeys.add('ArrowLeft')
          }
          const leftStickX = gamepad.axes[0]
          if (leftStickX < -0.5) {
            ball.move()
          } else if (leftStickX > 0.5) {
            ball.move()
          }
        }
      }
    }
  }

  function gameLoop() {
    updateGamepad()
    requestAnimationFrame(gameLoop)
  }

  gameLoop()
}

export default inputHandler
