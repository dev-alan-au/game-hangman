import { useEffect, useRef, useState } from 'react';
import Input from './Input';
import Graphic from './Graphic';
import Results from './Results';
import './App.css';

export type GameState = 'won' | 'lost' | 'playing';
const MAX_NUMBER_OF_INCORRECT_GUESSES = 9;

function App() {
  const [pokemonNames, setPokemonNames] = useState<Array<string>>([]);
  const [currentPokemon, setCurrentPokemon] = useState<string>('');
  const [display, setDisplay] = useState<string | undefined>(undefined);
  const [lettersUsed, setLettersUsed] = useState<string>('');
  const [numberOfIncorrectGuesses, setNumberOfIncorrectGuesses] = useState(0);
  const [currentGameState, setCurrentGameState] = useState<GameState>('playing');
  const inputField = useRef<HTMLInputElement>(null);

  const updatePokemon = () => {
    const randomIndex = Math.floor(pokemonNames.length * Math.random());
    setCurrentPokemon(pokemonNames[randomIndex]?.toUpperCase())
  }

  useEffect(() => {
    const fetchPokemonData = async () => {
      const pokemonData = await fetch('./data/en.json');
      const pokemon = await pokemonData.json();
      setPokemonNames(pokemon as string[]);
    }

    fetchPokemonData();
  }, []);

  useEffect(() => {
    updatePokemon();
  }, [pokemonNames]);

  useEffect(() => {
    setDisplay(currentPokemon ? (new Array(currentPokemon.length)).fill('_').join(' ') : undefined);
  }, [currentPokemon]);

  const guess = (char: string) => {
    const inputIsValid = /[A-Z]/.test(char);

    if (!currentPokemon) {
      // show error
    }
    if (!inputIsValid) {
      // show error
    } else {
      if (lettersUsed.includes(char)) {
        // already used so no penalty but not clear
      } else {
        setLettersUsed(lettersUsed + char);
      }
    }
  }

  useEffect(() => {
    const displayedChars = Array.from(currentPokemon);
    for (let i = 0; i < displayedChars.length; i++) {
      if (!lettersUsed.includes(displayedChars[i])) {
        displayedChars[i] = '_';
      }
    }
    const wrongGuesses = Array.from(lettersUsed).filter(char => !currentPokemon.includes(char));
    setNumberOfIncorrectGuesses(wrongGuesses.length);
    setDisplay(displayedChars.join(' '));
    if (inputField.current) {
      inputField.current.value = '';
    }
  }, [lettersUsed]);

  useEffect(() => {
    if (numberOfIncorrectGuesses >= MAX_NUMBER_OF_INCORRECT_GUESSES) {
      setCurrentGameState('lost')
    }
  }, [numberOfIncorrectGuesses]);

  const reset = () => {
    updatePokemon();
    setLettersUsed('');
    setNumberOfIncorrectGuesses(0);
    setCurrentGameState('playing');
  }

  return (
    <>
      <Graphic numberOfIncorrectGuesses={numberOfIncorrectGuesses} />
      {lettersUsed && <>{`Letters guessed: ${Array.from(lettersUsed).join(' | ')}`}</>}
      <div style={{ marginBottom: '2rem' }}>{display}</div>
      {numberOfIncorrectGuesses < MAX_NUMBER_OF_INCORRECT_GUESSES && <Input guess={guess} inputField={inputField} />}
      {currentGameState != 'playing' && <Results currentGameState={currentGameState} currentPokemon={currentPokemon} />}
      {currentGameState != 'playing' && <button onClick={() => reset()} style={{ marginTop: '1rem' }}>Reset</button>}
    </>
  )
}

export default App
