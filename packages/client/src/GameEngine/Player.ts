import Game from './Game'
import * as effectTypes from './constants/airdropEffectType'
import { PLATFORM_MARGIN_BOTTOM, PLATFORM_WIDTH } from './constants/game'
import { PLATFOM_IMAGE } from './constants/images'

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
  protected image
  private effects: Map<string, NodeJS.Timeout>

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
    this.image = new Image()
    this.image.src = PLATFOM_IMAGE
    this.effects = new Map()
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
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
  }

  applyEffect(effectType: string, duration: number) {
    switch (effectType) {
      case effectTypes.EFFECT_WIDEPLATFORM:
        this.width = PLATFORM_WIDTH + 20
        break
    }

    // Сбрасываем эффект через duration
    if (this.effects.has(effectType)) {
      clearTimeout(this.effects.get(effectType) as NodeJS.Timeout)
    }

    this.effects.set(
      effectType,
      setTimeout(() => {
        this.removeEffect(effectType)
      }, duration)
    )
  }

  removeEffect(effectType: string) {
    switch (effectType) {
      case effectTypes.EFFECT_WIDEPLATFORM:
        this.width = PLATFORM_WIDTH - 20
        break
    }
    this.effects.delete(effectType)
  }
}
