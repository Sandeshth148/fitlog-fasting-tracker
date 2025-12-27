import { useState } from 'react'
import './App.css'

interface AppProps {
  user?: string;
}

function App({ user }: AppProps) {
  const [count, setCount] = useState(0)

  return (
    <div className="fasting-container">
      <h1>🍎 Fasting Tracker</h1>
      
      {user && (
        <div className="user-welcome">
          <h2>Welcome back, {user}! 👋</h2>
          <p>Ready to start your fast?</p>
        </div>
      )}

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Current Fast: {count} hours
        </button>
        <p>
          React Component loaded successfully!
        </p>
      </div>
    </div>
  )
}

export default App
