import AidropAddlife from '../Airdrops/AirdropAddlife'
import AidropDamagelife from '../Airdrops/AirdropDamagelife'
import AidropGem from '../Airdrops/AirdropGem'
import AirdropRapidball from '../Airdrops/AirdropRapidball'
import AidropWideplatform from '../Airdrops/AirdropWideplatform'
import Brick from '../Bricks/Brick'
import BrickBush from '../Bricks/BrickBush'
import BrickForced from '../Bricks/BrickForced'
import BrickIce from '../Bricks/BrickIce'

const LEVELS = [
  [
    { x: 0, y: 150, BrickConstructor: Brick, AirdropContructor: AidropAddlife },
    { x: 61, y: 150, BrickConstructor: Brick, AirdropContructor: AidropGem },
    { x: 102, y: 150, BrickConstructor: BrickForced, AirdropContructor: null },
    { x: 143, y: 150, BrickConstructor: BrickForced, AirdropContructor: null },
    { x: 184, y: 150, BrickConstructor: BrickForced, AirdropContructor: null },
    {
      x: 264,
      y: 150,
      BrickConstructor: BrickIce,
      AirdropContructor: AidropWideplatform,
    },
    { x: 264, y: 129, BrickConstructor: BrickBush, AirdropContructor: null },
    {
      x: 305,
      y: 129,
      BrickConstructor: BrickIce,
      AirdropContructor: AidropDamagelife,
    },
  ],
  [
    {
      x: 0,
      y: 150,
      BrickConstructor: Brick,
      AirdropContructor: AirdropRapidball,
    },
    { x: 61, y: 150, BrickConstructor: Brick, AirdropContructor: null },
    { x: 102, y: 129, BrickConstructor: BrickIce, AirdropContructor: null },
    {
      x: 143,
      y: 129,
      BrickConstructor: BrickBush,
      AirdropContructor: AidropGem,
    },
    { x: 184, y: 150, BrickConstructor: BrickForced, AirdropContructor: null },
    { x: 264, y: 150, BrickConstructor: Brick, AirdropContructor: null },
  ],
]

export default LEVELS
