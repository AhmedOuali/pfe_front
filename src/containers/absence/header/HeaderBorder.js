import React from 'react'
import {
  ToolbarRow,
  ToolbarSection,
  ToolbarTitle,
  ToolbarIcon,
} from 'rmwc/Toolbar'
import { Link, Route, Switch } from 'react-router-dom'

const HeaderBorder = props => {
  const linkStyle = {
    textDecoration: 'none',
    color: 'black',
    ':hover': {
      textDecoration: 'none',
      color: 'black',
    },
    ':visited': {
      textDecoration: 'none',
      color: 'black',
    },
  }
  return (
    <ToolbarRow style={{ backgroundColor: 'white' }}>
      <ToolbarSection alignStart>
        <ToolbarTitle style={{ color: 'black' }}>{props.name}</ToolbarTitle>
      </ToolbarSection>
      <Route
        path="/absence/demande_absence"
        render={() => {
          return (
            <ToolbarSection alignEnd>
              <Link to="/absence/accueil" style={linkStyle}>
                <ToolbarIcon style={{ color: 'black' }} use="close" />
              </Link>
            </ToolbarSection>
          )
        }}
      />
      <Route
        path="/absence/annulation_absence"
        render={() => {
          return (
            <ToolbarSection alignEnd>
              <Link to="/absence/accueil" style={linkStyle}>
                <ToolbarIcon style={{ color: 'black' }} use="close" />
              </Link>
            </ToolbarSection>
          )
        }}
      />
      <Route
        path="/absence/notifications"
        render={() => {
          return (
            <ToolbarSection alignEnd>
              <ToolbarIcon
                style={{ color: 'black' }}
                use="delete"
                onClick={() => {
                  props.setNotifications([])
                }}
              />
            </ToolbarSection>
          )
        }}
      />
    </ToolbarRow>
  )
}
export default HeaderBorder
