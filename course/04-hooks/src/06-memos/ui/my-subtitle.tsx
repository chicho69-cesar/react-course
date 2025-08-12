import { memo } from "react"

interface MySubtitleProps {
  subtitle: string
  callMyAPI: () => void
}

export const MySubtitle = memo(({ callMyAPI, subtitle }: MySubtitleProps) => {
  console.log('MySubTitle re-render')

  return (
    <>
      <h6 className="text-2xl font-bold">{subtitle}</h6>

      <button
        className="bg-indigo-500 text-white px-2 py-1 rounded-md cursor-pointer"
        onClick={callMyAPI}
      >
        Llamar a función
      </button>
    </>
  )
})
