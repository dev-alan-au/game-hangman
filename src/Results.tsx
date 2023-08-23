import { GameState } from './App';

interface ResultsProps {
  currentGameState: GameState;
  currentPokemon: string;
}

export default function Results({ currentGameState, currentPokemon }: ResultsProps) {
  return (
    <div style={{ marginTop: '2rem' }}>
      {currentGameState == 'lost' ? `Oh no, you didn't guess the pokemon: ${currentPokemon}` : 'Yaata! You guessed correctly'}
    </div>
  )
}