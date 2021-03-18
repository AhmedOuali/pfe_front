import React, { Component, Fragment } from 'react'
import Content from './content/content'
import Header from './header/header'
import Connectivity from './Connectivity'
import { Route, Redirect } from 'react-router'
import { connect } from 'react-redux'
import * as workspaceActionCreators from '../../store/actions/workspace'

class Workspace extends Component {
  componentDidMount() {
    navigator.serviceWorker.addEventListener('message', event => {
      console.log('message recieved')
      var send = true
      this.props.notifications.map(notification => {
        if (event.data.id == notification.id) {
          send = false
        }
      })
      if (send == true) {
        console.log('from did mount', event.data)
        this.props.addNotification(event.data)
      }
    })
  }
  render() {
    return (
      <Fragment>
        <Header {...this.props} />
        <Content {...this.props} />
        <Connectivity {...this.props} />
      </Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
    tab: state.header.tab,
    online: state.workspace.online,
    notifications: state.workspace.notifications,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addNotification: notification =>
      dispatch(workspaceActionCreators.addNotification(notification)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Workspace)
