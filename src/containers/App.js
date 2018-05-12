import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import * as applicationApisActionCreators from '../store/actions/applicationApis'
import * as counterActionCreators from '../store/actions/counter'
import * as workspaceActionCreators from '../store/actions/workspace'
import ExempleOfStatelessComponents from 'exempleOfStatelessComponents'
import Workspace from './workspace/workspace'
import Login from './login/login'
import Button from '@react-mdc/button'
import 'material-components-web/dist/material-components-web.css'
import logo from '../logo.svg'
import './App.css'

const RouteIf = ({ condition, path, component, props }) => {
  if (path == '/login') {
     if (condition) {
        return <Redirect to="/"/>
      }else {
        return <Route exact path={path} component={component} {...props} />
      }
  } else {
    if (!condition) {
      return <Redirect to="/login"/>
    } else {
      return <Route exact path={path} component={component} {...props} />
    }
  }
 
}

class App extends Component {
  componentWillMount() {
    window.addEventListener("offline", (e) => {
      console.log("offline")
      this.props.setConnectivity(false)
    })
    window.addEventListener("online", (e) => {
      console.log("online");
      this.props.setConnectivity(true)
    })
  }

  render() {
    return (
      <Router>
        <Fragment>
            <RouteIf condition={this.props.connected}  path="/" component={Workspace} />
            <RouteIf condition={this.props.connected} path="/login" component={Login} />
            <RouteIf condition={this.props.connected} path="/attente" component={Workspace} />
            <RouteIf condition={this.props.connected} path="/historique" component={Workspace} />
            <RouteIf condition={this.props.connected} path="/notifications" component={Workspace} />
            <RouteIf condition={this.props.connected} path="/create" component={Workspace} />
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
    online: state.workspace.online
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIncrimentCounter: () => dispatch(counterActionCreators.incCounter()),
    onDecrementCounter: () => dispatch(counterActionCreators.decCounter()),
    onConnectGPIT: user => dispatch(applicationApisActionCreators.gpitConnect(user)),
    setConnectivity : online => dispatch(workspaceActionCreators.setConnectivity(online))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
