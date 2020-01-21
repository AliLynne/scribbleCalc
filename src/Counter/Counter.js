import React, { useState } from 'react'
import { useTransition, animated } from 'react-spring'

const things = [
  {
    id: 'one',
    text: '1'
  }
]


const Counter = () => {
  const [items, set] = useState(things)
  const transitions = useTransition(items, item => item.id, {
    from: { transform: 'translate3d(0,-40px,0)' },
    enter: { transform: 'translate3d(0,0px,0)' },
    leave: { transform: 'translate3d(0,-40px,0)' }
  })

  const handleClick = () => {
    set([...items, {id: 'two', text: '2'}])
  }
  return (
    <div>
      <button onClick={() => handleClick()}>Add</button>
      {transitions.map(({item, props, id}) => {
        return <animated.div key={id} style={props}>{item.text}</animated.div>
      })}
    </div>
    ) 
}

export default Counter


// const [items, set] = useState([...])
// const transitions = useTransition(items, item => item.key, {
// from: { transform: 'translate3d(0,-40px,0)' },
// enter: { transform: 'translate3d(0,0px,0)' },
// leave: { transform: 'translate3d(0,-40px,0)' },
// })
// return transitions.map(({ item, props, key }) =>
// <animated.div key={key} style={props}>{item.text}</animated.div>
// )