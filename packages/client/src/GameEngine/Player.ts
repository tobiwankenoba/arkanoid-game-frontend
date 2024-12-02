import Game from './Game'
import { PLATFORM_MARGIN_BOTTOM, PLATFORM_WIDTH } from './constants/game'
export default class Player {
  protected ctx
  protected canvas
  public x: number
  public y: number
  public width: number
  public height: number
  protected game: Game
  public life = 3
  protected speed = 5

  constructor(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    game: Game
  ) {
    this.game = game
    this.canvas = canvas
    this.ctx = ctx
    this.width = PLATFORM_WIDTH
    this.height = 10
    this.x = (this.canvas.width - this.width) / 2
    this.y = this.canvas.height - PLATFORM_MARGIN_BOTTOM
  }

  public update() {
    if (this.game.keyBoardKeys.has('ArrowLeft') && this.x >= 0) {
      this.x -= this.speed
    }
    if (
      this.game.keyBoardKeys.has('ArrowRight') &&
      this.x + this.width <= this.canvas.width
    ) {
      this.x += this.speed
    }
  }

  public draw() {
    this.ctx.fillStyle = 'blue'
    this.ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}
