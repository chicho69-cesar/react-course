import './App.css'
import reactLogo from './assets/react.svg'

import { useSelector, useDispatch } from 'react-redux'
import { increment, incrementBy, decrement, decrementBy  } from './store/slices/counter'

function App() {
  const { counter } = useSelector((state) => state.counter)
  const dispatch = useDispatch()

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={reactLogo} alt="logo" className='App-logo' />
        <p>Counter is: {counter}</p>

        <div>
          <button
            type='button'
            onClick={() => dispatch(increment())}
          >
            Increment
          </button>

          <button
            type='button'
            onClick={() => dispatch(decrement())}
          >
            Decrement
          </button>

          <button
            type='button'
            onClick={() => dispatch(incrementBy(5))}
          >
            Increment by 5
          </button>
          
          <button
            type='button'
            onClick={() => dispatch(decrementBy(3))}
          >
            Decrement by 3
          </button>
        </div>
      </header>
    </div>
  )
}

export default App
