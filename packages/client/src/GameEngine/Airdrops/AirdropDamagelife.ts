import Game from '../Game'
import { EFFECT_DAMAGELIFE } from '../constants/airdropEffectType'
import { AIRDROP_DAMAGELIFE } from '../constants/images'

import Airdrop from './Airdrop'

const DURATION = 5000

export default class AidropDamagelife extends Airdrop {
  constructor(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    game: Game,
    x: number,
    y: number
  ) {
    super(
      ctx,
      canvas,
      game,
      x,
      y,
      EFFECT_DAMAGELIFE,
      DURATION,
      AIRDROP_DAMAGELIFE
    )
  }
}
