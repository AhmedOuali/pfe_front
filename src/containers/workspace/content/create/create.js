import React, {Component, Fragment} from 'react'
import * as headerActionCreators from '../../../../store/actions/header'
import Footer from './Footer'

import { connect } from 'react-redux'
class Create extends Component {
    constructor(props) {
        super(props)
    }
    render () {
        return (
            <Fragment>
                <Footer/>
            </Fragment>
        )
    }
}
const mapStateToProps = state => {
    return {
      tab: state.header.tab
    }
}
const mapDispatchToProps = dispatch => {
    return {
      setHeaderTab : tab => 
        dispatch(headerActionCreators.setHeaderTab(tab))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Create)
