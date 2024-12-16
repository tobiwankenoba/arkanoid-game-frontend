import Game from '../Game'
import { EFFECT_WIDEPLATFORM } from '../constants/airdropEffectType'
import { AIRDROP_WIDEPLATFORM } from '../constants/images'

import Airdrop from './Airdrop'

const DURATION = 5000

export default class AidropWideplatform extends Airdrop {
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
      EFFECT_WIDEPLATFORM,
      DURATION,
      AIRDROP_WIDEPLATFORM
    )
  }
}
