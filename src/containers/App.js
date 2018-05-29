import React, { Component, Fragment } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from 'react-router-dom'
import { connect } from 'react-redux'
import * as applicationApisActionCreators from '../store/actions/applicationApis'
import * as counterActionCreators from '../store/actions/counter'
import * as workspaceActionCreators from '../store/actions/workspace'
import ExempleOfStatelessComponents from 'exempleOfStatelessComponents'
import Workspace from './workspace/workspace'
import Absence from './absence/absence'
import Login from './login/login'
import Home from './home'
import Button from '@react-mdc/button'
import 'material-components-web/dist/material-components-web.css'
import logo from '../logo.svg'
import './App.css'

const RouteIf = ({ condition, path, component, props }) => {
  return (
    <Fragment>
      <Route exact path="/home" component={Home} />
      <Route exact path="/embauche" component={Workspace} />
      <Route exact path="/embauche/attente" component={Workspace} />
      <Route exact path="/embauche/historique" component={Workspace} />
      <Route exact path="/embauche/notifications" component={Workspace} />
      <Route exact path="/embauche/create" component={Workspace} />
      <Route exact path="/absence" component={Absence} />
      <Route exact path="/absence/accueil" component={Absence} />
      <Route exact path="/absence/demande_absence" component={Absence} />
      <Route exact path="/absence/annulation_absence" component={Absence} />
      <Route exact path="/absence/attente" component={Absence} />
      <Route exact path="/absence/historique" component={Absence} />
      <Route exact path="/absence/notifications" component={Absence} />
      <Route exact path={path} component={component} {...props} />
    </Fragment>
  )
}

class App extends Component {
  componentWillMount() {
    window.addEventListener('offline', e => {
      console.log('offline')
      this.props.setConnectivity(false)
    })
    window.addEventListener('online', e => {
      console.log('online')
      this.props.setConnectivity(true)
    })
  }

  render() {
    return (
      <Router>
        {this.props.connected ? (
          <RouteIf />
        ) : (
          <Route path="/" component={Login} />
        )}
      </Router>
    )
  }
}

const mapStateToProps = state => {
  return {
    connected: state.applicationApi.connected,
    ctr: state.ctr.counter,
    loginResponse: state.applicationApi.loginResponse,
    online: state.workspace.online,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIncrimentCounter: () => dispatch(counterActionCreators.incCounter()),
    onDecrementCounter: () => dispatch(counterActionCreators.decCounter()),
    onConnectGPIT: user =>
      dispatch(applicationApisActionCreators.gpitConnect(user)),
    setConnectivity: online =>
      dispatch(workspaceActionCreators.setConnectivity(online)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
