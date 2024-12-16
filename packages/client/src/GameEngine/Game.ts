import Airdrop from './Airdrops/Airdrop'
import Ball from './Ball'
import Brick from './Bricks/Brick'
import inputHandler from './InputHandler'
import Player from './Player'
import * as effectTypes from './constants/airdropEffectType'
import { AIRDROP_GEM } from './constants/images'
import LEVELS from './constants/levels'

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
  protected gem = 0
  protected gemImage
  public airdrops: Airdrop[] = []

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.ball = this.ctx && new Ball(this.ctx, this.canvas, this)
    this.player = this.ctx && new Player(this.ctx, this.canvas, this)
    this.bricks = new Set()
    this.loadLevel(this.currentLevel)
    this.keyBoardKeys = new Set()
    this.gemImage = new Image()
    this.gemImage.src = AIRDROP_GEM
    if (this.ball) inputHandler(this, this.ball)
  }

  animate = () => {
    this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.draw()
    this.update()
    requestAnimationFrame(this.animate)
  }

  protected checkCollisionAirdrop(a: Airdrop, player: Player): boolean {
    return (
      a.x < player.x + player.width &&
      a.x + a.width > player.x &&
      a.y < player.y + player.height &&
      a.y + a.height > player.y
    )
  }

  checkCollision(ball: Ball, player: Player): void {
    const ballBottom = ball.y + ball.radius
    const playerTop = player.y
    const playerLeft = player.x
    const playerRight = player.x + player.width

    if (
      ballBottom >= playerTop &&
      ball.x >= playerLeft &&
      ball.x <= playerRight
    ) {
      const hitPosition = (ball.x - player.x) / player.width
      const angle = Math.PI / 4

      const newAngle = angle * (2 * hitPosition - 1)
      ball.dy = -Math.abs(ball.speed * Math.cos(newAngle))
      ball.dx = ball.speed * Math.sin(newAngle)
    }
  }

  protected loadLevel(levelIndex: number): void {
    this.bricks.clear()
    const level = LEVELS[levelIndex]
    level.forEach(({ x, y, BrickConstructor, AirdropContructor }) => {
      const newAirdrop =
        AirdropContructor != null
          ? new AirdropContructor(this.ctx!, this.canvas, this, x, y)
          : null

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
    //рисуется мяч
    this.ball?.draw()
    //рисуются аирдропы
    this.airdrops.forEach(airdrop => {
      airdrop.draw()
    })
    // отрисовка кирпичей
    this.bricks.forEach(brick => {
      brick?.draw()
    })
    // отрисовка платформы(игрок)
    this.player?.draw()
    // отрисовка очков
    this.ctx?.fillText(`Score: ${this.score}`, 95, 15)
    // отрисовка жизни
    this.drawLifeLine()
    this.drawGem()
    this.drawLevel()
  }

  protected handleAirdropCollision(airdrop: Airdrop) {
    if (this.player && this.checkCollisionAirdrop(airdrop, this.player)) {
      switch (airdrop.effectType) {
        case effectTypes.EFFECT_ADDLIFE:
          this.lives = this.lives === 3 ? this.lives : (this.lives += 1)
          break
        case effectTypes.EFFECT_DAMAGELIFE:
          this.lives -= 1
          break
        case effectTypes.EFFECT_RAPIDBALL:
          this.ball?.applyEffect(airdrop.effectType, airdrop.duration)
          break
        case effectTypes.EFFECT_WIDEPLATFORM:
          this.player.applyEffect(airdrop.effectType, airdrop.duration)
          break
        case effectTypes.EFFECT_GEM:
          this.gem += 1
      }
      airdrop.isActive = false // Убираем airdrop
    }
  }

  protected update() {
    if (this.lives === 0) {
      this.endGame()
    }
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

      this.airdrops.forEach((airdrop, index) => {
        this.handleAirdropCollision(airdrop)

        if (!airdrop.isActive) {
          this.airdrops.splice(index, 1)
        }
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
        this.airdrops = []
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
      this.ctx.fillText(
        `Gems: ${this.gem}`,
        this.canvas.width / 2 - 50,
        this.canvas.height / 2 + 60
      )
    }
  }

  protected drawLifeLine() {
    const rightMargin = 0
    const delta = 8
    if (this.ctx) {
      this.ctx.fillStyle = 'red'
    }
    for (let i = 0; i <= this.lives; i += 1) {
      const rectStart = this.canvas.width - (rightMargin + delta * i)
      this.ctx?.fillRect(rectStart, 5, 5, 10)
    }
  }

  protected drawGem() {
    if (this.ctx) {
      this.ctx.fillStyle = 'purple'
      this.ctx.font = '12px Arial'
      this.ctx.drawImage(this.gemImage, 160, 2, 20, 20)
      this.ctx.fillText(`Gem: ${this.gem}`, 185, 15)
    }
  }

  protected drawLevel() {
    if (this.ctx) {
      this.ctx.fillStyle = 'white'
      this.ctx.font = '12px Arial'
      this.ctx.fillText(`Level: ${this.currentLevel + 1}`, 15, 15)
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
