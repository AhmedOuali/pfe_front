import React, { Component, Fragment } from 'react'
import IconButton from 'material-ui/IconButton'
import RaisedButton from 'material-ui/RaisedButton'
import ActionDone from 'material-ui/svg-icons/action/done-all'
import ActionClose from 'material-ui/svg-icons/navigation/close'
import { ListDivider } from 'rmwc/List'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import AddIcon from '@material-ui/icons/Add'
import ClearIcon from '@material-ui/icons/Clear'
import * as headerActionCreators from '../../../store/actions/header'

import { connect } from 'react-redux'
class Accueil extends Component {
  constructor(props) {
    super(props)
    props.setHeaderTab(0)
  }

  render() {
    const linkStyle = {
      textDecoration: 'none',
      color: 'black',
      ':hover': {
        textDecoration: 'none',
        color: 'black',
      },
      ':visited': {
        textDecoration: 'none',
        color: 'black',
      },
    }

    const EmployeePart = props => {
      return (
        <Fragment>
          <Link to="/absence/demande_absence" style={linkStyle}>
            <ListItem button>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Demande d'absence" />
            </ListItem>
          </Link>
          <Link to="/absence/annulation_absence" style={linkStyle}>
            <ListItem button>
              <ListItemIcon>
                <ClearIcon />
              </ListItemIcon>
              <ListItemText primary="Annulation d'absence" />
            </ListItem>
          </Link>
          <ListItem button>
            <ListItemIcon>
              <ClearIcon />
            </ListItemIcon>
            <ListItemText primary="Mon planning d'absences" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ClearIcon />
            </ListItemIcon>
            <ListItemText primary="Planning d'equipe" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ClearIcon />
            </ListItemIcon>
            <ListItemText primary="Historique des absence" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ClearIcon />
            </ListItemIcon>
            <ListItemText primary="Consultation des soldes" />
          </ListItem>
        </Fragment>
      )
    }

    const ManagerPart = props => {
      return (
        <Fragment>
          <ListItem button>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Planning d'équipe" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ClearIcon />
            </ListItemIcon>
            <ListItemText primary="Historique des absences" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ClearIcon />
            </ListItemIcon>
            <ListItemText primary="Mon planning d'absences" />
          </ListItem>
        </Fragment>
      )
    }
    return (
      <div
        style={{ width: '100%', maxWidth: '360', backgroundColor: '#e4e4e46e' }}
      >
        <List component="nav">
          {this.props.selectedRole == 'admin' ? (
            <ManagerPart />
          ) : (
            <EmployeePart />
          )}
        </List>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    tab: state.header.tab,
    selectedRole: state.applicationApi.selectedRole,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setHeaderTab: tab => dispatch(headerActionCreators.setHeaderTab(tab)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Accueil)
