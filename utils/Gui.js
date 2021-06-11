import React from 'react'
import { useEffect, useRef } from 'react'

const Interface = (props) => {
  console.log('disp: ' + props.disp)
  if (props.disp == false) {
    return <h1></h1>
  }
  return <h1>GUI placeholder</h1>
}

export default Interface
