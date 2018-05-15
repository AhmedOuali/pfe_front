import React from 'react'
import { Link } from 'react-router-dom'
import { TabBar, Tab, TabIcon, TabIconText } from 'rmwc/Tabs'
var linkStyle = {
  textDecoration: 'none',
  color: 'white',
  ':hover': {
    textDecoration: 'none',
    color: 'white',
  },
  ':visited': {
    textDecoration: 'none',
    color: 'white',
  },
}

const TabBarElement = props => {
  return (
    <Tab style={{ color: 'white' }}>
      <Link to={props.path} style={linkStyle}>
        <TabIcon style={{ color: 'white' }}>{props.icon}</TabIcon>
        <TabIconText style={{ fontSize: '0.7rem' }}>{props.name}</TabIconText>
      </Link>
    </Tab>
  )
}
export default TabBarElement
