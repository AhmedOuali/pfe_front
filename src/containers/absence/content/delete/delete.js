import React, { Component, Fragment } from 'react'
import * as headerActionCreators from '../../../../store/actions/header'
import * as applicationApisActionCreators from '../../../../store/actions/applicationApis'
import { connect } from 'react-redux'
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText,
} from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'


class Delete extends Component {
  componentWillMount () {
    this.props.searchForRequestsToCancel()
  }
  render() {
    const RequestFactory = (props)=> {
      return (
        <Card style={{ marginTop: '7px' }}>
          <CardHeader

            title={props.request.name}
            subtitle={props.request.calories + " --> " + props.request.carbs} 
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardActions style={{}}>
            $
            <FlatButton label="En cours" style={{ color: 'green' }} />
            <IconButton
            onClick={this.props.cancelRequest.bind(this,props.request.NULIGN)}>
            <i className="material-icons">delete</i>
          </IconButton>
          </CardActions>
         
          <CardText expandable={true}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            mattis pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec
            vulputate interdum sollicitudin. Nunc lacinia auctor quam sed
            pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque
            lobortis odio.
          </CardText>
        </Card>
      )
    } 
    return (
      this.props.requestsToCancel != undefined? 
        this.props.requestsToCancel.map(request => {
        return <RequestFactory request={request} key={request.id}/>
        }):<Fragment><center><h3>Chargement...</h3></center></Fragment>
      
    )
  }
}

const mapStateToProps = state => {
  return {
    tab: state.header.tab,
    requestsToCancel: state.applicationApi.requestsToCancel
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setHeaderTab: tab => dispatch(headerActionCreators.setHeaderTab(tab)),
    searchForRequestsToCancel: () => dispatch(applicationApisActionCreators.searchForRequestsToCancel()),
    cancelRequest: NULIGN => dispatch(applicationApisActionCreators.cancelRequest(NULIGN))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Delete)
