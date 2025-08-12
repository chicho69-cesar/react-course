import { useCallback, useState } from "react"
import { MySubtitle } from "./ui/my-subtitle"
import { MyTitle } from "./ui/my-title"

export default function MemoHook() {
  const [title, setTitle] = useState("Hola")
  const [subtitle, setSubtitle] = useState("Mundo")

  const handleCallMyAPI = useCallback(() => {
    console.log("Llamando a la API...", subtitle)
  }, [subtitle])

  return (
    <div className="bg-gradient flex flex-col gap-4">
      <h1 className="text-2xl font-thin text-white">MemoApp</h1>

      <MyTitle title={title} />
      <MySubtitle subtitle={subtitle} callMyAPI={handleCallMyAPI} />

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        onClick={() => setTitle('Hello, ' + new Date().getTime())}
      >
        Cambiar título
      </button>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        // onClick={() => setSubTitle('World, ' + new Date().getTime())}
        onClick={() => setSubtitle('World')}
      >
        Cambiar subtitulo
      </button>
    </div>
  )
}
