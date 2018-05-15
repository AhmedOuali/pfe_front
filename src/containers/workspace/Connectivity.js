import React from 'react'
import { Fab } from 'rmwc/Fab'

const Connectivity = props => {
  return (
    <h3
      style={{
        zIndex: '6',
        left: '1%',
        bottom: '0px',
        display: 'block',
        position: 'fixed',
        marginBottom: '0px',
        fontSize: '12px',
        color: props.online ? 'green' : 'red',
      }}
    >
      {props.online ? 'Online' : 'Offline'}
    </h3>
  )
}
export default Connectivity
