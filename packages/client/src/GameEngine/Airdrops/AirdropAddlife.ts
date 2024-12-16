import Game from '../Game'
import { EFFECT_ADDLIFE } from '../constants/airdropEffectType'
import { AIRDROP_ADDLIFE } from '../constants/images'

import Airdrop from './Airdrop'

const DURATION = 5000

export default class AidropAddlife extends Airdrop {
  constructor(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    game: Game,
    x: number,
    y: number
  ) {
    super(ctx, canvas, game, x, y, EFFECT_ADDLIFE, DURATION, AIRDROP_ADDLIFE)
  }
}
