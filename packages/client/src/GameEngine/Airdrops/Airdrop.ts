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
  protected image
  public effectType: string
  public duration: number
  public isActive: boolean

  constructor(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    game: Game,
    x: number,
    y: number,
    effectType: string,
    duration: number,
    imageSrc: string
  ) {
    this.game = game
    this.canvas = canvas
    this.ctx = ctx
    this.width = 20
    this.height = 20
    this.x = x
    this.y = y
    this.image = new Image()
    this.image.src = imageSrc
    this.effectType = effectType
    this.duration = duration
    this.isActive = true
  }

  public update() {
    if (this.visible) {
      this.y += this.speed
    }
  }

  public open() {
    this.visible = true
  }

  public draw() {
    if (this.visible)
      this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
  }
}
