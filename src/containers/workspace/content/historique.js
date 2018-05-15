import React, { Component, Fragment } from 'react'
import { List, ListItem } from 'material-ui/List'
import ActionGrade from 'material-ui/svg-icons/action/grade'
import ContentInbox from 'material-ui/svg-icons/content/inbox'
import ContentDrafts from 'material-ui/svg-icons/content/drafts'
import ContentSend from 'material-ui/svg-icons/content/send'
import FlatButton from 'material-ui/FlatButton'
import { connect } from 'react-redux'
import * as headerActionCreators from '../../../store/actions/header'
import PlusButton from './plusButton'

class Historique extends Component {
  constructor(props) {
    super(props)
    props.setHeaderTab(1)
  }
  state = {
    open: false,
  }

  handleToggle = () => {
    this.setState({
      open: !this.state.open,
    })
  }

  handleNestedListToggle = item => {
    this.setState({
      open: item.state.open,
    })
  }

  render() {
    return (
      <div>
        <List>
          <ListItem
            primaryText="Demande(s) Acceptée(s)"
            leftIcon={<i className="material-icons">check</i>}
            initiallyOpen={false}
            primaryTogglesNestedList={true}
            nestedItems={[
              <ListItem
                key={3}
                primaryText="Recrutement de 'Ahmed Wali'"
                leftIcon={<i className="material-icons">account_circle</i>}
              />,
              <ListItem
                key={3}
                primaryText="Recrutement de 'Nesrine Jemai'"
                leftIcon={<i className="material-icons">account_circle</i>}
              />,
            ]}
          />
          <ListItem
            primaryText="Demande(s) Refusée(s)"
            leftIcon={<i className="material-icons">close</i>}
            initiallyOpen={true}
            primaryTogglesNestedList={true}
            nestedItems={[
              <ListItem
                key={1}
                primaryText="Recrutement de 'Souhaib Belguith'"
                leftIcon={<i className="material-icons">account_circle</i>}
              />,
              <ListItem
                key={2}
                primaryText="Recrutement de 'Dhia Eddine Labed'"
                leftIcon={<i className="material-icons">account_circle</i>}
              />,
              <ListItem
                key={3}
                primaryText="Khaled Garsi"
                leftIcon={<i className="material-icons">account_circle</i>}
                open={this.state.open}
                onNestedListToggle={this.handleNestedListToggle}
              />,
            ]}
          />
        </List>
        <PlusButton />
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
export default connect(mapStateToProps, mapDispatchToProps)(Historique)
