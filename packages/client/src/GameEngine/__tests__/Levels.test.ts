import AidropAddlife from '../Airdrops/AirdropAddlife'
import AirdropRapidball from '../Airdrops/AirdropRapidball'
import Brick from '../Bricks/Brick'
import LEVELS from '../constants/levels'

describe('Game levels', () => {
  test('should load correct number of bricks and airdrops for first level', () => {
    const level = LEVELS[0]
    expect(level.length).toBeGreaterThan(0) // Уровень не пустой
    expect(level[0].BrickConstructor).toBe(Brick) // Проверяем, что первый кирпич — обычный кирпич
    expect(level[0].AirdropContructor).toBe(AidropAddlife) // Проверяем, что первый аирдроп — addlife
  })

  test('should load correct number of bricks and airdrops for second level', () => {
    const level = LEVELS[1]
    expect(level.length).toBeGreaterThan(0) // Уровень не пустой
    expect(level[0].BrickConstructor).toBe(Brick) // Проверяем, что первый кирпич — обычный кирпич
    expect(level[0].AirdropContructor).toBe(AirdropRapidball) // Проверяем, что первый аирдроп — rapidball
  })
})
