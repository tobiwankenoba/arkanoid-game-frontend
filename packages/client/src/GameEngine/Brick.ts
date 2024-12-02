import Ball from './Ball'
import Game from './Game'

export default class Brick {
  protected ctx
  protected canvas
  public x: number
  public y: number
  public width: number
  public height: number
  public isDestroyed: boolean
  protected game: Game

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
    this.x = x
    this.y = y
    this.width = 40
    this.height = 20
    this.isDestroyed = false
  }

  public update(ball: Ball): void {
    const collisionSide = this.checkCollision(ball.x, ball.y, ball.radius)
    if (collisionSide) {
      this.isDestroyed = true // Уничтожаем кирпич
      switch (collisionSide) {
        case 'top':
        case 'bottom':
          ball.dy = -ball.dy // Меняем вертикальное направление
          break
        case 'left':
        case 'right':
          ball.dx = -ball.dx // Меняем горизонтальное направление
          break
      }
    }
  }

  public checkCollision(
    ballX: number,
    ballY: number,
    ballRadius: number
  ): 'top' | 'bottom' | 'left' | 'right' | null {
    if (
      ballX + ballRadius > this.x &&
      ballX - ballRadius < this.x + this.width &&
      ballY + ballRadius > this.y &&
      ballY - ballRadius < this.y + this.height
    ) {
      const overlapTop = Math.abs(ballY + ballRadius - this.y) // Верхняя сторона
      const overlapBottom = Math.abs(
        ballY - ballRadius - (this.y + this.height)
      ) // Нижняя сторона
      const overlapLeft = Math.abs(ballX + ballRadius - this.x) // Левая сторона
      const overlapRight = Math.abs(ballX - ballRadius - (this.x + this.width)) // Правая сторона

      // Найти минимальное перекрытие
      const minOverlap = Math.min(
        overlapTop,
        overlapBottom,
        overlapLeft,
        overlapRight
      )

      if (minOverlap === overlapTop) return 'top'
      if (minOverlap === overlapBottom) return 'bottom'
      if (minOverlap === overlapLeft) return 'left'
      if (minOverlap === overlapRight) return 'right'
    }

    return null // Нет столкновения
  }

  public draw() {
    if (!this.isDestroyed) {
      this.ctx.fillStyle = 'orange'
    } else {
      this.ctx.fillStyle = 'red'
    }
    this.ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}
