import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as applicationApisActionCreators from '../store/actions/applicationApis'
import * as counterActionCreators from '../store/actions/counter'
import ExempleOfStatelessComponents from 'exempleOfStatelessComponents'
import Workspace from './workspace/workspace'
import Login from './login/login'
import Button from '@react-mdc/button'
import 'material-components-web/dist/material-components-web.css'
import logo from '../logo.svg'
import './App.css'

const RouteIf = ({ condition, path, component, props }) => {
  if (condition) {
    return <Route exact path={path} component={component} {...props} />
  }
}

class App extends Component {
  componentWillMount() {
    this.props.onConnectGPIT({ username: 'IELFELLF', password: 'HR' })
  }

  render() {
    return (
      <Router>
        <Fragment>
          <RouteIf condition={true} path="/" component={Workspace} />
          <RouteIf condition={true} path="/login" component={Login} />
          <RouteIf condition={true} path="/:domain" component={Workspace} />
        </Fragment>
      </Router>
    )
  }
}

const mapStateToProps = state => {
  return {
    connected: state.applicationApi.connected,
    ctr: state.ctr.counter,
    loginResponse: state.applicationApi.loginResponse,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIncrimentCounter: () => dispatch(counterActionCreators.incCounter()),
    onDecrementCounter: () => dispatch(counterActionCreators.decCounter()),
    onConnectGPIT: user =>
      dispatch(applicationApisActionCreators.gpitConnect(user)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
