import React, {Component, Fragment} from 'react'
import {
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    CardTitle,
    CardText,
  } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import PlusButton from './plusButton'
import * as headerActionCreators from '../../../store/actions/header'
import { connect } from 'react-redux'
class Notifications extends Component {
    constructor(props) {
        super(props)
        props.setHeaderTab(2);
    }
    render () {
        return (
            <Fragment>
            <Card style={{ marginTop: '7px' }}>
          <CardHeader
            title="Votre demande est approuvée par l'expert-RH"
            subtitle="Description: Recrutement de 'Morsi Jallouli'"
            actAsExpander={true}
          />
          
          <CardText expandable={true}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            mattis pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec
            vulputate interdum sollicitudin. Nunc lacinia auctor quam sed
            pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque
            lobortis odio.
          </CardText>
        </Card>
        <Card style={{ marginTop: '7px' }}>
          <CardHeader
            title="Votre demande est rejetée"
            subtitle="Description: Recrutement de 'Khaled Garsi'"
            actAsExpander={true}
          />
          
          <CardText expandable={true}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            mattis pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec
            vulputate interdum sollicitudin. Nunc lacinia auctor quam sed
            pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque
            lobortis odio.
          </CardText>
        </Card>
        <PlusButton/>
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
export default connect(mapStateToProps,mapDispatchToProps)(Notifications)
