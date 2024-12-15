import Game from '../Game'

export default class Airdrop {
  protected ctx
  protected canvas
  public x: number
  public y: number
  public width: number
  public height: number
  protected game: Game
  protected speed = 2
  protected visible = false

  constructor(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    game: Game,
    x: number,
    y: number
  ) {
    this.game = game
    this.canvas = canvas
    this.ctx = ctx
    this.width = 30
    this.height = 10
    this.x = x
    this.y = y
  }

  public update() {
    if (this.visible) {
      this.y += 2
    }
  }

  public open() {
    this.visible = true
  }

  public draw() {
    // this.ctx.beginPath();
    this.ctx.fillStyle = this.visible ? 'lightgreen' : 'transparent'
    this.ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}
