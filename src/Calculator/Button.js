import React from 'react'
import { useSpring, animated } from 'react-spring'

import './button.scss'

const Button = (props) => {
  const { id, value, handleClick } = props
  const [{ transform}, setSpring] = useSpring(() => ({ transform: `rotate(0deg)`}))

  return (
    <animated.button 
      id={id} 
      value={value} 
      onClick={(e) => handleClick(e)}
      style={{ transform }}
      onMouseEnter={() => setSpring({ transform: `rotate(360deg)`})}
      onMouseLeave={() => setSpring({ transform: `rotate(0deg)`})}
    >
      {value}
    </animated.button>
  )
}

export default Button
