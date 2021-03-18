import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'
import { Snackbar } from 'rmwc/Snackbar'
import 'material-components-web/dist/material-components-web.css'
import './content.css'
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText,
} from 'material-ui/Card'
import Toggle from 'material-ui/Toggle'
import { ToolbarFixedAdjust } from 'rmwc/Toolbar'
import FontIcon from 'material-ui/FontIcon'
import Attente from './attente/attente'
import Historique from './historique/historique'
import Notifications from './notifications'
import Create from './create/create'
import Delete from './delete/delete'
import Accueil from './accueil'

class Content extends Component {
  render() {
    return (
      <ToolbarFixedAdjust>
        <Switch>
          <Route
            path="/absence/accueil"
            render={() => {
              return <Accueil tab="0" />
            }}
          />
          <Route
            path="/absence/attente"
            render={() => {
              return <Attente tab="1" />
            }}
          />
          <Route
            path="/absence/historique"
            render={() => {
              return <Historique tab="2" />
            }}
          />
          <Route
            path="/absence/notifications"
            render={() => {
              return <Notifications tab="3" />
            }}
          />
          <Route
            path="/absence/demande_absence"
            render={() => {
              return <Create />
            }}
          />
          <Route
            path="/absence/annulation_absence"
            render={() => {
              return <Delete />
            }}
          />

          <Redirect to="/absence/accueil" />
        </Switch>
      </ToolbarFixedAdjust>
    )
  }
}
const mapStateToProps = state => {
  return {
    height: state.header.height,
  }
}

export default connect(mapStateToProps)(Content)
