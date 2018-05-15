import React, { Component, Fragment } from 'react'
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
import * as workspaceActionCreators from '../../../store/actions/workspace'
import { connect } from 'react-redux'
class Notifications extends Component {
  constructor(props) {
    super(props)
    props.setHeaderTab(2)
  }
  componentWillMount() {
    this.props.setNotifications(
      JSON.parse(localStorage.getItem('notifications'))
    )
  }
  render() {
    return (
      <Fragment>
        {this.props.notifications.map((notification, index) => {
          return (
            <Card key={index} style={{ marginTop: '7px' }}>
              <CardHeader
                title={notification.title}
                subtitle={'Description: ' + notification.content}
                actAsExpander={true}
              />

              <CardText expandable={true}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam
                sed pellentesque. Aliquam dui mauris, mattis quis lacus id,
                pellentesque lobortis odio.
              </CardText>
            </Card>
          )
        })}

      </Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
    notifications: state.workspace.notifications,
    tab: state.header.tab,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setNotifications: notifications =>
      dispatch(workspaceActionCreators.setNotifications(notifications)),
    setHeaderTab: tab => dispatch(headerActionCreators.setHeaderTab(tab)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
