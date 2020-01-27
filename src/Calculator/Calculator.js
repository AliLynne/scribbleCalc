import React, { useReducer } from 'react'
import { useSpring, useTrail, animated } from 'react-spring'

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
      id: 'percent'
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
const calculate = (valueOne, operator, valueTwo) => {
  //return parseFloat(valueOne) operator parseFloat(valueTwo)
  switch (operator) {
    case '+':
      return (parseFloat(valueOne) + parseFloat(valueTwo)).toString()
    case '-':
      return (parseFloat(valueOne) - parseFloat(valueTwo)).toString()
    case '/':
      return (parseFloat(valueOne) / parseFloat(valueTwo)).toString()
    case '*':
      return (parseFloat(valueOne) * parseFloat(valueTwo)).toString()
    default:
      return new Error('Invalid operater.')
  }
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
      if (state.editText === '0' || state.valueOne) {
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
    case 'clear':
      return { ...initialState }
    case 'neg':
      if (state.editText.includes('-')) {
        const newText = state.editText.slice(1)
        return { ...state, editText: newText }
      } else {
        return { ...state, editText: `-${state.editText}` }
      }
    case 'percent':
      const per = parseFloat(state.editText) * .01
      return { ...state, editText: per.toString() }
    case 'add':
      if (state.savedOp) {
        const calced = calculate(state.valueOne, state.savedOp, state.editText)
        return { ...state, valueOne: calced, savedOp: '+', editText: calced }
      } else {
        return { ...state, valueOne: state.editText, savedOp: '+' }
      }
    case 'subtract':
      if (state.savedOp) {
        const calced = calculate(state.valueOne, state.savedOp, state.editText)
        return { ...state, valueOne: calced, savedOp: '-', editText: calced }
      } else {
        return { ...state, valueOne: state.editText, savedOp: '-' }
      }
    case 'multiply':
      if (state.savedOp) {
        const calced = calculate(state.valueOne, state.savedOp, state.editText)
        return { ...state, valueOne: calced, savedOp: '*', editText: calced }
      } else {
        return { ...state, valueOne: state.editText, savedOp: '*' }
      }
    case 'divide':
      if (state.savedOp) {
        const calced = calculate(state.valueOne, state.savedOp, state.editText)
        return { ...state, valueOne: calced, savedOp: '/', editText: calced }
      } else {
        return { ...state, valueOne: state.editText, savedOp: '/' }
      }
    case 'equals':
      if (state.savedOp) {
        const calced = calculate(state.valueOne, state.savedOp, state.editText)
        return { ...state, valueOne: calced, savedOp: null, editText: calced }
      } else {
        return { ...state, valueOne: state.editText, savedOp: null }
      }
    default:
      console.log(action.type)
      return { ...state }
  }
}

const initialState = {
  editText: '0'
}

const config = {
  mass: 6,
  tension: 170,
  friction: 26,
  precision: 0.01,
  velocity: 0,
}

const funcsConfig = { mass: 15, tension: 2000, friction: 200 }
const opsConfig = { mass: 15, tension: 2000, friction: 200 }
const numsConfig = { mass: 15, tension: 2000, friction: 200 }

const CalcLayout = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { x } = useSpring({
    config,
    x: 0,
    from: {x: -100 },
  })
  const funcsTrail = useTrail(keys.funcs.length, { config: funcsConfig, y: 0, from: { y: 1000 }, delay: 1000 })
  const opsTrail = useTrail(keys.ops.length, { config: opsConfig, y: 0, from: { y: -1000}, delay: 1800 })
  const numsTrail = useTrail(keys.nums.length, { config: numsConfig, x: 0, from: { x: 1000 }, delay: 2600 })

  const handleClick = (e) => {
    dispatch({ type: e.target.id })
  }

  return (
    <animated.div style={{
      transform: x.interpolate(x => `translateY(${x}vh)`)
    }} className="calc">
      <p className="calc__display">{state.editText}</p>
      <div className="calc__keypad">
        <div className="calc__functions">
          {funcsTrail.map(({ y }, index) => (
            <animated.div
              key={keys.funcs[index].id}
              style={{ y }}
            >
              <Button value={keys.funcs[index].value} id={keys.funcs[index].id} key={keys.funcs[index].id} handleClick={handleClick} />
            </animated.div>
          ))}
        </div>
        <div className="calc__operators">
          {opsTrail.map(({ y }, index) => (
            <animated.div
              key={keys.ops[index].id}
              style={{ y }}
            >
              <Button value={keys.ops[index].value} id={keys.ops[index].id} key={keys.ops[index].id} handleClick={handleClick} />
            </animated.div>
          ))}
        </div>
        <div className="calc__numbers">
          {numsTrail.map(({ x }, index) => (
            <animated.div
              key={keys.nums[index].id}
              style={{ x }}
            >
              <Button value={keys.nums[index].value} id={keys.nums[index].id} key={keys.nums[index].id} handleClick={handleClick} />
            </animated.div>
          ))}
        </div>
      </div>
    </animated.div>
  )
}

export default CalcLayout
