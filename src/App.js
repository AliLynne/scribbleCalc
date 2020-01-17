import React from 'react'
// import Calculator from './Calculator/Calculator'
import CalcLayout from './Calculator/CalcLayout'
import './App.scss'

function App() {
  return (
    <div className="App">
      <header>
        <h1>Calculator</h1>
      </header>

      {/* <Calculator /> */}
      <main>
        <CalcLayout />
      </main>

    </div>
  )
}

export default App
