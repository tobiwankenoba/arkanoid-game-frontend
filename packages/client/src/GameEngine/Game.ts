import Airdrop from './Airdrops/Airdrop'
import Ball from './Ball'
import Brick from './Bricks/Brick'
import BrickBush from './Bricks/BrickBush'
import BrickForced from './Bricks/BrickForced'
import BrickIce from './Bricks/BrickIce'
import inputHandler from './InputHandler'
import Player from './Player'
import LEVELS from './constants/levels'

const bricksPosition = [
  { x: 0, y: 150, BrickConstructor: Brick },
  { x: 61, y: 150, BrickConstructor: Brick },
  { x: 102, y: 150, BrickConstructor: BrickForced },
  { x: 143, y: 150, BrickConstructor: BrickForced },
  { x: 184, y: 150, BrickConstructor: BrickForced },
  { x: 264, y: 150, BrickConstructor: BrickIce },
  { x: 264, y: 129, BrickConstructor: BrickBush },
  { x: 305, y: 129, BrickConstructor: BrickIce },
]

export default class Game {
  protected canvas
  protected ctx
  protected ball
  protected isPause = false
  public player
  public bricks: Set<Brick>
  public keyBoardKeys: Set<string>
  protected lastTime = 0
  public score = 0
  protected lives = 3
  protected isGameOver = false
  protected lastUpdateTime = 0
  protected currentLevel = 0
  public airdrops: Airdrop[] = []

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.ball = this.ctx && new Ball(this.ctx, this.canvas, this)
    this.player = this.ctx && new Player(this.ctx, this.canvas, this)
    this.bricks = new Set()
    this.loadLevel(this.currentLevel)
    this.keyBoardKeys = new Set()
    if (this.ball) inputHandler(this, this.ball)
  }

  animate = () => {
    // const deltaTime = this.lastUpdateTime
    // ? (currentTime - this.lastUpdateTime) / 1000 // В секундах
    // : 0;
    // this.lastUpdateTime = currentTime;
    this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.draw()
    this.update()
    requestAnimationFrame(this.animate)
  }

  // protected checkCollision(ball: Ball, player: Player) {
  //   return (
  //     ball.x + ball.radius >= player.x && // правая сторона мяча касается левой стороны ракетки
  //     ball.x - ball.radius <= player.x + player.width && // левая сторона мяча касается правой стороны ракетки
  //     ball.y + ball.radius >= player.y // нижняя часть мяча касается верхней части ракетки
  //   )
  // }

  checkCollision(ball: Ball, player: Player): void {
    const ballBottom = ball.y + ball.radius
    const playerTop = player.y
    const playerLeft = player.x
    const playerRight = player.x + player.width

    if (
      ballBottom >= playerTop && // Мяч касается верхней части платформы
      ball.x >= playerLeft && // Мяч находится в пределах платформы по горизонтали
      ball.x <= playerRight
    ) {
      // Рассчитываем позицию удара относительно центра платформы
      const hitPosition = (ball.x - player.x) / player.width // Значение от 0 до 1
      const angle = Math.PI / 4 // Максимальный угол отклонения (45 градусов)

      // Рассчитываем новый угол
      const newAngle = angle * (2 * hitPosition - 1) // От -PI/4 (лево) до PI/4 (право)

      // Перенаправляем мяч
      ball.dy = -Math.abs(ball.speed * Math.cos(newAngle)) // Вертикальная скорость
      ball.dx = ball.speed * Math.sin(newAngle) // Горизонтальная скорость
    }
  }

  protected loadLevel(levelIndex: number): void {
    this.bricks.clear()
    const level = LEVELS[levelIndex]
    level.forEach(({ x, y, BrickConstructor, airdrop }) => {
      const newAirdrop =
        airdrop != null ? new Airdrop(this.ctx!, this.canvas, this, x, y) : null

      const brick = new BrickConstructor(
        this.ctx!,
        this.canvas,
        this,
        x,
        y,
        newAirdrop
      )
      this.bricks.add(brick)
    })
  }

  protected draw() {
    if (this.isGameOver) {
      this.drawGameOver()
      return
    }

    this.ball?.draw()

    this.airdrops.forEach(airdrop => {
      airdrop.draw()
    })

    this.bricks.forEach(brick => {
      brick?.draw()
    })

    this.player?.draw()
    this.ctx?.fillText(`SCORE: ${this.score}`, 15, 15)
    this.drawLifeLine()
  }

  protected update() {
    if (!this.isPause) {
      this.ball?.update()
      this.player?.update()
      this.bricks.forEach(brick => {
        if (
          this.ball &&
          brick?.checkCollision(this.ball.x, this.ball.y, this.ball.radius) !=
            null
        ) {
          brick?.update(this.ball)
          if (brick.isDestroyed) {
            this.bricks.delete(brick)
            this.score += 100
          }
        }
      })

      this.airdrops.forEach(airdrop => {
        airdrop.update()
      })

      if (this.bricks.size === 0) {
        if (this.currentLevel < LEVELS.length - 1) {
          this.currentLevel += 1
          this.loadLevel(this.currentLevel)
          this.resetGameSet()
          return
        } else {
          this.endGame()
          return
        }
      }

      if (this.checkBallIsOut()) {
        this.lives -= 1
        this.ball?.stop()
        this.resetGameSet()
        if (this.lives === 0) {
          this.endGame()
          return
        }
      }

      if (
        this.ball &&
        this.player &&
        this.checkCollision(this.ball, this.player)
      ) {
        this.ball.setCollide()
      }
    }
  }

  protected checkBallIsOut() {
    return this.ball && this.ball.y - this.ball.radius >= this.canvas.height
  }

  protected resetGameSet() {
    this.ball?.reset()
    this.ball?.stop()
    this.player = this.ctx && new Player(this.ctx, this.canvas, this)
  }

  protected drawGameOver() {
    if (this.ctx) {
      this.ctx.fillStyle = 'blue'
      this.ctx.font = '24px Arial'
      const message = this.lives === 0 ? 'Game Over' : 'You Win!'
      this.ctx.fillText(
        message,
        this.canvas.width / 2 - 50,
        this.canvas.height / 2
      )
      this.ctx.fillText(
        `Final Score: ${this.score}`,
        this.canvas.width / 2 - 50,
        this.canvas.height / 2 + 30
      )
    }
  }

  protected drawLifeLine() {
    const rightMargin = 0
    const delta = 8
    for (let i = 0; i <= this.lives; i += 1) {
      const rectStart = this.canvas.width - (rightMargin + delta * i)
      this.ctx?.fillRect(rectStart, 5, 5, 10)
    }
  }

  protected endGame() {
    this.isGameOver = true
  }

  public start() {
    this.animate()
  }

  public pause() {
    this.isPause = !this.isPause
    if (this.isPause) {
      this.ball?.stop()
      return
    }
    this.ball?.move()
  }

  public finish() {
    if (this.ctx != null) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
  }
}
