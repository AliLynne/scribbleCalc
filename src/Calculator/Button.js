import React from 'react'

import './button.scss'

const Button = (props) => {
  const { id, value, handleClick } = props

  return (
    <button id={id} value={value} onClick={(e) => handleClick(e)}>
      {value}
    </button>
  )
}

export default Button
