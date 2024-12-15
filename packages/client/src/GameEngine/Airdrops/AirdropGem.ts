import Game from '../Game'
import { EFFECT_GEM } from '../constants/airdropEffectType'
import { AIRDROP_GEM } from '../constants/images'

import Airdrop from './Airdrop'

const DURATION = 5000

export default class AidropGem extends Airdrop {
  constructor(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    game: Game,
    x: number,
    y: number
  ) {
    super(ctx, canvas, game, x, y, EFFECT_GEM, DURATION, AIRDROP_GEM)
  }
}
