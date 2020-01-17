import React, { useReducer } from 'react'

import './calculator.scss'

const keys = {
  nums: [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
  ],
  funcs: [
    '+', '-', '*', '/', '=', 'C'
  ]
}



const reducer = (state, action) => {
  // switch (true) {
  //   case !isNan(action.type):
  //     if (state.display !== '0') {
  //       return { ...state, display: `${state.display}${action.type}` }
  //     } else if (state.display === '0') {
  //       return { ...state, display: `${action.type}` }
  //     } else {
  //       return { ...state }
  //     }      
  // }


  switch (action.type) {
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      if (!state.queuedOp) {
        if (state.editText !== '0') {
          return { ...state, editText: `${state.editText}${action.type}` }
        } else {
          return { ...state, editText: `${action.type}` }
        }
      } else {
        return { ...state, editText: `${action.type}` }
      }

    case '+':
      if (!state.queuedOp) {
        return { ...state, valueOne: state.editText, queuedOp: '+' }
      } else {
        console.log('need to run calc here')
        return { ...state }
      }

    case '-':
    case '*':
    case '/':
    case '=':
    case 'C':
      return { initialState }
    default:
      throw new Error('You have confused your reducer!')
  }
}

const initialState = {
  editText: '0',
  valueOne: '',
  valueTwo: '',
  queuedOp: undefined
}

const Calculator = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div className="calc">

      <p>{state.editText}</p>
      <ul>
        {keys.nums.map(key => {
          return <li key={key}><button onClick={() => { dispatch({ type: key }) }}>{key}</button></li>
        })}
      </ul>

      <ul>
        {keys.funcs.map(func => {
          return <li key={func}><button onClick={() => { dispatch({ type: func }) }}>{func}</button></li>
        })}
      </ul>

    </div>
  )
}

export default Calculator
