import React from 'react'
import { Fab } from 'rmwc/Fab'
import { Link } from 'react-router-dom'
const PlusButton = props => {
  return (
    <Link to="/create">
      <Fab
        style={{
          zIndex: '6',
          right: '5%',
          bottom: '30px',
          display: 'block',
          position: 'fixed',
          backgroundColor: '#f27308',
          width: '70px',
          height: '70px',
        }}
      >
        add
      </Fab>
    </Link>
  )
}
export default PlusButton
