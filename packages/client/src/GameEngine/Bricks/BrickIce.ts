import Airdrop from '../Airdrops/Airdrop'
import Game from '../Game'
import { BRICK_ICE_IMAGE } from '../constants/images'

import Brick from './Brick'

export default class BrickIce extends Brick {
  protected lives

  constructor(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    game: Game,
    x: number,
    y: number,
    airdrop: Airdrop | null
  ) {
    super(ctx, canvas, game, x, y, airdrop, BRICK_ICE_IMAGE)
    this.lives = 3
  }

  protected override toDamage(): void {
    this.lives -= 1
    if (this.lives === 0) {
      this.isDestroyed = true
    }
  }
}
