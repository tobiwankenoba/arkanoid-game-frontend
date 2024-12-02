import Game from './Game'
import { PLATFORM_MARGIN_BOTTOM, PLATFORM_WIDTH } from './constants/game'

export default class Ball {
  protected ctx
  protected game
  protected canvas
  public x!: number
  public y!: number
  public radius: number
  protected speed: number
  protected angle!: number
  public dx!: number
  public dy!: number
  protected collided!: boolean
  protected isStoped = true

  constructor(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    game: Game
  ) {
    this.game = game
    this.canvas = canvas
    this.ctx = ctx
    this.radius = 5
    this.speed = 4
    this.reset()
  }

  public reset() {
    this.collided = false
    this.x = this.canvas.width / 2
    this.y = this.canvas.height - (PLATFORM_MARGIN_BOTTOM + this.radius)
    this.angle = Math.PI / 8
    this.dy = this.speed * Math.cos(this.angle)
    this.dx = this.speed * Math.sin(this.angle)
  }

  public update() {
    if (!this.isStoped) {
      this.x += this.dx
      this.y += this.dy
      if (
        this.x - this.radius <= 0 ||
        this.x + this.radius >= this.canvas.width
      )
        this.dx = -this.dx
      if (this.y - this.radius <= 0) this.dy = -this.dy
      if (this.collided) {
        this.dy = -Math.abs(this.dy)
        this.collided = false // Сбрасываем флаг столкновения
      }
    } else {
      const playerHalfWidth = PLATFORM_WIDTH / 2
      if (
        this.game.keyBoardKeys.has('ArrowLeft') &&
        this.x >= playerHalfWidth
      ) {
        this.x -= 5
      }
      if (
        this.game.keyBoardKeys.has('ArrowRight') &&
        this.x + this.radius <= this.canvas.width - playerHalfWidth
      ) {
        this.x += 5
      }
    }
  }

  public move() {
    this.isStoped = false
  }

  public stop() {
    this.isStoped = true
  }

  public setCollide() {
    this.collided = true
  }

  public draw() {
    this.ctx.beginPath()
    this.ctx.fillStyle = 'red'
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
    this.ctx.fill()
    this.ctx.closePath()
  }
}
