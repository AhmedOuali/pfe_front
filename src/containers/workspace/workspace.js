import React, { Component, Fragment } from 'react'
import Content from './content/content'
import Header from './header/header'
import { Route, Redirect } from 'react-router'

class Workspace extends Component {
  render() {
    return (
      <Fragment>
        <Header {...this.props}/>
        <Content {...this.props} />
      </Fragment>
    )
  }
}
export default Workspace
