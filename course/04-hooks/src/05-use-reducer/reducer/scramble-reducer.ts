export interface ScrambleWordsState {
  words: string[]
  guess: string
  currentWord: string
  scrambledWord: string
  score: number
  total: number
  errors: number
  skips: number
  maxAllowErrors: number
  maxSkips: number
  isGameOver: boolean
}

const GAME_WORDS = [
  "HTML",
  "CSS",
  "JAVASCRIPT",
  "TYPESCRIPT",
  "REACT",
  "ANGULAR",
  "VUEJS",
  "SVELTE",
  "SOLID",
  "NEXTJS",
  "ASTRO",
  "REMIX",
  "TAILWIND",
  "VITE",
  "NODE",
  "EXPRESS",
  "MONGODB",
  "POSTGRES",
  "DOCKER",
  "KUBERNETES",
]

const shuffleArray = (array: string[]) => {
  return array.sort(() => Math.random() - 0.5)
}

const scrambleWord = (word: string) => {
  return word
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("")
}

export function getInitialState(): ScrambleWordsState {
  const shuffledWords = shuffleArray(GAME_WORDS)

  return {
    words: shuffledWords,
    guess: "",
    currentWord: shuffledWords[0],
    scrambledWord: scrambleWord(shuffledWords[0]),
    score: 0,
    total: shuffledWords.length,
    errors: 0,
    skips: 0,
    maxAllowErrors: 3,
    maxSkips: 3,
    isGameOver: false,
  }
}

export type ScrambleWordsAction =
  | { type: "SET_GUESS", payload: string }
  | { type: "CHECK_ANSWER" }
  | { type: "START_NEW_GAME", payload: ScrambleWordsState }
  | { type: "SKIP_WORD" }

export function scrambledWordsReducer(state: ScrambleWordsState, action: ScrambleWordsAction): ScrambleWordsState {
  const { type } = action

  switch (type) {
    case "SET_GUESS": {
      return {
        ...state,
        guess: action.payload,
      }
    }

    case "CHECK_ANSWER": {
      if (state.guess === state.currentWord) {
        const newWords = state.words.slice(1)

        return {
          ...state,
          words: newWords,
          score: state.score + 1,
          guess: '',
          currentWord: newWords[0],
          scrambledWord: scrambleWord(newWords[0]),
        }
      }

      return {
        ...state,
        guess: '',
        errors: state.errors + 1,
        isGameOver: state.errors + 1 >= state.maxAllowErrors,
      }
    }

    case "SKIP_WORD": {
      if (state.skips >= state.maxSkips) return state

      const newWords = state.words.slice(1)

      return {
        ...state,
        skips: state.skips + 1,
        words: newWords,
        currentWord: newWords[0],
        scrambledWord: scrambleWord(newWords[0]),
        guess: '',
      }
    }

    case "START_NEW_GAME": {
      return action.payload
    }

    default: {
      return state
    }
  }
}
