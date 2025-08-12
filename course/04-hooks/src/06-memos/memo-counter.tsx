import useCounter from "@/hooks/use-counter"
import { useMemo } from "react"

const heavyStuff = (iterationNumber: number) => {
  console.time("Heavy_stuff_started")
  for (let index = 0; index < iterationNumber; index++) { console.log("ahí vamos...") }
  console.timeEnd("Heavy_stuff_started")

  return `${iterationNumber} iteraciones realizadas`
}

export default function MemoCounter() {
  const { count: count1, increment: increment1 } = useCounter(40_000)
  const { count: count2, increment: increment2 } = useCounter(10)

  const myHeavyValue = useMemo(() => {
    return heavyStuff(count1)
  }, [count1])

  return (
    <div className="bg-gradient flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Memo - useMemo - {myHeavyValue}</h1>
      <hr />

      <h4>Counter: {count1}</h4>
      <h4>Counter2: {count2}</h4>

      <button
        className="bg-blue-500 text-white px-4 rounded-md py-2 cursor-pointer"
        onClick={increment1}
      >
        +1
      </button>

      <button
        className="bg-blue-500 text-white px-4 rounded-md py-2 cursor-pointer"
        onClick={increment2}
      >
        +1 - Counter2
      </button>
    </div>
  )
}
