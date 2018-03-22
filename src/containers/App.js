import React, { Component, Fragment } from 'react'
import ExempleOfStatelessComponents from 'exempleOfStatelessComponents'
import { connect } from 'react-redux'
import Button from '@react-mdc/button'
import 'material-components-web/dist/material-components-web.css'
import logo from '../logo.svg'
import './App.css'

class App extends Component {
  render() {
    return (
      <Fragment>
        <div className="App">
          <header className="App-header">
            <img src="/logo.svg" className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            Number Of Click <code>src/App.js</code> and save to reload.
          </p>
          <button className="prim-btn" onClick={this.props.onIncrimentCounter}>
            +
          </button>
          <button className="prim-btn" onClick={this.props.onDecrementCounter}>
            -
          </button>
          <p className="App-intro">{this.props.ctr}</p>
          <ExempleOfStatelessComponents className="App-intro" />

          <Button>Hello</Button>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    ctr: state.counter,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIncrimentCounter: () => dispatch({ type: 'INC_COUNTER' }),
    onDecrementCounter: () => dispatch({ type: 'DEC_COUNTER' }),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
