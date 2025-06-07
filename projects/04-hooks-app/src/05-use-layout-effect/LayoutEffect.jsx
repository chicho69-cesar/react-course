import { useLayoutEffect, useRef, useState } from 'react'

export const LayoutEffect = () => {
  const [show, setShow] = useState(false)
  const [height, setHeight] = useState(0)
  const boxRef = useRef()

  useLayoutEffect(() => {
    if (show && boxRef.current) {
      const { height } = boxRef.current.getBoundingClientRect()
      console.log('Altura del cuadro:', height)
      setHeight(height)
    }
  }, [show])

  return (
    <div>
      <button onClick={() => setShow(!show)} className='btn btn-primary'>
        {show ? 'Ocultar' : 'Mostrar'} cuadro
      </button>

      {show && (
        <div
          ref={boxRef}
          className='bg-info text-white p-5 mt-2'
          style={{ width: '200px', height: '200px' }}
        >
          Soy un cuadro con useLayoutEffect
        </div>
      )}

      <p>Altura del cuadro: {height}px</p>
    </div>
  )
}

export default LayoutEffect