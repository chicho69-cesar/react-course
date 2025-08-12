import confetti from "canvas-confetti"
import { useEffect, useReducer } from "react"
import { getInitialState, scrambledWordsReducer } from "../reducer/scramble-reducer"

export default function useScramble() {
  const [state, dispatch] = useReducer(scrambledWordsReducer, getInitialState())

  const {
    words,
    guess,
    currentWord,
    scrambledWord,
    total,
    errors,
    score,
    skips,
    maxAllowErrors,
    maxSkips,
    isGameOver,
  } = state

  useEffect(() => {
    if (score === 0) return

    confetti({
      particleCount: 100,
      spread: 120,
      origin: { y: 0.6 },
    })
  }, [score])

  const handleSetGuess = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'SET_GUESS',
      payload: e.target.value,
    })
  }

  const handleGuessSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    dispatch({
      type: 'CHECK_ANSWER',
    })
  }

  const handleSkip = () => {
    dispatch({ type: 'SKIP_WORD' })
  }

  const handlePlayAgain = () => {
    dispatch({ type: 'START_NEW_GAME', payload: getInitialState() })
  }

  return {
    words,
    guess,
    currentWord,
    scrambledWord,
    total,
    errors,
    score,
    skips,
    maxAllowErrors,
    maxSkips,
    isGameOver,

    handleSetGuess,
    handleGuessSubmit,
    handleSkip,
    handlePlayAgain,
  }
}
