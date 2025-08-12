import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import confetti from "canvas-confetti"
import { Play, SkipForward } from "lucide-react"
import { useState } from "react"

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

const scrambleWork = (word: string) => {
  return word
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("")
}

export default function ScrambleWordsWithState() {
  const [words, setWords] = useState<string[]>(shuffleArray(GAME_WORDS))

  const [currentWord, setCurrentWord] = useState(words[0])
  const [scrambledWord, setScrambledWord] = useState(scrambleWork(currentWord))
  const [guess, setGuess] = useState("")
  const [score, setScore] = useState(0)
  const [errors, setErrors] = useState(0)
  const [skips, setSkips] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)

  const maxAllowedErrors = 3
  const maxSkips = 3

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (guess === currentWord) {
      if (words.length === 0) return
      const newWords = words.slice(1)

      confetti({
        particleCount: 100,
        spread: 120,
        origin: { y: 0.6 },
      })

      setScore(score + 1)
      setGuess("")
      setWords(newWords)

      if (newWords.length === 0) {
        setIsGameOver(true)
        return
      }

      setCurrentWord(newWords[0])
      setScrambledWord(scrambleWork(newWords[0]))

      return
    }

    setErrors(errors + 1)
    setGuess("")

    if (errors + 1 >= maxAllowedErrors) {
      setIsGameOver(true)
    }
  }

  const handleSkip = () => {
    if (skips >= maxSkips) return

    const newWords = words.slice(1)

    setSkips(skips + 1)
    setWords(newWords)
    setGuess("")

    if (newWords.length === 0) {
      setIsGameOver(true)
      return
    }

    setCurrentWord(newWords[0])
    setScrambledWord(scrambleWork(newWords[0]))
  }

  const handlePlayAgain = () => {
    const newWords = shuffleArray(GAME_WORDS)

    setWords(newWords)
    setCurrentWord(newWords[0])
    setScrambledWord(scrambleWork(newWords[0]))
    setGuess("")
    setScore(0)
    setErrors(0)
    setSkips(0)
    setIsGameOver(false)
  }

  if (words.length === 0) {
    confetti({
      particleCount: 100,
      spread: 120,
      origin: { y: 0.6 },
    })

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Palabras desordenadas
          </h1>

          <p className="text-gray-600">No hay palabras para jugar</p>
          <br />
          <div>Puntos: {score}</div>
          <br />
          <div>Errores: {errors}</div>
          <br />
          <div>Saltos: {skips}</div>
          <br />

          <Button onClick={handlePlayAgain}>
            Jugar de nuevo
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Palabras desordenadas
          </h1>

          <p className="text-gray-600">
            Desordena las letras para encontrar la palabra!
          </p>
        </div>

        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
          <CardContent className="p-8">
            <div className="mb-8">
              <h2 className="text-center text-sm font-medium text-gray-500 mb-4 uppercase tracking-wide flex items-center justify-center gap-2">
                Palabra Desordenada{' '}
                {isGameOver && (
                  <span className="text-red-500 text-xl">{currentWord}</span>
                )}
              </h2>

              <div className="flex justify-center gap-2 mb-6">
                {scrambledWord.split('').map((letter, index) => (
                  <div
                    key={index}
                    className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg transform hover:scale-105 transition-transform duration-200"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      animation: 'fadeInUp 0.6s ease-out forwards',
                    }}
                  >
                    {letter}
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mb-6">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="guess"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Adivina la palabra
                  </label>

                  <Input
                    id="guess"
                    type="text"
                    value={guess}
                    onChange={(e) =>
                      setGuess(e.target.value.toUpperCase().trim())
                    }
                    placeholder="Ingresa tu palabra..."
                    className="text-center text-lg font-semibold h-12 border-2 border-indigo-200 focus:border-indigo-500 transition-colors"
                    maxLength={scrambledWord.length}
                    disabled={isGameOver}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                  disabled={!guess.trim() || isGameOver}
                >
                  Enviar Adivinanza
                </Button>
              </div>
            </form>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 text-center border border-green-200">
                <div className="text-2xl font-bold text-green-600">
                  {score} / {GAME_WORDS.length}
                </div>

                <div className="text-sm text-green-700 font-medium">
                  Puntos
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-lg p-4 text-center border border-red-200">
                <div className="text-2xl font-bold text-red-600">
                  {errors}/{maxAllowedErrors}
                </div>

                <div className="text-sm text-red-700 font-medium">
                  Errores
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={handleSkip}
                variant="outline"
                className="border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                disabled={isGameOver || skips >= maxSkips}
              >
                <SkipForward className="w-4 h-4" />
                Saltar ({skips} / {maxSkips})
              </Button>

              <Button
                onClick={handlePlayAgain}
                variant="outline"
                className="border-2 border-indigo-300 hover:border-indigo-400 hover:bg-indigo-50 text-indigo-600 transition-colors flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4" />
                Jugar de nuevo
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Desafíate con palabras desordenadas!
            <br />
            <br />
            {/* {words.join(', ')} */}
          </p>
        </div>
      </div>
    </div>
  )
}
