import useTrafficLight from "@/hooks/use-traffic-light"

export default function TrafficLightWithHook() {
  const { colors, countdown, light, percentage } = useTrafficLight()

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
            style={{ width: `${percentage}%` }}
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
