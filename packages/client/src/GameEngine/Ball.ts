import Game from './Game'
import * as effectTypes from './constants/airdropEffectType'
import { PLATFORM_MARGIN_BOTTOM, PLATFORM_WIDTH } from './constants/game'

export default class Ball {
  protected ctx
  protected game
  protected canvas
  public x!: number
  public y!: number
  public radius: number
  public speed: number
  protected angle!: number
  public dx!: number
  public dy!: number
  protected collided!: boolean
  protected isStoped = true
  private effects: Map<string, NodeJS.Timeout>

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
    this.effects = new Map()
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

  public update(): void {
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

  applyEffect(effectType: string, duration: number) {
    switch (effectType) {
      case effectTypes.EFFECT_RAPIDBALL:
        this.speed = 6
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
      case effectTypes.EFFECT_RAPIDBALL:
        this.speed = 4
        break
    }
    this.effects.delete(effectType)
  }
}
