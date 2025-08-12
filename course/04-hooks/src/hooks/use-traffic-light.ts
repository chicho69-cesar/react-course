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

export default function useTrafficLight() {
  const [light, setLight] = useState<TrafficLightColor>('red')
  const [countdown, setCountdown] = useState(countdownTimes.red)

  useEffect(() => {
    if (countdown === 0) return

    const timerId = setInterval(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)

    return () => {
      clearInterval(timerId)
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

  return {
    light,
    countdown,
    colors,

    percentage: (countdown / countdownTimes[light]) * 100,
  }
}
