import React from 'react'
import Calculator from './Calculator/Calculator'


import './App.scss'

function App() {
  return (
    <div className="App">
      <header>
        <h1>Scribble Calculator</h1>
      </header>


      <main>
        <Calculator />
      </main>
      <footer>
        <p>By: <a href="https://www.alilynne.com">AliLynne</a></p>
        <p>
          <a href="https://github.com/AliLynne/scribbleCalc">Source code</a>
        </p>
      </footer>
    </div>
  )
}

export default App
