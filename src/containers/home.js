import React, { Component, Fragment } from 'react'
import Header from './workspace/header/header'
import { connect } from 'react-redux'
import * as applicationApisActionCreators from '../store/actions/applicationApis'
import * as headerActionCreators from '../store/actions/header'

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  Link,
} from 'react-router-dom'
import {
  Toolbar,
  ToolbarRow,
  ToolbarSection,
  ToolbarTitle,
  ToolbarMenuIcon,
  ToolbarIcon,
  ToolbarFixedAdjust,
} from 'rmwc/Toolbar'
import { Menu, MenuItem, MenuAnchor } from 'rmwc/Menu'
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText,
} from 'material-ui/Card'
import { CardPrimaryAction } from 'rmwc/Card'

import { ListDivider } from 'rmwc/List'
import { Icon } from 'rmwc/Icon'
import { Typography } from 'rmwc/Typography'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      password: '',
      categorie: true,
    }
    this.handleOnRuleChange = this.handleOnRuleChange.bind(this)
  }
  componentWillMount() {}
  handleOnRuleChange() {
    if (this.props.selectedRole == 'admin') {
      this.props.setUserRole('employee')
    } else if (this.props.selectedRole == 'employee') {
      this.props.setUserRole('admin')
    }
  }
  render() {
    var iconStyle = {
      fontSize: '36px',
      marginTop: '-35px',
    }
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
    const Embauche = props => {
      return (
        <Link to="/embauche" style={linkStyle}>
          <CardPrimaryAction id="EMBAUCHE">
            <div
              style={{
                padding: '1rem',
                height: '150px',
                backgroundColor: '#e4e4e466',
              }}
            >
              <Typography
                use="headline4"
                style={{ fontSize: '20px' }}
                tag="div"
              >
                Embaucher un salarié
              </Typography>
              <Typography
                use="body1"
                tag="p"
                theme="text-secondary-on-background"
              >
                Le processus de recrutement renvoie à l'ensemble des moyens par lesquels on incite des personnes susceptibles d'occuper un poste dans l'organisation à poser leur candidature.
              </Typography>
            </div>
          </CardPrimaryAction>
        </Link>
      )
    }

    const Absence = props => {
      return (
        <Link to="/absence" style={linkStyle}>
          <CardPrimaryAction id="ABSENCE">
            <div
              style={{
                padding: '1rem',
                height: '150px',
                backgroundColor: '#e4e4e466',
              }}
            >
              <Typography
                use="headline4"
                style={{ fontSize: '20px' }}
                tag="div"
              >
                Gestion d'absences
              </Typography>
              <Typography
                use="body1"
                tag="p"
                theme="text-secondary-on-background"
              >
                Ce module propose une interface de demande d'absence avec affichage des soldes pour les utilisateurs et processus de validation.
              </Typography>
            </div>
          </CardPrimaryAction>
        </Link>
      )
    }
    return (
      <Fragment>
        <Toolbar id="Toolbar" style={{ backgroundColor: 'rgb(56, 90, 161)' }} fixed>
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
              <MenuAnchor>
                <Menu anchorCorner="bottomRight">
                  <MenuItem>Cookies</MenuItem>
                  <MenuItem>Notifications (ON)</MenuItem>
                  <MenuItem>LogOut</MenuItem>
                </Menu>
                <ToolbarIcon use="more_vert" style={{ marginTop: '-20px' }} />
              </MenuAnchor>
            </ToolbarSection>
          </ToolbarRow>
        </Toolbar>
        <ToolbarFixedAdjust>
          <div
            style={{
              backgroundColor: 'rgb(74, 111, 163)',
              zIndex: '0',
              height: '130px',
              paddingTop: '1px',
            }}
          >
            <h1
              style={{ fontSize: '27px', color: 'white', paddingLeft: '10px' }}
            >
              <i
                className="material-icons"
                style={{ fontSize: '40px', marginTop: '-13px', color: 'white' }}
              >
                home
              </i>
              Home
            </h1>

            <Card
              style={{ height: '480px', margin: '10px', marginTop: '10px' }}
            >
              <Typography
                use="subtitle1"
                tag="div"
                style={{
                  padding: '1.5rem 1rem',
                  fontSize: '25px',
                  textAlign: 'center',
                }}
                theme="text-primary-on-light"
              >
                Bienvenue, {this.props.username} !
              </Typography>
              <Typography
                use="headline5"
                tag="div"
                style={{ padding: '0.5rem 0.5rem', textAlign: 'center' }}
                theme="text-secondary-on-background"
              >
                {this.props.selectedRole == 'admin'
                  ? 'Vous etes connecté (Manager)'
                  : this.props.selectedRole == 'employee'
                    ? 'Vous etes connecté (Collaborateur)'
                    : ''}
              </Typography>

              <ListDivider />
              {this.props.selectedRole == 'admin' ? (
                <Fragment>
                  <Embauche />
                  <Absence />
                  <ListDivider />
                </Fragment>
              ) : this.props.selectedRole == 'employee' ? (
                <Absence />
              ) : (
                <Fragment />
              )}
            </Card>
          </div>
        </ToolbarFixedAdjust>
      </Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
    roles: state.applicationApi.roles,
    isAdmin: state.applicationApi.isAdmin,
    isEmployee: state.applicationApi.isEmployee,
    selectedRole: state.applicationApi.selectedRole,
    username: state.header.username,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setHeaderName: username =>
      dispatch(headerActionCreators.setHeaderName(username)),
    setUserRole: role =>
      dispatch(applicationApisActionCreators.setUserRole(role)),
    setNudossNumber: nudossNumber =>
      dispatch(applicationApisActionCreators.setNudossNumber(nudossNumber)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
