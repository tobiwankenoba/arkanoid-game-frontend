import Game from '../Game'
import { EFFECT_RAPIDBALL } from '../constants/airdropEffectType'
import { AIRDROP_RAPIDBALL } from '../constants/images'

import Airdrop from './Airdrop'

const DURATION = 5000

export default class AirdropRapidball extends Airdrop {
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
      EFFECT_RAPIDBALL,
      DURATION,
      AIRDROP_RAPIDBALL
    )
  }
}
