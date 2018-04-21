import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Redirect, Switch  } from 'react-router-dom'
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
import Attente from './attente'
import Historique from './historique'
import Notifications from './notifications'
import Create from './create/create'

class Content extends Component {
  render() {
    console.log('props', this.props.height)
    return (

      <ToolbarFixedAdjust>
        <Switch>  
          <Route path="/attente" render={() => {return <Attente tab='0'/>}}  />
          <Route path="/historique" render={() => {return <Historique tab='1'/>}}/>
          <Route path="/notifications" render={() => {return <Notifications tab='2'/>}}/>
          <Route path="/create" render= {() => {return <Create/>}}/>
          <Redirect to="/attente"/>
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
