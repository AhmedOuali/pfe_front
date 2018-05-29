import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import * as headerActionCreators from '../../../store/actions/header'
import * as workspaceActionCreators from '../../../store/actions/workspace'
import * as applicationApisActionCreators from '../../../store/actions/applicationApis'
import styles from './header.css'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { TabBar } from 'rmwc/Tabs'
import { Menu, MenuItem, MenuAnchor } from 'rmwc/Menu'
import { Redirect } from 'react-router'
import TabBarElement from './TabBarElement'
import HeaderBorder from './HeaderBorder'
import HeaderTop from './HeaderTop'

import {
  Toolbar,
  ToolbarRow,
  ToolbarSection,
  ToolbarTitle,
  ToolbarMenuIcon,
  ToolbarIcon,
  ToolbarFixedAdjust,
} from 'rmwc/Toolbar'
var iconStyle = {
  fontSize: '36px',
  marginTop: '-35px',
}

class Header extends Component {
  constructor(props) {
    super(props)
    this.handleOnClick = this.handleOnClick.bind(this)
    this.handleOnRuleChange = this.handleOnRuleChange.bind(this)
  }
  componentWillMount() {
    this.setState({ menuIsOpen: false })
  }
  componentDidMount() {
    let elHeight = document.getElementById('Toolbar').clientHeight
  }

  handleOnClick() {
    this.props.setAllowNotifications(!this.allowNotifications)
  }
  handleOnRuleChange() {
    if (this.props.selectedRole == 'admin') {
      this.props.setUserRole('employee')
    } else if (this.props.selectedRole == 'employee') {
      this.props.setUserRole('admin')
    }
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
    const tabBarOnchange = value => {
      this.props.setHeaderTab(value)
      console.log(value)
      console.log('prop', this.state)
    }
    console.log('state', this.state)

    return (
      <Toolbar id="Toolbar" style={{ backgroundColor: '#385aa1' }} fixed>
        <ToolbarRow>
          <ToolbarSection alignStart>
            <ToolbarMenuIcon>
              <i
                onClick={this.handleOnRuleChange}
                className="material-icons"
                style={{ fontSize: '40px', marginTop: '-13px' }}
              >
                {this.props.selectedRole == 'admin'
                  ? 'account_circle'
                  : 'supervisor_account'}
              </i>
            </ToolbarMenuIcon>
            <ToolbarTitle style={{ fontSize: '1rem' }}>
              {this.props.username}
            </ToolbarTitle>
          </ToolbarSection>
          <ToolbarSection alignEnd>
            <ToolbarIcon use="search" style={{ marginTop: '-20px' }} />
            <MenuAnchor
              onClick={evt => {
                this.setState({ menuIsOpen: !this.state.menuIsOpen })
              }}
            >
              <Menu
                anchorCorner="bottomRight"
                open={this.state.menuIsOpen}
                onClose={evt => this.setState({ menuIsOpen: false })}
              >
                <Link to="/home" style={linkStyle}>
                  <MenuItem>Menu principal</MenuItem>
                </Link>
                <div onClick={this.handleOnClick}>
                  <MenuItem>
                    Notifications{' '}
                    {this.props.allowNotifications ? '(ON)' : '(OFF)'}
                  </MenuItem>
                </div>
                <Link to="/login" style={linkStyle}>
                  <MenuItem>LogOut</MenuItem>
                </Link>
                <MenuItem>A propos</MenuItem>
              </Menu>
              <ToolbarIcon use="more_vert" style={{ marginTop: '-20px' }} />
            </MenuAnchor>
          </ToolbarSection>
        </ToolbarRow>
        <Fragment>
          <ToolbarRow>
            <Switch>
              <Route
                path="/absence/create"
                render={() => {
                  return (
                    <HeaderTop type="CREATE" step={this.props.stepperNumber} />
                  )
                }}
              />
              <Route
                path="/absence"
                render={() => {
                  return <HeaderTop type="DEFAULT" tab={this.props.tab} />
                }}
              />
            </Switch>
          </ToolbarRow>
          <Route
            path="/absence/demande_absence"
            render={() => {
              return <HeaderBorder name="Demande d'absence" />
            }}
          />
          <Route
            path="/absence/annulation_absence"
            render={() => {
              return <HeaderBorder name="Annulation d'absence" />
            }}
          />
          <Route
            path="/absence/attente"
            render={() => {
              return <HeaderBorder name="Attente" />
            }}
          />
          <Route
            path="/absence/historique"
            render={() => {
              return <HeaderBorder name="Historique" />
            }}
          />
          <Route
            path="/absence/notifications"
            render={() => {
              return <HeaderBorder name="Notifications" {...this.props} />
            }}
          />
          <Route
            path="/absence/accueil"
            render={() => {
              return <HeaderBorder name="Accueil" {...this.props} />
            }}
          />
          <Route
            path="/embauche/create"
            render={() => {
              return <HeaderBorder name="Créer Dossier" {...this.props} />
            }}
          />
        </Fragment>
      </Toolbar>
    )
  }
}

const mapStateToProps = state => {
  return {
    height: state.header.height,
    tab: state.header.tab,
    username: state.header.username,
    notifications: state.workspace.notifications,
    stepperNumber: state.header.stepperNumber,
    allowNotifications: state.header.allowNotifications,
    isAdmin: state.applicationApi.isAdmin,
    isEmployee: state.applicationApi.isEmployee,
    selectedRole: state.applicationApi.selectedRole,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUserRole: role =>
      dispatch(applicationApisActionCreators.setUserRole(role)),
    setHeaderHeight: height =>
      dispatch(headerActionCreators.setHeaderHeight(height)),
    setHeaderTab: tab => dispatch(headerActionCreators.setHeaderTab(tab)),
    setHeaderName: username =>
      dispatch(headerActionCreators.setHeaderName(username)),
    setNotifications: notifications =>
      dispatch(workspaceActionCreators.setNotifications(notifications)),
    setStepperNumber: step => {
      dispatch(headerActionCreators.setStepperNumber(step))
    },
    setAllowNotifications: status => {
      dispatch(headerActionCreators.setAllowNotifications(status))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)
