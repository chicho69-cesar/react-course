import { useEffect, useState } from "react"

const colors = {
  red: 'bg-red-500',
  yellow: 'bg-yellow-500',
  green: 'bg-green-500',
}

const countdownTimes = {
  red: 5,
  yellow: 3,
  green: 10,
}

type TrafficLightColor = keyof typeof colors

export default function TrafficLightWithEffect() {
  const [light, setLight] = useState<TrafficLightColor>('red')
  const [countdown, setCountdown] = useState(countdownTimes.red)

  useEffect(() => {
    if (countdown === 0) return 

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [countdown])

  useEffect(() => {
    if (countdown > 0) return

    const nextLight = 
      light === 'red' ? 'green' :
      light === 'green' ? 'yellow' : 'red'

    setLight(nextLight)
    setCountdown(countdownTimes[nextLight])
  }, [countdown, light])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-4">
      <div className="flex flex-col items-center space-y-8">
        <h1 className="text-3xl font-thin text-white">
          Semáforo con useEffect
        </h1>

        <h2 className="text-white text-xl">
          Countdown: {countdown}
        </h2>

        <div className="w-64 bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-1000 ease-linear"
            style={{ width: `${(countdown / countdownTimes[light]) * 100}%` }}
          ></div>
        </div>

        <div
          className={`
            w-32 h-32 rounded-full
            ${light === 'red' ? colors.red : 'bg-gray-500'}
          `}
        ></div>

        <div
          className={`
            w-32 h-32 rounded-full
            ${light === 'yellow' ? colors.yellow : 'bg-gray-500'}
          `}
        ></div>

        <div
          className={`
            w-32 h-32 rounded-full
            ${light === 'green' ? colors.green : 'bg-gray-500'}
          `}
        ></div>
      </div>
    </div>
  )
}
