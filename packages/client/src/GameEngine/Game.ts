import Ball from './Ball'
import Brick from './Brick'
import inputHandler from './InputHandler'
import Player from './Player'

const bricksPosition = [
  { x: 0, y: 150 },
  { x: 61, y: 150 },
  { x: 102, y: 150 },
  { x: 143, y: 150 },
  { x: 184, y: 150 },
  { x: 264, y: 150 },
  { x: 264, y: 129 },
  { x: 305, y: 129 },
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

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.ball = this.ctx && new Ball(this.ctx, this.canvas, this)
    this.player = this.ctx && new Player(this.ctx, this.canvas, this)
    this.bricks = new Set(
      bricksPosition.map(
        ({ x, y }) => new Brick(this.ctx!, this.canvas, this, x, y)
      )
    )
    this.keyBoardKeys = new Set()
    if (this.ball) inputHandler(this, this.ball)
  }

  animate = () => {
    this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.draw()
    this.update()
    requestAnimationFrame(this.animate)
  }

  protected checkCollision(ball: Ball, player: Player) {
    return (
      ball.x + ball.radius >= player.x && // правая сторона мяча касается левой стороны ракетки
      ball.x - ball.radius <= player.x + player.width && // левая сторона мяча касается правой стороны ракетки
      ball.y + ball.radius >= player.y // нижняя часть мяча касается верхней части ракетки
    )
  }

  protected draw() {
    if (this.isGameOver) {
      this.drawGameOver()
      return
    }

    this.ball?.draw()

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
          this.bricks.delete(brick)
          this.score += 100
        }
      })
      if (this.bricks.size === 0) {
        this.endGame()
        return
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
