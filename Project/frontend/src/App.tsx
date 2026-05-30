import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useGameStore } from './modules/Gameplay/data/GameStore'

function App() {
  const [count, setCount] = useState(0)
  
  const lifetimeTotalScore = useGameStore((state) => state.lifetimeTotalScore);

  return (
    <>
      <div>
        <p>
          total score: {lifetimeTotalScore}
        </p>
      </div>
      
    </>
  )
}

export default App
