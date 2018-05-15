import React, { Component, Fragment } from 'react'
import * as headerActionCreators from '../../../../store/actions/header'
import Footer from './Footer'
import { connect } from 'react-redux'

class Create extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const FirstStape = props => {
      return (
        <Fragment>
          <h1>Test Step1</h1>
          {/* Ici c'est le form d'inscription numero 1 */}
        </Fragment>
      )
    }
    const SecondStape = props => {
      return (
        <Fragment>
          <h1>Test Step2</h1>
          {/* Ici c'est le form d'inscription numero 2 */}
        </Fragment>
      )
    }
    const ThirdStape = props => {
      return (
        <Fragment>
          <h1>Test Step33</h1>
          {/* Ici c'est le form d'inscription numero 3 */}
        </Fragment>
      )
    }

    return (
      <Fragment>
        {this.props.stepperNumber === 0 ? (
          <FirstStape />
        ) : this.props.stepperNumber === 1 ? (
          <SecondStape />
        ) : (
          <ThirdStape />
        )}
        <Footer />
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    tab: state.header.tab,
    stepperNumber: state.header.stepperNumber,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setHeaderTab: tab => dispatch(headerActionCreators.setHeaderTab(tab)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Create)
