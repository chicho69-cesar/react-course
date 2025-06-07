import { useRef } from 'react'

export const FocusScreen = () => {
  const inputRef = useRef()

  const handleClick = () => {
    inputRef.current?.select()
    // inputRef.current?.focus()
  }
  
  return (
    <>
      <h1>
        Focus Screen
      </h1>

      <hr />

      <input
        ref={inputRef}
        type="text"
        className="form-control"
        placeholder="Enter your name"
      />

      <button
        className="btn btn-primary mt-2"
        onClick={handleClick}
        title="Focus the input field"
      >
        Focus
      </button>
    </>
  )
}
