import React, { Component, Fragment } from 'react'
import * as headerActionCreators from '../../../../store/actions/header'
import { connect } from 'react-redux'

class Delete extends Component {
  render() {
    return (
      <div>
        <h1>Delete</h1>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    tab: state.header.tab,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setHeaderTab: tab => dispatch(headerActionCreators.setHeaderTab(tab)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Delete)
