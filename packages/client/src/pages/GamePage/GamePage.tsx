import { GameCanvas } from './components/GameCanvas'

export const GamePage: React.FC = () => {
  return (
    <>
      <GameCanvas width={600} height={600} />
      <img src="gameTextures/ice.jpg" />
    </>
  )
}
