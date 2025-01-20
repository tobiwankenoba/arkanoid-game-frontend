import Airdrop from '../Airdrops/Airdrop'
import AidropAddlife from '../Airdrops/AirdropAddlife'
import Game from '../Game'

describe('Airdrop and its subclasses', () => {
  let game: Game
  let canvas: HTMLCanvasElement
  let ctx: CanvasRenderingContext2D

  beforeEach(() => {
    canvas = document.createElement('canvas')
    canvas.width = 800
    canvas.height = 600
    ctx = canvas.getContext('2d')!
    game = {} as Game // Мокаем игру, если необходимо
  })

  test('should create Airdrop with correct properties', () => {
    const airdrop = new Airdrop(
      ctx,
      canvas,
      game,
      100,
      100,
      'addlife',
      5000,
      'gameTextures/airdrop-addlife.jpg'
    )

    expect(airdrop).toHaveProperty('x', 100)
    expect(airdrop).toHaveProperty('y', 100)
    expect(airdrop).toHaveProperty('effectType', 'addlife')
    expect(airdrop).toHaveProperty('duration', 5000)
  })

  test('should create AidropAddlife with correct properties', () => {
    const airdropAddlife = new AidropAddlife(ctx, canvas, game, 150, 150)

    expect(airdropAddlife).toHaveProperty('effectType', 'addlife')
    expect(airdropAddlife).toHaveProperty('duration', 5000)
  })
})
