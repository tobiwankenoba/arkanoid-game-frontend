import Brick from '../Bricks/Brick'
import BrickBush from '../Bricks/BrickBush'
import BrickForced from '../Bricks/BrickForced'
import BrickIce from '../Bricks/BrickIce'

const LEVELS = [
  [
    { x: 0, y: 150, BrickConstructor: Brick, airdrop: 'some' },
    { x: 61, y: 150, BrickConstructor: Brick, airdrop: 'some' },
    { x: 102, y: 150, BrickConstructor: BrickForced, airdrop: 'some' },
    { x: 143, y: 150, BrickConstructor: BrickForced, airdrop: null },
    { x: 184, y: 150, BrickConstructor: BrickForced, airdrop: null },
    { x: 264, y: 150, BrickConstructor: BrickIce, airdrop: null },
    { x: 264, y: 129, BrickConstructor: BrickBush, airdrop: null },
    { x: 305, y: 129, BrickConstructor: BrickIce, airdrop: null },
  ],
  [
    { x: 0, y: 150, BrickConstructor: Brick, airdrop: null },
    { x: 61, y: 150, BrickConstructor: Brick, airdrop: null },
    { x: 102, y: 129, BrickConstructor: BrickIce, airdrop: null },
    { x: 143, y: 129, BrickConstructor: BrickBush, airdrop: null },
    { x: 184, y: 150, BrickConstructor: BrickForced, airdrop: null },
    { x: 264, y: 150, BrickConstructor: Brick, airdrop: null },
  ],
]

export default LEVELS
