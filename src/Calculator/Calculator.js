import React, { useReducer } from 'react'

import Button from './Button'

import './calculator.scss'

const keys = {
  funcs: [
    {
      value: 'C',
      id: 'clear'
    },
    {
      value: '±',
      id: 'neg'
    },
    {
      value: '%',
      id: 'mod'
    }
  ],
  nums: [
    {
      value: 7,
      id: '7'
    },
    {
      value: 8,
      id: '8'
    },
    {
      value: 9,
      id: '9'
    },
    {
      value: 4,
      id: '4'
    },
    {
      value: 5,
      id: '5'
    },
    {
      value: 6,
      id: '6'
    },
    {
      value: 1,
      id: '1'
    },
    {
      value: 2,
      id: '2'
    },
    {
      value: 3,
      id: '3'
    },
    {
      value: 0,
      id: 'zero'
    },
    {
      value: '.',
      id: 'decimal'
    }
  ],
  ops: [
    {
      value: '/',
      id: 'divide'
    },
    {
      value: 'x',
      id: 'multiply'
    },
    {
      value: '-',
      id: 'subtract'
    },
    {
      value: '+',
      id: 'add'
    },
    {
      value: '=',
      id: 'equals'
    }
  ]
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'zero':
      if (state.editText === '0') {
        return { ...state, editText: '0' }
      } else {
        return { ...state, editText: `${state.editText}0` }
      }
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      if (state.editText === '0') {
        return { ...state, editText: action.type }
      } else {
        return { ...state, editText: `${state.editText}${action.type}` }
      }
    case 'decimal':
      if (state.editText.includes('.')) {
        return { ...state }
      } else {
        return { ...state, editText: `${state.editText}.` }
      }
    default:
      console.log(action.type)
      return { ...state }
  }
}

const initialState = {
  editText: '0'
}

const CalcLayout = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleClick = (e) => {
    dispatch({ type: e.target.id })
  }

  return (
    <div className="calc">
      <p className="calc__display">{state.editText}</p>
      <div className="calc__keypad">
        <div className="calc__functions">
          {keys.funcs.map(key => {
            return <Button value={key.value} id={key.id} key={key.id} handleClick={handleClick} />
          })}
        </div>
        <div className="calc__operators">
          {keys.ops.map(key => {
            return <Button value={key.value} id={key.id} key={key.id} handleClick={handleClick} />
          })}
        </div>
        <div className="calc__numbers">
          {keys.nums.map(key => {
            return <Button value={key.value} id={key.id} key={key.id} handleClick={handleClick} />
          })}
        </div>
      </div>
    </div>
  )
}

export default CalcLayout
